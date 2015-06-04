from django.db import models

class Airway(models.Model):
    stl = models.FileField(upload_to='STLfiles')
