const showNav = document.getElementById("show-nav");
const mobileNav = document.getElementById("mobile-nav");
const closeNav = document.getElementById("close-nav");

showNav.onclick = () => {
    mobileNav.classList.add("show");
};
closeNav.onclick = () => {
    mobileNav.classList.remove("show");
};
