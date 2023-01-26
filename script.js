showNotes();

let addBtn = document.getElementById("addBtn");
let searchTxt = document.getElementById("searchTxt");

addBtn.addEventListener('click', (e) => {

    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";

    showNotes();

})

function showNotes() {

    let notes = localStorage.getItem("notes")

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = ``;

    notesObj.forEach(function (element, index) {

        html += `
            <div class="noteCard card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index+1} </h5>
                    <p class="card-text">${element}</p>
                    <button onclick="deleteNote(this.id)" id="${index}" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
        `
    });

    let notesEl = document.getElementById('notes');

    if (notesObj.length!=0) {
        notesEl.innerHTML = html;
    } else {
        notesEl.innerHTML = `<h3>Added Notes will be displayed here!</h3>`;
    }

}

function deleteNote(index) {

    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    showNotes();

}

searchTxt.addEventListener('input', ()=>{

    let inputVal = searchTxt.value.toLowerCase();
    let noteCard = document.getElementsByClassName("noteCard");

    Array.from(noteCard).forEach(function(element){

        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }

    })

})