from app.models import db, Booking, environment, SCHEMA
import random
import datetime

x = datetime.datetime(2020, 5, 17)

bookings = [
    Booking(
        start=datetime.datetime(2022, 12, 1),
        end=datetime.datetime(2022, 12, 3),
        userId=4,
        spotId=1
        ),
    Booking(
        start=datetime.datetime(2022, 12, 17),
        end=datetime.datetime(2022, 12, 18),
        userId=4,
        spotId=2
        ),
    Booking(
        start=datetime.datetime(2022, 11, 1),
        end=datetime.datetime(2022, 11, 3),
        userId=5,
        spotId=3
        ),
    Booking(
        start=datetime.datetime(2022, 11, 11),
        end=datetime.datetime(2022, 11, 13),
        userId=5,
        spotId=2
        ),
    Booking(
        start=datetime.datetime(2022, 12, 4),
        end=datetime.datetime(2022, 12, 5),
        userId=6,
        spotId=1
        ),
    Booking(
        start=datetime.datetime(2022, 10, 1),
        end=datetime.datetime(2022, 10, 3),
        userId=6,
        spotId=2
        ),
    Booking(
        start=datetime.datetime(2022, 12, 1),
        end=datetime.datetime(2022, 12, 3),
        userId=7,
        spotId=3
        ),
]


def seed_bookings():
    for b in bookings:
        db.session.add(b)

    db.session.commit()

def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM bookings")
        
    db.session.commit()