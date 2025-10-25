# 🚀 Sistema de Gestión de Empleados

Sistema web completo desarrollado con **Spring Boot** y **PostgreSQL** que implementa:
- ✅ **Sistema de login** con autenticación
- ✅ **CRUD completo de empleados**
- ✅ **Arquitectura en capas** (MVC)
- ✅ **Comunicación con Axios**

---

## 📋 Requisitos Previos

Antes de instalar y ejecutar el proyecto, asegúrate de tener:

- ✅ **Java JDK 17+** [(Descargar)](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- ✅ **PostgreSQL 15+** [(Descargar)](https://www.postgresql.org/download/)
- ✅ **Maven 3.6+** (incluido en el proyecto)
- ✅ **Navegador web moderno** (Chrome, Firefox, Edge, etc.)

---

## 🗄️ Configuración de la Base de Datos

### 1. Crear la base de datos PostgreSQL

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE lab05_db;

# Salir de psql
\q
```

### 2. Ejecutar el script SQL

```bash
# Desde la raíz del proyecto
psql -U postgres -d lab05_db -f Java-mvc-capas-axios/db.sql
```

Esto creará:
- ✅ Tabla `departamentos` (4 registros)
- ✅ Tabla `usuarios` (2 usuarios de prueba)
- ✅ Tabla `empleados` (20 empleados de ejemplo)

### 3. Verificar la conexión

Edita el archivo `Java-mvc-capas-axios/src/main/resources/application.properties`:

```properties
# Configuración de PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/lab05_db
spring.datasource.username=postgres
spring.datasource.password=TU_CONTRASEÑA_AQUI
```

---

## 🚀 Ejecución del Proyecto

### Opción 1: Ejecutar con Maven

```bash
# Navegar al directorio del proyecto
cd Java-mvc-capas-axios

# Compilar y ejecutar
mvn clean install
mvn spring-boot:run
```

### Opción 2: Ejecutar desde tu IDE

1. Abre el proyecto en **IntelliJ IDEA**, **Eclipse** o **VS Code**
2. Localiza `JavaMvcCapasAxiosApplication.java`
3. Haz clic derecho → **Run**

### Verificar que esté funcionando

- 🌐 **Backend**: http://localhost:8080
- 🔐 **Login**: http://localhost:8080/frontend/login.html
- 👥 **Empleados**: http://localhost:8080/frontend/empleados.html

---

## 🔐 Credenciales de Acceso

| Usuario | Contraseña | Descripción |
|---------|-----------|-------------|
| `jorge` | `1234` | Usuario de prueba |
| `max`   | `1234` | Usuario de prueba |

---

## 📁 Estructura del Proyecto

```
java-mvc-capas-axios/
├── 📂 frontend/                    # Interfaz web
│   ├── login.html                  # Página de login
│   ├── empleados.html              # CRUD de empleados
│   ├── index.html                  # CRUD de productos
│   ├── styles.css                  # Estilos CSS
│   ├── login.js                    # Lógica de autenticación
│   ├── empleados.js                # Lógica CRUD empleados
│   └── app.js                      # Lógica CRUD productos
│
├── 📂 Java-mvc-capas-axios/        # Backend Spring Boot
│   ├── 📂 src/main/java/
│   │   └── com/example/app/
│   │       ├── 📂 common/          # Configuración y excepciones
│   │       ├── 📂 empleado/        # Módulo de empleados
│   │       ├── 📂 producto/        # Módulo de productos
│   │       ├── 📂 usuario/         # Módulo de autenticación
│   │       └── JavaMvcCapasAxiosApplication.java
│   │
│   ├── 📂 src/main/resources/
│   │   └── application.properties  # Configuración
│   │
│   ├── 📂 src/test/                # Pruebas unitarias
│   ├── db.sql                      # Script de base de datos
│   └── pom.xml                     # Dependencias Maven
│
├── 📂 .documentation/               # Documentación
│   └── script.txt                  # Script SQL original
│
└── README.md                        # Este archivo
```

---

## 🏗️ Arquitectura del Proyecto

### Backend (Spring Boot)

```
📦 Arquitectura en Capas:

1️⃣ Controller (REST API)
   └── Recibe peticiones HTTP
       ├── ProductoController
       ├── EmpleadoController
       └── AuthController

2️⃣ Service (Lógica de Negocio)
   └── Implementa reglas de negocio
       ├── ProductoService
       ├── EmpleadoService
       └── AuthService

3️⃣ Repository (Persistencia)
   └── Acceso a base de datos
       ├── ProductoRepository
       ├── EmpleadoRepository
       └── UsuarioRepository

4️⃣ Entity/DTO
   └── Modelos de datos
       ├── Producto.java
       ├── Empleado.java
       └── Usuario.java
```

### Frontend (HTML/CSS/JavaScript)

```
📦 Tecnologías:
   ├── HTML5
   ├── CSS3 (Responsive Design)
   ├── JavaScript ES6+
   └── Axios (HTTP Client)
```

---

## 🌐 Endpoints API

### Autenticación
```
POST /api/auth/login
Body: { "usuario": "jorge", "clave": "1234" }
```

### Empleados
```
GET    /api/empleados           # Listar todos
GET    /api/empleados/{id}      # Obtener por ID
POST   /api/empleados           # Crear empleado
PUT    /api/empleados/{id}      # Actualizar empleado
DELETE /api/empleados/{id}      # Eliminar empleado
GET    /api/empleados/buscar/nombre?nombre=... # Buscar por nombre
```

### Productos
```
GET    /api/productos           # Listar todos
GET    /api/productos/{id}      # Obtener por ID
POST   /api/productos           # Crear producto
PUT    /api/productos/{id}      # Actualizar producto
DELETE /api/productos/{id}      # Eliminar producto
GET    /api/productos/buscar?nombre=... # Buscar por nombre
```

---

## 🧪 Funcionalidades Implementadas

### ✅ Sistema de Login
- [x] Validación de credenciales contra base de datos
- [x] Generación de tokens
- [x] Redirección automática
- [x] Manejo de errores

### ✅ CRUD de Empleados
- [x] Crear empleado
- [x] Listar empleados
- [x] Editar empleado
- [x] Eliminar empleado
- [x] Buscar por nombre
- [x] Validaciones frontend y backend

### ✅ CRUD de Productos
- [x] Crear producto
- [x] Listar productos
- [x] Editar producto
- [x] Eliminar producto
- [x] Buscar por nombre
- [x] Gestión de inventario

---

## 🔧 Tecnologías Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**

### Frontend
- **HTML5**
- **CSS3** (Responsive Design)
- **JavaScript ES6+**
- **Axios** (HTTP Client)

---

## 📝 Notas Importantes

### Base de Datos
- El script `db.sql` crea las tablas con datos de ejemplo
- Si las tablas ya existen, solo insertará los datos
- Usuarios de prueba: `jorge/1234` y `max/1234`

### Seguridad
- ⚠️ Contraseñas en texto plano (solo para desarrollo)
- ⚠️ Tokens simples (implementar JWT en producción)
- ⚠️ CORS habilitado para todos los orígenes (configurar en producción)

### Producción
Para desplegar en producción:
- ✅ Usar variables de entorno para credenciales
- ✅ Implementar JWT para autenticación
- ✅ Usar HTTPS
- ✅ Configurar CORS específico
- ✅ Implementar hash de contraseñas (BCrypt)

---

## 🐛 Solución de Problemas

### Error: "Connection refused"
- Verifica que PostgreSQL esté ejecutándose
- Comprueba las credenciales en `application.properties`

### Error: "Table already exists"
- Las tablas ya fueron creadas
- Los datos se insertarán correctamente

### Error: "Port 8080 already in use"
- Detén otros servicios en el puerto 8080
- O cambia el puerto en `application.properties`

---

## 📧 Soporte

Para más información o ayuda, contacta al equipo de desarrollo.

---

## 📄 Licencia

Este proyecto es parte de un laboratorio académico.

---

**Desarrollado con ❤️ usando Spring Boot y PostgreSQL**
