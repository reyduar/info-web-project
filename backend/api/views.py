from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ArticleSerializer, CategorySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Article, Category


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CategoriesListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class ArticlesListCreate(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Article.objects.filter(author=user)

    def perform_create(self, serializer):
        user = self.request.user
        print(serializer)
        if serializer.is_valid():
            serializer.save(author=user)
        else:
            print(serializer.errors)


class ArticleDelete(generics.DestroyAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Article.objects.filter(author=user)
