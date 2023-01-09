from app.models import db, Wishlist, environment, SCHEMA

wishilists = [
    Wishlist(
        title="wishlist one",
        userId=4,
        spotId=1
    ),
    Wishlist(
        title="wishlist one",
        userId=4,
        spotId=2
    ),
    Wishlist(
        title="wishlist one",
        userId=4,
        spotId=3
    ),
    Wishlist(
        title="wishlist two",
        userId=4,
        spotId=4
    ),
    Wishlist(
        title="wishlist two",
        userId=4,
        spotId=5
    ),
]

def seed_wishlists():
    for w in wishilists:
        db.session.add(w)
    db.session.commit()

def undo_wishlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM wishlists")
        
    db.session.commit()