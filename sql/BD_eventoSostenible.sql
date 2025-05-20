CREATE DATABASE IF NOT EXISTS eventos_sostenibles;
USE eventos_sostenibles;

-- Tabla Usuario
CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE CHECK (correo LIKE '%_@__%.__%'),
    contraseña VARCHAR(255) NOT NULL,
    tipo ENUM('organizador', 'usuario', 'admin') NOT NULL DEFAULT 'usuario'
);

-- Tabla Organizador
CREATE TABLE IF NOT EXISTS Organizador (
    id_usuario BIGINT UNSIGNED PRIMARY KEY,
    telefono CHAR(9) NOT NULL CHECK (telefono REGEXP '^[6-8][0-9]{8}$'),
    empresa VARCHAR(255) NOT NULL,
    web VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Tabla Ubicacion
CREATE TABLE IF NOT EXISTS Ubicacion (
    id_ubicacion SERIAL PRIMARY KEY,
    tipo ENUM('presencial', 'virtual', 'mixto') NOT NULL,
    direccion VARCHAR(255),
    url VARCHAR(255),
    CHECK (
        (direccion IS NOT NULL AND url IS NULL AND tipo = 'presencial') OR 
        (direccion IS NULL AND url IS NOT NULL AND tipo = 'virtual') OR
        (direccion IS NOT NULL AND url IS NOT NULL AND tipo = 'mixto')
    )
);

-- Tabla Categoria
CREATE TABLE IF NOT EXISTS Categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255)
);

-- Tabla Evento con imagen y precio
CREATE TABLE IF NOT EXISTS Evento (
    id_evento SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha DATETIME NOT NULL,
    duracion INT NOT NULL,
    aforo INT,
    imagen VARCHAR(255), -- URL o ruta de la imagen
    precio DECIMAL(10,2) DEFAULT 0.00, -- precio del evento
    id_ubicacion BIGINT UNSIGNED NOT NULL,
    id_categoria BIGINT UNSIGNED NOT NULL,
    estado ENUM('activo', 'finalizado', 'cancelado') DEFAULT 'activo',
    FOREIGN KEY (id_ubicacion) REFERENCES Ubicacion(id_ubicacion),
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
);

-- Tabla intermedia Evento_Organizador para relación muchos a muchos
CREATE TABLE IF NOT EXISTS Evento_Organizador (
    id_evento BIGINT UNSIGNED NOT NULL,
    id_usuario BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_evento, id_usuario),
    FOREIGN KEY (id_evento) REFERENCES Evento(id_evento),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Tabla Inscripcion
CREATE TABLE IF NOT EXISTS Inscripcion (
    id_inscripcion SERIAL PRIMARY KEY,
    id_evento BIGINT UNSIGNED NOT NULL,
    id_usuario BIGINT UNSIGNED NOT NULL,
    UNIQUE (id_evento, id_usuario),
    FOREIGN KEY (id_evento) REFERENCES Evento(id_evento),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);