from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    cleanliness = IntegerField('cleanliness')
    check_in = IntegerField('check_in')
    communicatoin = IntegerField('communicatoin')
    value = IntegerField('value')
    location = IntegerField('location')
    accuracy = IntegerField('accuracy')
    