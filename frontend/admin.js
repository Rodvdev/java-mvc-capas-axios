// ============================================
// ADMIN DASHBOARD
// Gestión de Empleados con Vista Grid y Tabla
// ============================================

// ===== CONFIGURACIÓN =====
const API_URL = 'http://localhost:8080/api/empleados';
let empleadoAEliminar = null;
let currentView = 'grid';

// Configuración de Axios
axios.defaults.headers.common['Content-Type'] = 'application/json';

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Panel de administración iniciado');
    verificarAutenticacion();
    mostrarInfoUsuario();
    cargarEmpleados();
    configurarFormulario();
    configurarBuscador();
});

// ===== AUTENTICACIÓN =====
function verificarAutenticacion() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
}

function cerrarSesion() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}

function mostrarInfoUsuario() {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('user-info-sidebar').innerHTML = 
            `<p>👤 Bienvenido, <strong>${userName}</strong></p>`;
    }
}

// ===== NAVEGACIÓN =====
function showSection(section) {
    // Toggle active nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (section === 'empleados') {
        document.getElementById('page-title').textContent = '👥 Gestión de Empleados';
    }
}

// ===== CONFIGURACIÓN =====
function configurarFormulario() {
    document.getElementById('empleado-form').addEventListener('submit', guardarEmpleado);
}

function configurarBuscador() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') buscarEmpleados();
    });
}

// ===== VISTAS =====
async function toggleView(view) {
    currentView = view;
    
    document.getElementById('btn-grid').classList.toggle('active', view === 'grid');
    document.getElementById('btn-table').classList.toggle('active', view === 'table');
    
    document.getElementById('grid-view').style.display = view === 'grid' ? 'block' : 'none';
    document.getElementById('table-view').style.display = view === 'table' ? 'block' : 'none';
    
    // Recargar empleados para la vista activa
    await cargarEmpleados();
}

function mostrarFormulario() {
    document.getElementById('form-section').style.display = 'block';
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
}

// ===== CARGA DE DATOS =====
async function cargarEmpleados() {
    mostrarLoading(true);
    ocultarError();
    
    try {
        const response = await axios.get(API_URL);
        const empleados = response.data;
        
        if (currentView === 'grid') {
            mostrarEmpleadosGrid(empleados);
        } else {
            mostrarEmpleadosTabla(empleados);
        }
    } catch (error) {
        console.error('Error al cargar empleados:', error);
        mostrarError('No se pudieron cargar los empleados');
    } finally {
        mostrarLoading(false);
    }
}

// ===== VISTA GRID =====
function mostrarEmpleadosGrid(empleados) {
    const grid = document.getElementById('empleados-grid');
    
    if (empleados.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👥</div>
                <h3>No hay empleados registrados</h3>
                <p>Agrega tu primer empleado</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = empleados.map(emp => `
        <div class="producto-card">
            <div class="producto-header">
                <div>
                    <div class="producto-nombre">${escapeHtml(emp.nombre)} ${escapeHtml(emp.apellido)}</div>
                    <div style="color: #666; font-size: 0.9rem;">${escapeHtml(emp.email) || 'Sin email'}</div>
                </div>
                <span class="producto-id">ID: ${emp.id}</span>
            </div>
            
            <div class="producto-descripcion">
                <strong>Cargo:</strong> ${escapeHtml(emp.cargo) || 'Sin cargo'} | <strong>Dept:</strong> ${emp.departamentoId || 'N/A'}
            </div>
            
            <div class="producto-details">
                <div class="detail-item">
                    <div class="detail-label">Salario</div>
                    <div class="detail-value">$${parseFloat(emp.salario).toFixed(2)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Fecha</div>
                    <div class="detail-value" style="font-size: 0.8rem;">${emp.fechaContratacion || 'N/A'}</div>
                </div>
            </div>
            
            <div class="producto-actions">
                <button class="btn btn-warning" onclick="editarEmpleado(${emp.id})">
                    ✏️ Editar
                </button>
                <button class="btn btn-danger" onclick="abrirModalEliminar(${emp.id})">
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

// ===== VISTA TABLA =====
async function mostrarEmpleadosTabla(empleados) {
    const tbody = document.getElementById('empleados-table-body');
    
    // Si no se pasan empleados, cargarlos
    if (!empleados) {
        try {
            const response = await axios.get(API_URL);
            empleados = response.data;
        } catch (error) {
            console.error('Error al cargar empleados:', error);
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px; color: #999;">
                        Error al cargar empleados
                    </td>
                </tr>
            `;
            return;
        }
    }
    
    if (!empleados || empleados.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #999;">
                    No hay empleados registrados
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = empleados.map(emp => `
        <tr>
            <td>${emp.id}</td>
            <td><strong>${escapeHtml(emp.nombre)} ${escapeHtml(emp.apellido)}</strong></td>
            <td>${escapeHtml(emp.email)}</td>
            <td>${escapeHtml(emp.cargo) || 'N/A'}</td>
            <td>${emp.departamentoId || 'N/A'}</td>
            <td>$${parseFloat(emp.salario).toFixed(2)}</td>
            <td>${emp.fechaContratacion || 'N/A'}</td>
            <td>
                <button class="btn btn-warning" onclick="editarEmpleado(${emp.id})" style="padding: 6px 12px; font-size: 0.85rem;">
                    ✏️
                </button>
                <button class="btn btn-danger" onclick="abrirModalEliminar(${emp.id})" style="padding: 6px 12px; font-size: 0.85rem;">
                    🗑️
                </button>
            </td>
        </tr>
    `).join('');
}

// ===== CRUD OPERATIONS =====
async function guardarEmpleado(event) {
    event.preventDefault();
    
    const id = document.getElementById('empleado-id').value;
    const empleado = {
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim() || null,
        fechaContratacion: document.getElementById('fechaContratacion').value,
        salario: parseFloat(document.getElementById('salario').value),
        cargo: document.getElementById('cargo').value.trim() || null,
        departamentoId: document.getElementById('departamentoId').value ? 
            parseInt(document.getElementById('departamentoId').value) : null
    };
    
    // Validaciones
    if (!empleado.nombre || empleado.nombre.length < 2) {
        mostrarError('El nombre debe tener al menos 2 caracteres');
        return;
    }
    
    if (!empleado.apellido || empleado.apellido.length < 2) {
        mostrarError('El apellido debe tener al menos 2 caracteres');
        return;
    }
    
    if (empleado.salario <= 0) {
        mostrarError('El salario debe ser mayor que 0');
        return;
    }
    
    try {
        if (id) {
            await axios.put(`${API_URL}/${id}`, empleado);
            mostrarMensajeExito('✅ Empleado actualizado correctamente');
        } else {
            await axios.post(API_URL, empleado);
            mostrarMensajeExito('✅ Empleado creado correctamente');
        }
        
        limpiarFormulario();
        cargarEmpleados();
    } catch (error) {
        console.error('Error al guardar empleado:', error);
        mostrarError('Error al guardar el empleado');
    }
}

async function editarEmpleado(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        const emp = response.data;
        
        document.getElementById('empleado-id').value = emp.id;
        document.getElementById('nombre').value = emp.nombre;
        document.getElementById('apellido').value = emp.apellido;
        document.getElementById('email').value = emp.email;
        document.getElementById('telefono').value = emp.telefono || '';
        document.getElementById('fechaContratacion').value = emp.fechaContratacion;
        document.getElementById('salario').value = emp.salario;
        document.getElementById('cargo').value = emp.cargo || '';
        document.getElementById('departamentoId').value = emp.departamentoId || '';
        
        document.getElementById('form-title').textContent = '✏️ Editar Empleado';
        document.getElementById('btn-text').textContent = '💾 Actualizar';
        
        mostrarFormulario();
    } catch (error) {
        console.error('Error al cargar empleado:', error);
        mostrarError('No se pudo cargar el empleado');
    }
}

