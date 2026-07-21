# Manual de Uso de Tacurium (Django + XAMPP)

Este manual contiene las instrucciones paso a paso para ejecutar, navegar y administrar la aplicación web de **Tacurium** migrada a Django, utilizando el servidor de base de datos MySQL de XAMPP.

---

## 1. Requisitos Previos

Antes de arrancar la aplicación, asegúrate de:
1. Abrir el panel de control de **XAMPP**.
2. Iniciar el servicio de **MySQL** (asegúrate de que esté escuchando en el puerto `3310`, como estaba configurado originalmente en el archivo `.env` de tu Laravel).
3. Asegúrate de que el puerto esté activo para permitir conexiones.

---

## 2. Cómo iniciar el Servidor de Desarrollo

1. **Abre una terminal** en la raíz de tu proyecto en VS Code.
2. **Navega al directorio de Django:**
   ```powershell
   cd tacurium_django
   ```
3. **Activa el entorno virtual (`venv`):**
   *Nota: Dado que configuramos el editor, VS Code suele activar la "burbuja" del entorno virtual automáticamente cuando abres una terminal. Si no es así, puedes ejecutar:*
   - **En Windows (PowerShell):**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **En Windows (CMD):**
     ```cmd
     venv\Scripts\activate
     ```
4. **Inicia el servidor de Django:**
   ```powershell
   python manage.py runserver
   ```

El servidor estará disponible en la dirección: **`http://127.0.0.1:8000/`**

---

## 3. Cuentas de Acceso (Credenciales)

La base de datos MySQL en phpMyAdmin ya ha sido migrada y sembrada con los datos de prueba. Puedes usar la siguiente cuenta para probar las funciones de usuario y administración:

* **Usuario Administrador (Admin):**
  - **Correo:** `tacuri@gmail.com`
  - **Usuario:** `tacuri`
  - **Contraseña:** `12345678`
  - **Rol:** `admin`

---

## 4. Estructura y Funcionamiento de la Base de Datos

* **Motor de Base de Datos:** Usamos MySQL gestionado a través de **XAMPP / phpMyAdmin**.
* **Base de Datos:** Se ha creado y sincronizado en el esquema `tacurium_django`.
* **Visualización:** Puedes abrir phpMyAdmin en tu navegador (`http://localhost/phpmyadmin/` o el puerto que tengas para Apache) para ver las tablas creadas, tales como `productos`, `users`, etc.

---

## 5. Panel de Gestión de Productos (CRUD Custom)

Si estás autenticado como administrador, puedes acceder al panel de productos desde tu perfil o ingresando a:
**`http://127.0.0.1:8000/listaproductos/`**

Este panel te permite realizar las siguientes acciones siguiendo las reglas del laboratorio:

1. **Listar y Buscar:**
   - Verás la tabla con todos los productos cuya baja lógica esté activa (`estado = True`).
   - Usa la barra de búsqueda para filtrar productos. El buscador buscará coincidencias en la descripción del producto o el nombre (`Q(descripcion__icontains=buscar)`).
2. **Agregar Producto:**
   - En la parte superior verás el formulario de crispy forms. Rellena los datos (nombre, precio, stock, imagen, etc.) y haz clic en **Guardar Producto**.
3. **Editar Producto:**
   - Haz clic en **"Editar"** en la fila del producto correspondiente.
   - Te llevará a una vista dedicada (`/productos/editar/<id>/`) con los datos cargados mediante `ModelForm`. Realiza los cambios y pulsa **Actualizar Producto** para guardarlos.
4. **Eliminar Producto (Baja Lógica / Soft Delete):**
   - Haz clic en **"Eliminar"**.
   - Aparecerá una ventana modal de **SweetAlert2** (`Swal.fire`) solicitándote confirmar la acción.
   - Si confirmas, el sistema llamará al endpoint de eliminación, cambiará el campo `estado` a `False` en la base de datos (para no borrar físicamente el registro) y el producto desaparecerá de la tienda y de la tabla de administración.
