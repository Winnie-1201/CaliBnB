from flask_wtf import FlaskForm
from wtforms import DateTimeField
from wtforms.validators import DataRequired

class BookingForm(FlaskForm):
    start = DateTimeField('start', validators=[DataRequired()])
    end = DateTimeField('emd', validators=[DataRequired()])
