document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".slider-container");
  const sliderImages = document.querySelectorAll(".slider-img");
  let activeIndex = 0;
  let isDragging = false;
  let startX, scrollLeft;

  // Function to update the active image with animation
  function updateActiveImage(newIndex, direction) {
      sliderImages.forEach((img, index) => {
          img.classList.remove("active", "slide-left", "slide-right", "zoomed");
          img.style.zIndex = "1";
          img.style.transform = "translateX(0) scale(1)";
          img.style.backgroundSize = ""; // Reset background size for magnification

          if (index === newIndex) {
              img.classList.add("active");
              img.style.zIndex = "10";
              img.style.transform = "scale(1.3)";
              img.style.cursor = "zoom-in";

              if (direction === "left") {
                  img.classList.add("slide-left");
              } else if (direction === "right") {
                  img.classList.add("slide-right");
              }
          } else if (index === newIndex - 1 || index === newIndex + 1) {
              img.style.transform = "scale(1.1)";
              img.style.zIndex = "5";
          }
      });

      sliderImages[newIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
      });

      activeIndex = newIndex;
  }

  // Magnifying glass effect
  function addMagnifyEffect(img) {
      img.addEventListener("mousemove", (event) => {
          const rect = img.getBoundingClientRect();
          const x = event.clientX - rect.left; // Get mouse X position
          const y = event.clientY - rect.top; // Get mouse Y position

          img.style.backgroundPosition = `${(x / rect.width) * 100}% ${
              (y / rect.height) * 100
          }%`;
          img.style.transform = "scale(2)";
          img.style.backgroundSize = "200%"; // Increase background size for zoom
      });

      img.addEventListener("mouseleave", () => {
          img.style.transform = "scale(1.3)";
          img.style.backgroundSize = ""; // Reset background size
          img.style.backgroundPosition = ""; // Reset background position
      });
  }

  // Add magnify effect to active image
  sliderImages.forEach((img) => {
      addMagnifyEffect(img);
  });

  // Mouse and touch events for dragging
  const startDrag = (event) => {
      isDragging = true;
      startX = event.pageX || event.touches[0].pageX;
      scrollLeft = sliderContainer.scrollLeft;
  };

  const moveDrag = (event) => {
      if (!isDragging) return;
      const moveX = (event.pageX || event.touches[0].pageX) - startX;
      sliderContainer.scrollLeft = scrollLeft - moveX;
  };

  const stopDrag = () => {
      isDragging = false;
  };

  sliderContainer.addEventListener("mousedown", startDrag);
  sliderContainer.addEventListener("mousemove", moveDrag);
  sliderContainer.addEventListener("mouseup", stopDrag);
  sliderContainer.addEventListener("mouseleave", stopDrag);
  sliderContainer.addEventListener("touchstart", startDrag);
  sliderContainer.addEventListener("touchmove", moveDrag);
  sliderContainer.addEventListener("touchend", stopDrag);
  sliderContainer.addEventListener("touchcancel", stopDrag);

  // Arrow key navigation
  document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
          event.preventDefault();
          const nextIndex = (activeIndex + 1) % sliderImages.length;
          updateActiveImage(nextIndex, "right");
      } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          const prevIndex =
              (activeIndex - 1 + sliderImages.length) % sliderImages.length;
          updateActiveImage(prevIndex, "left");
      }
  });

  // Prevent scrolling on the container
  sliderContainer.addEventListener("wheel", (event) => {
      event.preventDefault();
  });

  // Initialize the first active image
  updateActiveImage(activeIndex);
});
