from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Spot, Review, Experience
from app.forms import SpotForm, ReviewForm, ExperienceForm

experience_routes = Blueprint('experiences', __name__)


