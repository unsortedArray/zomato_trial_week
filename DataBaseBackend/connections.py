from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from models import  DeclarativeBase
import config as config


class DatabaseHandler:
	
	def __init__(self):
		pass

	@staticmethod
	def connect_to_database():
		"""
		connect to our SQLite database and return a Session object
		"""

		engine = create_engine(config.sqlite['CREATE_ENGINE_URL'], echo=True)
		engine.raw_connection().connection.text_factory = lambda x: x.encode('utf-8', 'ignore')
		session = scoped_session(sessionmaker(bind=engine))
		DeclarativeBase.query = session.query_property()
		return session
	@staticmethod
	def  returnEngine():
		engine = create_engine(config.sqlite['CREATE_ENGINE_URL'], echo=True)
		return engine