function abrirModalEliminar(id) {
    empleadoAEliminar = id;
    document.getElementById('modal-confirmacion').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modal-confirmacion').style.display = 'none';
    empleadoAEliminar = null;
}

async function confirmarEliminar() {
    if (!empleadoAEliminar) return;
    
    try {
        await axios.delete(`${API_URL}/${empleadoAEliminar}`);
        mostrarMensajeExito('🗑️ Empleado eliminado correctamente');
        cerrarModal();
        cargarEmpleados();
    } catch (error) {
        console.error('Error al eliminar empleado:', error);
        mostrarError('No se pudo eliminar el empleado');
        cerrarModal();
    }
}

// ===== BÚSQUEDA =====
async function buscarEmpleados() {
    const searchTerm = document.getElementById('search-input').value.trim();
    
    if (!searchTerm) {
        cargarEmpleados();
        return;
    }
    
    mostrarLoading(true);
    
    try {
        const response = await axios.get(`${API_URL}/buscar/nombre`, {
            params: { nombre: searchTerm }
        });
        
        if (currentView === 'grid') {
            mostrarEmpleadosGrid(response.data);
        } else {
            mostrarEmpleadosTabla(response.data);
        }
        
        if (response.data.length === 0) {
            mostrarError(`No se encontraron empleados con: "${searchTerm}"`);
        }
    } catch (error) {
        console.error('Error en búsqueda:', error);
        mostrarError('Error en la búsqueda');
    } finally {
        mostrarLoading(false);
    }
}

// ===== FUNCIONES AUXILIARES =====
function cancelarEdicion() {
    limpiarFormulario();
    document.getElementById('form-section').style.display = 'none';
}

function limpiarFormulario() {
    document.getElementById('empleado-form').reset();
    document.getElementById('empleado-id').value = '';
    document.getElementById('form-title').textContent = '➕ Nuevo Empleado';
    document.getElementById('btn-text').textContent = '💾 Guardar';
}

function mostrarLoading(mostrar) {
    document.getElementById('loading').style.display = mostrar ? 'block' : 'none';
}

function mostrarError(mensaje) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function ocultarError() {
    document.getElementById('error-message').style.display = 'none';
}

function mostrarMensajeExito(mensaje) {
    const container = document.querySelector('.main-content');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = mensaje;
    
    container.insertBefore(successDiv, container.children[2]);
    
    setTimeout(() => successDiv.remove(), 3000);
}

function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;', '<': '&lt;', '>': '&gt;',
        '"': '&quot;', "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ===== EVENTOS GLOBALES =====
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-confirmacion');
    if (e.target === modal) cerrarModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
});

console.log('✅ Script de admin cargado correctamente');
