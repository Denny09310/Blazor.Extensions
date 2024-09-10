class Refreshser {
    // Public Properties
    container;

    // Private Configuration Properties
    #options;
    #events;

    // Private State Properties
    #touchStartY = 0;
    #isPulling = false;

    // Private Element References
    #pull;
    #loader;

    // Private Event Handlers
    #onTouchStart;
    #onTouchMove;
    #onTouchEnd;

    constructor(container, options) {
        this.#options = options
        this.#events = this.#options?.events ?? {}

        this.container = container;
        this.#pull = this.container.querySelector(".pull-to-refresh");
        this.#loader = this.container.querySelector(".pull-to-refresh-loader");

        this.#onTouchStart = this.#touchStart.bind(this);
        this.#onTouchMove = this.#touchMove.bind(this);
        this.#onTouchEnd = this.#touchEnd.bind(this);

        this.#attachEvents();
    }

    dispose() {
        this.#deattachEvents();
    }

    #attachEvents() {
        this.container.addEventListener('touchstart', this.#onTouchStart);
        this.container.addEventListener('touchmove', this.#onTouchMove, { passive: false });
        this.container.addEventListener('touchend', this.#onTouchEnd);
    }

    #deattachEvents() {
        this.container.removeEventListener('touchstart', this.#onTouchStart);
        this.container.removeEventListener('touchmove', this.#onTouchMove);
        this.container.removeEventListener('touchend', this.#onTouchEnd);
    }

    #touchStart(e) {
        this.#touchStartY = e.touches[0].clientY;
        this.#isPulling = true;
    }

    #touchMove(e) {
        if (!this.#isPulling) return;

        const touchY = e.touches[0].clientY;
        const touchDiff = touchY - this.#touchStartY;
        if (touchDiff > 0 && window.scrollY === 0) {
            this.#pull.classList.add('visible');

            const rotation = Math.min(touchDiff, 100); 
            this.#loader.style.transform = `rotate(${rotation * 2}deg)`;

            e.preventDefault();
        }
    }

    #touchEnd() {
        if (this.#pull.classList.contains('visible')) {
            this.#pull.classList.remove('visible');
            this.#loader.style.transform = 'rotate(0deg)'; 

            this.#events.onRefresh();
        }

        this.#isPulling = false;
    }
}

export const initialize = (container, options) => new Refreshser(container, options);