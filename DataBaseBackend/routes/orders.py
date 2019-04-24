import datetime as datetime
from models import orders
from connection import DatabaseHandler

session = DatabaseHandler.connect_to_database()
from . import orders
# activity_types = ['added event', 'added photo', 'removed photo', 'added document', 'removed document', 'added result', 'added fest', 'added person']

@orders.route('/oreds', methdos=['GET'])
def get_orders():
    colleges = session.query(orders).all()
    session.close()
    college_json_array = []
    
    
    return {
        'status':'OK',
        'message':'SUCCESS',
        'array':colleges
    }, 200