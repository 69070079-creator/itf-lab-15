const foods = [
  {
    name: "Fire-Roasted Margherita",
    description:
      "Blistered sourdough crust, San Marzano tomato, fior di latte and a snowfall of basil. Simple, smoky, perfect.",
    price: 16.5,
    category: "Wood-fired",
    time: "20 min",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85",
    alt: "A freshly baked margherita pizza on a rustic wooden table",
    accent: "#e95d38",
    soft: "#f8e0d5",
  },
  {
    name: "Double Trouble Smash Burger",
    description:
      "Two caramelised beef patties, molten cheddar, house pickles and secret sauce on a toasted brioche bun.",
    price: 14,
    category: "American",
    time: "15 min",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85",
    alt: "A double cheeseburger with melted cheese on a wooden board",
    accent: "#b98243",
    soft: "#f4e6cf",
  },
  {
    name: "Midnight Shrimp Ramen",
    description:
      "Springy noodles in a rich miso broth with charred prawns, a jammy egg and sesame-dressed greens.",
    price: 17.5,
    category: "Japanese",
    time: "25 min",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=85",
    alt: "A bowl of shrimp ramen with soft-boiled eggs and chopsticks",
    accent: "#d26b48",
    soft: "#f7e1d5",
  },
  {
    name: "Salmon Crunch Roll",
    description:
      "Buttery salmon, creamy avocado and cucumber, rolled in crunchy panko rice with a glossy soy glaze.",
    price: 18,
    category: "Sushi bar",
    time: "18 min",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=85",
    alt: "Salmon sushi rolls topped with avocado and sesame seeds",
    accent: "#e17458",
    soft: "#fce4da",
  },
  {
    name: "Slow-Braised Beef Pasta",
    description:
      "Silky fettuccine tangled with fall-apart beef, slow-roasted tomatoes, wilted spinach and parmesan.",
    price: 19,
    category: "Italian",
    time: "30 min",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=85",
    alt: "Fettuccine pasta with slow-braised beef and tomatoes in a pan",
    accent: "#b8893d",
    soft: "#f5e8d1",
  },
  {
    name: "The Green Goddess Bowl",
    description:
      "Creamy avocado, crisp greens, chickpeas and roasted sweet potato with a bright, herby dressing.",
    price: 13.5,
    category: "Plant-powered",
    time: "12 min",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
    alt: "A colorful salad bowl with avocado, chickpeas and fresh vegetables",
    accent: "#719b5c",
    soft: "#e4efd8",
  },
  {
    name: "Street-Style Taco Trio",
    description:
      "Three warm corn tortillas piled with charred corn, crunchy slaw, lime and your choice of filling.",
    price: 12.5,
    category: "Mexican",
    time: "15 min",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=85",
    alt: "Three street-style tacos filled with vegetables and salsa",
    accent: "#dea033",
    soft: "#f9ebca",
  },
  {
    name: "Caramel Cloud Brownie",
    description:
      "A fudgy dark-chocolate brownie under vanilla ice cream, salted caramel and a crisp wafer crunch.",
    price: 9.5,
    category: "Sweet finish",
    time: "10 min",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1000&q=85",
    alt: "A warm brownie with vanilla ice cream and salted caramel sauce",
    accent: "#a97140",
    soft: "#f0e1d6",
    imagePosition: "center 58%",
  },
];

const elements = {
  card: document.querySelector("#foodCard"),
  image: document.querySelector("#foodImage"),
  index: document.querySelector("#foodIndex"),
  price: document.querySelector("#foodPrice"),
  category: document.querySelector("#foodCategory"),
  time: document.querySelector("#foodTime"),
  name: document.querySelector("#foodName"),
  description: document.querySelector("#foodDescription"),
  count: document.querySelector("#foodCount"),
  announcement: document.querySelector("#liveAnnouncement"),
};

const pickButtons = [
  document.querySelector("#pickButton"),
  document.querySelector("#navPickButton"),
];

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const imageCache = new Map();
let currentIndex = 0;
let isPicking = false;

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function getNextIndex() {
  if (foods.length < 2) return 0;

  let nextIndex = currentIndex;
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * foods.length);
  }
  return nextIndex;
}

function preloadMenuImages() {
  foods.forEach((food) => {
    if (!imageCache.has(food.image)) {
      const image = new Image();
      image.src = food.image;
      imageCache.set(food.image, image);
    }
  });
}

function renderFood(index, announce = true) {
  const food = foods[index];
  const total = String(foods.length).padStart(2, "0");
  const current = String(index + 1).padStart(2, "0");

  elements.image.src = food.image;
  elements.image.alt = food.alt;
  elements.image.style.objectPosition = food.imagePosition || "center";
  elements.index.textContent = `Pick ${current} / ${total}`;
  elements.price.textContent = currency.format(food.price);
  elements.category.textContent = food.category;
  elements.time.textContent = food.time;
  elements.name.textContent = food.name;
  elements.description.textContent = food.description;
  elements.count.innerHTML = `${current} <span>/</span> ${total}`;

  elements.card.style.setProperty("--dish-accent", food.accent);
  elements.card.style.setProperty("--dish-soft", food.soft);

  if (announce) {
    elements.announcement.textContent = `Now showing ${food.name}. ${food.description} Price: ${currency.format(food.price)}.`;
  }
}

function setPickingState(isActive) {
  isPicking = isActive;

  pickButtons.forEach((button) => {
    button.disabled = isActive;
    button.classList.toggle("is-picking", isActive);
    button.setAttribute("aria-busy", String(isActive));
  });
}

async function pickRandomFood() {
  if (isPicking) return;

  setPickingState(true);

  const reducedMotion = motionPreference.matches;
  const nextIndex = getNextIndex();
  const card = elements.card;

  card.classList.add("is-shuffling");
  await wait(reducedMotion ? 0 : 200);

  currentIndex = nextIndex;
  renderFood(currentIndex);

  card.classList.remove("is-shuffling");
  card.classList.remove("is-landing");
  void card.offsetWidth;
  card.classList.add("is-landing");

  await wait(reducedMotion ? 0 : 500);

  card.classList.remove("is-landing");
  setPickingState(false);
}

pickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "navPickButton" && window.matchMedia("(max-width: 900px)").matches) {
      document.querySelector("#picker").scrollIntoView({
        behavior: motionPreference.matches ? "auto" : "smooth",
        block: "start",
      });
    }

    pickRandomFood();
  });
});

document.querySelector("#currentYear").textContent = String(new Date().getFullYear());

// Sync the initial card with the data, including its theme colors.
renderFood(currentIndex, false);

// Warm the cache during idle time so every re-roll feels instant.
if ("requestIdleCallback" in window) {
  window.requestIdleCallback(preloadMenuImages, { timeout: 1800 });
} else {
  window.setTimeout(preloadMenuImages, 500);
}
