from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Article, Category


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
        fields = ["id", "name", "description"]

    def create(self, validated_data):
        category = Category.objects.create(**validated_data)
        return category


class ArticleSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    author_name = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Article
        fields = ["id", "title", "content",
                  "publication_date", "author", "category", 'category_name', 'author_name']
        # author is not return de author to the user in the response
        extra_kwargs = {"author": {"read_only": True}}

    # Si quieres permitir crear o actualizar artículos con una categoría existente
    def create(self, validated_data):
        article = Article.objects.create(**validated_data)
        return article

