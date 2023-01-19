from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Wishlist
from app.forms import WishlistForm


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
        if w.to_dict()['title'] in wishlist_obj: wishlist_obj[w.to_dict()['title']].append(w.to_dict())
        else: wishlist_obj[w.to_dict()['title']] = [w.to_dict()]
    

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


@wishlist_routes.route('/<string:oldTitle>', methods=['PUT'])
@login_required
def edit_wishlist(oldTitle):
    form = WishlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    wishlist = Wishlist.query.filter_by(title=oldTitle).first()
    # deme = Wishlist.query.get(6)
    # print('----------')
    # print('----------')
    # print('----------title and oldtitle', oldTitle)
    # print('---------- wishlist', wishlist, deme.title, oldTitle.strip(), len(deme.title), len(oldTitle), len(oldTitle.strip()))
    # print('----------')


    if form.validate_on_submit:
        wishlist.title = form.data['title']
        db.session.commit()
        return wishlist.to_dict()
        # for w in wishlist:
        #     w.title = form.data['title']
        # db.session.commit()
        # wishlist_obj = {}
        # for w in wishlist:
        #     if w.to_dict()['title'] in wishlist_obj: wishlist_obj[w.to_dict()['title']].append(w.to_dict())
        #     else: wishlist_obj[w.to_dict()['title']] = [w.to_dict()]
        # return jsonify(wishlist_obj)

    if form.errors:
        return form.errors
        
    # else:
    #     return {'error': 'You do not have access.'}

    # else:
    #     print('------------')
    #     print('------------ in line 99')
    #     print('------------')
    #     return {'error': 'The wishlist is not found.'}


@wishlist_routes.route('/<string:title>', methods=['DELETE'])
@login_required
def delete_wishlist(title):

    # wishlist = Wishlist.query.get(wishlistId)
    wishlist = Wishlist.query.filter_by(title=title).all()

    # print("----------")
    # print("---------- delete in backend", wishlist)
    # print("----------")
    # print("----------")
    if wishlist:
        for w in wishlist:
            db.session.delete(w)
        db.session.commit()

        return {'message': 'The wishlist has been deleted.'}
    else:
        return {'error': 'The wishlist is not found.'}




