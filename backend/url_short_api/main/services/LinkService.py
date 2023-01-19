from main.repositories.LinkRepository import LinkRepository

class LinkService:

    def __init__(self):
        self.repository = LinkRepository()

    def getByCustomerId(self, customer_id):
        return self.repository.getByCustomerId(customer_id)

    def getByTarget(self, target_url):
        return self.repository.getByTarget(target_url)

    def getByAlias(self, alias):
        return self.repository.getByAlias(alias)

    def getByTargetAndId(self, target_url, id):
        return self.repository.getByTargetAndId(target_url, id)

    def saveLink(self, target_url, alias, customer_id):
        return self.repository.createNew(target_url, alias, customer_id)

    def removeLink(self, id, alias):
        return self.repository.remove(id, alias)
