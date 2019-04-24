
from flask_api import FlaskAPI
from flask import request, redirect, flash
from models import orders
from connections import DatabaseHandler
from models import orders
from models import user
from models import restaurants
from models import tests
import config as config
from sqlalchemy import text
import json
from flask import jsonify
app = FlaskAPI(__name__)
session = DatabaseHandler.connect_to_database()
engine =DatabaseHandler.returnEngine()

def run():
	app.run(host=config.HOST, port=config.PORT, debug=True, threaded=False, processes=1)
@app.route('/', methods=['GET'])
def indexRoute():
	return("Hello World")
@app.route('/order',methods=['GET'])
def get_orders():
    allorders = session.query(orders).all()
    session.close()
    ordersArray =[];
    for order in allorders:
        current_order ={
         'name': order.name,
         'restaurant id' : order.restaurant,
         'ammount':order.ammount,
         'user' : order.user,
         'time': order.id
        }
        ordersArray.append(current_order)
    
    return {
        'status':'OK',
        'message':'SUCCESS',
        'array':ordersArray
    }, 200
@app.route('/order', methods=['POST'])
def add_order():
    info = orders(name = request.data['name'], resName = request.data['resName'], ammount =request.data['ammount'], restaurant = request.data['restaurant'],user = request.data['user'])
    session.add(info)
    try:
        session.commit()
    except:
        session.rollback()
        flash(config.UNEXPECTED_ERROR)
    finally:
        session.close()
    return redirect('/order')
@app.route('/user/add',methods=['GET','POST'])
def addUser():
    if request.method == 'POST':

        #print(request.data['username'])
        info = user(username= request.data['username'])
        
        session.add(info)
        try:
            session.commit()
        except:
            session.rollback()
            flash(config.UNEXPECTED_ERROR)
        finally:
            session.close()
        return{
            'status':'OK',
            'message':'SUCCESS',
        },200
    else:
        alluser = session.query(user).all()
        print("Here")
        usersArray =[]
        print(alluser)
        for a_user in alluser:
            temp_user ={
                'username' : a_user.username
            }
            usersArray.append(temp_user);
        if not usersArray:
            return {
                'status': 'BAD request'
            }

        return  {
            'status':'OK',
            'message':'SUCCESS',
            'array': usersArray
        }, 200
@app.route('/restaurant',methods=['GET'])
def getRestaurants():
    all_restauranst = session.query(restaurants).all();
    session.close
    restaurant_array= []
    for restaurant in all_restauranst:
        current_restaurant ={
            'name' : restaurant.name,
            'cityPin' : restaurant.cityCode,
            'cityName': restaurant.cityName,
            'restaurantId' : restaurant.id
        }
        restaurant_array.append(current_restaurant)
    if not restaurant_array:
        return{
            'status' : 'NO restaurants Found'
        }
    return {
        'status':'OK',
        'message': 'SUCCESS',
        'array':restaurant_array
    }
@app.route('/restaurant', methods=['POST'])
def addRestaurant():
    info = restaurants(name = request.data['name'], cityCode  = request.data['cityCode'], cityName = request.data['cityName'] )
    session.add(info)
    try:
        session.commit()
    except:
        session.rollback()
        flash(config.UNEXPECTED_ERROR)
    finally:
        session.close()
    return {
        'status' : 'OK',
        'message' : 'SUCCESS'
    }

@app.route('/test',methods=['POST'])
def test():
    result = []
    query = str(request.data['query'])
    try:
        con =engine.connect()
        rs = con.execute(query)
        #row = fetchone()
        d,a  = {}, []
        for rowproxy in rs:
            for column,value in rowproxy.items():
                d ={**d, **{column:value}}
            result.append(d)

    finally:
        con.close()
    for data in result:
        print(data)
    return result
if __name__ == '__main__':
    run()