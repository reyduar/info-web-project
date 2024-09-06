from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Article, Category


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}} # password is not return de password to the user in the response

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
    class Meta:
        model = Article
        fields = ["id", "title", "content", "publication_date", "author", "category"]
        extra_kwargs = {"author": {"read_only": True}}  # author is not return de author to the user in the response

    # Si quieres permitir crear o actualizar artículos con una categoría existente
    def create(self, validated_data):
        category_data = validated_data.pop('category')
        category = Category.objects.get(**category_data)
        article = Article.objects.create(category=category **validated_data)
        return article

    def update(self, instance, validated_data):
        category_data = validated_data.pop('category')
        category = Category.objects.get(**category_data)
        instance.category = category
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.publication_date = validated_data.get('publication_date', instance.publication_date)
        instance.save()
        return instance