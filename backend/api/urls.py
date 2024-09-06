from django.urls import path
from . import views

urlpatterns = [
    path("articles/", views.ArticlesListCreate.as_view(), name="articles-list"),
    path("categories/", views.CategoriesListCreateView.as_view(), name="categories-list"),
    path("articles/delete/<int:pk>/", views.ArticleDelete.as_view(), name="delete-article"),
]