export var Card = {
  hydrate: function (pokemon) {
    let card = document.createElement("div");
    card.className = "pokemon-card";

    let types = Card.buildTypes(pokemon);

    card.innerHTML = `
        <img src="${pokemon.detail.sprites.front_default}" class="pokemon-image" alt="${pokemon.detail.name}" />
        <p class="pokemon-id">#${pokemon.detail.id}</p>
        <h2 class="pokemon-name"><a id="pokemon-detail-${pokemon.detail.id}" data-pokemon-id="${pokemon.detail.id}" href="${pokemon.detail.id}">${pokemon.detail.name}</a></h2>
        <div class="pokemon-types">${types}</div>
    `;

    return card;
  },

  buildTypes: function (pokemon) {
    let types = "";
    pokemon.detail.types.forEach((type) => {
      types += `<span class="pokemon-type">${type.type.name}</span>`;
    });
    return types;
  },
};
