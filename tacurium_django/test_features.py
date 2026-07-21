import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tacurium.settings')
django.setup()

from django.db import connection
features = connection.features
attrs = [attr for attr in dir(features) if 'return' in attr.lower() or 'insert' in attr.lower()]
print("Features:", attrs)
for attr in attrs:
    try:
        print(f"{attr}: {getattr(features, attr)}")
    except Exception as e:
        print(f"{attr}: Error: {e}")
