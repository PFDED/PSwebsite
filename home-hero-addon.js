// Add after joker.js on index.html

document.addEventListener("DOMContentLoaded", () => {
    const home = document.getElementById("home");
    const rightPanel = document.querySelector(".right-panel");

    if (!home) return;

    const getScrollTop = () => {
        const panelStyle = rightPanel ? window.getComputedStyle(rightPanel) : null;
        const panelScrolls = rightPanel && panelStyle?.overflowY !== "visible" && rightPanel.scrollHeight > rightPanel.clientHeight;
        return panelScrolls ? rightPanel.scrollTop : window.scrollY;
    };

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    let ticking = false;

    const updateHomeFade = () => {
        const homeHeight = Math.max(home.offsetHeight, window.innerHeight);
        const progress = clamp(getScrollTop() / (homeHeight * 0.86), 0, 1);

        home.style.setProperty("--home-bg-opacity", String(1 - progress * 0.92));
        home.style.setProperty("--home-bg-scale", String(1.04 + progress * 0.05));
        home.style.setProperty("--home-content-opacity", String(1 - progress * 1.15));
        home.style.setProperty("--home-content-y", `${Math.round(progress * -58)}px`);

        ticking = false;
    };

    const requestUpdate = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateHomeFade);
    };

    rightPanel?.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    updateHomeFade();
});
