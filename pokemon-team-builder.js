//note: genai was used as a reference for basic fetch and localstorage patterns.
//final logic, structure, and naming were written and adjusted by me.

"use strict";

const API_BASE = "https://pokeapi.co/api/v2/pokemon/";
const TEAM_KEY = "pokemon_team_builder_v1";

let currentPokemon = null;
let team = loadTeamFromStorage();

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnFind").addEventListener("click", onFindClicked);
  document.getElementById("btnAdd").addEventListener("click", onAddClicked);

  setupEmptyMoveMenus();
  renderTeamTable();
});

function normalizeQuery(raw) {
  return String(raw || "").trim().toLowerCase();
}

function cacheKeyFor(query) {
  return `poke_cache_${query}`;
}

function setStatus(msg) {
  document.getElementById("status").textContent = msg;
}

function showPokemonImage(url, name) {
  const img = document.getElementById("pokeImg");
  if (!url) {
    img.style.display = "none";
    img.src = "";
    return;
  }
  img.src = url;
  img.alt = `${name} sprite`;
  img.style.display = "block";
}

function showPokemonAudio(url) {
  const audio = document.getElementById("pokeAudio");
  if (!url) {
    audio.style.display = "none";
    audio.removeAttribute("src");
    audio.load();
    return;
  }
  audio.src = url;
  audio.style.display = "block";
  audio.load();
}

function setupEmptyMoveMenus() {
  const selects = getMoveSelects();
  for (const sel of selects) {
    sel.innerHTML = "";
    const opt = document.createElement("option");
    opt.textContent = "(load a pokemon first)";
    sel.appendChild(opt);
    sel.disabled = true;
  }
}

function getMoveSelects() {
  return [
    document.getElementById("move1"),
    document.getElementById("move2"),
    document.getElementById("move3"),
    document.getElementById("move4"),
  ];
}

async function onFindClicked() {
  const query = normalizeQuery(document.getElementById("pokeQuery").value);
  document.getElementById("btnAdd").disabled = true;

  currentPokemon = null;
  setupEmptyMoveMenus();
  showPokemonImage(null, null);
  showPokemonAudio(null);

  if (!query) {
    setStatus("Please enter a Pokemon name or ID.");
    return;
  }

  setStatus("Loading...");

  try {
    const data = await getPokemonData(query);
    currentPokemon = simplifyPokemon(data);

    setStatus(`Loaded: ${currentPokemon.name} (#${currentPokemon.id})`);
    showPokemonImage(currentPokemon.spriteUrl, currentPokemon.name);
    showPokemonAudio(currentPokemon.cryUrl);

    populateMoveMenus(currentPokemon.moveNames);
    document.getElementById("btnAdd").disabled = false;
  } catch (err) {
    setStatus("Pokemon not found. Try another name or ID.");
  }
}

async function getPokemonData(query) {
  const key = cacheKeyFor(query);
  const cached = localStorage.getItem(key);

  if (cached) {
    return JSON.parse(cached);
  }

  const response = await fetch(API_BASE + encodeURIComponent(query));

  if (!response.ok) {
    throw new Error("Fetch failed");
  }

  const json = await response.json();
  localStorage.setItem(key, JSON.stringify(json));
  return json;
}

function simplifyPokemon(data) {
  const name = data.name;
  const id = data.id;

  const spriteUrl = data.sprites.front_default || "";

  let cryUrl = "";
  if (data.cries && data.cries.latest) {
    cryUrl = data.cries.latest;
  } else if (data.cries && data.cries.legacy) {
    cryUrl = data.cries.legacy;
  }

  const moveNames = data.moves
    .map((m) => m.move.name)
    .sort();

  return { name, id, spriteUrl, cryUrl, moveNames };
}

function populateMoveMenus(moveNames) {
  const selects = getMoveSelects();

  for (const sel of selects) {
    sel.disabled = false;
    sel.innerHTML = "";

    const first = document.createElement("option");
    first.value = "";
    first.textContent = "(choose a move)";
    sel.appendChild(first);

    for (const move of moveNames) {
      const opt = document.createElement("option");
      opt.value = move;
      opt.textContent = move;
      sel.appendChild(opt);
    }
  }
}

function onAddClicked() {
  if (!currentPokemon) return;

  const chosenMoves = getMoveSelects().map(s => s.value);

  if (chosenMoves.some(m => m === "")) {
    setStatus("Select four moves before adding to your team.");
    return;
  }

  if (team.length >= 6) {
    setStatus("Your team already has 6 Pokemon.");
    return;
  }

  team.push({
    name: currentPokemon.name,
    spriteUrl: currentPokemon.spriteUrl,
    moves: chosenMoves
  });

  localStorage.setItem(TEAM_KEY, JSON.stringify(team));
  renderTeamTable();
  setStatus(`${currentPokemon.name} added to team.`);
}

function renderTeamTable() {
  const tbody = document.querySelector("#teamTable tbody");
  tbody.innerHTML = "";

  for (const member of team) {
    const row = document.createElement("tr");

    const left = document.createElement("td");
    const img = document.createElement("img");
    img.src = member.spriteUrl;
    img.className = "teamSprite";
    left.appendChild(img);

    const right = document.createElement("td");
    const ul = document.createElement("ul");
    ul.className = "movesList";

    for (const move of member.moves) {
      const li = document.createElement("li");
      li.textContent = move;
      ul.appendChild(li);
    }

    right.appendChild(ul);

    row.appendChild(left);
    row.appendChild(right);
    tbody.appendChild(row);
  }
}

function loadTeamFromStorage() {
  const saved = localStorage.getItem(TEAM_KEY);
  return saved ? JSON.parse(saved) : [];
}
