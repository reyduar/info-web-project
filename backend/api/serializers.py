from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Article, Category, Author


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        # password is not return de password to the user in the response
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

    def create(self, validated_data):
        category = Category.objects.create(**validated_data)
        return category

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"

    def create(self, validated_data):
        author = Author.objects.create(**validated_data)
        return author

class ArticleSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    created_by = serializers.CharField(source='created_by.username', read_only=True)
    author_name = serializers.CharField(source='author.full_name', read_only=True)
    class Meta:
        model = Article
        fields = ["id", "title", "slug", "content",
                  "publication_date", "created_by", "author", "category", 'category_name', 'author_name', 'created_by', "active"]
        # author is not return de author to the user in the response
        extra_kwargs = {"created_by": {"read_only": True}}

    # Si quieres permitir crear o actualizar artículos con una categoría existente
    def create(self, validated_data):
        article = Article.objects.create(**validated_data)
        return article

