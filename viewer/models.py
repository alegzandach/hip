from django.db import models

# Create your models here.

class STL(models.Model):
    url = models.FileField()
