import os
basedir = os.path.abspath(os.path.dirname(__file__))

# SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_DATABASE_URI = 'postgresql://tejo:rahasia@localhost:5432/sigdesa4'
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
SQLALCHEMY_TRACK_MODIFICATIONS = False
APP_ROOT = '/mnt/d/Workspaces/DEV/sigdesa/'
PG_USER = 'tejo'
PG_PASSWORD = 'rahasia'
PG_DB = 'sigdesa4'

WTF_CSRF_ENABLED = True
SECRET_KEY = 'you-will-never-guess'
