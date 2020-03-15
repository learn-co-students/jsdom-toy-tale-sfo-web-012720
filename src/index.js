document.addEventListener("DOMContentLoaded", () => {
  toggleForm()
  getToys();
  listenToClicks();
});

function toggleForm() {
  let addToy = false

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })
}

function listenToClicks() {
  const toyCollection = document.getElementById("toy-collection");

  toyCollection.addEventListener("click", function(event) {
    if (event.target.className === "like-btn") {

      const toyId = event.target.id;
      const likePTag = event.target.previousElementSibling;
      const previousLikes = parseInt(likePTag.innerText.split(" ")[0]);
      const newToyLikes = previousLikes + 1;

      likePTag.innerText = `${newToyLikes} Likes`;

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: newToyLikes
        })
      });
    }
  });
}

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => showToys(data));
}

function showToys(toys) {
  toys.forEach(toy => {
    renderToys(toy);
  })
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerHTML = "Like"

  let div = document.createElement('div')
  div.setAttribute('class', 'card')
  div.append(h2, img, p, btn)
  let divCollect = document.querySelector('#toy-collection')
  divCollect.append(div)
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}