window.onload = function () {
    includeHTML();
  let div = document.getElementById("booksList");
  let books = JSON.parse(localStorage.getItem("bookList"));
  console.log("USER LOGGED", books);
    displayBooks(books);
};
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
