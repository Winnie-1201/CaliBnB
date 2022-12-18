from .db import db, environment, SCHEMA, add_prefix
from sqlalchemy.sql import func

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    created = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now())
    updated = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    spotId = db.Column(db.Integer, db.ForeignKey(add_prefix("spot.id")), nullable=False)

    def to_dict(self):
        return {
            self.id: {
                "id": self.id,
                "url": self.url,
                "created": self.created,
                "updated": self.updated,
                "spotId": self.spotId,
            }
        }

