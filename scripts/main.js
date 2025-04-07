const sliderSwitch = document.getElementById("sliderSwitch");
const body = document.body;
const services = document.querySelectorAll("#serviceBox"); // Select all elements with ID 'serviceBox'

// Function to update box shadow for all service boxes
function updateBoxShadows() {
  const isDark = body.classList.contains("dark");
  services.forEach(service => {
    service.style.boxShadow = isDark
      ? "0 2px 6px rgb(230, 211, 104)"  // Green for dark mode
      : "0 4px 8px rgba(0, 0, 0, 0.3)";   // Black for light mode
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

  services.forEach(service => service.classList.add("active"));
  updateBoxShadows(); // Update shadows on toggle

  const isDark = body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


// Dynamic scale based on distance from center
const cardContainer = document.getElementById("cardContainer");

// You can add your own image URLs here
const imageUrls = [
  "assets/Creative Graphics/87d7ca0d-cea5-44a9-be73-942fe3efd58f.jpg",
  "assets/Creative Graphics/336720D6-63A9-4863-B032-9DF89F5D9FC4.jpeg",
  "assets/Creative Graphics/Black & Yellow Modern Exclusive Furniture Poster.png.png",
  "assets/Creative Graphics/Blue Modern Medical Health Flyer.png",
  "assets/Creative Graphics/Brown and Beige Modern Tailor Service Instagram Post.png.png",
  "assets/Creative Graphics/Cream Simple We Are Open Metal Sign.png",
  "assets/Creative Graphics/Happy Birthday.png.png",
  "assets/Creative Graphics/IMG_0081.JPG",
  "assets/Creative Graphics/IMG_7488.JPG",
  "assets/Creative Graphics/IMG_7489.JPG",
  "assets/Creative Graphics/IMG_8042.JPG",
  "assets/Creative Graphics/IMG_9268.PNG",
  "assets/Creative Graphics/Money Is Not The Goal.zip - 1.png",
  "assets/Creative Graphics/Money Is Not The Goal.zip - 2.png",
  "assets/Creative Graphics/Money Is Not The Goal.zip - 4.png",
  "assets/Creative Graphics/Money Is Not The Goal.zip - 5.png",
  "assets/Creative Graphics/Money Is Not The Goal.zip - 6.png",
  "assets/Creative Graphics/phonto.jpg",
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
    let scale = Math.max(0.80, 1.1 - distance / 600);
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
  };

  emailjs
    .send("service_1yl761q", "template_yyb9pal", params)
    .then(function (res) {
      alert("Email sent successfully!" + res.status);
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
