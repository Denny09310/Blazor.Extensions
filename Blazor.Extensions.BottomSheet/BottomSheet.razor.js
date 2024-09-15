export const initialize = (container, options) => {
    let { events, breakpoints, initialBreakpoint, lightDismiss } = options;

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
        events.onWillShow();

        container.classList.add("show");
        document.body.style.overflowY = "hidden";

        updateHeight(initialBreakpoint ?? breakpoints[0]);

        events.onDidShow();
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

            events = {
                ...events,
                ...newOptions?.events ?? {}
            };
        }
        else {
            options = newOptions;
            events = newOptions?.events ?? {};
        }
    };

    const hide = () => {
        events.onWillDismiss();

        container.classList.remove("show");
        document.body.style.overflowY = "auto";

        events.onDidDismiss();
    };

    const dismiss = () => {
        if (lightDismiss) {
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
        if (sheetHeight < breakpoints[0]) {
            hide();
        }
        else if (sheetHeight > breakpoints[breakpoints.length - 1]) {
            updateHeight(100);
        }
        else {
            const closest = breakpoints.reduce((prev, curr) => {
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
        dispose: () => {
            icon.removeEventListener("mousedown", dragStart);
            icon.removeEventListener("mousemove", dragging);
            icon.removeEventListener("mouseup", dragStop);

            icon.removeEventListener("touchstart", dragStart, { passive: true });
            icon.removeEventListener("touchmove", dragging, { passive: true });
            icon.removeEventListener("touchend", dragStop, { passive: true });

            overlay.removeEventListener("click", dismiss);
        },
        show,
        hide,
        updateHeight,
        updateOptions,
    };
};
