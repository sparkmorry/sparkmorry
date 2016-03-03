import sae
from windcity import wsgi

application = sae.create_wsgi_app(wsgi.application)