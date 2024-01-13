var add_btn = document.getElementById("add-btn");
var myinput = document.getElementById("myinput");
var list = document.getElementById("list");

if (localStorage.getItem("list") != null) {
    var arr_list = JSON.parse(localStorage.getItem("list"));
arr_list.forEach(work => {
    newtodolist(work)
});
}



// arr_list.forEach((task) => {
//     newtodolist(task)
// });


add_btn.onclick = function () {
    if (myinput.value != "") {
        newtodolist();
    } else {
        alert("Enter Your Product Name");
    }
}

function newtodolist(work) {
    
    var item_name = myinput.value;
    if (work) {
        item_name = work.name
    }
    var li = document.createElement("li");
    var span = document.createElement("span");
    span.innerText = item_name;
    span.className = "text";
    li.appendChild(span);
    var Label = document.createElement("label");
    Label.innerHTML = '<i class="fa-solid fa-square-check"></i>&nbsp;<i class="fa-solid fa-trash-can"></i>';
    li.append(Label); //Here Li is creating Dynamically
    list.appendChild(li);
    myinput.value = ""; // Ko ba Task Likhandasin un khe po input Field Direct Clear Thi windi

    var check_tag = Label.getElementsByTagName("i");
    check_tag[0].onclick = function () {
        li.classList.toggle("checked");
        updatelocalstorage(); 
    }
    check_tag[1].onclick = function () {
        var cnf = confirm("Are you sure want to delete your data");
        if (cnf == true) {
            li.remove();
            updatelocalstorage();
        } else {
            alert("Your Data is safe");
        }
    }
    updatelocalstorage(); 
}


function updatelocalstorage() {
    var li_el = document.querySelectorAll("li");
    var i;
     arr_list = [];
    for (i = 0; i < li_el.length; i++){
        var span=li_el[i].getElementsByTagName("span");
        arr_list.push({
            name: span[0].innerText,
            checked: li_el[i].classList.contains("checked")
        });
    }
    localStorage.setItem("list", JSON.stringify(arr_list));
}