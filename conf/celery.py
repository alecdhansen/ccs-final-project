from __future__ import absolute_import
import os
from celery import Celery
from django.conf import settings
from time import sleep

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "conf.settings")
app = Celery("conf")


app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
    "get_demo_test": {
        # api because that is the name of the app where tasks.py is / inside tasks.py there is the demo_test function
        "task": "api.tasks.demo_test",
        # Calls task every 10 seconds.
        "schedule": 10.00,
    },
}

app.conf.timezone = "UTC"


@app.on_after_configure.connect
def periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(10.0, my_first_task.s(2), name="add every 10")

    # # Executes every Monday morning at 7:30 a.m.
    # sender.add_periodic_task(
    #     crontab(hour=7, minute=30, day_of_week=1),
    #     test.s('Happy Mondays!'),
    # )


#
@app.task(bind=True)
def debug_task(self):
    print("Request: {0!r}".format(self.request))


@app.task(name="my_first_task")
def my_first_task(duration):
    sleep(duration)
    return "first_task_done!"


# ---------------------------------------------------------------------------------------------#


# Using a string here means the worker doesn't have to serialize
# import os

# from celery import Celery

# Set the default Django settings module for the 'celery' program.
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'conf.settings')

# app = Celery('conf')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
# conf because that is the name of the project directory
# app.config_from_object("django.conf:settings", namespace="CELERY")

# Load task modules from all registered Django apps.
# app.autodiscover_tasks()

# app.conf.beat_schedule = {
#     "get_demo_test": {
#         # api because that is the name of the app where tasks.py is / inside tasks.py there is the demo_test function
#         "task": "api.tasks.demo_test",
#         # Calls task every 10 seconds.
#         "schedule": 10.00,
#     },
# }

# app.conf.timezone = "UTC"
