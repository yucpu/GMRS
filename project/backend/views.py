# views.py
from django.shortcuts import render, redirect
from pymongo import MongoClient
from bson.objectid import ObjectId
from .models import User
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from django.http import HttpResponse



import json
from django.http import HttpResponse, HttpResponseRedirect

def reset_password(request):
    if request.method == 'POST':
        # retrieve form data
        print(request.body)
        result = json.loads(request.body.decode('utf-8'))
        username = result.get('username')
        security = result.get('security')
        password = result.get('password')

        # get user by username and email
        user = User.get_user_by_username(username)
        if user and security:
            # update user's password and save to database
            user.password = password
            user.save()
            return HttpResponseRedirect(json.dumps(response_data), content_type='application/json')
        else:
            # display error message if user not found or email does not match
            error_message = "Invalid username or email"
            response_data = {"error_message": error_message}
            return HttpResponse(json.dumps(response_data), content_type='application/json')
    else:
        response_data = {}
        return HttpResponse(json.dumps(response_data), content_type='application/json')


def add_user(request):
    if request.method == 'POST':
        # retrieve form data
        print(request.body)
        result = json.loads(request.body.decode('utf-8'))
        nickname = result.get('nickname')
        username = result.get('username')
        email = result.get('email')
        region = result.get('region')
        age = result.get('age')
        gender = result.get('gender')
        password = result.get('password')

        # create new user object and save to database
        user_dict = {
            'nickname': nickname,
            'username': username,
            'email': email,
            'region': region,
            'age': age,
            'gender': gender,
            'password': password
        }
        user = User(user_dict)
        user.save()

        response_data = {"message": "User created successfully"}
        return HttpResponse(json.dumps(response_data), content_type='application/json')
    else:
        response_data = {}
        return HttpResponse(json.dumps(response_data), content_type='application/json')





def login(request):
    if request.method == 'POST':
        # retrieve form data
        print(request.body)
        result = json.loads(request.body.decode('utf-8'))
        username = result.get('account')
        password = result.get('password')
        print(username)
        print(password)

        # get user by username
        user = User.get_user_by_username(username)
        print(user.password)
        print(user.username)
        if user and user.password == password:
            # set session variable and return response
            request.session['user_id'] = user._id
            print("retunting body")
            response_data = {
                "token": "SDF7FQ6F",
                "user": {
                    "userID": user._id,
                    "username": user.username,
                    "nickname": user.nickname,
                    "email": user.email,
                    "region": user.region,
                    "age": user.age,
                    "gender": user.gender,
                    "friends": user.friends,
                    "games": user.gamecollection,
                }
            }
            response = HttpResponse(json.dumps(response_data), content_type='application/json')
            response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
            response['Access-Control-Allow-Methods'] = 'POST'
            return response
        else:
            # display error message if user not found or password is incorrect
            error_message = "Invalid username or password"
            response_data = {"error_message": error_message}
            print(error_message)
            response = HttpResponse(json.dumps(response_data), content_type='application/json')
            response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
            response['Access-Control-Allow-Methods'] = 'POST'
            return response
    else:
        response_data = {}
        response = HttpResponse(json.dumps(response_data), content_type='application/json')
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'POST'
        return response


    

def update_profile(request):
    if request.method == 'POST':
        # retrieve form data
        user_id = request.session.get('user_id')
        nickname = request.POST.get('nickname')
        email = request.POST.get('email')
        region = request.POST.get('region')
        age = request.POST.get('age')
        gender = request.POST.get('gender')

        # get user by ID
        user = User.get_user_by_username(user_id)

        # update user's profile and save to database
        profile_dict = {
            'nickname': nickname,
            'email': email,
            'region': region,
            'age': age,
            'gender': gender
        }
        user.update_profile(profile_dict)

        response_data = {
            "message": "Profile updated successfully",
            "user": {
                "userID": user._id,
                "username": user.username,
                "nickname": user.nickname,
                "email": user.email,
                "region": user.region,
                "age": user.age,
                "gender": user.gender,
                "friends": user.friends,
                "games": user.gamecollection,
            }
        }
        response = HttpResponse(json.dumps(response_data), content_type='application/json')
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'POST'
        return response
    else:
        # render profile update form
        user_id = request.session.get('user_id')
        user = User.get_user_by_id(user_id)
        response_data = {
            "user": {
                "userID": user._id,
                "username": user.username,
                "nickname": user.nickname,
                "email": user.email,
                "region": user.region,
                "age": user.age,
                "gender": user.gender,
                "friends": user.friends,
                "games": user.gamecollection,
            }
        }
        response = HttpResponse(json.dumps(response_data), content_type='application/json')
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET'
        return response

    
