from app.models import db, User, environment, SCHEMA

def seed_users():
    for i in range(1, 16):
        demo = User(firstName=f"Demo{i}", lastName=f"User{i}", username=f"demouser{i}", email=f"demo{i}@aa.io", password="password", icon="https://a0.muscache.com/defaults/user_pic-225x225.png?v=3")
        db.session.add(demo)
    # demo = User(firstName="Winnie", lastName="", username="Demo", email="demo@aa.io", password="password")
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')
    # lily = User(username="lily", email="lily@aa.io", password="password")
    # maria = User(
    #     username='maria', email='maria@aa.io', password='password')
    # john = User(
    #     username='john', email='john@aa.io', password='password')

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    # db.session.add(lily)
    # db.session.add(maria)
    # db.session.add(john)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()
    