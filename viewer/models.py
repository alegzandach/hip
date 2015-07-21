from django.db import models
from usertypes.models import GeneralUser

# Create your models here.

class STL(models.Model):
    url = models.FileField()

    user = models.ForeignKey(GeneralUser)
