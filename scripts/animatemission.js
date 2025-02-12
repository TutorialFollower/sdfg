document.addEventListener("DOMContentLoaded", () => {
    const missionContent = document.querySelector(".mission-content");

    // Triggering fade-in animation on page load
    missionContent.style.opacity = 1;
    missionContent.style.transition = "opacity 2s ease-out";
    setTimeout(() => {
        missionContent.style.opacity = 1;
    }, 100);
});
