# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usertypes', '0002_auto_20150720_1844'),
    ]

    operations = [
        migrations.AddField(
            model_name='generaluser',
            name='email',
            field=models.EmailField(default='hi@hi.com', unique=True, max_length=355, verbose_name=b'email address'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='generaluser',
            name='first_name',
            field=models.CharField(max_length=50, null=True, verbose_name=b'first name', blank=True),
        ),
        migrations.AddField(
            model_name='generaluser',
            name='last_name',
            field=models.CharField(max_length=50, null=True, verbose_name=b'last name', blank=True),
        ),
    ]
