from decouple import config
import os;

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
# SQLALCHEMY_DATABASE_URI = "sqlite:///"+os.path.join(BASE_DIR,'minorProject.db')

db = config('db')
SQLALCHEMY_DATABASE_URI = "sqlite:///"+os.path.join(BASE_DIR,db)
SQLALCHEMY_TRACK_MODIFICATIONS = False

SECRET_KEY = config('SECRET_KEY')
PORT = config('PORT')
DEBUG=config('DEBUG')
# TESTING=config('DEBUG')

USER=config('gmail_user')
PASS=config('gmail_pass')

