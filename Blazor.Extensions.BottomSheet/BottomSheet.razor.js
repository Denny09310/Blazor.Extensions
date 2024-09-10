class BottomSheet {
    // Public Properties
    container;

    // Private Configuration Properties
    #options;
    #events;

    // Private State Properties
    #isDragging = false;
    #startY;
    #startHeight;

    // Private Element References
    #content;
    #icon;

    // Private Event Handlers
    #onDragStart;
    #onDragging;
    #onDragStop;

    constructor(container, options) {
        this.#options = options;
        this.#events = options?.events ?? {};

        this.container = container;
        const overlay = this.container.querySelector(".sheet-overlay");

        this.#content = this.container.querySelector(".sheet-content");
        this.#icon = this.container.querySelector(".sheet-drag-icon");

        this.#onDragStart = this.#dragStart.bind(this);
        this.#onDragging = this.#dragging.bind(this);
        this.#onDragStop = this.#dragStop.bind(this);

        overlay.addEventListener("click", this.#dismiss.bind(this));
    }

    show() {
        this.#events.onWillShow();

        this.#attachEvents()

        this.container.classList.add("show");
        document.body.style.overflowY = "hidden";

        this.updateHeight(this.#options.initialBreakpoint ?? this.#options.breakpoints[0]);

        this.#events.onDidShow();
    }

    updateHeight(height) {
        this.#content.style.height = `${height}vh`;
        this.container.classList.toggle("fullscreen", height === 100);
    }

    updateOptions(options, merge = true) {
        if (!options) return;

        if (merge) {
            this.#options = {
                ...this.#options,
                ...Object.entries(options).reduce((acc, [key, value]) => {
                    if (value !== null && value !== undefined) {
                        acc[key] = value;
                    }
                    return acc;
                }, {})
            };

            this.#events = {
                ...this.#events,
                ...options?.events ?? {}
            };
        }
        else {
            this.#options = options;
            this.#events = options?.events ?? {}
        }
    }

    hide() {
        this.#events.onWillDismiss();

        this.container.classList.remove("show");
        document.body.style.overflowY = "auto";

        this.#deattachEvents();

        this.#events.onDidDismiss();
    }

    #dismiss() {
        if (this.#options.lightDismiss) {
            this.hide()
        }
    }

    #attachEvents() {
        this.#icon.addEventListener("mousedown", this.#onDragStart);
        document.addEventListener("mousemove", this.#onDragging);
        document.addEventListener("mouseup", this.#onDragStop);

        this.#icon.addEventListener("touchstart", this.#onDragStart, { passive: true });
        document.addEventListener("touchmove", this.#onDragging, { passive: true });
        document.addEventListener("touchend", this.#onDragStop, { passive: true });
    }

    #deattachEvents() {
        this.#icon.removeEventListener("mousedown", this.#onDragStart);
        document.removeEventListener("mousemove", this.#onDragging);
        document.removeEventListener("mouseup", this.#onDragStop);

        this.#icon.removeEventListener("touchstart", this.#onDragStart, { passive: true });
        document.removeEventListener("touchmove", this.#onDragging, { passive: true });
        document.removeEventListener("touchend", this.#onDragStop, { passive: true });
    }

    #dragStart = (e) => {
        this.#isDragging = true;
        this.#startY = e.pageY || e.touches?.[0].pageY;
        this.#startHeight = parseInt(this.#content.style.height);
        this.container.classList.add("dragging");
    };

    #dragging = (e) => {
        if (!this.#isDragging) return;
        const delta = this.#startY - (e.pageY || e.touches?.[0].pageY);
        const newHeight = this.#startHeight + (delta / window.innerHeight) * 100;
        this.updateHeight(newHeight);
    };

    #dragStop = () => {
        this.#isDragging = false;
        this.container.classList.remove("dragging");
        const sheetHeight = parseInt(this.#content.style.height);
        if (sheetHeight < this.#options.breakpoints[0]) {
            this.hide();
        }
        else if (sheetHeight > this.#options.breakpoints[this.#options.breakpoints.length - 1]) {
            this.updateHeight(100);
        }
        else {
            const closest = this.#options.breakpoints.reduce((prev, curr) => {
                return (Math.abs(curr - sheetHeight) < Math.abs(prev - sheetHeight) ? curr : prev);
            });
            this.updateHeight(closest);
        }
    };
}

export const initialize = (container, options) => new BottomSheet(container, options)