from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from gameupdates import gamesapi


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(gamesapi.update_games, "interval", minutes=1)
    scheduler.start()
