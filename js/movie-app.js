const movies = [
    {
        id: 1,
        title: 'The Godfather',
        genre: 'Drama',
        year: 1972,
        score: 5,
        image: 'https://play-lh.googleusercontent.com/ZucjGxDqQ-cHIN-8YA1HgZx7dFhXkfnz73SrdRPmOOHEax08sngqZMR_jMKq0sZuv5P7-T2Z2aHJ1uGQiys'

    },
    {
        id: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        year: 1994,
        score: 2,
        image: 'https://i5.walmartimages.com/asr/5003a7b8-81c5-4803-beee-df5417f06bbe.1f75ffb05ff4e640f976691214312d6a.jpeg'
    },
    {
        id: 3,
        title: 'The Dark Knight',
        genre: 'Action',
        year: 2008,
        score: 4,
        image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg'
    }
];

pintarPeliculas(movies)
// obtener el formulario de carga de peliculas desde el DOM (Documento)
const moviesForm = document.getElementById("moviesForm")

// Necesito escuchar cuando el usuario envie el formulario

moviesForm.addEventListener("submit", function(evento) {

    evento.preventDefault();
    
    const el = evento.target.elements
    //En base a los datos ingresados, crear un objeto de la pelicula con las propiedad que necesito

    //Pelicula es un objeto por lo que hay pushearlo a un array
    const pelicula = {
        //Agregamos un id para identficar cada elemento en una base de datos
        id: new Date().getTime(),
        title: el.title.value,
        genre: el.genre.value,
        score: el.score.value,
        date:  el.date.value.slice(0, 4),
        image:  el.image.value,
    }

    // console.log(pelicula);

    //Agregar el object al array de peliculas

    movies.push(pelicula);

    pintarPeliculas(movies);

    // console.log(movies);
} )

// Crear una funcion que reciba un array lo recorra y pinte un tabla por cada pelicula

function pintarPeliculas(arrayPeliculas) {

    const tbody = document.querySelector("tbody")

    // Vaciar el tbody
    tbody.innerHTML = ""

    arrayPeliculas.forEach((peli) => {

        tbody.innerHTML += `<tr>
        <td class="image-cell">
            <img loading="lazy" src="${peli.image}" alt="${peli.title} image">
        </td>
        <td class="name-cell">
            <div class="name">
                ${peli.title}
            </div>
        </td>
        <td class="genre-cell">
            <div class="genre">
                ${peli.genre}
            </div>
        </td>
        <td class="score-cell">
            <div class="score">
                ${peli.score}
            </div>
        </td>
        <td class="date-cell">
            <div class="date">
                ${peli.date}
            </div>
        </td>
        <td class="actions-cell">
            <div class="actions">
                <button class="btn btn-primary">
                    <i class="fa-solid fa-pencil"></i>
                </button>\

                <button data-bs-toggle="modal" data-bs-target="#detalle-pelicula" class="btn btn-success" onclick="mostrarDetalle(${peli.id})">
                                        <i class="fa-solid fa-eye"></i>
                </button>

                <button class="btn btn-danger" onclick="eliminarPelicula(${peli.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
                            </tr>`

    })
}

// * Filtro de peliculas por nombre

// - 1 Obtener el input de busqueda desde el DOM
    const SearchInput = document.getElementById("search")

// - 2 Escuchar el evento de input en el input de busqueda

    SearchInput.addEventListener("input", function(Search){

        // obtener el texto ingresador por el usuario

        const nombre = Search.target.value.toLowerCase();
        console.log(nombre)
    

// - 3 Filtrar las peliculas en base al texto ingresado por el usuario

// 3.1 Recorrer el array de peliculas 1 por 1

    const peliculasFiltradas = movies.filter((movie) => {

        const movieName = movie.title.toLowerCase()

        // 3.2 Por cada pelicula voy a chekear lo que el usuario ingreso en el input respecto al titulo de la pelicula y en base a esto voy a armar un neuvo array con las peliculas cuyo nombre incluya el texto ingresado por el usuario
        return movieName.includes(nombre)

    })
    console.log(peliculasFiltradas)
// - 4 Pintar las peliculas filtradas

    pintarPeliculas(peliculasFiltradas)

})

// * Borrar peliculas del array

// Vamos a escuchar cuando la persona hace click en el boton eliminar

// Cuando presione el boton enviar el ID de la peliucla que queremos borrar
function eliminarPelicula(identificador) {

    // Tengo que buscar en el arrai la peliucla conrrespondiente findIndex
    const index = movies.findIndex(pelicula => {

        // El valor que reicbi en mi funcion sea igual a  pelicula.id

        return identificador === pelicula.id /// En lugar de usar un if, un metodo mas abreviado


    })

    const isconfirm = confirm("Realmente desea elminar la pelicula?")
    
    // Teniendo la posicion o indice de la pelicula

    if (isconfirm) {
    movies.splice(index, 1)

    alert("Pelicula borrada exitosamente")

    pintarPeliculas(movies)
}
}

// Mostrar detalle de la pelicula 
function mostrarDetalle(ID) {
    
    // const modalHTML = document.querySelector("#detalle-pelicula")
    const modalTitlelHTML = document.querySelector("#detalle-title")
    const modalBodyHTML = document.querySelector("#detalle-body")

    const pelicula = movies.find(movie => {

        return movie.id === ID

    })
    modalTitlelHTML.innerHTML = pelicula.title
    
    modalBodyHTML.innerHTML = `<div class="row">
                                 <div class="col-6">
                                    <img src="${pelicula.image}" class="w-100">
                                 </div>
                                 <div class="col-6">
                                    <span class="badge text-bg-secondary">${pelicula.genre}</span>
                                 </div>
                                </div>`

}

// Ordenar las peliculas en base a su puntuacion
