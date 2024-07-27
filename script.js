const shareBtn = document.querySelector(".btn-share");
const factForm = document.querySelector(".fact-form");

shareBtn.addEventListener("click", function () {
  if (factForm.classList.contains("hidden")) {
    factForm.classList.remove("hidden");
    this.textContent = "Close";
  } else {
    factForm.classList.add("hidden");
    this.textContent = "Share a fact";
  }
});
