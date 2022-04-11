export const BASE_API_URL = "https://pokeapi.co/api/v2/";
export const POKEMON_URL = BASE_API_URL + "pokemon/";

export function getAPIURLForType(pokemonID) {
  return BASE_API_URL + "type/" + pokemonID;
}

export function getAPIURLForPokemon(pokemonID) {
  return POKEMON_URL + pokemonID + "/";
}
