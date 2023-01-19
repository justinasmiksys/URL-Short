from main.models import Customer
from django.contrib.auth.models import User

class CustomerRepository:

    def __init__(self):
        self.model = Customer
        self.userModel = User

    def getById(self, id):
        return self.model.objects.filter(id=id)

    def getByUserId(self, id):
        return self.model.objects.filter(user_id=id)

    def getByEmail(self, email):
        return self.userModel.objects.filter(email=email)

    def getByUsername(self, username):
        return self.userModel.objects.filter(username=username)

    def createNew(self, username, email, password):

        customer = self.model.objects.create(
            username = username,
            email = email,
        )

        user = self.userModel.objects.create(
            username = username,
            email = email,
        )

        user.set_password(password)
        user.save()
        customer.user = user
        customer.save()

        return customer