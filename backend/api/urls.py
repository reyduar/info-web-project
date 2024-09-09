from django.urls import path
from . import views

urlpatterns = [
    path("articles/", views.ArticlesListCreate.as_view(), name="articles-list-no-title"),
    path("articles/<str:title>/", views.ArticlesListCreate.as_view(), name="articles-list-by-title"),
    path("articles/article-detail/<slug>/", views.ArticleDetailAPIView.as_view(), name="article-detail"),
    path("articles/delete/<int:pk>/", views.ArticleDelete.as_view(), name="delete-article"),
    path("categories/", views.CategoriesListCreateView.as_view(), name="categories-list"),
    path("categories/delete/<int:pk>/", views.ArticleDelete.as_view(), name="delete-category"),
    path("authors/", views.AuthorsListCreateView.as_view(), name="authors-list"),
    path("authors/delete/<int:pk>/", views.ArticleDelete.as_view(), name="delete-author"),
]