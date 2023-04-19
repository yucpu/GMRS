# views.py
from django.shortcuts import render, redirect
from pymongo import MongoClient
from bson.objectid import ObjectId
from .models import User, Game, Review, Discussion, Guide
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
        password = result.get('newPassword')

        print(password)
        # get user by username and email
        user = User.get_user_by_username(username)
        if user and security:
            # update user's password and save to database
            user.password = password
            user.save()
            response_data = {"error_message": ""}
            return HttpResponse(json.dumps(response_data), content_type='application/json')
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
            'nickname': "" if nickname == None else nickname,
            'username': username,
            'email': email,
            'region': "Earth" if region == None else region,
            'age':  0 if nickname == None else age,
            'gender':  "Undefined" if nickname == None else gender,
            'password': password
        }
        user = User(user_dict)
        user.save()
        
        response_data = {"message": "User created successfully","code":200}
        return HttpResponse(json.dumps(response_data), content_type='application/json')
    else:
        response_data = {"message": "Illegal Request","code":400}
        return HttpResponse(json.dumps(response_data), content_type='application/json')





def login(request):
    print("Login Request Find")
    if request.method == 'POST':
        # retrieve form data
        print("82 ", request.body)
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
            print("return body")
            response_data = {
                "token": "SDF7FQ6F",
                "user": {
                    "userID": user._id,
                    "username": user.username,
                    "nickname": user.nickname,
                    "email": user.email,
                    "region": user.region,
                    "age": user.age,
                    "gender":user.gender,
                    "friends": user.friends,
                    "games": user.gamecollection,
                }
            }
            response = HttpResponse(json.dumps(response_data), content_type='application/json')
            response['Access-Control-Allow-Origin'] = '*'
            response['Access-Control-Allow-Methods'] = 'POST'
            return response
        else:
            # display error message if user not found or password is incorrect
            error_message = "Invalid username or password"
            response_data = {"error_message": error_message}
            print(error_message)
            response = HttpResponse(json.dumps(response_data), content_type='application/json')
            response['Access-Control-Allow-Origin'] = '*'
            response['Access-Control-Allow-Methods'] = 'POST'
            return response
    else:
        response_data = {}
        response = HttpResponse(json.dumps(response_data), content_type='application/json')
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST'
        return response


    

def update_profile(request):
    if request.method == 'POST':
        # retrieve form data
        body = json.loads(request.body.decode('utf-8'))
        user_id = body.get("userID")
        username = body.get('username')
        nickname = body.get('nickname')
        email = body.get('email')
        region = body.get('region')
        age = body.get('age')
        gender = body.get('gender')

        # get user by ID
        user = User.get_user_by_id(user_id)
        # update user's profile and save to database
        profile_dict = {
            'nickname': nickname,
            'email': email,
            'region': region,
            'age': age,
            'gender': gender,

        }
        print(user)
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
        response['Access-Control-Allow-Origin'] = '*'
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
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'GET'
        return response

    
def add_friend(request):
    if request.method == "POST":
        user_id = request.session.get('user_id')
        print("202: ", user_id)
        friend_username = request.POST.get("username")
        user = User.get_user_by_id(user_id)
        friend = User.get_user_by_username(friend_username)
        if friend is not None and friend not in user.friends and user not in friend.friends:
            user.friends.append(friend_username)
            friend.friends.append(user)
            user.save()
            friend.save()

            response_data = {"message": "Friend added successfully"}
        else:
            response_data = {"messafe": "Friend added failed"}

        response = HttpResponse(json.dumps(response_data), content_type='application/json')
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST'

    return response
    # # get current user object
    # user_id = request.session.get('user_id')
    # user = User.get_user_by_username(user_id)
    # friend_username = username
    # # add friend to user's friends list and save to database
    # if friend_username not in user.friends:
    #     user.friends.append(friend_username)
    #     user.save()
    #
    #     # get friend user object
    #     friend = User.get_user_by_username(username)
    #     if not friend:
    #         response_data = {"error_message": "User not found"}
    #         return HttpResponse(json.dumps(response_data), content_type='application/json')
    #
    #     # add user to friend's friends list and save to database
    #     friend.friends.append(user.username)
    #     friend.save()
    #
    #     response_data = {"message": "Friend added successfully"}
    #     response = HttpResponse(json.dumps(response_data), content_type='application/json')
    #     response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    #     response['Access-Control-Allow-Methods'] = 'POST'
    #     return response


def community(request):
    # if request.method == "GET":
    game_names = Game.get_all_game()
    print(game_names)

    response = HttpResponse(json.dumps(game_names, indent=4))
    response['Access-Control-Allow-Origin'] = "*"
    response['Access-Control-Allow-Methods'] = "GET"

    print(response)

    return response

def get_all_game(request):
    game_list = Game.get_all_game()

    response = HttpResponse(json.dumps(game_list, indent=4))
    response['Access-Control-Allow-Origin'] = "*"
    response['Access-Control-Allow-Methods'] = "GET"

    print(json.loads(response.content))
    return response
    


def select_community(request):
    if request.method == "GET":
        game_name = request.GET.get("game_name")
        reviews = Review.get_reviews(game_name)
        discussions = Discussion.get_discussion(game_name)
        guides = Guide.get_guide(game_name)

        community_info = [reviews, discussions, guides]
        response = HttpResponse(json.dumps(community_info, indent=4))
        response['Access-Control-Allow-Origin'] = "*"
        response['Access-Control-Allow-Methods'] = "GET"

    return response

def post_review(request):
    if request.method == "POST":
        result = json.loads(request.body.decode('utf-8'))
        game_name = result.get("game_name")
        username = result.get("username")
        review_title = result.get("review_title")
        review_content = result.get("review_content")
        rating = result.get("rating")
        new_post = {
            "game_name": game_name,
            "username": username,
            "review_title": review_title,
            "review_content": review_content,
            "rating": rating
        }

        post = Review(new_post)
        post_dict = vars(post)
        post_json = json.dumps(post_dict)
        post.save()

        response = HttpResponse(json.dumps(post_json))
        response['Access-Control-Allow-Origin'] = "*"
        response['Access-Control-Allow-Methods'] = "POST"

        return response


def getGame(request):
    if request.method == 'GET':
        game_name = request.GET.get("game_name")
        print("239:", game_name)
        try:
            game_info = Game.get_game(game_name)
            game_info["_id"] = str(game_info["_id"])
            game_info["errorMessage"] = ''
            print("240: ", game_info)

            response = HttpResponse(json.dumps(game_info), content_type='application/json')
            response.write("")
        except(TypeError):
            message = {
                "errorMessage": "No such a game"
            }
            response = HttpResponse(json.dumps(message))

        response['Access-Control-Allow-Origin'] = "*"
        response['Access-Control-Allow-Methods'] = "GET"

    return response

def get_random_game(request):
    game_list = Game.get_all_game()
    random_game_list = (random.choices(game_list, k = 3))

    response = HttpResponse(json.dumps(random_game_list))
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
        response['Access-Control-Allow-Origin'] = '*'
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
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST'
        return response
    else:
        response_data = {}
        response = HttpResponse(json.dumps(response_data), content_type='application/json')
        response['Access-Control-Allow-Origin'] = '*'
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
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST'
        return response

    else:
        response_data = {}
        response = HttpResponse(json.dumps(response_data), content_type='application/json')
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST'
        return response
