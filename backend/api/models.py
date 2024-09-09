from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User

# Modelo Category
class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
    
    # def articles(self):
    #     return Article.objects.filter(category=self)

# Modelo Author
class Author(models.Model):
    full_name = models.CharField(max_length=100)
    imageUrl = models.URLField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    twitter = models.CharField(max_length=100)
    bio = models.TextField()

    def __str__(self):
        return self.full_name
    
    # def articles(self):
    #     return Article.objects.filter(author=self)
    
# Modelo Article
class Article(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    publication_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="articles")
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name="articles")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='articles')
    active = models.BooleanField(default=True)


    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        self.active = True
        super(Article, self).save(*args, **kwargs)
    
