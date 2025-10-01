const sliderSwitch = document.getElementById("sliderSwitch");
const body = document.body;
const services = document.querySelectorAll("#serviceBox"); // Select all elements with ID 'serviceBox'

// Function to update box shadow for all service boxes
function updateBoxShadows() {
  const isDark = body.classList.contains("dark");
  services.forEach((service) => {
    service.style.boxShadow = isDark
      ? "0 2px 6px rgb(230, 211, 104)" // Green for dark mode
      : "0 4px 8px rgba(0, 0, 0, 0.3)"; // Black for light mode
  });
}

// Load saved theme or default to dark
const savedTheme = localStorage.getItem("theme");
const isDarkDefault = savedTheme !== "light";

if (isDarkDefault) {
  body.classList.add("dark");
  sliderSwitch.classList.remove("active");
} else {
  body.classList.add("light");
  sliderSwitch.classList.add("active");
}

updateBoxShadows(); // Initial update

sliderSwitch.addEventListener("click", () => {
  sliderSwitch.classList.toggle("active");
  body.classList.toggle("light");
  body.classList.toggle("dark");

  services.forEach((service) => service.classList.add("active"));
  updateBoxShadows(); // Update shadows on toggle

  const isDark = body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// mobile

const mobileToggle = document.getElementById("mobileThemeToggle");

function setMobileTheme(isDark) {
  document.body.classList.toggle("mobile-dark", isDark);
  document.body.classList.toggle("mobile-light", !isDark);
  localStorage.setItem("mobile-theme", isDark ? "mobile-dark" : "mobile-light");
  mobileToggle.textContent = isDark ? "🔆" : "🌙";
  updateBoxShadows(); // Update shadows on toggle
}

// Load saved preference
const savedMobileTheme = localStorage.getItem("mobile-theme") || "mobile-dark";
setMobileTheme(savedMobileTheme === "mobile-dark");

// Toggle on click
mobileToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("mobile-dark");
  setMobileTheme(!isDark);
});

// Dynamic scale based on distance from center
const cardContainer = document.getElementById("cardContainer");

// You can add your own image URLs here
const imageUrls = [
  "assets/images/adel.jpg",
  "assets/images/6million.jpg",
  "assets/images/view.jpg",
  "assets/images/view2.jpg",
  "assets/Portfolio/fd9587ac-0b2f-4e82-9764-53707f39c9d0.jpg",
  "assets/Creative Graphics/Black & Yellow Modern Exclusive Furniture Poster.png.png",
  "assets/Portfolio/WhatsApp Image 2025-04-13 at 12.12.25_b3ab982a.jpg",
  "assets/Portfolio/f8c2928d-fcf5-417f-994e-76e5e0e9c86f.jpg",
  // "assets/Portfolio/IMG_1822.PNG",
  "assets/Portfolio/phonto.jpg",
  "assets/Portfolio/IMG_8043.JPG",
  "assets/Portfolio/f17265b1-db73-440a-9c04-d651ce55bd67.jpg",
  "assets/Portfolio/IMG_8042.JPG",
  "assets/Portfolio/IMG_1828.JPG",
  "assets/Portfolio/IMG_9268.jpeg",
];

// Create cards dynamically with different images
imageUrls.forEach((url, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <div class="image-box">
          <img src="${url}" alt="Image ${index + 1}">
        </div>
      `;
  cardContainer.appendChild(card);
});

const cards = document.querySelectorAll(".card");

// Dynamic scale based on distance from center
cardContainer.addEventListener("scroll", () => {
  const containerCenter =
    cardContainer.scrollLeft + cardContainer.offsetWidth / 2;

  cards.forEach((card) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(containerCenter - cardCenter);

    // Distance-based scaling (you can tweak the divisor for effect)
    let scale = Math.max(0.8, 1.1 - distance / 600);
    card.style.transform = `scale(${scale})`;
  });
});

// Initial trigger
cardContainer.dispatchEvent(new Event("scroll"));

//    Send Message

function sendMail() {
  let params = {
    from_name: document.getElementById("fullName").value,
    email_id: document.getElementById("email_id").value,
    message: document.getElementById("message").value,
    to_email: "Sellcoxpress@gmail.com", // Optional, depending on your template setup
  };

  emailjs
    .send("service_1yl761q", "template_yyb9pal", params)
    .then(function (res) {
      alert("Email sent successfully! Status: " + res.status);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".progress-bar span").forEach((bar) => {
    bar.style.width = bar.style.width;
  });
});

// ======================================= Scroll Handler================================
document.addEventListener("DOMContentLoaded", function () {
  // Get all elements that need to be animated
  const animatedElements = document.querySelectorAll(
    ".slide-in, .slide-in-left, .slide-in-right"
  );

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
      rect.bottom >= 0
    );
  }

  // Function to handle scroll events
  function handleScroll() {
    animatedElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("active");
      } else {
        // Optional: Remove the class if you want animations to trigger again when scrolling back up
        // element.classList.remove('active');
      }
    });
  }

  // Debounce function to optimize performance
  function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Initial check in case elements are already in view
  handleScroll();

  // Add scroll event listener with debounce for performance
  window.addEventListener("scroll", debounce(handleScroll));

  // Optional: Trigger animations when window is resized (in case layout changes)
  window.addEventListener("resize", debounce(handleScroll));
});

let lastScrollTop = 0; // Keeps track of the last scroll position

window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  // If scrolling down
  if (currentScroll > lastScrollTop) {
    sliderSwitch.style.display = "none"; // Hide the section when scrolling up
  } else {
    sliderSwitch.style.display = "block"; // Show the section
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Reset the scroll position to prevent negative values
});
