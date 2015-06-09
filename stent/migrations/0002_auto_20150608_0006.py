# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stent', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='airway',
            name='stl',
            field=models.FileField(upload_to=''),
        ),
    ]
