document.addEventListener("DOMContentLoaded", () => {

    // Filtros (simulación)
    const searchInput = document.querySelector("#search-input");
    const categorySelect = document.querySelector("#category");
    const dateSelect = document.querySelector("#date");

    document.querySelector("#filters-container")?.addEventListener("submit", (e) => {
        e.preventDefault();

        const searchTerm = searchInput?.value.toLowerCase() || "";
        const category = categorySelect?.value || "todas";
        const eventsGrid = document.querySelector("#events-grid");
        if (!eventsGrid) return;

        [...eventsGrid.children].forEach(eventElement => {
            const title = eventElement.querySelector(".event-title")?.textContent.toLowerCase() || "";
            const eventCategory = eventElement.querySelector(".event-category")?.textContent.toLowerCase() || "todas";

            const matches = (!searchTerm || title.includes(searchTerm)) &&
                            (category === "todas" || eventCategory === category)
            eventElement.style.display = matches ? "" : "none";
        });
    });

    const eventsGrid = document.querySelector("#events-grid");
    if (eventsGrid) {
        const events = localStorage.getItem('events');
        if (!events) return;
        JSON.parse(events).forEach(event => {
            eventsGrid.appendChild(createNewEvent(event));
        });
    }

    addStandardElements("events")
})
