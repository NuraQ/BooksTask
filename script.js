var currentIndex = 0;
var totalItemsCount = 0;
var search = false;
window.onload = function () {
  includeHTML();
  fetchData();
};

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
    img.className = "center";
    img.loading = "lazy";
    img.addEventListener("click", () => {
      localStorage.setItem("bookObj", JSON.stringify(item));
      // window.location.href = `./Element.html`;
      // window.location.href = `./loginPopup.html`;
      openForm();
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
function includeHTML() {
  console.log("inclyde")
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};

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
