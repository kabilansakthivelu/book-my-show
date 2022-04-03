// Method to make API call
const fetchingData = async(url, sectionTitle) =>{
    fetch(url).then((res)=>{
        return res.json();
    }).then((data)=>{
        moviesContainer(data.results, sectionTitle);
    })
    .catch((err)=>{
        console.log(err);
        alert("An unexpected error occured.")
    })
}

// API end points array
const apiEndPointsArray = [{
    id: 1,
    containerName: "recommended-movies",
    sectionTitle: "Recommended movies",
    apiEndPoint: "https://api.themoviedb.org/3/trending/all/week?api_key=896c8566fc255f7c52f6ea6bd2901188&language=en-US"
}, {
    id: 2,
    containerName: "top-rated",
    sectionTitle: "Top Rated",
    apiEndPoint: "https://api.themoviedb.org/3/discover/movie?api_key=896c8566fc255f7c52f6ea6bd2901188&with_genres=28"
}, {
    id: 3,
    containerName: "documentaries",
    sectionTitle: "Documentaries",
    apiEndPoint: "https://api.themoviedb.org/3/discover/movie?api_key=896c8566fc255f7c52f6ea6bd2901188&with_genres=27"
}, {
    id: 4,
    containerName: "comedy-movies",
    sectionTitle: "Comedy movies",
    apiEndPoint: "https://api.themoviedb.org/3/discover/tv?api_key=896c8566fc255f7c52f6ea6bd2901188&with_networks=213"
}]

// To call "fetchingData" function for every API
apiEndPointsArray.forEach((api)=>{
    fetchingData(api.apiEndPoint, api.sectionTitle);
})

const posterPathPrefix = "https://image.tmdb.org/t/p/original";

let moviesSection = document.getElementById("movies-section");

const moviesContainer = (val, sectionTitle) =>{

   // Creating a section title as 'p' element with class attribute as "section-title"
   let titleForSection = document.createElement("p");
   titleForSection.classList.add("section-title")
   let text = document.createTextNode(sectionTitle);
   titleForSection.appendChild(text);
   moviesSection.appendChild(titleForSection)

   //  Creating a div container called "movies" and adding 'grid' display style
   let movies = document.createElement("div");
   movies.setAttribute("style", "display: grid; grid-auto-flow: column; overflow: hidden"); 

   // For every movie item, creating a "container" div which contains image, title and votes
   val.forEach((item)=>{
    let container = document.createElement("div");
    container.classList.add("single-movie");


    // Votes count
    let votes = document.createTextNode(item.vote_count +" votes");

    // Movie title
    let title = document.createElement("p");
    title.classList.add("movie-title");
    let titleContent = document.createTextNode(item.original_title || item.original_name);
    title.appendChild(titleContent);

    // Movie image
    let image = document.createElement("img");
    image.classList.add("movie-image")
    image.src = posterPathPrefix+item.poster_path;

    container.append(image, title, votes);
    container.addEventListener("click", ()=>{showModal(item)});

    // Appending "container" inside "movies" div"
    movies.appendChild(container);
   })

   // Appending "movies" inside "moviesSection" container beneath "section-title"
   moviesSection.appendChild(movies)
}

let carouselImage = document.getElementById("carousel-image")

// Container for carousel images
let carouselImagesArray = [
    {id: 1, src: "./assets/carousel-image_1.avif"}, 
    {id: 2, src: "./assets/carousel-image_2.avif"}, 
    {id: 3, src:"./assets/carousel-image_3.avif"}]

// Function to handle swipe left in carousel
const swipeLeft = (id) =>{
    let index = parseInt(id);
    let idx = (index > 1) ? index-1 : 3;
    carouselImage.src = carouselImagesArray[idx-1].src;
    carouselImage.className =  carouselImagesArray[idx-1].id;
}

// Function to handle swipe right in carousel
const swipeRight = (id) =>{
    let index = parseInt(id);
    let idx = (index < 3) ? index+1 : 1;
    carouselImage.src = carouselImagesArray[idx-1].src;
    carouselImage.className =  carouselImagesArray[idx-1].id;
}

// Carousel left icon
let leftIcon = document.getElementById("left-icon")
leftIcon.addEventListener("click", ()=>swipeLeft(carouselImage.className));

// Carousel right icon
let rightIcon = document.getElementById("right-icon")
rightIcon.addEventListener("click", ()=>swipeRight(carouselImage.className));

// Carousel call
window.setInterval(()=>swipeRight(carouselImage.className), 3000);

// Modal
let modal = document.getElementById("movie-details-modal");

// Function to display Modal contents
const showModal = (item) =>{
    document.getElementById("modal-movie-image").src = posterPathPrefix+item.backdrop_path;
    document.getElementById("modal-movie-title").innerHTML = item.original_name || item.original_title;
    document.getElementById("modal-movie-description").innerHTML = item.overview;
    document.getElementById("modal-movie-release-date").innerHTML = "Release date: "+(item.release_date || item.first_air_date);
    document.getElementById("modal-movie-vote-average").innerHTML = "Vote average: "+item.vote_average;
    document.getElementById("modal-movie-vote-count").innerHTML = "Vote count: "+item.vote_count;
    modal.style.display = "block";
}

// Function to hide modal
const closeModal = () =>{
    modal.style.display = "none";
}