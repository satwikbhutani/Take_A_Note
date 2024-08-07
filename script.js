const addBtn = document.getElementById('add')
const heading = document.getElementById('heading')

const e1= document.getElementsByClassName('welcome')[0];
const e2= document.getElementsByClassName('author')[0];
let idx=1;
const text='Welcome To The Notes App'
function writeText() {
    e1.innerText = text.slice(0, idx)

    idx++

    if(idx > text.length) {
        return
    }

    setTimeout(writeText, 50)
}
writeText();

const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
    notes.forEach(note => addNewNote(note))
}

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()
        updateLS()
        updateHeadingVisibility()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target
        main.innerHTML = marked(value)
        updateLS()
    })

    document.body.appendChild(note)
    updateHeadingVisibility()
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')
    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}

function updateHeadingVisibility() {
    const notesText = document.querySelectorAll('textarea')
    if (notesText.length === 0) {
        heading.style.display = 'block'
    } else {
        heading.style.display = 'none'
    }
}

addBtn.addEventListener('click', () => addNewNote())
updateHeadingVisibility()
