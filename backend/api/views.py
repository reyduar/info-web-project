from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .serializers import UserSerializer, ArticleSerializer, CategorySerializer, AuthorSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Article, Category, Author


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CategoriesListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class AuthorsListCreateView(generics.ListCreateAPIView):
    serializer_class = AuthorSerializer
    permission_classes = [IsAuthenticated]
    queryset = Author.objects.all()

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
        title = self.kwargs.get('title')
        if title == "all":
            return Article.objects.filter(created_by=user, active=True)
        else:
            return Article.objects.filter(title__contains=title, created_by=user, active=True)
        
    # def list(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        user = self.request.user
        print(serializer)
        if serializer.is_valid():
            serializer.save(created_by=user)
        else:
            print(serializer.errors)

class ArticleDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        slug = self.kwargs['slug']
        user = self.request.user
        return Article.objects.get(slug=slug, created_by=user, active=True)


class ArticleDelete(generics.DestroyAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Article.objects.filter(created_by=user)
    

class AuthorDelete(generics.DestroyAPIView):
    serializer_class = AuthorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Author.objects.filter()
    

class CategoryDelete(generics.DestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter()
