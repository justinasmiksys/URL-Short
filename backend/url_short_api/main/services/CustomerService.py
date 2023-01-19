from main.repositories.CustomerRepository import CustomerRepository

class CustomerService:

    def __init__(self):
        self.repository = CustomerRepository()

    def getById(self, id):
        return self.repository.getById(id)

    def getByUserId(self, id):
        return self.repository.getByUserId(id)

    def getByEmail(self, email):
        return self.repository.getByEmail(email)

    def getByUsername(self, username):
        return self.repository.getByUsername(username)

    def saveCustomer(self, username, email, password):
        return self.repository.createNew(username, email, password)