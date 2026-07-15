const noteInput = document.getElementById("noteInput");
const addNote = document.getElementById("addNote");
const notesList = document.getElementById("notesList");

let notes = [];

function renderNotes() {
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");

    const deleteBtn = document.createElement("button");

    li.textContent = note;

    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      notes.splice(index, 1);

      renderNotes();
    });

    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

addNote.addEventListener("click", () => {
  if (noteInput.value.trim() === "") {
    alert("Write something first");
    return;
  }

  notes.push(noteInput.value);

  noteInput.value = "";

  renderNotes();
});
