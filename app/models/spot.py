from .db import db, environment, SCHEMA, add_prefix
from sqlalchemy.sql import func

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
    # created = db.Column(db.DateTime(
    #     timezone=True), nullable=False, server_default=func.current_timestamp())
    created = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now())
    updated = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    userId = db.Column(db.Integer, db.ForeignKey(add_prefix("user.id")), nullable=False)


    def to_dict(self):
        return {
            self.id: {
                "id": self.id,
                "address": self.address,
                "city": self.city,
                "state": self.state,
                "country": self.country,
                "name": self.name,
                "price": self.price,
                "created": self.created,
                "updated": self.updated,
                "userId": self.userId,
            }
        }
