export const initialize = (container, options) => {
    const overlay = container.querySelector(".sheet-overlay");
    const content = container.querySelector(".sheet-content");
    const icon = container.querySelector(".sheet-drag-icon");

    let isDragging = false;
    let startY = 0;
    let startHeight = 0;

    const updateHeight = (height) => {
        content.style.height = `${height}vh`;
        container.classList.toggle("fullscreen", height === 100);
    };

    const show = () => {
        options.events.onWillShow();

        container.classList.add("show");
        document.body.style.overflowY = "hidden";

        updateHeight(options.initialBreakpoint ?? options.breakpoints[0]);

        options.events.onDidShow();
    };

    const updateOptions = (newOptions, merge = true) => {
        if (!newOptions) return;

        if (merge) {
            options = {
                ...options,
                ...Object.entries(newOptions).reduce((acc, [key, value]) => {
                    if (value !== null && value !== undefined) {
                        acc[key] = value;
                    }
                    return acc;
                }, {})
            };
        }
        else {
            options = newOptions;
        }
    };

    const hide = () => {
        options.events.onWillDismiss();

        container.classList.remove("show");
        document.body.style.overflowY = "auto";

        options.events.onDidDismiss();
    };

    const dismiss = () => {
        if (options.lightDismiss) {
            hide();
        }
    };

    const dragStart = (e) => {
        isDragging = true;
        startY = e.pageY || e.touches?.[0].pageY;
        startHeight = parseInt(content.style.height);
        container.classList.add("dragging");
    };

    const dragging = (e) => {
        if (!isDragging) return;
        const delta = startY - (e.pageY || e.touches?.[0].pageY);
        const newHeight = startHeight + (delta / window.innerHeight) * 100;
        updateHeight(newHeight);
    };

    const dragStop = () => {
        isDragging = false;
        container.classList.remove("dragging");
        const sheetHeight = parseInt(content.style.height);
        if (sheetHeight < options.breakpoints[0]) {
            hide();
        }
        else {
            const closest = options.breakpoints.reduce((prev, curr) => {
                return (Math.abs(curr - sheetHeight) < Math.abs(prev - sheetHeight) ? curr : prev);
            });
            updateHeight(closest);
        }
    };

    icon.addEventListener("mousedown", dragStart);
    icon.addEventListener("mousemove", dragging);
    icon.addEventListener("mouseup", dragStop);

    icon.addEventListener("touchstart", dragStart, { passive: true });
    icon.addEventListener("touchmove", dragging, { passive: true });
    icon.addEventListener("touchend", dragStop, { passive: true });

    overlay.addEventListener("click", dismiss);

    return {
        show,
        hide,
        updateHeight,
        updateOptions,
        dispose: () => {
            icon.removeEventListener("mousedown", dragStart);
            icon.removeEventListener("mousemove", dragging);
            icon.removeEventListener("mouseup", dragStop);

            icon.removeEventListener("touchstart", dragStart);
            icon.removeEventListener("touchmove", dragging);
            icon.removeEventListener("touchend", dragStop);

            overlay.removeEventListener("click", dismiss);
        }
    };
};
