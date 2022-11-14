from __future__ import absolute_import, unicode_literals
from .celery import app as celery_app

__all__ = ("celery_app",)

# from pypi.main import app

# celery = app  # you can omit this line
