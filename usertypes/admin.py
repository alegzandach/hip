from django.contrib import admin

from .models import GeneralUser

class GeneralUserAdmin(admin.ModelAdmin):
    fields = ('email', 'first_name', 'last_name')
    list_display = ('email', 'first_name', 'last_name')

admin.site.register(GeneralUser, GeneralUserAdmin)
