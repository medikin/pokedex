import { getAPIURLForPokemon, POKEMON_URL } from "./utilities/api";
import { Modal } from "./utilities/modal";
import { Card } from "./utilities/card";

var app = document.querySelector(".app");
app.innerHTML = `<div class="container pokemon-listing">
    <div class="pokemon grid-container"></div>
  </div>
  <div class="container">
    <button class="load-more">Load More</button>
  </div>`;

var pokemonElem = document.querySelector(".pokemon");
var loadMore = document.querySelector(".load-more");
var pokemonCollection = [];
var modal = Modal;
modal.register();

getSomePokemon();

async function getSomePokemon(offset = 1, limit = 20) {
  for (let i = offset; i < limit + offset; i++) {
    await fetch(getAPIURLForPokemon(i))
      .then((response) => response.json())
      .then((pokemon) => addPokemonToLoadedPokemonArray(pokemon, i))
      .catch((error) => console.log(error));
  }
  pokemonCollection.sort((a, b) => sortPokemonCollectionByID);
  addPokemonToDOM();
  pokemonCollection = [];
}

function sortPokemonCollectionByID(pokemonA, pokemonB) {
  if (pokemonA.id > pokemonB.id) return -1;
  if (pokemonA.id < pokemonB.id) return 1;
  return 0;
}

function addPokemonToLoadedPokemonArray(pokemon, i) {
  pokemonCollection.push({
    detail: pokemon,
  });
}

function addPokemonToDOM() {
  pokemonCollection.forEach((pokemon) => {
    let card = Card;
    pokemonElem.append(card.hydrate(pokemon));

    let pokemonEventTrigger = document.querySelector(
      `#pokemon-detail-${pokemon.detail.id}`
    );

    pokemonEventTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      getPokemonDetail(event.target.getAttribute("data-pokemon-id"));
    });
  });
}

loadMore.addEventListener("click", function () {
  let loadedPokemonCount = document.querySelectorAll(".pokemon-card").length;
  getSomePokemon(loadedPokemonCount + 1);
});

async function getPokemonDetail(pokemonID) {
  await fetch(getAPIURLForPokemon(pokemonID))
    .then((response) => response.json())
    .then(function (pokemon) {
      modal.hydrate(pokemon);
    })
    .then(function () {
      modal.show();
    })
    .catch((error) => console.log(error));
}
