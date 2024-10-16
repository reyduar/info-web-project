# Info Web

Info web project es un proyecto donde implementamos un frontend con React + Tailwind CSS y un backend con Django + PostgresSQL

### Pasos ejecutar el Backend

1. Instalar PostgreSQL, crear un base con un usuario y contraseña
2. Usar el archivo .env.template como base para un arhivo .env en la carpeta backend
   DB_HOST=[nombre_maquina_localhost]
   DB_PORT=[puerto_correr_postgres_5432]
   DB_USER=[usuario_base_datos]
   DB_NAME=[nombre_base_datos]
   DB_PWD=[password_base_datos]
3. Crear el entorno virtual, en caso de no tener uno, correr el siguiente commando en el directorio principal del proyecto:

```bash
python -m venv envs
```

4. Activar el entorno virtual

En Windows:

```bash
cd envs
```

```bash
Scripts\activate
```

En Mac:

```bash
source ./envs/bin/activate
```

5. Instalar librerias de python, solo la primera vez;

Ir al directorio:

```bash
cd backend
```

Ejecutamos:

```bash
pip install -r requirements.txt
```

6. Migracion del modelo a la base de datos:

```bash
python manage.py makemigrations
```

Para actualizar la base de datos

```bash
python manage.py migrate
```

7. Correr la API localmente

```bash
python manage.py runserver
```

### Pasos ejecutar Frontend

1. Instalar Node.js (Version 18)
   - [win-x64](https://nodejs.org/download/release/latest-v18.x/win-x64/)
   - [win-x82](https://nodejs.org/download/release/latest-v18.x/win-x86/)
2. Ir a la carpeta de frontend:

```bash
cd frontend
```

3. Instalar dependencias

```bash
npm install
```

4. Correr la app de react

```bash
npm start
```

---

## Como fue creado este proyecto

### Autor

- Ariel Duarte

1. _Creamos el entorno (envs) Django, para eso vamos a crear una carpeta donde tengamos todo el entorno junto con el proyecto:_

```bash
 mkdir info-web-project
```

2. _Crear el entorno virtual_

```bash
cd info-web-project
```

```bash
python -m venv envs
```

> Nota: Si clonamos el proyecto por primera vez tenemos que instalar las librerias que se usan en el proyecto

```bash
pip freeze > requirements.txt
```

```bash
pip install -r requirements.txt
```

3. _Activamos el entorno virtual_

- Para Mac:

```bash
source ./envs/bin/activate
```

- Para Windows:

```bash
cd envs
```

```bash
Scripts\activate
```

> Nota: algo importate en Visual Studio Code para que el entorno virtual reconozca nuestras libreria es seleccionar el interprete en la IDE

- Entramos en VSCode
- Presionamos CTRL + Shift
- Ingresamos Python: Select Interpreter
- Seleccionamos Enter interpreter path
- Ponemos el path de nuestro envs -> /envs/Scripts/python.exe

con esto no deberiamos tener problema como; No se ha podido resolver la importación "dotenv"

4. _Ahora con el entorno virtual activado, creamos el proyecto django_

```bash
django-admin startproject backend
```

Vamos dentro del proyecto donde se encuentra nuestro manage.py

```bash
cd backend
```

creamos nuestro modulo api:

```bash
python manage.py startapp api
```

en este caso hacemos todo lo relacionado a la rest api aqui

cuando tenemos nuestro serializar, model y view deberiamos de hacer un:

```bash
python manage.py makemigrations
```

Para actualizar la base de datos

```bash
python manage.py migrate
```

5. _Ya tenemos el proyecto creado y entramos en esa carpeta y corremos el runserver para probar que todo funcione normalmente:_

```bash
cd backend
```

```bash
python manage.py runserver
```

- Endpoint para crear usuario

```bash
http://127.0.0.1:8000/api/user/register/
```

- Endpoint para pedir token (se necesita el usuario y password)

```bash
http://127.0.0.1:8000/api/token/
```

- Endpoint para refrescar el token (se necesita el refresh token)

```bash
http://127.0.0.1:8000/api/token/refresh/
```

6. _Creamos el proyecto de react_

Vamos crear el proyecto de React de la forma clasica con el npx create-react-app donde frontend es el nombre que le ponemos al proyecto

```bash
npx create-react-app frontend
```

Si está desactualizado alguna librería va a pedir ? Need to install the following packages: (y): y

> Si clonamos el proyecto no necesitamos hacer el create react app lo que vamos hacer para levatar de forma local nuestro entorno de react es:

```bash
cd frontend
```

```bash
npm install
```

```bash
npm start
```

> entonces vamos a la URL: [http://localhost:3000/](http://localhost:3000/) ya debemos ver la página de presentación de react:

_Base de datos de produccion_
PostgreSQL alojada en https://console.choreo.dev/

Las variables para el archivo de .env

DB_HOST=
DB_PORT=
DB_USER=
DB_NAME=
DB_PWD=

```bash
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv("DB_NAME"),
        'USER': os.getenv("DB_USER"),
        'PASSWORD': os.getenv("DB_PWD"),
        'HOST': os.getenv("DB_HOST"),
        'PORT': os.getenv("DB_PORT"),

    }
}
```

al configurar una nueva base hay que correr el comando;

```bash
python manage.py migrate
```
