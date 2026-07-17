const noteInput = document.getElementById("noteInput");
const addNote = document.getElementById("addNote");
const notesList = document.getElementById("notesList");
const counter = document.getElementById("counter");
const search = document.getElementById("search");
const themeBtn = document.getElementById("themeBtn");

let notes = [];
let editingNoteId = null;

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️ Light Mode";
  } else {
    themeBtn.textContent = "🌙 Dark Mode"
  }

  saveTheme()
});

function saveTheme() {
  localStorage.setItem("theme", document.body.className);
}

function getTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Light Mode";
  }
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotes() {
  const savedNotes = localStorage.getItem("notes");

  if (savedNotes) {
    notes = JSON.parse(savedNotes);
    // what should happen here?
  }
}

function renderNotes(notesToDisplay = notes) {
  notesList.innerHTML = "";

  notesToDisplay.forEach((note) => {
    const li = document.createElement("li");

    const deleteBtn = document.createElement("button");

    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";

    li.textContent = note.text;

    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      if (confirm("Delete this note?")) {
        notes = notes.filter(function (currentNote) {
          return currentNote.id !== note.id;
        });
      }

      search.value = "";
      saveNotes();
      renderNotes();
    });

    editBtn.addEventListener("click", () => {
      editingNoteId = note.id;
      noteInput.value = note.text;

      addNote.textContent = "Update Note";
      noteInput.style.border = "2px solid orange";
      renderNotes();
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

noteInput.addEventListener("input", () => {
  const length = noteInput.value.length;

  counter.textContent = `${length}/200`;
});

search.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();

  const filteredNotes = notes.filter((note) => {
    return note.text.toLowerCase().includes(searchTerm);
  });

  renderNotes(filteredNotes);
});

addNote.addEventListener("click", () => {
  if (noteInput.value.trim() === "") {
    alert("Write something first");
    return;
  }
  if (editingNoteId === null) {
    // Add a new note
    notes.push({
      id: Date.now(),
      text: noteInput.value.trim(),
    });
    saveNotes();
  } else {
    // Update the existing note
    const noteToEdit = notes.find(function (note) {
      return note.id === editingNoteId;
    });
    if (noteToEdit) {
      noteToEdit.text = noteInput.value.trim();
      saveNotes();
    }
    editingNoteId = null;
    addNote.textContent = "Add Note";
    noteInput.style.border = "";
  }

  noteInput.value = "";
  counter.textContent = `${noteInput.value.length}/200`;
  renderNotes();
});

getNotes();
renderNotes();
getTheme()