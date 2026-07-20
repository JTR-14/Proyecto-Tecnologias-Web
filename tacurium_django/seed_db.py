import os
import django
import sys
import re

# Add the project directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tacurium.settings')
django.setup()

from productos.models import Producto, User

def seed():
    # 1. Parse ProductSeeder.php
    seeder_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'database', 'seeders', 'ProductSeeder.php')
    if not os.path.exists(seeder_path):
        print(f"ProductSeeder.php not found at {seeder_path}!")
        return

    with open(seeder_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all Product::create([ ... ]) calls
    pattern = re.compile(r'Product::create\(\[\s*(.*?)\s*\]\);', re.DOTALL)
    matches = pattern.findall(content)

    print(f"Found {len(matches)} products to seed.")

    for m in matches:
        lines = m.split('\n')
        fields = {}
        for line in lines:
            line = line.strip()
            if not line or '=>' not in line:
                continue
            
            parts = line.split('=>', 1)
            key = parts[0].strip().strip("'").strip('"')
            val = parts[1].strip()
            
            # Remove trailing comma if exists
            if val.endswith(','):
                val = val[:-1].strip()
                
            # Strip surrounding quotes if string
            if (val.startswith("'") and val.endswith("'")) or (val.startswith('"') and val.endswith('"')):
                val = val[1:-1]
                
            fields[key] = val

        if not fields:
            continue

        # Convert price and stock
        try:
            precio = float(fields.get('precio', 0.0))
        except ValueError:
            precio = 0.0
        
        try:
            stock = int(fields.get('stock', 0))
        except ValueError:
            stock = 0

        # Create the product
        producto, created = Producto.objects.get_or_create(
            nombre=fields.get('nombre'),
            defaults={
                'categoria': fields.get('categoria'),
                'descripcion': fields.get('descripcion'),
                'precio': precio,
                'stock': stock,
                'imagen': fields.get('imagen'),
                'estado': True
            }
        )
        if created:
            print(f"Created product: {producto.nombre}")
        else:
            print(f"Product already exists: {producto.nombre}")

    # 2. Create Admin User
    admin_email = 'tacuri@gmail.com'
    admin_username = 'tacuri'
    if not User.objects.filter(email=admin_email).exists():
        admin_user = User.objects.create_superuser(
            username=admin_username,
            email=admin_email,
            password='12345678',
            name='Tacuri',
            first_name='Tacuri',
            role='admin',
            estado=True
        )
        print("Admin user 'Tacuri' created successfully.")
    else:
        print("Admin user 'Tacuri' already exists.")

if __name__ == '__main__':
    seed()
