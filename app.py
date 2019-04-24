from flask_api import FlaskAPI
@app.route('/', methods=['GET'])
def indexRoute():
	return("Hello World");