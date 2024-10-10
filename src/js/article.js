//Fade-in observer
const animationOptions = {
    rootMargin: "20px",
    threshold: 0.5
};
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-animation");
            return;
        }
        entry.target.classList.remove("fade-in-animation");
    });
}, animationOptions);

//Establish fade-in animations on page load
window.onload = () => {
    const fadeInElements = document.querySelectorAll("[fade-in]");
    fadeInElements.forEach((e) => {
        fadeInObserver.observe(e);
    });
};