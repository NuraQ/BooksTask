let bookObject = null;
window.onload = function () {
  includeHTML();
  bookObject = localStorage.getItem("bookObj");
  let usu = localStorage.getItem("users");
  console.log(usu);
  let book = JSON.parse(bookObject);
  let container = document.getElementById("container");
  let para = document.getElementById("info");
  let image = document.getElementById("itemImage");
  let details = document.getElementById("description");
  let autrhor = document.getElementById("author");
  let category = document.getElementById("category");

  para.innerHTML +=
    book.volumeInfo.title +
    `<br/><br/>` +
    (book.volumeInfo.subtitle ? book.volumeInfo.subtitle : "");
  console.log(book);
  category.innerHTML = "Categories: " + book.volumeInfo.categories;
  fetch(book.selfLink)
    .then((data) => data.json())
    .then((newData) => {
      image.src = newData.volumeInfo.imageLinks.medium;
      details.innerHTML = newData.volumeInfo.description
        ? newData.volumeInfo.description
        : book.volumeInfo.description;
    });
  autrhor.innerHTML = "by: " + book.volumeInfo.authors;
};
function fillColor() {}
