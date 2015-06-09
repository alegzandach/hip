from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers
from stent import views
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'airways', views.AirwayViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
]

if settings.DEBUG:
    urlpatterns.append(url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT,
    }))
    
