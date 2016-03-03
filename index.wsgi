import sae
from sparkmorry import wsgi

application = sae.create_wsgi_app(wsgi.application)