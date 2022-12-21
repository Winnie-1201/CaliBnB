from app.models import db, Image, environment, SCHEMA

images = [
    Image(
        url="https://a0.muscache.com/im/pictures/miso/Hosting-48511845/original/8f81a33d-bf66-4976-89f5-a247f0051f3a.jpeg?im_w=960",
        preview=True,
        spotId=1
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/miso/Hosting-48511845/original/a2934684-8062-4c46-a06d-4f1ec0f8c6a8.jpeg?im_w=720",
        preview=False,
        spotId=1
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/miso/Hosting-48511845/original/69bd6d94-5a39-447a-9bd3-e866b7e77692.jpeg?im_w=720",
        preview=False,
        spotId=1
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/miso/Hosting-48511845/original/8a5ad04b-260a-45e5-9173-5e3dbc3a5be6.jpeg?im_w=1200",
        preview=False,
        spotId=1
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/miso/Hosting-48511845/original/ddda1d14-6b26-47bc-aa7e-a3103432801c.jpeg?im_w=720",
        preview=False,
        spotId=1
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/miso/Hosting-48511845/original/8f81a33d-bf66-4976-89f5-a247f0051f3a.jpeg?im_w=960",
        preview=False,
        spotId=1
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/5e56aff5-969c-4994-aab5-fc0d6b8a2b33.jpeg?im_w=960",
        preview=True,
        spotId=2
    ),
    Image(
        url="	https://a0.muscache.com/im/pictures/miso/Hosting-5…3cba8f8-f489-4f1c-83c1-246faae34ff3.jpeg?im_w=720",
        preview=False,
        spotId=2
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/miso/Hosting-5…4edbf9e-8f5b-4122-9780-4d560ad89259.jpeg?im_w=720",
        preview=False,
        spotId=2
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/miso/Hosting-5…d94d744-a48f-4ce9-947a-6a68c16bd6ea.jpeg?im_w=720",
        preview=False,
        spotId=2
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/miso/Hosting-5…c6dc96-130d-4384-ad69-e11e88de9825.jpeg?im_w=1200",
        preview=False,
        spotId=2
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/miso/Hosting-5…23ad58-2bce-478a-9f71-954266c97dd4.jpeg?im_w=1200",
        preview=False,
        spotId=2
    ),

    Image(
        url="https://a0.muscache.com/im/pictures/8d10928e-d1d8-403b-9571-908fbe84baaa.jpg?im_w=960",
        preview=True,
        spotId=3
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/69c2301d-0c76-4db6-81f3-fa5dcca1bb4f.jpg?im_w=1200",
        preview=False,
        spotId=3
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/74e3835e-2736-43c2-945a-018e7bb0bd22.jpg?im_w=1200",
        preview=False,
        spotId=3
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/204811bd-8edc-48a8-aaf2-4582c7fdd5be.jpg?im_w=720",
        preview=False,
        spotId=3
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/7264e645-6ce4-47ee-8522-cbba221bf48d.jpg?im_w=720",
        preview=False,
        spotId=3
    ),
    Image(
        url="https://a0.muscache.com/im/pictures/9e1751a6-7a41-4fcf-8352-1c01b463a1e1.jpg?im_w=720",
        preview=False,
        spotId=3
    ),


]

def seed_images():
    for i in images:
        db.session.add(i)

    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")
        
    db.session.commit()