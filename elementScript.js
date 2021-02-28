let bookObject = null;
window.onload = function () {
  includeHTML();
  autheniticate();
  bookObject = localStorage.getItem("bookObj");
  let usu = localStorage.getItem("users");
  console.log(usu);
  let book = JSON.parse(bookObject);
  let pageCount = document.getElementById("pageC");
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
        pageCount.innerHTML = (book.volumeInfo.pageCount ? book.volumeInfo.pageCount : newData.volumeInfo.pageCount) + " pages"

    });
  autrhor.innerHTML = "by: " + book.volumeInfo.authors;
};
function fillColor() {
  var starContainer = document.querySelector(".stars");
  var stars = Array.prototype.slice.call(starContainer.children);
  var totalStars = stars.length;
 

  console.log(totalStars); 
  starContainer.addEventListener('click', function(e) {
    stars.forEach(function(el) {
        el.classList.remove('is-selected')
      })
    var index = stars.indexOf(e.target)
    var count = totalStars - index
    e.target.classList.add('is-selected')
  })

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
  }, 300);
}