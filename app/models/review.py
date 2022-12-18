from .db import db, environment, SCHEMA, add_prefix
from sqlalchemy.sql import func

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(), nullable=False)

    # rating columns
    cleanliness = db.Column(db.Integer)
    check_in = db.Column(db.Integer)
    communicatoin = db.Column(db.Integer)
    value = db.Column(db.Integer)
    location = db.Column(db.Integer)
    accuracy = db.Column(db.Integer)

    created = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now())
    updated = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    # Foreign keys
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix("user.id")), nullable=False)
    spotId = db.Column(db.Integer, db.ForeignKey(add_prefix("spot.id")), nullable=False)

    def to_dict(self):
        return {
            self.id: {
                "id": self.id,
                "content": self.address,
                "cleanliness": self.cleanliness,
                "check_in": self.check_in,
                "communicatoin": self.communicatoin,
                "value": self.value,
                "location": self.location,
                "accuracy": self.accuracy,
                "created": self.created,
                "updated": self.updated,
                "userId": self.userId,
                "spotId": self.spotId
            }
        } 
