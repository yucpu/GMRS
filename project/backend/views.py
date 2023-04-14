# views.py
from django.shortcuts import render, redirect
from pymongo import MongoClient
from bson.objectid import ObjectId
from .models import User
from django.views.decorators.csrf import csrf_exempt



def reset_password(request):
    if request.method == 'POST':
        # retrieve form data
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']

        # get user by username and email
        user = User.get_user_by_username(username)
        if user and user.email == email:
            # update user's password and save to database
            user.password = password
            user.save()
            return redirect('login')
        else:
            # display error message if user not found or email does not match
            error_message = "Invalid username or email"
            return render(request, 'Reset.js', {'error_message': error_message})
    else:
        return render(request, 'Reset.js')

def add_user(request):
    if request.method == 'POST':
        # retrieve form data
        nickname = request.POST['nickname']
        username = request.POST['username']
        email = request.POST['email']
        region = request.POST['region']
        age = request.POST['age']
        gender = request.POST['gender']
        password = request.POST['password']

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
        return redirect('login')
    else:
        return render(request, 'Register.js')




@csrf_exempt
def login(request):
    print("inside login")
    print(request)
    if request.method == 'POST':
        # retrieve form data
        username = request.POST['username']
        password = request.POST['password']

        # get user by username
        user = User.get_user_by_username(username)
        if user and user.password == password:
            # set session variable and redirect to home page
            request.session['user_id'] = user._id
            return redirect('home')
        else:
            # display error message if user not found or password is incorrect
            error_message = "Invalid username or password"
            return render(request, 'Login.js', {'error_message': error_message})
    else:
        return render(request, 'Login.js')
# def login(request):
#     print("inside login")
#     if request.method == 'POST':
#         # retrieve query parameters
#         username = request.GET.get('username')
#         password = request.GET.get('password')
#         print("inside get", username, pass)

#         # get user by username
#         user = User.get_user_by_username(username)
#         print(user)
#         if user and user.password == password:
#             # set session variable and redirect to home page
#             request.session['user_id'] = user._id
#             return redirect('home')
#         else:
#             # display error message if user not found or password is incorrect
#             error_message = "Invalid username or password"
#             print(error_message)
#             return render(request, 'Login.js', {'error_message': error_message})
#     else:
#         return render(request, 'Login.js')

def login(request):
    print("inside login")
    print(request)
    if request.method == 'POST':
        # retrieve form data
        username = request.POST['username']
        password = request.POST['password']

        # get user by username
        user = User.get_user_by_username(username)
        if user and user.password == password:
            # set session variable and redirect to home page
            request.session['user_id'] = user._id
            return redirect('home')
        else:
            # display error message if user not found or password is incorrect
            error_message = "Invalid username or password"
            return render(request, 'Login.js', {'error_message': error_message})
    else:
        return render(request, 'Login.js')
    

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

        return redirect('profile')
    else:
        # render profile update form
        user_id = request.session.get('user_id')
        user = User.get_user_by_id(user_id)
        return render(request, 'Profile.js', {'user': user})

    
def add_friend(request, username):
    # get current user object
    user_id = request.session.get('user_id')
    user = User.get_user_by_username(user_id)
    friend_username = username
# add friend to user's friends list and save to database
    if(friend_username not in  user.friends):
        user.friends.append(friend_username)
        user.save()

        # get friend user object
        friend = User.get_user_by_username(username)
        if not friend:
            error_message = "User not found"
            return render(request, 'add_friend.html', {'error_message': error_message})

        # add friend to user's friends list and save to database
        user.friends.append(friend)
        user.save()

        return redirect('home')
    
def get_friends(request):
    # get current user object
    user_id = request.session.get('user_id')
    user = User.get_user_by_username(user_id)

    # get list of friends for user
    friends = user.friends

    return render(request, 'Friends.js', {'friends': friends})

