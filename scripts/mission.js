// Simple page transition effect when a link is clicked (optional)
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".topnav a");

    // Add a click event listener to each navigation link
    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default navigation
            const targetUrl = link.href; // Store the target URL

            // Add a fade-out effect before navigating
            document.body.style.transition = "opacity 0.5s ease-out";
            document.body.style.opacity = 0;

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500); // Match the fade-out transition duration
        });
    });
});
