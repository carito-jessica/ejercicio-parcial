const contenido = document.getElementById('content');
const modal = document.getElementById('modal');
const titulo = modal.querySelector('.modal-title');
const modalCont = modal.querySelector('.modal-body-email');



// Función para obtener los datos de un Pokemon por su ID
const getPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    if (!response.ok) {
        console.error('No se pudo obtener el Pokémon');
        return null;
    }
    
    const data = await response.json();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return { data, apiUrl };
}


// Mostrar los 100 Pokemon
const cantidadPokemon = async () => {
    for (let id = 1; id <= 100; id++) {
        const pokemon = await getPokemon(id);
        if (!pokemon) continue;
        
        const card = carta(pokemon.data);
        contenido.appendChild(card);
    }
};

// Función para crear una tarjeta de Pokémon
const carta = (pokemon) => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.innerHTML = `
        <h3>${pokemon.name}</h3>
        <h3> <span class="api-url"></span></h3> 
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <button class="view-details" data-pokemon-id="${pokemon.id}">Ver Más</button>
    `;
    // url 
    const url = card.querySelector('.api-url');
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
    url.textContent = apiUrl;

    // Agregado: Event listener para mostrar detalles
    card.querySelector('.view-details').addEventListener('click', () => {
        detalles(pokemon.id);
    });

    return card;
};


// Función para mostrar el modal con los detalles del Pokémon
const detalles = async (id) => {
    const pokemonData = await getPokemon(id);
    if (!pokemonData) return;

    const { data, apiUrl } = pokemonData;
    titulo.textContent = data.name;

    modalCont.innerHTML = `
    <img src="${data.sprites.front_default}" alt="${data.name}">
        <p>ID: ${data.id}</p>
        <p>Tipo(s): ${data.types.map(type => type.type.name).join(', ')}</p>
        <p>Peso: ${data.weight}</p>
        <p>Altura: ${data.height}</p>
        <h4>Estadísticas:</h4>
        <ul>
            ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
        </ul>
        <h4>Movimientos:</h4>
        <ul>
            ${data.moves.map(move => `<li>${move.move.name}</li>`).join('')}
        </ul>
    `;

    modal.classList.add('is-active');

    // Actualizar la URL en el elemento HTML
    apiUrlElement.textContent = apiUrl;
};

// cerrar la modal
modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-close')) {
        modal.classList.remove('is-active');
    }
});


// Inicializar la aplicación al cargar la página
window.addEventListener('load', () => {
    cantidadPokemon();
});
