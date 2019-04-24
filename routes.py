from flask import request, redirect, flash
from flask_login import login_required
from models import Institution
from connection import DatabaseHandler
# from . import institute
import config as config
session = DatabaseHandler.connect_to_database()

@institute.route('/get', methods=['GET'])
# @login_required
def get_institutions():
    colleges = session.query(Institution).all()
    session.close()
    college_json_array = []
    for college in colleges:
        user_json = {
            'college_name':college.name,
            'college_short':college.short,
            'college_id':college.id
        }
        college_json_array.append(user_json)
    if not college_json_array:
        return {
            'status':'BAD REQUEST',
            'message':'NO INSTITUTION YET'
        }, 201
    return {
        'status':'OK',
        'message':'SUCCESS',
        'array':college_json_array
    }, 200
