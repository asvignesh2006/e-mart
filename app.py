from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'

db = SQLAlchemy(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Predefined user credentials
def seed_user():
    user = User.query.filter_by(email='asvignesh06@gmail.com').first()
    if not user:
        new_user = User(email='asvignesh06@gmail.com', password='Vicky512')
        db.session.add(new_user)
        db.session.commit()

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email, password=password).first()
        if user:
            session['user'] = email  # Store user in session
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', error='Invalid credentials')
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('dashboard.html')

@app.route('/supplier')
def supplier_management():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('supplier_management.html')

@app.route('/sales')
def sales_interface():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('sales_interface.html')

@app.route('/stock')
def stock_management():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('stock_management.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        seed_user()
    app.run(debug=True)
