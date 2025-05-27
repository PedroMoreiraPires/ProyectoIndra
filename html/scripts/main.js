// Funcionalidad del menú móvil
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector("#menuToggle");
    const mobileMenu = document.querySelector("#mobileMenu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");

            // Cambiar el icono del botón
            const icon = menuToggle.querySelector("i")
            if (icon.classList.contains("fa-bars")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        })
    }

})

function createNewEvent(eventData) {
    const newEvent = document.createElement("a");
    newEvent.classList.add("event-card");

    newEvent.innerHTML = `
            ${eventData.image ? `<div class="event-image">
                <img src="${eventData.image}" alt="${eventData.title || 'Evento'}">
            </div>` : ""}
            <div class="event-content">
                <div class="event-badges">
                    ${eventData.category ? `<span class="event-category">${eventData.category}</span>` : ""}
                    ${eventData.featured ? `<span class="event-featured">Destacado</span>` : ""}
                </div>
                ${eventData.title ? `<h3 class="event-title">${eventData.title}</h3>` : ""}
                <div class="event-details">
                    ${eventData.date ? `<p><i class="fas fa-calendar"></i> ${eventData.date}</p>` : ""}
                    ${eventData.time ? `<p><i class="fas fa-clock"></i> ${eventData.time}</p>` : ""}
                    ${eventData.location ? `<p><i class="fas fa-map-marker-alt"></i> ${eventData.location}</p>` : ""}
                </div>
                ${eventData.description ? `<p class="event-description">${eventData.description}</p>` : ""}
                <button class="btn btn-outline btn-full">Ver detalles</button>
            </div>
        `;

    return newEvent;
}

function createHeader(page) {
    const header = document.createElement("header");
    // Conditionally render buttons based on login state
    header.innerHTML = `
        <div class="container">
            <div class="header-content">
                <a href="index.html" class="logo">
                    <span class="logo-icon">ES</span>
                    <span class="logo-text">EcoSostenible</span>
                </a>
                <nav class="main-nav">
                    <ul>
                        <li><a href="index.html" ${page === "index" ? 'class="active"' : ''}>Inicio</a></li>
                        <li><a href="eventos.html" ${page === "events" ? 'class="active"' : ''}>Eventos</a></li>
                    </ul>
                </nav>
                <div class="auth-buttons">
                    ${currentUser ? `
                        ${currentUser.role === 'organizer' ? '<a id="btn-create-event" class="btn btn-primary">Crear evento</a>' : ''}
                        <span class="welcome-msg">Hola, ${currentUser.username}</span>
                        <a id="btn-logout" class="btn btn-outline">Cerrar sesión</a>
                    ` : `
                        <a id="btn-login" class="btn btn-outline">Iniciar sesión</a>
                        <a id="btn-register" class="btn btn-primary">Registrarse</a>
                    `}
                </div>
                <button class="menu-toggle" id="menuToggle">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            <!-- Menú móvil -->
            <div class="mobile-menu" id="mobileMenu">
                <nav>
                    <ul>
                        <li><a href="index.html" ${page === "index" ? 'class="active"' : ''}>Inicio</a></li>
                        <li><a href="eventos.html" ${page === "events" ? 'class="active"' : ''}>Eventos</a></li>
                    </ul>
                    <div class="auth-buttons-mobile">
                        ${currentUser ? `
                            ${currentUser.role === 'organizer' ? '<a id="btn-create-event-mobile" class="btn btn-primary">Crear evento</a>' : ''}
                            <span class="welcome-msg-mobile">Hola, ${currentUser.username}</span>
                            <a id="btn-logout-mobile" class="btn btn-outline">Cerrar sesión</a>
                        ` : `
                            <a id="btn-login-mobile" class="btn btn-outline">Iniciar sesión</a>
                            <a id="btn-register-mobile" class="btn btn-primary">Registrarse</a>
                        `}
                    </div>
                </nav>
            </div>
        </div>
    `;
    document.body.insertBefore(header, document.body.firstChild);

    // Bind logout
    if (currentUser) {
        document.getElementById('btn-logout')?.addEventListener('click', () => { localStorage.removeItem('currentUser'); location.reload(); });
        document.getElementById('btn-logout-mobile')?.addEventListener('click', () => { localStorage.removeItem('currentUser'); location.reload(); });
    }
}

