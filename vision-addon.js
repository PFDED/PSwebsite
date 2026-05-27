// Add after joker.js on vision.html

document.addEventListener("DOMContentLoaded", () => {
    const galleryImages = Array.from(document.querySelectorAll(".vision-page .photo img"));
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    galleryImages.forEach((img, index) => {
        const card = img.closest(".photo");

        img.decoding = "async";
        img.sizes = "(max-width: 768px) calc(100vw - 4rem), (max-width: 1024px) calc((100vw - 8rem) / 2), calc((100vw - 14rem) / 3)";

        if (index < 3) {
            img.loading = "eager";
            img.fetchPriority = "high";
        } else {
            img.loading = "lazy";
            img.fetchPriority = "low";
        }

        const markLoaded = () => card?.classList.add("is-loaded");
        const markError = () => card?.classList.add("is-error");

        if (img.complete && img.naturalWidth > 0) {
            markLoaded();
        } else {
            img.addEventListener("load", markLoaded, { once: true });
            img.addEventListener("error", markError, { once: true });
        }
    });

    const setLightboxBackdrop = () => {
        if (!lightbox || !lightboxImg || !lightboxImg.currentSrc) return;
        lightbox.style.setProperty("--lightbox-bg", `url("${lightboxImg.currentSrc}")`);
    };

    document.addEventListener("click", (event) => {
        const clickedPhoto = event.target.closest(".vision-page .photo");
        const clickedImage = clickedPhoto?.querySelector("img");

        if (clickedImage?.currentSrc && lightbox) {
            lightbox.style.setProperty("--lightbox-bg", `url("${clickedImage.currentSrc}")`);
        }
    });

    if (lightboxImg) {
        lightboxImg.addEventListener("load", setLightboxBackdrop);
    }

    if (lightbox) {
        new MutationObserver(setLightboxBackdrop).observe(lightbox, {
            attributes: true,
            attributeFilter: ["class"]
        });
    }
});
