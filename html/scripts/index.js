document.addEventListener("DOMContentLoaded", () => {

    /// CAROUSEL DE EVENTOS ///
    const CAROUSEL = document.querySelector("#eventCarousel");

    const carouselItems = CAROUSEL ? CAROUSEL.querySelectorAll(".carousel-item") : [];
    if (!CAROUSEL || carouselItems.length === 0) return;

    const itemsAmount = 3;
    let isDragging = false;
    let startX = 0;
    let currentOffset = 0;

    function getPositionX(e) {
        return e.type.includes("touch") ? e.touches[0].clientX : e.pageX;
    }

    // Calcula el límite mínimo de desplazamiento en base al ancho del primer item
    function getMinOffset() {
        return -(carouselItems.length - itemsAmount) * carouselItems[0].offsetWidth;
    }

    {
        const onDragStart = (e) => {
            isDragging = true;
            startX = getPositionX(e);
            CAROUSEL.style.cursor = "grabbing";
        }

        const onDrag = (e) => {
            if (!isDragging) return;
            const currentX = getPositionX(e);
            const diff = currentX - startX;
            const maxOffset = 0;
            const minOffset = getMinOffset();

            let newOffset = currentOffset + diff;
            if (newOffset > maxOffset) newOffset = maxOffset;
            if (newOffset < minOffset) newOffset = minOffset;

            carouselItems.forEach(item => {
                item.style.transform = `translateX(${newOffset}px)`;
            })
        }

        const onDragEnd = (e) => {
            if (!isDragging) return;
            const currentX = getPositionX(e);
            const diff = currentX - startX;
            currentOffset += diff;

            const maxOffset = 0;
            const minOffset = getMinOffset();

            if (currentOffset > maxOffset) {
                currentOffset = maxOffset;
            }
            if (currentOffset < minOffset) {
                currentOffset = minOffset;
            }
            carouselItems.forEach(item => {
                item.style.transform = `translateX(${currentOffset}px)`;
            })
            isDragging = false;
            CAROUSEL.style.cursor = "auto";
        }

        CAROUSEL.addEventListener("mousedown", onDragStart);
        CAROUSEL.addEventListener("touchstart", onDragStart);

        CAROUSEL.addEventListener("mousemove", onDrag);
        CAROUSEL.addEventListener("touchmove", onDrag);

        CAROUSEL.addEventListener("mouseup", onDragEnd);
        CAROUSEL.addEventListener("touchend", onDragEnd);
        CAROUSEL.addEventListener("mouseleave", onDragEnd);
    }

    CAROUSEL.querySelectorAll("img").forEach(img => {
        img.addEventListener("dragstart", e => e.preventDefault());
    })

    CAROUSEL.style.userSelect = "none";

    // --- AUTO MOVE CAROUSEL ---
    const AUTO_MOVE_STEP = 50; // píxeles por movimiento
    const AUTO_MOVE_INTERVAL = 2500; // milisegundos

    function autoMoveCarousel() {
        const minOffset = getMinOffset();
        if (currentOffset > minOffset) {
            currentOffset -= AUTO_MOVE_STEP;
            if (currentOffset < minOffset) currentOffset = minOffset;
            carouselItems.forEach(item => {
                item.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
                item.style.transform = `translateX(${currentOffset}px)`;
            });
        } else {
            clearInterval(autoMoveInterval);
        }
    }

    const autoMoveInterval = setInterval(autoMoveCarousel, AUTO_MOVE_INTERVAL);

    addStandardElements("index")
})