def add_friend(request, username):
    # get current user object
    user_id = request.session.get('user_id')
    user = User.get_user_by_username(user_id)
    friend_username = username
    # add friend to user's friends list and save to database
    if friend_username not in user.friends:
        user.friends.append(friend_username)
        user.save()

        # get friend user object
        friend = User.get_user_by_username(username)
        if not friend:
            response_data = {"error_message": "User not found"}
            return HttpResponse(json.dumps(response_data), content_type='application/json')

        # add user to friend's friends list and save to database
        friend.friends.append(user.username)
        friend.save()

        response_data = {"message": "Friend added successfully"}
        response = HttpResponse(json.dumps(response_data), content_type='application/json')
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'POST'
        return response
    
def get_friends(request):
    if request.method == 'GET':
        # get current user object
        user_id = request.session.get('user_id')
        user = User.get_user_by_username(user_id)

        # get list of friends for user
        friends = user.friends

        response_data = {
            "friends": friends,
        }
        response = HttpResponse(json.dumps(response_data), content_type='application/json')
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET'
        return response


def add_game(request):
    if request.method == "POST":
        game = request.POST.get('game')
        username = request.session.get('username')
        if username:
            user = User.get_user_by_username(username)
            if game not in user.gamecollection:
                user.gamecollection.append(game)
                user.save()
                response_data = {
                    "message": "Game added successfully",
                }
                status_code = 200
            else:
                response_data = {
                    "error_message": "Game already exists in your collection",
                }
                status_code = 400
        else:
            response_data = {
                "error_message": "You need to login first",
            }
            status_code = 401
        response = HttpResponse(json.dumps(response_data), content_type='application/json', status=status_code)
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'POST'
        return response
    else:
        response_data = {}
        response = HttpResponse(json.dumps(response_data), content_type='application/json')
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET'
        return response
    

def search_friends(request):
    if request.method == 'POST':
        # retrieve form data
        result = json.loads(request.body.decode('utf-8'))
        region = result.get('region')
        game = result.get('game')
        username = result.get('username')

        # Get the user object of the logged in user
        current_user = User.get_user_by_username(result.get('username'))

        # Get all users that match the search criteria
        users = []
        if region:
            users += User.objects.filter(region=region)
        if game:
            users += User.objects.filter(gamecollection__contains=game)
        if username:
            users += User.objects.filter(username__contains=username)

        # Filter users based on common friends with the logged in user
        friends = current_user.friends
        if friends:
            filtered_users = []
            for user in users:
                if user.username != current_user.username:
                    if any(friend in user.friends for friend in friends):
                        filtered_users.append(user)
            users = filtered_users

        # Create response data
        response_data = {
            "users": [
                {
                    "userID": user._id,
                    "username": user.username,
                    "nickname": user.nickname,
                    "email": user.email,
                    "region": user.region,
                    "age": user.age,
                    "gender": user.gender,
                    "friends": user.friends,
                    "games": user.gamecollection,
                }
                for user in users
            ]
        }

        # Return response
        response = HttpResponse(json.dumps(response_data), content_type='application/json')
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'POST'
        return response

    else:
        response_data = {}
        response = HttpResponse(json.dumps(response_data), content_type='application/json')
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'POST'
        return response
