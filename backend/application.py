from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5500"])
# Database connection details
DB_HOST = "localhost"
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASS = "abdul756"
DB_PORT = "5432" #Default port, change if needed.

def get_db_connection():
    """Establishes and returns a database connection."""
    conn = None
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            port=DB_PORT
        )
    except psycopg2.Error as e:
        print(f"Error connecting to the database: {e}")
    return conn

@app.route('/register', methods=['POST'])
def register_user():
    """Handles user registration."""
    data = request.get_json()
    name = data.get('name')
    userid = data.get('UserID')
    password = data.get('password')
    contact = data.get('contact')
    gender = data.get('gender')

    if not all([name, userid, password, contact, gender]):
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    if conn:
        try:
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO users (name, userid, password, contact, gender) VALUES (%s, %s, %s, %s, %s) RETURNING *",
                (name, userid, password, contact, gender),
            )
            new_user = cur.fetchone()
            conn.commit()
            cur.close()
            conn.close()
            return jsonify(
                {
                    "message": "User registered successfully",
                    "user": {
                        "name": new_user[1],
                        "userid": new_user[2],
                        "contact": new_user[4],
                        "gender": new_user[5],
                    },
                }
            ), 201
        except psycopg2.Error as e:
            print(f"Database error: {e}")
            return jsonify({"error": "Registration failed"}), 500
    else:
        return jsonify({"error": "Database connection failed"}), 500

if __name__ == '__main__':
    app.run(debug=True) #remove debug=true for production.