let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  getToys()
  submitToy()
  likeToy()
});

const getToys = () => {
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => showToys(toys));
}

const showToys = toys => {
  toys.forEach(toy => {
    displayToy(toy)
  });
}

const displayToy = toy => {
  const toyCollection = document.getElementById('toy-collection')
  const newToy = document.createElement('div')
  newToy.innerHTML = makeToy(toy)
  toyCollection.appendChild(newToy)
}

const makeToy = toy => {
  return `<div class="card" id="${toy.id}">
            <h2>${toy.name}</h2>
            <img src="${toy.image}" class="toy-avatar" />
            <p><span id="likes-count">${toy.likes}</span> Likes</p>
            <button class="like-btn">Like <3</button>
          </div>`
}

submitToy = () => {
  form = document.getElementsByClassName('add-toy-form')[0]
  form.addEventListener('submit', function(event){
    event.preventDefault();
    createToy(event.target);
  });
}

const createToy = (toy) => {
  const newToy = {
    name: toy.name.value,
    image: toy.image.value
  }

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(newToy)
  };

  return fetch('http://localhost:3000/toys', configObj)
    .then(resp => resp.json())
    .then(data => displayToy(data))
}

const likeToy = () => {
  const toyCollection = document.getElementById('toy-collection')
  toyCollection.addEventListener('click', function(event){
    if (event.target.className == 'like-btn'){
      updateLike(event.target)
    }
  });
}

const updateLike = (liked) => {
  likes = liked.parentElement.getElementsByTagName('span')[0]
  intLikes = parseInt(likes.innerText, 10)
  const toy = {
    "likes": intLikes += 1
  }

  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(toy)
  };

  return fetch(`http://localhost:3000/toys/${liked.parentElement.id}`, configObj)
    .then(resp => resp.json())
    .then(data => likes.innerText = data.likes)
}

