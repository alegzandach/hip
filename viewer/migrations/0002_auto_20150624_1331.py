# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('viewer', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stl',
            old_name='stlFile',
            new_name='url',
        ),
    ]
