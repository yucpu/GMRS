"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from backend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('reset', views.reset_password, name='reset_password'),
    path('register', views.add_user, name='add_user'),
    path('login', views.login, name='login'),
    path('updateInfo', views.update_profile, name='update_profile'),
    path('getGame', views.getGame, name="getGame"),
    path('community', views.community, name = "community"),
    path('select_community', views.select_community, name = 'select_community'),
    path('app/Review/post_review', views.post_review, name = 'post_review'),
    path('app/community/get_all_game', views.get_all_game, name = 'get_alL_friend'),
    path('friends', views.get_all_friends, name = "get_all_friends"),
    path('add_friend', views.add_new_friend, name="add_new_friend"),
    path('remove_friend', views.remove_friend,name="remove_friend"),
    path('get_all_game', views.get_all_game, name = 'get_alL_friend'),
    path('get_random_game', views.get_random_game, name = 'get_random_game')

]
