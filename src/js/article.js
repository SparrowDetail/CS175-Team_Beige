const headerHTML = `
    <img
        id="logo" 
        src="../assets/logo.svg" 
        alt="logo"
        loading="eager"
        aria-label="Game Review Logo">
    <nav>
        <a href="#">Home</a>
        <a href="#">Console</a>
        <a href="#">About</a>
        <a href="#">Login</a>
    </nav>
`;

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

//Establish fade-in animations and load header on page load
window.onload = () => {
    const header = document.querySelector("header");
    header.innerHTML = headerHTML;

    const fadeInElements = document.querySelectorAll("[fade-in]");
    fadeInElements.forEach((e) => {
        fadeInObserver.observe(e);
    });
};