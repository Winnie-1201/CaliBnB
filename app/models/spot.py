from .db import db, environment, SCHEMA, add_prefix
from sqlalchemy.sql import func
from .user import User

class Spot(db.Model):
    __tablename__ = 'spots'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(25), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    preview_img = db.Column(db.String(255), nullable=False)
    tags = db.Column(db.String(255), nullable=False)

    # house condition
    guests = db.Column(db.Integer, nullable=False)
    bedroom = db.Column(db.Integer, nullable=False)
    beds = db.Column(db.Integer, nullable=False)
    bath = db.Column(db.Integer, nullable=False)
    # created = db.Column(db.DateTime(
    #     timezone=True), nullable=False, server_default=func.current_timestamp())
    created = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now())
    updated = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    userId = db.Column(db.Integer, db.ForeignKey(add_prefix("users.id")), nullable=False)
    
    reviews = db.relationship('Review', back_populates='spot', cascade='all, delete')
    images = db.relationship('Image', back_populates='spot', cascade='all, delete')
    bookings = db.relationship('Booking', back_populates='spot', cascade='all, delete')


    def avg_rating(self):
        reviews = self.reviews
        count = len(self.reviews)

        review_dict = {
            "cleanliness": 0,
            "check_in": 0,
            "communication": 0,
            "value": 0,
            "location": 0,
            "accuracy": 0
        }

        for r in reviews:
            print('r', r.to_dict_rates())
            review_dict['cleanliness'] = review_dict['cleanliness'] + r.to_dict_rates()['cleanliness']
            review_dict['check_in'] = review_dict['check_in'] + r.to_dict_rates()['check_in']
            review_dict['communication'] = review_dict['communication'] + r.to_dict_rates()['communication']
            review_dict['value'] = review_dict['value'] + r.to_dict_rates()['value']
            review_dict['location'] = review_dict['location'] + r.to_dict_rates()['location']
            review_dict['accuracy'] = review_dict['accuracy'] + r.to_dict_rates()['accuracy']

        avg_c = round(review_dict['cleanliness'] / count, 1)
        avg_ci = round(review_dict["check_in"] / count, 1)
        avg_cm = round(review_dict["communication"] / count,1)
        avg_v = round(review_dict["value"] / count, 1)
        avg_l = round(review_dict["location"] / count, 1)
        avg_a = round(review_dict["accuracy"] / count, 1)

        avg = round((avg_c + avg_ci + avg_cm + avg_v + avg_l + avg_a) / 6, 1)

        return {
            "avg_c":avg_c, 
            "avg_ci":avg_ci ,
            "avg_cm":avg_cm, 
            "avg_v":avg_v, 
            "avg_l":avg_l, 
            "avg_a":avg_a, 
            "avg":avg}

    def to_dict_basic(self):
        return {
            "id": self.id,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "name": self.name,
            "price": self.price,
            'preview_img': self.preview_img,
            'tags': self.tags,
            'ownerId': self.userId,
            'beds': self.beds
        }


    def to_dict(self):
        return {
            "id": self.id,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "name": self.name,
            "price": self.price,
            'preview_img': self.preview_img,
            'tags': self.tags,
            "created": self.created,
            "updated": self.updated,
            "ownerId": self.userId,
        }

    def to_dict_details(self):
        return {
            "id": self.id,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "name": self.name,
            "price": self.price,
            'preview_img': self.preview_img,
            'tags': self.tags,
            "created": self.created,
            "updated": self.updated,
            "images": [i.to_dict_basic() for i in self.images],
            "owner": User.query.get(self.userId).to_dict(),
            'beds': self.beds,
            'guests': self.guests,
            'bedroom': self.bedroom,
            'bath': self.bath,
            'averages': self.avg_rating(),
            "reviews": len(self.reviews) 
        }
