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