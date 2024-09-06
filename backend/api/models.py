from django.db import models
from django.contrib.auth.models import User

# Modelo Category
class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

# Modelo Article
class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    publication_date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="articles")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='articles')

    def __str__(self):
        return self.title