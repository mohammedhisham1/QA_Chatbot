from django.urls import path
from .views import ChatbotAPI

urlpatterns = [
    path('chat/', ChatbotAPI, name='chatbot_api'),
]
