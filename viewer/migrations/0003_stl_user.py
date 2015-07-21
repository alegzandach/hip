# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usertypes', '0003_auto_20150720_1943'),
        ('viewer', '0002_auto_20150624_1331'),
    ]

    operations = [
        migrations.AddField(
            model_name='stl',
            name='user',
            field=models.ForeignKey(default=1, to='usertypes.GeneralUser'),
            preserve_default=False,
        ),
    ]
