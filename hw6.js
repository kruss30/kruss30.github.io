//genai was used as a reference for css selectors and transition ideas. final styling choices, selector decisions, and refinements were made by me.

function showFilter() {
  var filterForm = document.getElementById("filterContent");
  var addForm = document.getElementById("newContent");

  //hide the other panel
  addForm.style.display = "none";

  //toggle this one
  if (filterForm.style.display === "none" || filterForm.style.display === "") {
    filterForm.style.display = "flex";
    filterForm.style.flexDirection = "column";
    filterForm.style.alignItems = "center";
  } else {
    filterForm.style.display = "none";
  }
}

function showAddNew() {
  var filterForm = document.getElementById("filterContent");
  var addForm = document.getElementById("newContent");

  //hide the other panel
  filterForm.style.display = "none";

  //toggle this one
  if (addForm.style.display === "none" || addForm.style.display === "") {
    addForm.style.display = "flex";
  } else {
    addForm.style.display = "none";
  }
}

function filterArticles() {
  var showOpinion = document.getElementById("opinionCheckbox").checked;
  var showRecipe = document.getElementById("recipeCheckbox").checked;
  var showUpdate = document.getElementById("updateCheckbox").checked;

  var articles = document.querySelectorAll("#articleList article");

  for (var i = 0; i < articles.length; i++) {
    var a = articles[i];

    if (a.classList.contains("opinion")) {
      a.hidden = !showOpinion;
    } else if (a.classList.contains("recipe")) {
      a.hidden = !showRecipe;
    } else if (a.classList.contains("update")) {
      a.hidden = !showUpdate;
    }
  }
}

function addNewArticle() {
  var title = document.getElementById("inputHeader").value.trim();
  var text = document.getElementById("inputArticle").value.trim();

  var picked = document.querySelector('input[name="articleType"]:checked');
  if (picked === null) {
    alert("Please choose an article type.");
    return;
  }
  var type = picked.value; //opinion, recipe, update

  if (title === "" || text === "") {
    alert("Please enter a title and text.");
    return;
  }

  //create the article
  var article = document.createElement("article");
  article.className = type;

  //badge text
  var badgeText = "Opinion";
  if (type === "recipe") badgeText = "Recipe";
  if (type === "update") badgeText = "Update";

  //marker
  var marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = badgeText;

  //title
  var h2 = document.createElement("h2");
  h2.textContent = title;

  //body
  var p = document.createElement("p");
  p.textContent = text;

  //read more
  var p2 = document.createElement("p");
  var link = document.createElement("a");
  link.href = "moreDetails.html";
  link.textContent = "Read more...";
  p2.appendChild(link);

  //assemble
  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(p);
  article.appendChild(p2);

  //add to page
  document.getElementById("articleList").appendChild(article);

  //clear inputs
  document.getElementById("inputHeader").value = "";
  document.getElementById("inputArticle").value = "";
  document.getElementById("opinionRadio").checked = true;

  //make sure new article respects current filter settings
  filterArticles();
}

//optional: apply filter on first load so the page matches checkbox defaults
document.addEventListener("DOMContentLoaded", function () {
  filterArticles();
});

//apply filters on initial load too
document.addEventListener("DOMContentLoaded", () => {
  filterArticles();
});
