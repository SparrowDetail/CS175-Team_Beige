
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
        //entry.target.classList.remove("fade-in-animation");
    });
}, animationOptions);

/**Renders the header content based on administrator login*/
const renderHeader = () => {
    const adminSession = isAdmin();

    const headerHTML = `
        <img
            id="logo" 
            src="../../assets/logo.svg" 
            alt="logo"
            loading="eager"
            aria-label="Game Review Logo">
        <nav>
            <a href="../../index.html">Home</a>
            <a href="#">Contact</a>
            <a ${adminSession ? `onclick="logout()"` : `href="../../login.html"`}>
            ${adminSession ? "Logout" : "Admin"}
            </a>
            <a onclick="history.back()">Back</a>
        </nav>
    `;

    const header = document.querySelector("header");
    header.innerHTML = headerHTML;
};

/**Grants administrator permissions when an admin is logged in (i.e. edit article data).
 * 
 * NOTICE: changes are not permanent as article data isn't processed in any way. This is
 * merely a proof of concept.
 */
const adminProcess = () => {
    const adminSession = isAdmin();
    const editable = document.querySelectorAll("p, h1, h2, h3, figcaption, span");
    
    if (adminSession) {
        editable.forEach((e) => {
            e.contentEditable = true;
        });
    } else {
        editable.forEach((e) => {
            e.contentEditable = false;
        });
    }
};

/**Validation function to detect administrator login
 * 
 * @returns true if admin is logged in and false if admin is not logged in
 */
const isAdmin = () => {
    return window.sessionStorage.getItem("admin") ? true : false;
};

const pageProcess = () => {
    renderHeader();
    adminProcess();
    
    const fadeInElements = document.querySelectorAll("section > img, section > figure");
    fadeInElements.forEach((e) => {
        fadeInObserver.observe(e);
    });
};

/**Logout process for administrator. Sets the admin session variable to a falsy value
 * and re-renders components.
 */
const logout = () => {
    window.sessionStorage.setItem("admin", "");

    renderHeader();
    adminProcess();
};

//Establish all initial processes on page load
window.onload = () => {
    pageProcess();

    window.addEventListener("popstate", pageProcess());
};