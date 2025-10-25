// ============================================
// SISTEMA DE LOGIN
// Autenticación con Axios
// ============================================

// ===== CONFIGURACIÓN =====
const API_URL = 'http://localhost:8080/api/auth/login';

// Configuración de Axios
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Interceptor para manejar errores globales
axios.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en la petición:', error);
        mostrarError('Error de conexión con el servidor. Verifica que el backend esté ejecutándose en http://localhost:8080');
        return Promise.reject(error);
    }
);

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Página de login iniciada');
    configurarFormulario();
    
    // Verificar si ya hay una sesión activa
    const token = localStorage.getItem('authToken');
    if (token) {
        console.log('✅ Sesión encontrada, redirigiendo...');
        window.location.href = 'index.html';
    }
});

// ===== CONFIGURACIÓN DEL FORMULARIO =====
function configurarFormulario() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', iniciarSesion);
}

// ===== FUNCIÓN DE LOGIN =====
async function iniciarSesion(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('usuario').value.trim();
    const clave = document.getElementById('clave').value.trim();
    
    // Validaciones básicas
    if (!usuario) {
        mostrarError('Por favor ingresa tu usuario');
        return;
    }
    
    if (!clave) {
        mostrarError('Por favor ingresa tu contraseña');
        return;
    }
    
    console.log('🔐 Intentando iniciar sesión con usuario:', usuario);
    
    // Deshabilitar el botón mientras se procesa
    const btnSubmit = document.querySelector('#login-form button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.textContent = '⏳ Iniciando sesión...';
    
    try {
        const loginData = {
            usuario: usuario,
            clave: clave
        };
        
        const response = await axios.post(API_URL, loginData);
        const authResponse = response.data;
        
        console.log('📦 Respuesta del servidor:', authResponse);
        
        if (authResponse.exito) {
            // Login exitoso
            console.log('✅ Login exitoso para:', authResponse.nombre);
            
            // Guardar el token en localStorage
            localStorage.setItem('authToken', authResponse.token);
            localStorage.setItem('userName', authResponse.nombre);
            
            // Mostrar mensaje de éxito
            mostrarMensajeExito(`¡Bienvenido ${authResponse.nombre}! Redirigiendo...`);
            
            // Redirigir después de 1 segundo
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            // Login fallido
            console.error('❌ Login fallido:', authResponse.mensaje);
            mostrarError(authResponse.mensaje || 'Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('❌ Error al iniciar sesión:', error);
        
        if (error.response && error.response.status === 401) {
            mostrarError('Usuario o contraseña incorrectos');
        } else if (error.response && error.response.data) {
            mostrarError(error.response.data.mensaje || 'Error al iniciar sesión');
        } else {
            mostrarError('Error de conexión. Verifica que el servidor esté ejecutándose.');
        }
    } finally {
        // Rehabilitar el botón
        btnSubmit.disabled = false;
        btnSubmit.textContent = '🚀 Iniciar Sesión';
    }
}

// ===== FUNCIONES AUXILIARES =====
function mostrarError(mensaje) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
    
    // Scroll al mensaje de error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function mostrarMensajeExito(mensaje) {
    // Crear un elemento temporal para el mensaje de éxito
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = mensaje;
    
    // Insertar después del header
    const container = document.querySelector('.container');
    container.insertBefore(successDiv, container.children[1]);
    
    // Remover automáticamente después de 5 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Permitir inicio de sesión con Enter
document.getElementById('clave').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('login-form').dispatchEvent(new Event('submit'));
    }
});

console.log('✅ Script de login cargado correctamente');
