from app import db
from datetime import datetime
class Contact(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(70),nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(12), nullable=False)
    message = db.Column(db.String(15000), nullable=False)
    date = db.Column(db.DateTime,default=datetime.utcnow)
    
    def __repr__(self):
        return f"{self.id} - {self.name}"
    
class User(db.Model):
    
    id = db.Column(db.Integer,primary_key=True)
    userName = db.Column(db.String(70),nullable=False)
    userEmail = db.Column(db.String(120), nullable=False,unique=True)
    password = db.Column(db.String(12), nullable=False,unique=True)
    date = db.Column(db.DateTime,default=datetime.utcnow)
    
    def __repr__(self):
        return f"{self.id} - {self.userName}:{self.userEmail}"