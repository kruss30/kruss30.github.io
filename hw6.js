//genai was used as a reference for css selectors and transition ideas. final styling choices, selector decisions, and refinements were made by me.

//toggle filter form visibility and hide add form
function showFilter() {
  const filterForm = document.getElementById("filterContent");
  const addForm = document.getElementById("newContent");

  addForm.style.display = "none";

  if (filterForm.style.display === "flex") {
    filterForm.style.display = "none";
  } else {
    filterForm.style.display = "flex";
    filterForm.style.flexDirection = "column";
    filterForm.style.alignItems = "center";
  }
}

//toggle add form visibility and hide filter form
function showAddNew() {
  const filterForm = document.getElementById("filterContent");
  const addForm = document.getElementById("newContent");

  filterForm.style.display = "none";

  if (addForm.style.display === "flex") {
    addForm.style.display = "none";
  } else {
    addForm.style.display = "flex";
  }
}

//hide/show articles based on checkboxes
function filterArticles() {
  const showOpinion = document.getElementById("opinionCheckbox").checked;
  const showRecipe = document.getElementById("recipeCheckbox").checked;
  const showUpdate = document.getElementById("updateCheckbox").checked;

  const articles = document.querySelectorAll("#articleList article");

  articles.forEach((article) => {
    if (article.classList.contains("opinion")) {
      article.hidden = !showOpinion;
    } else if (article.classList.contains("recipe")) {
      article.hidden = !showRecipe;
    } else if (article.classList.contains("update")) {
      article.hidden = !showUpdate;
    }
  });
}

//create and append a new article with correct styling
function addNewArticle() {
  const title = document.getElementById("inputHeader").value.trim();
  const text = document.getElementById("inputArticle").value.trim();
  const typeInput = document.querySelector('input[name="articleType"]:checked');

  if (!title || !text || !typeInput) {
    alert("Please enter a title, choose a type, and enter text.");
    return;
  }

  const type = typeInput.value; //opinion, recipe, update
  const markerText = type === "update" ? "Update" : (type.charAt(0).toUpperCase() + type.slice(1));

  const article = document.createElement("article");
  article.classList.add(type);

  const marker = document.createElement("span");
  marker.classList.add("marker");
  marker.textContent = markerText;

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const pText = document.createElement("p");
  pText.textContent = text;

  const pLink = document.createElement("p");
  const a = document.createElement("a");
  a.href = "moreDetails.html";
  a.textContent = "Read more...";
  pLink.appendChild(a);

  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(pText);
  article.appendChild(pLink);

  document.getElementById("articleList").appendChild(article);

  //reset inputs
  document.getElementById("inputHeader").value = "";
  document.getElementById("inputArticle").value = "";
  document.getElementById("opinionRadio").checked = true;

  //apply current filters to the new article
  filterArticles();
}

//apply filters on initial load too
document.addEventListener("DOMContentLoaded", () => {
  filterArticles();
});
