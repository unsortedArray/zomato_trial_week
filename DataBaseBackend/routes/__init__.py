from flask import Blueprint
from flask_login import LoginManager


institute = Blueprint('orders' __name__)


from . import orders


def initialise_routes(app):
    
    app.register_blueprint(institute, url_prefix='/orders')

