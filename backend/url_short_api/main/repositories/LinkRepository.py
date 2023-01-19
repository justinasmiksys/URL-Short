from main.models import Link

class LinkRepository:

    def __init__(self):
        self.model = Link

    def getByCustomerId(self, id):
        return self.model.objects.filter(customer_id=id)

    def getByTarget(self, target_url):
        return self.model.objects.filter(target_url=target_url)

    def getByTargetAndId(self, target_url, id):
        return self.model.objects.filter(target_url=target_url, customer_id=id)

    def getByAlias(self, alias):
        return self.model.objects.filter(alias=alias)

    def createNew(self, target_url, alias, customer_id):
        return self.model.objects.create(
            target_url = target_url,
            alias = alias,
            customer_id = customer_id
        )

    def remove(self, id, alias):
        self.model.objects.filter(
            customer_id = id,
            alias = alias
        ).delete()