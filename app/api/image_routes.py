from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Spot, Review, Image
from app.forms import SpotForm, ReviewForm, ImageForm

image_routes = Blueprint('images', __name__)

@image_routes.route('/<int:imgId>', methods=['DELETE'])
@login_required
def delete_img(imgId):

    img = Image.query.get(imgId)

    if img:
        db.session.delete(img)
        db.session.commit()

        return {'message': 'The image has been deleted.'}
    
    else:
        return {'error': 'The image is not found'}