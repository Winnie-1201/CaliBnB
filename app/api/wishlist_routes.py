from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Spot, Review, Booking, Experience, Wishlist
from app.forms import SpotForm, ReviewForm, BookingForm, ExperienceForm, WishlistForm


wishlist_routes = Blueprint('wishlists', __name__)

@wishlist_routes.route('/current')
@login_required
def user_wishlist():
    '''
    Query for getting current user's wishlist and
    return them in a list of dictionaries
    '''
    # wishlists = Wishlist.query.filter_by(userId=current_user.id).group_by(Wishlist.title).all()
    # wishlist_title = [w.to_dict().title for w in wishlists]

    all_wishlist = Wishlist.query.filter_by(userId=current_user.id).all()
    wishlist_obj = {}
    
    for w in all_wishlist:
        # print("----------")
        # print("----------")
        # print("---------- wishlists in backend", wishlist_obj, w.to_dict()['title'])
        # print("----------")
        # print("----------")
        # print("----------")

        if w.to_dict()['title'] in wishlist_obj: wishlist_obj[w.to_dict()['title']].append(w.to_dict())
        else: wishlist_obj[w.to_dict()['title']] = [w.to_dict()]
    
    # print("----------")
    # print("----------")
    # print("---------- wishlists in backend", wishlist_obj)
    # print("----------")
    # print("----------")
    # print("----------")

    return jsonify(wishlist_obj)
    # return {'Wishlists': [w.to_dict() for w in wishlists]}


@wishlist_routes.route('/new', methods=['POST'])
@login_required
def create_wishlist():

    spotId = request.args.get("spotId")
   

    form = WishlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit:
        new_wishlist = Wishlist(title=form.data['title'], userId=current_user.id, spotId=spotId)

        db.session.add(new_wishlist)
        db.session.commit()

        return new_wishlist.to_dict()


@wishlist_routes.route('/<int:wishlistId>', methods=['PUT'])
@login_required
def edit_wishlist(wishlistId):

    wishlist = Wishlist.query.get(wishlistId)

    if wishlist:
        form = WishlistForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if wishlist.userId == current_user.id:
            if form.validate_on_submit:
                wishlist['title'] = form.data['title']

                db.session.commit()

                return wishlist.to_dict()

            if form.errors:
                return form.errors
        
        else:
            return {'error': 'You do not have access.'}

    else:
        return {'error': 'The wishlist is not found.'}


@wishlist_routes.route('/<int:wishlistId>', methods=['DELETE'])
@login_required
def delete_wishlist(wishlistId):

    wishlist = Wishlist.query.get(wishlistId)

    if wishlist:
        db.session.delete(wishlist)
        db.session.commit()

        return {'message', 'The wishlist has been deleted.'}
    else:
        return {'error': 'The wishlist is not found.'}




