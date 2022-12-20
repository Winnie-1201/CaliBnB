from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.models import Spot

def name_exits(form, field):
    # checking if the spot name exists
    name = field.data
    spot = Spot.query.filter(Spot.name == name).first()
    if spot:
        raise ValidationError('Spot name already exists.')

    
class SpotForm(FlaskForm):
    address = StringField('address', validators=[DataRequired()])
    city = StringField("city", validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired(), name_exits])
    price = FloatField('price', validators=[DataRequired()])
    preview_img = StringField('preview_img', validators=[DataRequired()])
    tags = StringField('tags')
    