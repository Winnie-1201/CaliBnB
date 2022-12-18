from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired

class WishlistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    # may not need
    start = DateTimeField('start')
    end = DateTimeField('emd')