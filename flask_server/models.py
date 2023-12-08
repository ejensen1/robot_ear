from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4


db = SQLAlchemy()


def get_uuid():
   return uuid4().hex
  
class User(db.Model):
   __tablename__ = "users"
   id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
   email = db.Column(db.String(345), unique=True)
   password = db.Column(db.Text, nullable=False)
   saved_file = db.Column(db.Text)


   def __init__(self, email, password, saved_files=None):
       self.email = email
       self.password = password
       self.saved_files = json.dumps(saved_files) if saved_files else None


   def get_saved_files(self):
       return json.loads(self.saved_files) if self.saved_files else []
