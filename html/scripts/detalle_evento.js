document.addEventListener("DOMContentLoaded", () => {
    // Funcionalidad de las pestañas
    const tabBtns = document.querySelectorAll(".event-tab")
    const tabPanels = document.querySelectorAll(".tab-panel")

    tabBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const tab = this.getAttribute("data-tab")

            // Actualizar botones
            tabBtns.forEach((b) => b.classList.remove("active"))
            this.classList.add("active")

            // Actualizar paneles
            tabPanels.forEach((panel) => {
                panel.classList.remove("active")
                if (panel.id === `${tab}Panel`) {
                    panel.classList.add("active")
                }
            })
        })
    })

    // Obtener el ID del evento de la URL
    const urlParams = new URLSearchParams(window.location.search)
    const eventId = urlParams.get("id")

    // Simulación de carga de datos del evento
    if (eventId) {
        console.log("Cargando evento con ID:", eventId)

        // En una aplicación real, aquí se haría una petición al servidor
        // para obtener los datos del evento según su ID

        // Por ahora, simulamos diferentes eventos según el ID
        let eventData

        switch (eventId) {
            case "1":
                // Los datos ya están en el HTML para el evento 1 (por defecto)
                break
            case "2":
                eventData = {
                    title: "Taller de Reciclaje Creativo",
                    date: "22 de Junio, 2025",
                    time: "16:00 - 19:00",
                    location: "Parque Tecnológico Ambiental, Barcelona",
                    address: "Avenida Sostenible 45, 08001 Barcelona",
                    description:
                        "Aprende técnicas innovadoras para dar una segunda vida a materiales reciclados a través del arte y el diseño. Este taller práctico te enseñará cómo transformar residuos cotidianos en objetos útiles y decorativos.",
                    availableSpots: 25,
                    totalSpots: 30,
                    organizerName: "Asociación Recicla+",
                    organizerContact: "talleres@reciclaplus.org",
                }
                updateEventDetails(eventData)
                break
            case "3":
                eventData = {
                    title: "Seminario Online: Huella de Carbono Empresarial",
                    date: "5 de Julio, 2025",
                    time: "11:00 - 13:00",
                    location: "Online",
                    address: "Plataforma Zoom (se enviará enlace)",
                    description:
                        "Descubre cómo calcular y reducir la huella de carbono de tu empresa con estrategias efectivas y sostenibles. Aprenderás metodologías de cálculo, estrategias de reducción y compensación, y casos de éxito de empresas que han logrado ser carbono neutro.",
                    availableSpots: 120,
                    totalSpots: 200,
                    organizerName: "Instituto de Sostenibilidad Corporativa",
                    organizerContact: "seminarios@iscsostenible.org",
                }
                updateEventDetails(eventData)
                break
            default:
                console.log("Evento no encontrado, mostrando datos por defecto")
        }
    }

    // Función para actualizar los detalles del evento en la página
    function updateEventDetails(data) {
        if (!data) return

        // Actualizar elementos del DOM
        const elements = {
            eventTitle: document.querySelector("#eventTitle"),
            eventDate: document.querySelector("#eventDate"),
            eventTime: document.querySelector("#eventTime"),
            eventLocation: document.querySelector("#eventLocation"),
            eventAddress: document.querySelector("#eventAddress"),
            eventDescription: document.querySelector("#eventDescription"),
            availableSpots: document.querySelector("#availableSpots"),
            totalSpots: document.querySelector("#totalSpots"),
            organizerName: document.querySelector("#organizerName"),
            organizerContact: document.querySelector("#organizerContact"),
            organizerDescription: document.querySelector("#organizerDescription"),
        }

        // Actualizar cada elemento si existe
        for (const [key, element] of Object.entries(elements)) {
            if (element && data[key.replace("event", "").toLowerCase()]) {
                element.textContent = data[key.replace("event", "").toLowerCase()]
            }
        }

        // Actualizar la barra de progreso
        if (data.availableSpots && data.totalSpots) {
            const progressFill = document.querySelector(".progress-fill")
            if (progressFill) {
                const percentage = (data.availableSpots / data.totalSpots) * 100
                progressFill.style.width = `${percentage}%`
            }
        }
    }

    // Simulación de inscripción
    const registerBtn = document.querySelector(".sidebar-card .btn-primary")
    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            alert("¡Gracias por tu interés! Te has inscrito al evento.")
        })
    }

    // Simulación de compartir
    const shareBtn = document.querySelector(".action-buttons .btn:first-child")
    if (shareBtn) {
        shareBtn.addEventListener("click", () => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        alert("La URL se ha copiado al portapapeles");
                    })
                    .catch((err) => {
                        alert("No se pudo copiar la URL: " + err);
                    });
            } else {
                alert("Compartir: " + window.location.href);
            }
        })
    }

    // Simulación de añadir a calendario
    const calendarBtn = document.querySelector(".action-buttons .btn:last-child")
    if (calendarBtn) {
        calendarBtn.addEventListener("click", () => {
            alert("En una aplicación real, aquí se generaría un archivo .ics o se abriría el calendario del usuario.")
        })
    }


    addStandardElements()
})
