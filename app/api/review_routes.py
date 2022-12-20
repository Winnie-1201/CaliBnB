from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Spot, Review
from app.forms import SpotForm

review_routes = Blueprint('reviews', __name__)

@review_routes.routes('/<int:spotId>')
def spot_reviews(spotId):

    '''
    Query for all reviews of a spot and return them in a list of dictionaries
    '''
    reviews = Review.query.filter_by(spotId=spotId).all()

    return {'Reviews', [review.to_dict() for review in reviews]}


@review_routes.routes('/current')
def spot_reviews():

    '''
    Query for all reviews of current user and return them in a list of dictionaries
    '''

    userId = current_user.id
    reviews = Review.query.filter_by(userId=userId).all()

    return {'Reviews', [review.to_dict() for review in reviews]}


@review_routes.routes('<int:spotId>/reviews', methods=["POST"])
def add_review(spotId):

    '''
    Query for creating a review based on the spotId and return it as a dictionary
    '''

    