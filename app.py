from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

USERS_FILE = 'users.json'
HISTORY_FILE = 'history.json'

# Initialize files if they don't exist
def init_files():
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'w') as f:
            json.dump([], f)
    if not os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'w') as f:
            json.dump({}, f)

# Read JSON file
def read_json(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

# Write JSON file
def write_json(file_path, data):
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)

# Route to render the main application
@app.route('/')
def index():
    return render_template('index.html')

# Register user
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    id, name, email, password = data.get('id'), data.get('name'), data.get('email'), data.get('password')
    
    if not all([id, name, email, password]):
        return jsonify({'success': False, 'message': 'All fields are required'})

    users = read_json(USERS_FILE)
    if any(user['id'] == id or user['email'] == email for user in users):
        return jsonify({'success': False, 'message': 'User ID or email already exists'})

    users.append({'id': id, 'name': name, 'email': email, 'password': password})
    write_json(USERS_FILE, users)
    return jsonify({'success': True})

# Login user
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    id, password = data.get('id'), data.get('password')

    users = read_json(USERS_FILE)
    user = next((user for user in users if user['id'] == id and user['password'] == password), None)
    if not user:
        return jsonify({'success': False, 'message': 'Invalid user ID or password'})

    return jsonify({'success': True, 'user': user})

# Get user by email
@app.route('/api/user', methods=['GET'])
def get_user():
    email = request.args.get('email')
    users = read_json(USERS_FILE)
    user = next((user for user in users if user['email'] == email), None)
    if not user:
        return jsonify({'success': False, 'message': 'User not found'})
    return jsonify({'success': True, 'user': user})

# Save history
@app.route('/api/history', methods=['POST'])
def save_history():
    data = request.get_json()
    email, history = data.get('email'), data.get('history')
    
    history_data = read_json(HISTORY_FILE)
    history_data[email] = history
    write_json(HISTORY_FILE, history_data)
    return jsonify({'success': True})

# Get history
@app.route('/api/history', methods=['GET'])
def get_history():
    email = request.args.get('email')
    history_data = read_json(HISTORY_FILE)
    return jsonify({'success': True, 'history': history_data.get(email, [])})

if __name__ == '__main__':
    init_files()
    app.run(debug=True, port=5000)