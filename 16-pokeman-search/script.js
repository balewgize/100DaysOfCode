const pokemonID = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const pokemonListUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pokemonDetailsUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

let allPokemons = [];

const fetchAllPokemon = async () => {
    try {
        const response = await fetch(pokemonListUrl);
        const data = await response.json();
        allPokemons = data["results"];
    } catch (error) {
        console.error(error);
    }
};

fetchAllPokemon();


const fetchPokemon = async (pokemonNameOrId) => {
    const pokemon = allPokemons.find((item) => {
        return item.id === pokemonNameOrId || item.name === pokemonNameOrId
    });

    if (!pokemon) {
        alert('Pokémon not found');
        return;
    }

    try {
        const response = await fetch(pokemonDetailsUrl + pokemonNameOrId);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const displayPokemon = (pokemonData) => {
    if (!pokemonData) return;

    // Build HTML elements with desired information and classes
    const { name, id, sprites, stats } = pokemonData;

    pokemonName.textContent = name.toUpperCase();
    pokemonID.textContent = `#${id}`;
    spriteContainer.innerHTML = `<img src="${sprites.front_default}" id="sprite">`;
    types.innerHTML = pokemonData.types.map((item) => `<span class="${item.type.name}">${item.type.name.toUpperCase()}</span>`).join('');
    height.textContent = `Height: ${pokemonData.height}`;
    weight.textContent = `Weight: ${pokemonData.weight}`;
    hp.textContent = stats[0].base_stat;
    attack.textContent = stats[1].base_stat;
    defense.textContent = stats[2].base_stat;
    specialAttack.textContent = stats[3].base_stat;
    specialDefense.textContent = stats[4].base_stat;
    speed.textContent = stats[5].base_stat;
};

const cleanSearchQuery = () => {
    let pokemonNameOrId = "";
    const query = searchInput.value.toLowerCase();
    // Check if user is searching by ID
    pokemonNameOrId = parseInt(query);

    if (isNaN(pokemonNameOrId)) {
        // User is searching by name
        pokemonNameOrId = query;
        pokemonNameOrId.replace(" ", "-");
        pokemonNameOrId.replace("♀", "f");
        pokemonNameOrId.replace("♂", "m");
    }

    return pokemonNameOrId;
};

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const pokemonNameOrId = cleanSearchQuery();

    const pokemonData = await fetchPokemon(pokemonNameOrId);
    displayPokemon(pokemonData);
});
