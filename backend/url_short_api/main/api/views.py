from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import json
from django.db.utils import IntegrityError

from main.services.CustomerService import CustomerService
from main.services.LinkService import LinkService

from .serializers import LinkSerializer, EvilDataSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        customer_service = CustomerService()
        customer = customer_service.getByUserId(user.id)[0]

        token['id'] = user.id
        token['username'] = user.username
        token['email'] = user.email
        token['force_url'] = customer.force_url
        token['evil_mode'] = customer.evil_mode

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def signup(request):
    customer_service = CustomerService()

    body = json.loads(request.body)
    username = body["username"]
    email = body["email"]
    password = body["password"]

    try:
        customer_service.saveCustomer(username, email, password)
    except IntegrityError as e:
        message = str(e)
        failed_parameter_string = message.split('.')[-1]

        response_message = f"Such {failed_parameter_string} already exists!"

        print(response_message)

        return JsonResponse({'error': response_message}, status=409)

    return JsonResponse({'message': 'Success'}, status=200)

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getLinks(request):
    link_service = LinkService()
    customer_service = CustomerService()

    customer = customer_service.getByUserId(request.user.id)[0]
    links = link_service.getByCustomerId(customer.id)
    serializer = LinkSerializer(links, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getEvilData(request):
    customer_service = CustomerService()

    customer = customer_service.getByUserId(request.user.id)[0]
    serializer = EvilDataSerializer(customer)

    return Response(serializer.data)