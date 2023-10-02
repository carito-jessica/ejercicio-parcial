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
        <p> <span class="api-url"></span></p> 
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