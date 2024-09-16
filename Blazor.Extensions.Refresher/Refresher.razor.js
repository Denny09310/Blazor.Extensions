export const initialize = (loader, options) => {
    const container = document.querySelector(options.containerSelector);

    let touchstartY = 0;
    let refreshTriggered = false;

    const ontouchstart = e => {
        touchstartY = e.touches[0].clientY;
        refreshTriggered = false;
    };

    const ontouchmove = e => {
        const touchY = e.touches[0].clientY;
        const touchDiff = touchY - touchstartY;

        // Check if container is scrolled to the top
        if (container.scrollTop === 0 && touchDiff > options.refreshThreshold) {
            loader.dataset.visible = true;

            const rotation = touchDiff % 360; // Rotate based on touch difference
            loader.style.transform = `rotate(${rotation}deg)`;

            // Only prevent default if the event is cancelable
            if (e.cancelable) {
                e.preventDefault();
            }

            // Set refreshTriggered to true so touchend can handle it
            refreshTriggered = true;
        }

        // Remove refresher if scrolling up (touchDiff < 0)
        if (touchDiff < 0 && 'visible' in loader.dataset) {
            delete loader.dataset.visible;
            loader.style.transform = '';
        }
    };

    const ontouchend = async () => {
        if (refreshTriggered && 'visible' in loader.dataset) {
            delete loader.dataset.visible;
            loader.style.transform = ''; // Reset icon rotation after refresh ends
            await options.events.onRefresh();
        }
    };

    container.addEventListener('touchstart', ontouchstart);
    container.addEventListener('touchmove', ontouchmove);
    container.addEventListener('touchend', ontouchend);

    return {
        dispose: () => {
            container.removeEventListener('touchstart', ontouchstart);
            container.removeEventListener('touchmove', ontouchmove);
            container.removeEventListener('touchend', ontouchend);
        }
    }
};
