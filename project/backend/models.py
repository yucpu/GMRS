# models.py
from django.db import models
from pymongo import MongoClient
from bson.objectid import ObjectId
import json

# connect to MongoDB database
client = MongoClient("mongodb://localhost:27017/")
db = client["sw"]
collection = db["profile"]

class User:
    def __init__(self, user_dict):
        if '_id' in user_dict:
            self._id = str(user_dict['_id'])
        else:
            self._id = str(ObjectId())
        self.nickname = user_dict['nickname']
        self.username = user_dict['username']
        self.email = user_dict['email']
        self.region = user_dict['region']
        self.age = user_dict['age']
        self.gender = user_dict['gender']
        self.password = user_dict['password']
        self.friends = user_dict.get('friends', [])
        self.gamecollection= user_dict.get('favourite',[])
    


    def save(self):
        user_data = self.__dict__.copy()
        user_id = user_data.pop('_id', None)
        if user_id is not None and collection.find_one({'_id': ObjectId(user_id)}):
            # update existing user document
            collection.update_one({'_id': ObjectId(user_id)}, {'$set': user_data})
        else:
            # insert new user document
            collection.insert_one(user_data)

    def update_profile(self, profile_dict):
        # update user object with new profile information
        self.nickname = profile_dict.get('nickname', self.nickname)
        self.email = profile_dict.get('email', self.email)
        self.region = profile_dict.get('region', self.region)
        self.age = profile_dict.get('age', self.age)
        self.gender = profile_dict.get('gender', self.gender)
        self.password = profile_dict.get('password', self.password)

        # check if user document exists in database
        user_id = self._id
        if user_id is not None and collection.find_one({'_id': ObjectId(user_id)}):
            # update existing user document
            collection.update_one({'_id': ObjectId(user_id)}, {'$set': {
    'nickname': self.nickname,
    'email': self.email,
    'region': self.region,
    'age': self.age,
    'gender': self.gender,
    'password': self.password
}})

        else:
            # insert new user document
            self.save()

    def add_game_to_collection(self, game_name):
        if game_name not in self.gamecollection:
            self.gamecollection.append(game_name)
            self.save()




    @staticmethod
    def get_user_by_id(id):
        user_dict = collection.find_one({'_id': ObjectId(id)})
        if user_dict:
            return User(user_dict)
        else:
            return None

    @staticmethod
    def get_user_by_username(username):
        user_dict = collection.find_one({'username': username})
        if user_dict:
            return User(user_dict)
        else:
            return None
        
    @staticmethod
    def search_friends(region=None, game=None):
        query = {}

        if region:
            query['region'] = region

        if game:
            query['gamecollection'] = game

        users = collection.find(query)

        friends = []
        for user_dict in users:
            user = User(user_dict)
            common_friends = set(user.friends).intersection(set(current_user.friends))
            if common_friends:
                friends.append({
                    'user': user,
                    'common_friends': common_friends
                })

        return friends
        

# username = "sparky12"
# user = User.get_user_by_username(username)
# user.password = "newpasswordmegh"
# user.save()
# #create a new user
# new_user = User({
#     "nickname": "John",
#     "username": "johndoe",
#     "email": "johndoe@example.com",
#     "region": "USA",
#     "age": 25,
#     "gender": "male",
#     "password": ""
# })
# new_user.save()

username = "sparky12"
password = "newpasswordmegh"

# get user by username
user = User.get_user_by_username(username)
if user and user.password == password:
    # set session variable and redirect to home page
    print("loggedin")
else:
    # display error message if user not found or password is incorrect
    error_message = "Invalid username or password"
    print(error_message)

# #create a new user
# username = "johndoe"
# user = User.get_user_by_username(username)
# new_user = {
#     "nickname": "Johnaaaaa",
#     "email": "johndoe@example.com",
#     "region": "USA",
#     "age": 25,
#     "gender": "male",
#     "password": "ndn"
# }
# user.update_profile(new_user)

# adding friends 
# friend_username = "meghu"
# current_user_name = "sparky12"
# user = User.get_user_by_username(current_user_name)
# # get friend user object
# friend = User.get_user_by_username(friend_username)
# if not friend:
#     error_message = "User not found"
#     print(error_message)

# # add friend to user's friends list and save to database
# if(friend_username not in  user.friends):
#     user.friends.append(friend_username)
#     user.save()

# client = MongoClient("mongodb://localhost:27017/")
# db = client["sw"]
# collection = db["profile"]

# collection.update_many({}, {'$set': {"gamecollection": ["Pandemic"]}})

# current_user = User.get_user_by_username("sparky12")

# # Get all users that match the search criteria
# query = { "region": "London" }
# users = collection.find(query)

# # Filter users based on common friends with the logged in user
# friends = current_user.friends
# if friends:
#     filtered_users = []
#     for user in users:
#         if user["username"] != "sparky12":
#             if any(friend in user["friends"] for friend in friends):
#                 filtered_users.append(user)
#     users = filtered_users

# # Extract usernames from the user documents
# usernames = []
# for user in users:
#     usernames.append(user["username"])

# print(usernames)




