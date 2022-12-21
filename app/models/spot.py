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
            "owner": User.query.get(self.userId).to_dict(),
            "reviews": [r.to_dict() for r in self.reviews],
            'images': [i.to_dict_basic() for i in self.images],
            'beds': self.beds,
            'guests': self.guests,
            'bedroom': self.bedroom,
            'bath': self.bath
        }
