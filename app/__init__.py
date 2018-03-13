from flask import Flask, Response
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_required

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)

app.config['UPLOAD_FOLDER'] = '/mnt/d/Workspaces/DEV/flask-skeleton/app/static/data/uploads/'
app.config['BOOKS_FOLDER'] = '/mnt/d/Workspaces/DEV/flask-skeleton/app/static/data/books/'

from app import views, models