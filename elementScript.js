let bookObject = null;
window.onload = function () {
  bookObject = localStorage.getItem("bookObj");
  let book = JSON.parse(bookObject);
  let container = document.getElementById("container");
  let para = document.getElementById("info");
  let image = document.getElementById("itemImage");
  let details = document.getElementById("description");
  
  para.innerHTML +=
    book.volumeInfo.title +
    `<br/><br/>` +
    (book.volumeInfo.subtitle ? book.volumeInfo.subtitle : "");
  console.log(book);
  image.src = book.volumeInfo.imageLinks.thumbnail;
  details.innerHTML = book.volumeInfo.description;
};
