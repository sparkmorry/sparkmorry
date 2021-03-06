# coding=utf-8

"""
Django settings for sparkmorry project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""
from django.conf.global_settings import TEMPLATE_CONTEXT_PROCESSORS as TCP

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '#3p#1d44jr3e9#e20bkou$(hhxrqu3b2s3sdccj2l0kz0lxnc9'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = ['sparkmorry.com']


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'article',
    'tag',
    
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'sparkmorry.urls'

WSGI_APPLICATION = 'sparkmorry.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'sparkmorry',  # 你的数据库名称
        'USER': 'root',  # 你的数据库用户名
        'PASSWORD': '',  # 你的数据库密码        
        'HOST': '',  # 你的数据库主机，留空默认为localhost
        'PORT': '3306',  # 你的数据库端口
        # 'OPTIONS': {'charset': 'utf8mb4'},
    }
}

# import sae.const
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': sae.const.MYSQL_DB,
#         'USER': sae.const.MYSQL_USER,
#         'PASSWORD': sae.const.MYSQL_PASS,  # 你的数据库密码
#         'HOST': sae.const.MYSQL_HOST,  # 你的数据库主机，留空默认为localhost
#         'PORT': int(sae.const.MYSQL_PORT),  # 你的数据库端口
#     }
# }

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'zh-Hans'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = True

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(BASE_DIR, 'templates').replace('\\', '/'),
)


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': [['CodeSnippet', ], ],
        'height': 400,
        'width': 900,
        'removePlugins': 'stylesheetparser',
        'extraPlugins': 'codesnippet',
    },
}
STATICFILES_DIRS = (
    ("css", os.path.join(STATIC_ROOT, 'css')),
    ("js", os.path.join(STATIC_ROOT, 'js')),
    ("images", os.path.join(STATIC_ROOT, 'images')),
    ("ckeditor", os.path.join(STATIC_ROOT, 'ckeditor')),

)
