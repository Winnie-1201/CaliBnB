from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Spot, Review, Booking
from app.forms import SpotForm, ReviewForm, BookingForm

booking_routes = Blueprint('bookings', __name__)