from flask_api import FlaskAPI
from flask import request, redirect, flash

from connections import DatabaseHandler
from models import order
from models import user
from models import restaurants
from models import tests
import config as config
from sqlalchemy import text
import json
from random import randint
from flask import jsonify
app = FlaskAPI(__name__)
session = DatabaseHandler.connect_to_database()
engine =DatabaseHandler.returnEngine()

def db_load_restaurants():
	res_name = ['Dominos','Dominos2', 'Dominos3']
	cityName = ['Delhi' , 'Kanpur' , 'Banglore']
	cityCode =['12312','122232','12312']
	
	res_nameIndex =randint(0,len(res_name)-1)
	cityNameIndex =randint(0,len(cityName)-1)
	cityCodeIndex =randint(0,len(cityCode)-1)
	# print(res_nameIndex,cityNameIndex,cityCodeIndex)
	info = restaurants(name= res_name[res_nameIndex], cityCode = cityCode[cityCodeIndex] , cityName = cityName[cityNameIndex])
	print('info')
	session.add(info)
	try:
		session.commit()
	except:
		session.rollback()
	finally:
		session.close()
	return {
			'status':'OK'
		}
def db_load_order():
	print('here')
	name =['order1','order2', 'order3', 'order4']
	ammount = ['4000','200','100','700','300']
	res_name = ['Dominos','Dominos2', 'Dominos3']
	cityName = ['Delhi' , 'Kanpur' , 'Banglore']
	# generate random int
	user = ['ricksrv5', 'unsortedArray','PaulPogba']

	name_index = randint(0,len(name)-1)
	ammount_index = randint(0, len(ammount)-1)
	res_name_index = randint(0, len(res_name)-1)
	cityName_index = randint(0,len(cityName)-1)
	user_index = randint(0 , len(user)-1)
	info = order(name = name[name_index],resName = res_name[res_name_index], ammount = ammount[ammount_index], restaurant = randint(0,12),  city = cityName[cityName_index] , user = user[user_index])
	session.add(info)
	try:
		session.commit()
	except:
		session.rollback()
		flash(config.UNEXPECTED_ERROR)
	finally:
		session.close()
	return {
			'status':'OK'
		}
	
def db_load_user():
	myuser = ['ricksrv5', 'unsortedArray','PaulPogba']
	user_index = randint(0, len(myuser) -1)
	info = user(username = myuser[user_index])
	session.add(info)
	try:
		session.commit()
	except:
		session.rollback()
	finally:
		session.close()
	return {
			'status':'OK'
		}
	
for i in range(0,10):
	db_load_order()

