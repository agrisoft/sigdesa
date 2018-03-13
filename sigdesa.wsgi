#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/opt/sigdesa")

from app import app as application
application.secret_key = 'you-will-never-guess'