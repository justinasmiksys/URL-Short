from main.models import Visit

class VisitRepository:

    def __init__(self):
        self.model = Visit

    def createNew(self, link_id, ip):
        return self.model.objects.create(
            link_id = link_id,
            ip_address = ip
        )

    def getForLink(self, link_id):
        return self.model.objects.filter(link_id=link_id)