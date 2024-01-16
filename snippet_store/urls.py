from django.contrib import admin
from django.urls import include, path

from onii_auth.views import home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('', include('onii_auth.urls'))
]
