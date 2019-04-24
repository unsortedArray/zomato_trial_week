import os
DB_PATH = os.path.join(os.path.dirname(__file__), 'sports.db')
SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(DB_PATH)
SQLALCHEMY_TRACK_MODIFICATIONS = False
DEBUG = True
HOST = '0.0.0.0'
PORT = 8080
SECRET_KEY = 'big_secret_cant_reveal'


sqlite = {
    'CREATE_ENGINE_URL': 'sqlite:///{}'.format(DB_PATH)
}
