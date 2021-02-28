function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.body.id = "b";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.body.style.filter = "blur(0px)";
  document.body.id = "";
}

function addBook() {
  closeForm();
  let loader = document.getElementById("loader");
  loader.style.display = "block";
  document.body.id = "b";
  setTimeout(()=>{
    loader.style.display = "none";  
    document.body.id = "";
    let bookList = JSON.parse(localStorage.getItem("bookList"));
    let user = localStorage.getItem("logged")
    bookList = bookList ? bookList : []
    console.log(bookList.length,"lll")
    let arr = bookList[bookList.length] ? bookList[bookList.length] : []   
    // bookList[bookList.length - 1].push(arr)
   if(arr.length == 0){
    arr.push(user)
   } 
    arr.push(JSON.parse(localStorage.getItem("bookObj")))
    bookList[bookList.length] = arr
    console.log(bookList,"BOOKS")
    localStorage.setItem("bookList",JSON.stringify(bookList))
  }, 5000); // 5 seconds

}