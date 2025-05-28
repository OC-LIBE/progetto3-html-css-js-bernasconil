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
    pets.forEach(pet =>{
            const clone = template.content.cloneNode(true)
            // qui modifichiamo il template

            //aggiorno la foto
            const image = clone.querySelector(".animal-card-photo img")
            image.src = pet.photo
            
            //console.log(pet.photo)

            // aggiungiamo l'articolo alla pagina
            wrapper.appendChild(clone)
        }
    )
}

displayPets()