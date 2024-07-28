const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// Selecting DOM elements
const shareBtn = document.querySelector(".btn-share");
const factForm = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// Create DOM elements: Render facts in list
factsList.innerHTML = "";

// Load data from Supabase
loadFacts();
async function loadFacts() {
  const res = await fetch(
    "https://omgtueykodxrzhujposa.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZ3R1ZXlrb2R4cnpodWpwb3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwMTg0MTUsImV4cCI6MjAzNzU5NDQxNX0.91lk_cvgnVOZZ0zmPx7c68MQY9Xpul_5ad4R71mURQ4",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZ3R1ZXlrb2R4cnpodWpwb3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwMTg0MTUsImV4cCI6MjAzNzU5NDQxNX0.91lk_cvgnVOZZ0zmPx7c68MQY9Xpul_5ad4R71mURQ4",
      },
    }
  );

  const data = await res.json();

  createFactsList(data);
}

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
      <p>
        ${fact.text}
        <a
          class="source"
          href="${fact.source}"
          target="_blank"
          >(Source)</a>
      </p>
      <span class="tag" style="background-color: ${getCategoryColor(
        CATEGORIES,
        fact.category
      )}">
      ${fact.category}
      </span>
    </li>`
  );

  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

// Toggle form visibility
shareBtn.addEventListener("click", function () {
  if (factForm.classList.contains("hidden")) {
    factForm.classList.remove("hidden");
    this.textContent = "Close";
  } else {
    factForm.classList.add("hidden");
    this.textContent = "Share a fact";
  }
});

function getCategoryColor(catergoriesObj, category) {
  return catergoriesObj.find((cat) => cat.name === category).color;
}
