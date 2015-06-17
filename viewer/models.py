from django.db import models

# Create your models here.

class STL(models.Model):
    stlFile = models.FileField()