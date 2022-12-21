from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class ImageForm(FlaskForm):
    url = StringField('url', validators=[DataRequired()])