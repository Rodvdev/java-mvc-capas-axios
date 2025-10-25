# 🧩 Laboratorio N°05 – "Despliegue"
### Curso: Diseño de Software  
### Universidad de Ingeniería y Tecnología (UTEC)

---

## 📖 Descripción del Proyecto
Este proyecto consiste en una **aplicación web desarrollada con Spring Boot y PostgreSQL** que implementa:

1. Un **sistema de login** con autenticación de usuarios.
2. Un **CRUD completo de empleados** (Crear, Leer, Actualizar y Eliminar registros).
3. Un **CRUD completo de productos** con gestión de inventario.
4. Una **arquitectura en capas**, siguiendo el modelo MVC.
5. Comunicación entre frontend y backend mediante **Axios**.

El objetivo es demostrar el conocimiento en **autenticación y operaciones CRUD** utilizando una base de datos relacional y buenas prácticas de desarrollo.

---

## ⚙️ Tecnologías Utilizadas
- **Java 17 / Spring Boot 3.2.0**
- **PostgreSQL 15**
- **Axios (para consumo de API)**
- **HTML / CSS / JavaScript**
- **Spring Data JPA / Hibernate**
- **Lombok (para reducir código boilerplate)**
- **Bruno API Client** (para pruebas de endpoints)
- **Maven** (gestión de dependencias)

---

## 🧱 Arquitectura del Proyecto
La aplicación sigue la **arquitectura en capas**, compuesta por:

```
src/
├─ main/
│  ├─ java/com/example/app/
│  │  ├─ common/
│  │  │  ├─ config/          → Configuración (CORS, etc.)
│  │  │  ├─ controller/      → Controladores comunes
│  │  │  └─ exception/       → Manejo de excepciones globales
│  │  ├─ empleado/           → Módulo de empleados
│  │  │  ├─ Empleado.java    → Entidad
│  │  │  ├─ EmpleadoController.java → Controlador REST
│  │  │  ├─ EmpleadoDTO.java → Data Transfer Object
│  │  │  ├─ EmpleadoRepository.java → Repositorio JPA
│  │  │  └─ EmpleadoService.java → Lógica de negocio
│  │  ├─ producto/           → Módulo de productos
│  │  │  ├─ Producto.java    → Entidad
│  │  │  ├─ ProductoController.java → Controlador REST
│  │  │  ├─ ProductoDTO.java → Data Transfer Object
│  │  │  ├─ ProductoRepository.java → Repositorio JPA
│  │  │  └─ ProductoService.java → Lógica de negocio
│  │  ├─ usuario/            → Módulo de autenticación
│  │  │  ├─ Usuario.java     → Entidad
│  │  │  ├─ AuthController.java → Controlador de autenticación
│  │  │  ├─ AuthService.java → Servicio de autenticación
│  │  │  ├─ LoginDTO.java    → DTO para login
│  │  │  ├─ AuthResponseDTO.java → DTO para respuesta
│  │  │  └─ UsuarioRepository.java → Repositorio JPA
│  │  └─ JavaMvcCapasAxiosApplication.java → Clase principal
│  ├─ resources/
│  │  └─ application.properties → Configuración de la aplicación
├─ test/
│  └─ java/com/example/app/  → Pruebas unitarias
└─ ds-lab-05/                → Pruebas de API con Bruno
    ├─ bruno.json
    ├─ GET.bru
    ├─ POST.bru
    ├─ PUT.bru
    └─ DELETE.bru
```

---

