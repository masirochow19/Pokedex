const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Obtener y mostrar todos los Pokémon en orden
async function obtenerPokemones() {
    const pokemones = [];
    for (let i = 1; i <= 151; i++) {
        pokemones.push(fetch(URL + i).then((response) => response.json()));
    }

    // Esperar a que todas las solicitudes se completen y ordenar los Pokémon por ID
    const resultados = await Promise.all(pokemones);
    const pokemonesOrdenados = resultados.sort((a, b) => a.id - b.id);

    pokemonesOrdenados.forEach(pokemon => mostrarPokemon(pokemon));
}

// Mostrar la información de un Pokémon
function mostrarPokemon(poke) {
    const tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');

    const pokeId = poke.id.toString().padStart(3, '0'); // Asegura que el ID tenga 3 dígitos.

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

// Filtrar Pokémon por tipo
async function filtrarPokemonPorTipo(tipo) {
    listaPokemon.innerHTML = ""; // Limpiar la lista actual
    const pokemones = [];
    for (let i = 1; i <= 151; i++) {
        pokemones.push(fetch(URL + i).then((response) => response.json()));
    }

    // Esperar a que todas las solicitudes se completen y ordenar los Pokémon por ID
    const resultados = await Promise.all(pokemones);
    const pokemonesOrdenados = resultados.sort((a, b) => a.id - b.id);

    // Filtrar los Pokémon por tipo o mostrar todos
    pokemonesOrdenados.forEach(pokemon => {
        const tipos = pokemon.types.map((type) => type.type.name);
        if (tipo === "ver-todos" || tipos.includes(tipo)) {
            mostrarPokemon(pokemon);
        }
    });
}

// Evento para los botones de filtro
botonesHeader.forEach(boton =>
    boton.addEventListener("click", (event) => {
        const botonId = event.currentTarget.id;
        filtrarPokemonPorTipo(botonId);
    })
);

// Inicializar mostrando todos los Pokémon
obtenerPokemones();
