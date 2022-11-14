from __future__ import absolute_import
import os
from celery import Celery
from django.conf import settings
from time import sleep

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "conf.settings")
app = Celery("conf")
app.config_from_object("django.conf:settings")
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print("Request: {0!r}".format(self.request))


@app.task(name="my_first_task")
def my_first_task(duration):
    sleep(duration)
    return "first_task_done!"
