uid = "8f1HpxQnsDbTdesBZsXmfkyO2QC3"
import firebase_admin
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("/Users/bogdan/Downloads/mumchef-io-firebase-adminsdk-i7tqa-10bcf1646d.json")
firebase_admin.initialize_app(cred)
from firebase_admin import auth
user = auth.get_user(uid)
print (user.__dict__)

auth.set_custom_user_claims(uid, {'admin': True})