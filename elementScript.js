let bookObject = null;
window.onload = function () {
  bookObject = localStorage.getItem("bookObj");
  let book = JSON.parse(bookObject);
  let container = document.getElementById("container");
  let para = document.getElementById("info");
  let image = document.getElementById("itemImage");
  let details = document.getElementById("description");
  let autrhor = document.getElementById("author");
  let price = document.getElementById("price");

  para.innerHTML +=
    book.volumeInfo.title +
    `<br/><br/>` +
    (book.volumeInfo.subtitle ? book.volumeInfo.subtitle : "");
  console.log(book);
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

