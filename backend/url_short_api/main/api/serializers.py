from rest_framework.serializers import ModelSerializer, SerializerMethodField
from main.models import Link, Customer
from main.services.VisitService import VisitService


class LinkSerializer(ModelSerializer):
    count_total = SerializerMethodField()
    count_unique = SerializerMethodField()

    class Meta:
        model = Link
        fields = '__all__'

    def get_count_total(self, obj):
        visit_service = VisitService()
        return len(visit_service.getByLink(obj.id))

    def get_count_unique(self, obj):
        visit_service = VisitService()
        return len(visit_service.getUnique(obj.id))

class EvilDataSerializer(ModelSerializer):

    class Meta:
        model = Customer
        fields = ['evil_mode', 'force_url']