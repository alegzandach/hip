from django.db import models

from django.conf import settings

class GeneralUser(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, primary_key=True)

    first_name = models.CharField('first name', max_length=50, blank=True, null=True)
    last_name = models.CharField('last name', max_length=50, blank=True, null=True)
    
    email = models.EmailField('email address', max_length=355, unique=True);

    def save(self, *args, **kwargs):
        self.first_name = self.user.first_name
        self.last_name = self.user.last_name
        self.email = self.user.email
        return super(GeneralUser, self).save(*args, **kwargs)

    def __str__(self):
        return self.email
