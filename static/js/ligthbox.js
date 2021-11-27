document.querySelectorAll("img.lightbox").forEach((value) => {
    const instance = basicLightbox.create(value.outerHTML);
    value.onclick = () => instance.show();
});
