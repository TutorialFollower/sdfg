document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".topnav a");

    // Function to handle the transition
    const handleTransition = (event) => {
        event.preventDefault(); // Prevent immediate navigation
        const targetUrl = event.currentTarget.href; // Get the target URL

        // Add fade-out effect
        document.body.classList.add("fade-out");

        // Navigate to the next page after the fade-out effect completes
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 5000); // Matches the CSS transition duration
    };

    // Attach the click event listener to all navigation links
    links.forEach((link) => {
        link.addEventListener("click", handleTransition);
    });
});
