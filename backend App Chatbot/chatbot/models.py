from django.db import models


class Message(models.Model):
    sender = models.CharField(max_length=10)  # "user" or "bot"
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
