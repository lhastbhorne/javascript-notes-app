const noteInput = document.getElementById("noteInput");
const addNote = document.getElementById("addNote");
const notesList = document.getElementById("notesList");
const counter = document.getElementById("counter");
const search = document.getElementById("search");

let notes = [];

function renderNotes(notesToDisplay = notes) {
  notesList.innerHTML = "";

  notesToDisplay.forEach((note, index) => {
    const li = document.createElement("li");

    const deleteBtn = document.createElement("button");

    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";

    li.textContent = note.text;

    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      if (confirm("Delete this note?")) {
        notes = notes.filter(function(currentNote){
          return currentNote.id !== note.id
        })
      }

      search.value = ""
      renderNotes();
    });

    editBtn.addEventListener("click", () => {
      noteInput.value = note.text;
      let editIndex = null;
      editIndex = index;

      notes.splice(index, 1);

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

  notes.push({
    id: Date.now(),
    text: noteInput.value,
  });

  noteInput.value = "";
  counter.textContent = `${noteInput.value.length}/200`;
  renderNotes();
});
