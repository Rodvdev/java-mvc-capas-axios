// ============================================
// SISTEMA DE REGISTRO DE USUARIOS
// Registro con validación
// ============================================

// ===== CONFIGURACIÓN =====
const API_URL = 'http://localhost:8080/api/usuarios';

// Configuración de Axios
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Interceptor para manejar errores globales
axios.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en la petición:', error);
        mostrarError('Error de conexión con el servidor. Verifica que el backend esté ejecutándose.');
        return Promise.reject(error);
    }
);

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Página de registro iniciada');
    configurarFormulario();
});

// ===== CONFIGURACIÓN DEL FORMULARIO =====
function configurarFormulario() {
    const form = document.getElementById('register-form');
    form.addEventListener('submit', registrarUsuario);
}

// ===== FUNCIÓN DE REGISTRO =====
async function registrarUsuario(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const login = document.getElementById('login').value.trim();
    const clave = document.getElementById('clave').value;
    const confirmarClave = document.getElementById('confirmarClave').value;
    
    // Validaciones frontend
    if (!nombre) {
        mostrarError('El nombre es obligatorio');
        return;
    }
    
    if (nombre.length < 2) {
        mostrarError('El nombre debe tener al menos 2 caracteres');
        return;
    }
    
    if (!login) {
        mostrarError('El usuario es obligatorio');
        return;
    }
    
    if (login.length < 3) {
        mostrarError('El usuario debe tener al menos 3 caracteres');
        return;
    }
    
    if (!/^[a-zA-Z0-9]+$/.test(login)) {
        mostrarError('El usuario solo puede contener letras y números');
        return;
    }
    
    if (!clave) {
        mostrarError('La contraseña es obligatoria');
        return;
    }
    
    if (clave.length < 4) {
        mostrarError('La contraseña debe tener al menos 4 caracteres');
        return;
    }
    
    if (clave !== confirmarClave) {
        mostrarError('Las contraseñas no coinciden');
        return;
    }
    
    console.log('📝 Registrando usuario:', login);
    
    // Deshabilitar el botón mientras se procesa
    const btnSubmit = document.querySelector('#register-form button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.textContent = '⏳ Creando cuenta...';
    
    try {
        const usuarioData = {
            nombre: nombre,
            login: login,
            clave: clave
        };
        
        const response = await axios.post(API_URL, usuarioData);
        const usuario = response.data;
        
        console.log('✅ Usuario creado:', usuario);
        
        // Mostrar mensaje de éxito
        mostrarExito(`¡Cuenta creada exitosamente! Usuario: ${usuario.login}`);
        
        // Limpiar formulario
        document.getElementById('register-form').reset();
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        
    } catch (error) {
        console.error('❌ Error al registrar usuario:', error);
        
        if (error.response) {
            if (error.response.status === 400) {
                mostrarError('Error en los datos. Verifica que el usuario no exista.');
            } else if (error.response.data && error.response.data.message) {
                mostrarError(error.response.data.message);
            } else {
                mostrarError('Error al crear la cuenta');
            }
        } else {
            mostrarError('Error de conexión. Verifica que el servidor esté ejecutándose.');
        }
    } finally {
        // Rehabilitar el botón
        btnSubmit.disabled = false;
        btnSubmit.textContent = '✅ Crear Cuenta';
    }
}

// ===== FUNCIÓN PARA MOSTRAR/OCULTAR CONTRASEÑA =====
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        event.target.textContent = '🙈';
        event.target.setAttribute('aria-label', 'Ocultar contraseña');
    } else {
        passwordInput.type = 'password';
        event.target.textContent = '👁️';
        event.target.setAttribute('aria-label', 'Mostrar contraseña');
    }
}

// ===== FUNCIONES AUXILIARES =====
function mostrarError(mensaje) {
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');
    
    successDiv.style.display = 'none';
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
    
    // Scroll al mensaje de error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function mostrarExito(mensaje) {
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');
    
    errorDiv.style.display = 'none';
    successDiv.textContent = mensaje;
    successDiv.style.display = 'block';
    
    // Scroll al mensaje de éxito
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

console.log('✅ Script de registro cargado correctamente');
