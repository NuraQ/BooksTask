var currentIndex = 0;
var totalItemsCount = 0;
var search = false;
window.onload = function () {
  includeHTML();
  fetchData();
  autheniticate();
};

function autheniticate() {
  let user = localStorage.getItem("logged");
  setTimeout(function () {
    if (user != "" && user != null) {
      var elems = document.querySelectorAll(".hide");
      [].forEach.call(elems, function (el) {
        el.classList.remove("hide");
        el.className += "show";
      });
    }
  }, 300);
}
window.onscroll = function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if (totalItemsCount - currentIndex >= 40) {
      currentIndex += 40;
    } else {
      currentIndex += totalItemsCount - currentIndex;
    }
    if (!search && currentIndex < totalItemsCount) {
      fetchData();
    } else if (search && currentIndex < totalItemsCount) {
      getSearchApiResult();
    }
  }
};

function fetchData() {
  console.log("fetch");
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:&maxResults=40&startIndex=${currentIndex}&key=AIzaSyCOBbymaad4eBVNFVF5JC-Pc0TQzE6AHOw`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      totalItemsCount = data.totalItems;
      displayBooks(data.items);
    });
}

function displayBooks(data) {
  var div = document.getElementById("content");
  for (let item of data) {
    col = document.createElement("div");
    img = document.createElement("img");
    col.className = "column";
    p = document.createElement("div");
    p.className = "cardName";
    text = document.createTextNode(`${item.volumeInfo.title}`);
    img.src = item.volumeInfo.imageLinks
      ? item.volumeInfo.imageLinks.thumbnail
      : "";
      img.alt="./img_girl.jpg"
    img.className = "center";
    img.loading = "lazy";
    img.addEventListener("click", () => {
      localStorage.setItem("bookObj", JSON.stringify(item));
      let loggedUser = localStorage.getItem("logged");
      if (loggedUser != "" && loggedUser != null) {
        window.location.href = `./Element.html`;
      } else {
        openForm();
      }
    });
    p.appendChild(text);
    col.appendChild(img);
    col.appendChild(p);
    div.appendChild(col);
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function filter() {
  currentIndex = 0;
  search = true;
  const container = document.querySelector("#content");
  removeAllChildNodes(container);
  getSearchApiResult();
}

function getSearchApiResult() {
  var input = document.getElementById("search").value;
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${input}&maxResults=40&startIndex=${currentIndex}&key=AIzaSyCOBbymaad4eBVNFVF5JC-Pc0TQzE6AHOw`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      totalItemsCount = data.totalItems;
      displayBooks(data.items);
    });
}
