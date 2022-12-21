from app.models import db, Spot, environment, SCHEMA

spots = [
   Spot(
        address="provide later",
        city="Aguanga",
        state="California",
        country="United States",
        name="Off-grid Desert Retreat: Casa Rosada",
        price=175.0,
        preview_img="https://a0.muscache.com/im/pictures/miso/Hosting-48511845/original/8f81a33d-bf66-4976-89f5-a247f0051f3a.jpeg?im_w=960",
        tags="desert",
        userId=1,
        guests=3,
        bedroom=1,
        beds=3,
        bath=1
    ),
    Spot(
        address="provide later",
        city="Lake Arrowhead",
        state="California",
        country="United States",
        name="Designer A-Frame Cabin in the Trees",
        price=249,
        preview_img="https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/5e56aff5-969c-4994-aab5-fc0d6b8a2b33.jpeg?im_w=960",
        tags="tree, cabin",
        userId=2,
        guests=6,
        bedroom=3,
        beds=4,
        bath=2
    ),
    Spot(
        address="provide later",
        city="Malibu",
        state="California",
        country="United States",
        name="Malibu, Carbon Beach- Bungalow Twelve",
        price=566,
        preview_img="https://a0.muscache.com/im/pictures/8d10928e-d1d8-403b-9571-908fbe84baaa.jpg?im_w=960",
        tags="beach",
        userId=3,
        guests=4,
        bedroom=1,
        beds=2,
        bath=1
    )
]

def seed_spots():
    for s in spots:
        db.session.add(s)
    
    db.session.commit()


def undo_spots():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spots RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM spots")
        
    db.session.commit()