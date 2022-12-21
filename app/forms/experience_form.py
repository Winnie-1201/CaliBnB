from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class ExperienceForm(FlaskForm):
    duration = StringField('duration', validators=[DataRequired()])
    tags = StringField('tags', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
