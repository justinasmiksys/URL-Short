from main.repositories.VisitRepository import VisitRepository
from django.db import models

class VisitService:

    def __init__(self):
        self.repository = VisitRepository()

    def getByLink(self, link_id):
        return self.repository.getForLink(link_id)

    def saveVisit(self, link_id, ip):
        return self.repository.createNew(link_id, ip)

    def getUnique(self, link_id):
        return self.repository.getForLink(link_id).values("ip_address").annotate(n=models.Count("pk"))




