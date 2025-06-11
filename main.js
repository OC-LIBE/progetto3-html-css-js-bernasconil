const website = "https://frapollif.github.io/pet-adoption-data"

async function getPetsData(){
    // gli dico dove andare a prendere i dati e di andare a prenderli
    const data = await fetch(`${website}/pets.json`)
    const petsdata = await data.json()
    return petsdata
}

async function displayPets(){
    // uso le info per formare il display
    const pets = await getPetsData();
    const template = document.querySelector("#animal-card-template")
    const wrapper = document.querySelector("main")
    console.log(template)
    
    function agetext(anno){
        var oggi = new Date();
        var annoCorrente = oggi.getFullYear()
        eta = annoCorrente - anno
        if (eta==0) {
            return 'less than 1 year old';
        } else if (eta==1) {
            return '1 year old';
        } else {
            return eta + ' years old'
        }

    }
    
    pets.forEach(pet =>{
            const clone = template.content.cloneNode(true)
            // qui modifichiamo il template

            //aggiorno la foto
            const image = clone.querySelector(".animal-card-photo img")
            image.src = pet.photo
            //console.log(pet.photo)

            // aggiungo la descrizione
            const text = clone.querySelector('.animal-card-text p')
            text.textContent = pet.description

            // aggiungo il nome
            const name = clone.querySelector('.animal-card-text h1')
            name.textContent = pet.name

            //aggiungo la specie
            const type = clone.querySelector('.specie')
            type.textContent = pet.species.charAt(0).toUpperCase() + pet.species.slice(1)

            //aggiungo l'età
            const age = clone.querySelector('.eta')
            age.textContent = agetext(pet.birthYear)
            
            //aggiungo nome su bottone
            const bottone = clone.querySelector('.animal-card-text button a')
            bottone.textContent = 'Adopt ' + pet.name

            //cambio sito bottone
            const sito = clone.querySelector('.animal-card-text button a')
            sito.href = website + '/pets/' + pet.id
            // aggiungiamo l'articolo alla pagina
            wrapper.appendChild(clone)
        }
    )
}

displayPets()

function displayFilterAnimals(e) {
    const filter = e.target.dataset.filterAnimal;
    const articles = document.querySelectorAll('article')
    
    //articles.forEach(article =>{
        //if (article.dataset.species == filter) {
            //article.style.display = ''
        //}
        //else {
            //article.style.display = 'none'
        //}
    //})
//} cercare di far vedere solo determinati articoli di specie quando schiacciato bottone
const filterButton = document.querySelectorAll("nav button");

filterButton.forEach(button => {
    button.addEventListener('click', (e) => {
        displayFilterAnimals(e)
    })
});