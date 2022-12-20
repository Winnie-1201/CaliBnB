from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Spot, Review
from app.forms import SpotForm, ReviewForm

spot_routes = Blueprint('spots', __name__)

@spot_routes.route('')
def all_spots():
    '''
    Query for all spots and return them in a list of dictionaries
    '''
    params = request.args # [('name', 'Beach')]
    if len(params) == 0:
        spots = Spot.query.all()
        return {'spots', [spot.to_dict() for spot in spots]}
    else:
        # test if it works
        spots = Spot.query.all()
        if params.get('name'):
            spots = spots.filter_by(name=params.get('name'))
        if params.get('min'):
            spots = spots.filter(Spot.price >= params.get('min'))
        if params.get('max'):
            spots = spots.filter(Spot.price <= params.get('max'))
        spots = spots.all()

        return {'Spots', [spot.to_dict() for spot in spots]}


@spot_routes.route('/current')
@login_required
def user_spots():
    '''
    Query for all spots of current user and return them in a list of dictionaries
    '''
    spots = Spot.query.filter_by(userId=current_user.id).all()

    return {"Spots": [spot.to_dict() for spot in spots]}


@spot_routes.route('<int:id>')
def spot_by_id(id):
    '''
    Query one spot by its id and return it in a disctionary
    '''
    spot = Spot.query.get(id)
    return {'spot': spot.to_dict()}


@spot_routes.route("", methods=["POST"])
@login_required
def create_spot():

    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        address = form.data["address"]
        city = form.data["city"]
        state = form.data["state"]
        country = form.data["country"]
        name = form.data["name"]
        price = form.data["price"]

        new_spot = Spot(
            address,
            city,
            state,
            country,
            name,
            price,
            userId=current_user.id
        )

        db.session.add(new_spot)
        db.session.commit()

        return new_spot.to_dict()

    if form.errors:
        return form.errors

    
@spot_routes.route('<int:id>', methods=["PUT"])
@login_required
def edit_spot(id):
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
 
    spot = Spot.query.get(id)
    if spot.userId == current_user.id:
        if form.validate_on_submit:
            spot["address"] = form.data["address"]
            spot["city"] = form.data["city"]
            spot["state"] = form.data["state"]
            spot["country"] = form.data["country"]
            spot["name"] = form.data["name"]
            spot["price"] = form.data["price"]

            db.session.commit()

            return spot.to_dict()
        
        if form.errors:
            return form.errors
    else:
        return {'error': 'You do not have the access.'}


@spot_routes.route('<int:id>', methods=["DELETE"])
@login_required
def delete_spot(id):
    spot = Spot.query.get(id)

    if spot.userId == current_user.id:
        db.session.delete(spot)
        db.session.commit()

        return {'message': 'The spot has been deleted!'}

    else:
        return {'error': 'You do not have the access.'}

        

@spot_routes.route('<int:spotId>/reviews', methods=["POST"])
@login_required
def add_review(spotId):

    '''
    Query for creating a review based on the spotId and return it as a dictionary
    '''

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        content = form.data["content"]
        cleanliness = form.data["cleanliness"]
        check_in = form.data["check_in"]
        communicatoin =form.data["communicatoin"]
        value = form.data["value"]
        location = form.data["location"]
        accuracy = form.data["accuracy"]

        new_review = Review(
            content, 
            cleanliness,
            check_in,
            communicatoin,
            value,
            location,
            accuracy,
            userId=current_user.id,
            spotId=spotId
        )

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    
    if form.errors:
        return form.errors

        