## 🧰 Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Java JDK 17+](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- [PostgreSQL 15+](https://www.postgresql.org/download/)
- [Maven 3.6+](https://maven.apache.org/)
- [Visual Studio Code / IntelliJ IDEA / Spring Tool Suite](https://spring.io/tools)
- [Bruno API Client](https://www.usebruno.com/) (opcional, para pruebas)

---

## 🗄️ Configuración de la Base de Datos

### 1. Crear la base de datos:
```sql
CREATE DATABASE lab05_db;
```

### 2. Configurar el archivo `application.properties`:
```properties
spring.application.name=Java-mvc-capas-axios
server.port=8080

# Configuración de PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5433/lab05_db
spring.datasource.username=postgres
spring.datasource.password=tu_contraseña
spring.datasource.driver-class-name=org.postgresql.Driver

# Configuración de JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

### 3. (Opcional) Importar el script inicial `db.sql` incluido en la carpeta raíz.

---

## 🚀 Ejecución del Proyecto

### 🧩 1. Clonar el repositorio
```bash
git clone https://github.com/rodrigo/java-mvc-capas-axios.git
cd java-mvc-capas-axios
```

### ⚙️ 2. Compilar y ejecutar
```bash
# Compilar el proyecto
mvn clean compile

# Ejecutar la aplicación
mvn spring-boot:run
```

### 🌐 3. Acceder a la aplicación
- **URL Backend**: http://localhost:8080
- **URL Frontend**: http://localhost:8080 (archivos estáticos)
- **Usuario de prueba**: admin
- **Contraseña**: 123456

---

## 🧑‍💻 Funcionalidades Principales

### 🔐 Sistema de Autenticación
- Validación de usuario y contraseña desde base de datos
- Redirección al panel administrativo al iniciar sesión
- Manejo de errores para credenciales inválidas
- Endpoint: `POST /api/auth/login`

### 🧑‍💼 CRUD de Empleados
| Operación | Endpoint | Descripción |
|-----------|----------|-------------|
| **Crear** | `POST /api/empleados` | Registrar nuevo empleado mediante formulario |
| **Leer** | `GET /api/empleados` | Mostrar lista completa de empleados |
| **Actualizar** | `PUT /api/empleados/{id}` | Editar información de un empleado |
| **Eliminar** | `DELETE /api/empleados/{id}` | Borrar empleado con confirmación |

### 📦 CRUD de Productos
| Operación | Endpoint | Descripción |
|-----------|----------|-------------|
| **Crear** | `POST /api/productos` | Registrar nuevo producto con inventario |
| **Leer** | `GET /api/productos` | Mostrar lista completa de productos |
| **Actualizar** | `PUT /api/productos/{id}` | Editar información de un producto |
| **Eliminar** | `DELETE /api/productos/{id}` | Borrar producto del inventario |

---

## 🧪 Pruebas

### Pruebas con Bruno API Client
El proyecto incluye una carpeta `/ds-lab-05` con pruebas de API usando Bruno:

```bash
# Importar la colección de Bruno
# Abrir Bruno y cargar la carpeta ds-lab-05
```

### Pruebas Unitarias
```bash
# Ejecutar todas las pruebas
mvn test

# Ejecutar pruebas con reporte de cobertura
mvn test jacoco:report
```

### Endpoints de Prueba
- **GET** `/api/empleados` - Listar empleados
- **POST** `/api/empleados` - Crear empleado
- **PUT** `/api/empleados/{id}` - Actualizar empleado
- **DELETE** `/api/empleados/{id}` - Eliminar empleado
- **POST** `/api/auth/login` - Autenticación

---

## 📹 Video de Demostración
- **Duración**: máximo 5 minutos
- **Contenido**:
  1. Login exitoso y fallido
  2. CRUD completo de empleados (crear, leer, actualizar, eliminar)
  3. CRUD completo de productos
  4. Manejo de errores y validaciones
- **Disponible en**:
  - [YouTube – enlace público o sin restricción]
  - o [Google Drive – enlace compartido]

---

## 📦 Estructura del Repositorio

```
📦 java-mvc-capas-axios
 ┣ 📂 Java-mvc-capas-axios/
 │  ┣ 📂 src/main/java/com/example/app/
 │  │  ├─ 📂 common/ (config, controller, exception)
 │  │  ├─ 📂 empleado/ (entidad, controlador, servicio, repositorio)
 │  │  ├─ 📂 producto/ (entidad, controlador, servicio, repositorio)
 │  │  ├─ 📂 usuario/ (entidad, autenticación, servicios)
 │  │  └─ 📄 JavaMvcCapasAxiosApplication.java
 │  ├─ 📂 src/main/resources/
 │  │  └─ 📄 application.properties
 │  ├─ 📂 src/test/ (pruebas unitarias)
 │  ├─ 📄 pom.xml
 │  └─ 📄 db.sql
 ┣ 📂 frontend/ (archivos HTML, CSS, JS)
 ┣ 📂 ds-lab-05/ (pruebas Bruno API)
 ┗ 📄 README.md
```

---

## 🔧 Configuración Adicional

### Variables de Entorno
Para mayor seguridad, puedes usar variables de entorno:

```bash
export DB_URL=jdbc:postgresql://localhost:5433/lab05_db
export DB_USERNAME=postgres
export DB_PASSWORD=tu_contraseña
```

### Perfiles de Spring
- **Desarrollo**: `application-dev.properties`
- **Producción**: `application-prod.properties`

---

## 🐛 Solución de Problemas

### Error de Conexión a PostgreSQL
```bash
# Verificar que PostgreSQL esté ejecutándose
sudo service postgresql status

# Verificar puerto y configuración
netstat -tulpn | grep 5433
```

### Error de Puerto en Uso
```bash
# Cambiar puerto en application.properties
server.port=8081
```

### Problemas de Dependencias Maven
```bash
# Limpiar cache y reinstalar dependencias
mvn clean install -U
```

---

## 👨‍💻 Autor

**Rodrigo Vásquez de Velasco Gonzales Vigil**  
Estudiante de Administración y Negocios Digitales – UTEC  
Desarrollador Full Stack | Spring Boot – PostgreSQL – React  
📧 rodrigo.vasquez@utec.edu.pe  
🌐 github.com/Rodvdev

---

## 🏁 Licencia

Este proyecto es de uso académico para el curso Diseño de Software – UTEC.

---

## 📚 Referencias

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Bruno API Client](https://www.usebruno.com/)
- [Maven Documentation](https://maven.apache.org/guides/)

---

*Desarrollado con ❤️ para el Laboratorio N°05 de Diseño de Software - UTEC*
