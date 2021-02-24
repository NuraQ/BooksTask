function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.body.id = "b";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.body.style.filter = "blur(0px)";
  document.body.id = "";
}

function signUp() {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  let user = email + "," + pass;
  let usersString = localStorage.getItem("users");
  let users = JSON.parse(usersString);
  users = users ? users : [];
  users.push(user);
  console.log(users, "usrr");
  localStorage.setItem("users", JSON.stringify(users));
  alert(users);
}

function displayLogin() {
  let head = document.getElementById("header");
  head.innerHTML = "SIGN IN";
  let btn = document.getElementById("registerBtn");
}

function login() {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  let usersString = localStorage.getItem("users");
  let users = JSON.parse(usersString);
  console.log(users);

  if (users.includes(email + "," + pass)) {
      localStorage.setItem("logged",email + "," + pass);
      alert("successfully signed up!!!");
    window.location.href = `./home.html`;
  } else {
    alert("wrong username and password!!!");
    window.location.href = `./home.html`;
  }
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
