export var Modal = {
  modal: document.querySelector(".modal"),
  modalContent: document.querySelector(".modal-content"),
  modalClose: document.querySelector(".modal-close"),
  overlay: document.querySelector(".overlay"),

  show: function () {
    this.overlay.style.display = "block";
    this.modal.style.display = "block";
  },

  hide: function () {
    this.overlay.style.display = "none";
    this.modal.style.display = "none";
  },

  register: function () {
    this.modalClose.addEventListener("click", function (event) {
      event.preventDefault();
      Modal.hide();
    });
  },

  hydrate: function (pokemon) {
    let content = `
        <h2 class="pokemon-name">${pokemon.name}</h2>
        <img src="${pokemon.sprites.other.dream_world.front_default}" class="pokemon-main-image" alt="${pokemon.name}" />
        <table>
          <tr><td>Height</td><td>${pokemon.height} decimeters</td></tr>
          <tr><td>Weight</td><td>${pokemon.weight} hectograms</td></tr>
          <tr><td>Abilities</td><td>
      `;
    pokemon.abilities.forEach(function (ability) {
      content += `<span class="">${ability.ability.name}, </span>`;
    });
    content += `</td></tr>`;
    content += `<tr><td>Stats</td><td>`;
    pokemon.stats.forEach(function (stat) {
      content += `<span class="">${stat.stat.name}: ${stat.base_stat}, </span>`;
    });
    content += `</td></tr>`;
    content += `<tr><td>Types</td><td>`;
    pokemon.types.forEach(function (type) {
      content += `<span class="">${type.type.name}, </span>`;
    });
    content += `</td></tr>`;
    content += `</table>`;
    this.modalContent.innerHTML = content;
  },
};
