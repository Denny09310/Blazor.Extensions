export const initialize = (element, options) => {
    const onanimationend = (e) => {
        if (e.animationName.includes("snackbar-exit")) {
            hide();
        }
    }

    const show = () => {
        options.events.onWillShow();

        element.classList.add("show");
        element.addEventListener("animationend", onanimationend)

        options.events.onDidShow();
    }

    const hide = () => {
        options.events.onWillDismiss();

        element.classList.remove("show");
        element.removeEventListener("animationend", onanimationend)

        options.events.onDidDismiss();
    }

    return {
        dispose: () => {
        },
        show,
        hide,
    }
}