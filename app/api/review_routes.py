from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Spot, Review
from app.forms import SpotForm, ReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/current')
@login_required
def spot_reviews():
    '''
    Query for all reviews of current user and return them in a list of dictionaries
    '''
    userId = current_user.id
    reviews = Review.query.filter_by(userId=userId).all()

    return {'Reviews', [review.to_dict() for review in reviews]}



@review_routes.route('/<int:reviewId>', methods=["POST"])
@login_required
def add_review(reviewId):
    '''
    Query for editing a review and return it as a dictionary
    '''
    review = Review.query.get(reviewId)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        if current_user.id == review.userId:
            review['content'] = form.data['content']
            review['cleanliness'] = form.data['cleanliness']
            review['check_in'] = form.data['check_in']
            review['communicatoin'] = form.data['communicatoin']
            review['value'] = form.data['value']
            review['location'] = form.data['location']
            review['accuracy'] = form.data['accuracy']

            db.session.commit()

            return review.to_dict()

        else:
            return {'error': 'You do not have access.'}

    if form.errors:
        return form.errors


@review_routes.route('/<int:reviewId>', methods=["DELETE"])
def delete_review(reviewId):
    '''
    Query for deleting a review by its id
    '''
    review = Review.query.get(reviewId)

    db.session.delete(review)
    db.session.commit()

    return {'message': 'The review has been deleted.'}

