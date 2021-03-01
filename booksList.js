window.onload = function () {
  includeHTML();
  autheniticate();
  setTimeout(() => {
    setBarActive('purchased')
  }, 500);
  let allUsersbooks = JSON.parse(localStorage.getItem("bookList"));
  let user = localStorage.getItem("logged");
  if (allUsersbooks != null) {
    for (userBooks of allUsersbooks) {
      if (userBooks[0].includes(user)) {
        displayBooks(userBooks);
      }
    }
  }
};

function setBarActive(id) {
  let ele = document.getElementById(`${id}`)
  var current = document.getElementsByClassName("active");
  if (current.length > 0) {
    current[0].className = current[0].className.replace(" active", "");
  }
  console.log('Click!');
    ele.className += " active"
    // ele.style.backgroundColor="red"
}
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
  }, 200);
}

function setActive(event) {
  event.target.getAttribute("data-color");
  event.target.style.backgroundColor = "blue";

}

function displayBooks(data) {
  var div = document.getElementById("content");
  for (let item of data) {
    if (data.indexOf(item) == 0) {
      continue;
    }
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
