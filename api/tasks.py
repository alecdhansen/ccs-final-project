from celery import app

from .serializers import EventSerializer
from .models import Event


@app.shared_task
def demo_test():
    # creating a new event object and saving it to the database
    event = Event.objects.create(name="auto")
    event.save()
