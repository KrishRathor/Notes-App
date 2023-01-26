showNotes()

let homeDiv = document.getElementById("item1")
let notesDiv = document.getElementById("item2")
let addBtn = document.getElementById("addBtn")
let searchTxt = document.getElementById("searchTxt")
let homeSection = document.getElementById("home")
let noteSection = document.getElementById("noteSection")
let addNotes = document.getElementById("addNotes")
let srchImg = document.getElementById("srchImg")
let navbar = document.getElementById("navbar")

srchImg.addEventListener('click', ()=>{

    navbar.style.display = "none"
    homeSection.style.width = "100%"
    // noteSection.style.width = "100%"

})

function activeHome() {
    homeDiv.classList.add("bg-success")
    notesDiv.classList.remove("bg-success")

    homeSection.style.display = "block"
    noteSection.style.display = "none"
    // addNotes.style.display = "block"

}

function activeNotes() {
    notesDiv.classList.add("bg-success")
    homeDiv.classList.remove("bg-success")

    homeSection.style.display = "none"
    noteSection.style.display = "block"

}


addBtn.addEventListener('click', () => {

    console.log("Adding Notes...")

    let addTitle = document.getElementById("title")
    let addText = document.getElementById("textnote")
    let title = localStorage.getItem("title")
    let text = localStorage.getItem("text")

    if (title == null && text == null) {
        titlearr = []
        textarr = []
    } else if (title == null && text != null) {
        titlearr = []
        textarr = JSON.parse(text)
    } else if (title != null && text == null) {
        titlearr = JSON.parse(title)
        textarr = []
    } else {
        titlearr = JSON.parse(title)
        textarr = JSON.parse(text)
    }

    titlearr.push(addTitle.value)
    textarr.push(addText.value)
    localStorage.setItem("title", JSON.stringify(titlearr))
    localStorage.setItem("text", JSON.stringify(textarr))
    addTitle.value = ""
    addText.value = ""

    showNotes()

})

function showNotes() {

    console.log("showing notes...")

    let title = localStorage.getItem("title")
    let text = localStorage.getItem("text")

    if (title == null && text == null) {
        titlearr = []
        textarr = []
    } else if (title == null && text != null) {
        titlearr = []
        textarr = JSON.parse(text)
    } else if (title != null && text == null) {
        titlearr = JSON.parse(title)
        textarr = []
    } else {
        titlearr = JSON.parse(title)
        textarr = JSON.parse(text)
    }

    let html = ``

    titlearr.forEach((element1,index) => {
        let element2 = textarr[index]

        html += `
        <div class="noteItem noteCard">
            <h3>Note${index+1}</h3>
            <br>
            <div class="tag">
                <span class="dot"></span>
                <h5 class="title">${element1}</h5>
            </div>
            <br>
            <div class="content">${element2}</div>
            <button type="button" onclick="deleteNote(this.id)" id=${index} class="dltBtn" class="btn-position btn btn-primary">Delete</button>
        </div>
        `

    });

    let noteContainer = document.getElementById('noteContainer')

    if (titlearr.length!=0 && textarr.length!=0) {
        noteContainer.innerHTML = html
    } else {
        noteContainer.innerHTML = `<h2>No Notes Yet!</h2>`
    }

}

function deleteNote(index) {

    let title = localStorage.getItem("title")
    let text = localStorage.getItem("text")

    if (title == null && text == null) {
        titlearr = []
        textarr = []
    } else if (title == null && text != null) {
        titlearr = []
        textarr = JSON.parse(text)
    } else if (title != null && text == null) {
        titlearr = JSON.parse(title)
        textarr = []
    } else {
        titlearr = JSON.parse(title)
        textarr = JSON.parse(text)
    }

    titlearr.splice(index,1)
    textarr.splice(index,1)
    localStorage.setItem("title", JSON.stringify(titlearr))
    localStorage.setItem("text", JSON.stringify(textarr))

    showNotes()
}

searchTxt.addEventListener('input', ()=>{

    let inputVal = searchTxt.value;
    let noteCard = document.getElementsByClassName("deathnote");

    Array.from(noteCard).forEach(function(element){

        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }

    })

})
