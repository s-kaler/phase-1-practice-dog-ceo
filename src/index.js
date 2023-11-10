console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener('DOMContentLoaded', () => {
    fetch(imgUrl)
    .then((resp) => resp.json())
    .then((json) => renderImg(json));

    fetch(breedUrl)
    .then((resp) => resp.json())
    .then((json) => handleBreeds(json));
})

function renderImg(json){
    //console.log(json);
    const dogImgs = json.message;
    const status = json.status;
    let imgDiv = document.querySelector('#dog-image-container');

    for(let i = 0; i < dogImgs.length; i++){
        let newImg = document.createElement('img');
        newImg.src = dogImgs[i];
        newImg.alt = `dog #${i}`;
        imgDiv.appendChild(newImg);
    }
}

function handleBreeds(json){
    //console.log(json);
    const breeds = json.message;
    const status = json.status;

    let ul = document.querySelector('#dog-breeds');
    let dropdown = document.querySelector('#breed-dropdown');
    
    dropdown.addEventListener('change', (e) => {
        //console.log(e);
        ul.innerHTML = '';
        for(const breed in breeds){
            //console.log(dropdown.value);
            //console.log(breed[0]);
            let newLi = document.createElement('li');
            newLi.textContent = breed;
            let clicked = false;
            newLi.addEventListener('click', (e) => {
                if(clicked === false){
                    newLi.style.color = 'firebrick';
                    clicked = true;
                }
                else{
                    newLi.style.color = 'black';
                    clicked = false;
                }
            })
            if(breed[0] === dropdown.value){
                ul.appendChild(newLi);
            }
            
        }
    })
}