function createModal() {
    const showLoginForm = () => {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
    const openLoginModal = () => {
        modal.style.display = 'block';
        showLoginForm();
    }
    const showRegisterForm = () => {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    }
    const openRegisterModal = () => {
        modal.style.display = 'block';
        showRegisterForm();
    }
    const closeAuthModal = () => {
        modal.style.display = 'none';
    }
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            
            <!-- Formulario de Login -->
            <form id="loginForm" class="auth-form">
                <div class="form-group">
                    <label for="username">Usuario:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group form-checkbox">
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember">Recordarme</label>
                </div>
                <button type="submit" class="btn btn-primary btn-full">Iniciar sesión</button>
            </form>
            
            <!-- Formulario de Registro -->
            <form id="registerForm" class="auth-form" style="display: none;">
                <div class="form-group">
                    <label for="reg-username">Usuario:</label>
                    <input type="text" id="reg-username" name="reg-username" required>
                </div>
                <div class="form-group">
                    <label for="reg-email">Email:</label>
                    <input type="email" id="reg-email" name="reg-email" required>
                </div>
                <div class="form-group">
                    <label for="reg-password">Contraseña:</label>
                    <input type="password" id="reg-password" name="reg-password" required>
                </div>
                <div class="form-group">
                    <label for="reg-confirm-password">Confirmar contraseña:</label>
                    <input type="password" id="reg-confirm-password" name="reg-confirm-password" required>
                </div>
                <div class="form-group form-checkbox">
                    <input type="checkbox" id="terms" name="terms" required>
                    <label for="terms">Acepto los <a href="#">términos y condiciones</a></label>
                </div>
                <button type="submit" class="btn btn-primary btn-full">Registrarse</button>
            </form>
        </div>
    `;
    document.querySelector('#btn-login')?.addEventListener('click', openLoginModal);
    document.querySelector('#btn-login-mobile')?.addEventListener('click', openLoginModal);
    document.querySelector('#btn-register')?.addEventListener('click', openRegisterModal);
    document.querySelector('#btn-register-mobile')?.addEventListener('click', openRegisterModal);
    document.querySelector('#btn-register-hero')?.addEventListener('click', openRegisterModal);
    modal.querySelector('.close-modal').addEventListener('click', closeAuthModal);
    const loginForm = modal.querySelector('#loginForm');
    const registerForm = modal.querySelector('#registerForm');

    // Replace login logic with hardcoded user check
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
            alert('Credenciales inválidas');
            return;
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUser = user;
        closeAuthModal();
        location.reload();
    });

    // Manejar envío del formulario de registro
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.querySelector('#reg-username').value;
        const email = document.querySelector('#reg-email').value;
        const password = document.querySelector('#reg-password').value;
        const confirmPassword = document.querySelector('#reg-confirm-password').value;

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Aquí puedes agregar la lógica para registrar al usuario
        console.log('Registrando usuario:', { username, email, password });

        // Simulación de registro exitoso
        alert('Registro exitoso');
        closeAuthModal();
    });

    document.body.insertBefore(modal, document.body.firstChild);
}

// Hardcoded users and session management
const users = [
    { username: 'user1', password: 'userpass1', role: 'user' },
    { username: 'org1', password: 'orgpass1', role: 'organizer' },
    { username: 'org2', password: 'orgpass2', role: 'organizer' }
];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

function getEventsFromStorage() {
    return JSON.parse(localStorage.getItem('events') || '[]');
}

function saveEventsToStorage(events) {
    localStorage.setItem('events', JSON.stringify(events));
}

// Add Create Event modal and logic
function createEventModal() {
    if (!currentUser || currentUser.role !== 'organizer') return;
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <form id="createEventForm" class="auth-form">
                <h2>Crear Nuevo Evento</h2>
                <div class="form-group">
                    <label>Título:</label>
                    <input type="text" id="evt-title" required>
                </div>
                <div class="form-group">
                    <label>Imagen URL:</label>
                    <input type="url" id="evt-image">
                </div>
                <div class="form-group">
                    <label>Categoría:</label>
                    <input type="text" id="evt-category" required>
                </div>
                <div class="form-group">
                    <label>Fecha:</label>
                    <input type="date" id="evt-date" required>
                </div>
                <div class="form-group">
                    <label>Hora:</label>
                    <input type="time" id="evt-time" required>
                </div>
                <div class="form-group">
                    <label>Duración (horas):</label>
                    <input type="number" id="evt-duration" step=".01" required>
                </div>
                <div class="form-group">
                    <label>Tipo de Evento:</label>
                    <select id="evt-type" required>
                        <option value="">Seleccione una opción</option>
                        <option value="presencial">Presencial</option>
                        <option value="online">Online</option>
                        <option value="mixto">Mixto</option>
                    </select>
                </div>
                <div class="form-group" id="address-group" style="display:none;">
                    <label>Dirección:</label>
                    <input type="text" id="evt-location">
                </div>
                <div class="form-group" id="url-group" style="display:none;">
                    <label>URL:</label>
                    <input type="url" id="evt-url">
                </div>
                <div class="form-group">
                    <label>Descripción:</label>
                    <textarea id="evt-description" required></textarea>
                </div>
                <div class="form-group">
                    <label>Plazas totales:</label>
                    <input type="number" id="evt-spots" min="1" required>
                </div>
                <button type="submit" class="btn btn-primary btn-full">Crear Evento</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.close-modal').addEventListener('click', () => modal.style.display = 'none');
    document.getElementById('btn-create-event')?.addEventListener('click', () => modal.style.display = 'block');
    document.getElementById('btn-create-event-mobile')?.addEventListener('click', () => modal.style.display = 'block');

    // Set minimum date to tomorrow
    const dateInput = document.getElementById('evt-date');
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;

    const evtType = document.getElementById('evt-type');
    const addressGroup = document.getElementById('address-group');
    const urlGroup = document.getElementById('url-group');

    evtType.addEventListener('change', function () {
        const type = this.value;
        if (type === 'presencial') {
            addressGroup.style.display = 'block';
            urlGroup.style.display = 'none';
            document.getElementById('evt-location').required = true;
            document.getElementById('evt-url').required = false;
        } else if (type === 'online') {
            addressGroup.style.display = 'none';
            urlGroup.style.display = 'block';
            document.getElementById('evt-location').required = false;
            document.getElementById('evt-url').required = true;
        } else if (type === 'mixto') {
            addressGroup.style.display = 'block';
            urlGroup.style.display = 'block';
            document.getElementById('evt-location').required = true;
            document.getElementById('evt-url').required = true;
        } else {
            addressGroup.style.display = 'none';
            urlGroup.style.display = 'none';
            document.getElementById('evt-location').required = false;
            document.getElementById('evt-url').required = false;
        }
    });

    const form = document.getElementById('createEventForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const selectedDate = new Date(document.getElementById('evt-date').value);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        // Compare dates without time components
        if (selectedDate.setHours(0,0,0,0) < tomorrow.setHours(0,0,0,0)) {
            alert('La fecha debe ser al menos el día siguiente al actual.');
            return;
        }
        if (confirm('¿Estás seguro de que deseas crear este evento?')) {
            const events = getEventsFromStorage();
            const type = document.getElementById('evt-type').value;
            const newEvt = {
                id: Date.now().toString(),
                owner: currentUser.username,
                title: document.getElementById('evt-title').value,
                image: document.getElementById('evt-image').value,
                category: document.getElementById('evt-category').value,
                date: document.getElementById('evt-date').value,
                time: document.getElementById('evt-time').value,
                duration: parseInt(document.getElementById('evt-duration').value, 10),
                description: document.getElementById('evt-description').value,
                totalSpots: parseInt(document.getElementById('evt-spots').value, 10),
                registrants: [],
                type: type,
                location: (type === 'presencial' || type === 'mixto') ? document.getElementById('evt-location').value : '',
                onlineUrl: (type === 'online' || type === 'mixto') ? document.getElementById('evt-url').value : ''
            };
            saveEventsToStorage([...events, newEvt]);
            modal.style.display = 'none';
            location.reload();
        }
    });
}

function createFooter() {
    const footer = document.createElement("footer");
    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <a href="index.html" class="logo">
                        <span class="logo-icon">ES</span>
                        <span class="logo-text">EcoSostenible</span>
                    </a>
                    <p>Plataforma de eventos relacionados con la sostenibilidad y el medio ambiente.</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>

                <div class="footer-column">
                    <h3>Enlaces rápidos</h3>
                    <ul>
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="eventos.html">Eventos</a></li>
                        <li><a href="#">Organizadores</a></li>
                        <li><a href="#">Sobre Nosotros</a></li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h3>Categorías</h3>
                    <ul>
                        <li><a href="#">Conferencias</a></li>
                        <li><a href="#">Talleres</a></li>
                        <li><a href="#">Seminarios</a></li>
                        <li><a href="#">Foros</a></li>
                        <li><a href="#">Actividades</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h3>Contacto</h3>
                    <address>
                        <p>Calle Sostenible 123</p>
                        <p>28001 Madrid, España</p>
                        <p>Email: info@ecosostenible.com</p>
                        <p>Teléfono: +34 91 123 45 67</p>
                    </address>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2025 EcoSostenible. Todos los derechos reservados.</p>
            </div>
        </div>
    `;

    document.body.appendChild(footer);
}

function addStandardElements(page) {
    createHeader(page);
    createModal();
    createEventModal();
    createFooter();
}
