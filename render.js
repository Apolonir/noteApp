import { getAllNotes, getNotesCountByCategory } from './data.js';
import { handleEditNote, handleArchiveNote, handleDeleteNote } from './main.js';

// Function to extract dates from note content using regular expression
function extractDatesFromNoteContent(content) {
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
    return content.match(dateRegex) || [];
}

// Function to render the notes table
export function renderNotesTable() {
    const notesTable = document.querySelector('#notes-table');
    notesTable.innerHTML = '';

    const notes = getAllNotes();

    notes.forEach((note) => {
        const row = document.createElement('tr');

        const timestampCell = document.createElement('td');
        timestampCell.textContent = note.timestamp.toLocaleString();
        row.appendChild(timestampCell);

        const contentCell = document.createElement('td');
        contentCell.textContent = note.content;
        row.appendChild(contentCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = note.category;
        row.appendChild(categoryCell);

        const datesCell = document.createElement('td');
        datesCell.textContent = extractDatesFromNoteContent(note.content).join(', ');
        row.appendChild(datesCell);

        const actionsCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => handleEditNote(note.id));
        actionsCell.appendChild(editButton);

        const archiveButton = document.createElement('button');
        archiveButton.textContent = note.archived ? 'Unarchive' : 'Archive';
        archiveButton.addEventListener('click', () => handleArchiveNote(note.id));
        actionsCell.appendChild(archiveButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => handleDeleteNote(note.id));
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        notesTable.appendChild(row);
    });
}

// Function to render the summary table
export function renderSummaryTable() {
    const summaryTable = document.querySelector('#summary-table');

    const categories = ['Task', 'Random Thought', 'Idea']; //sent to data.js

    summaryTable.innerHTML = '';
    categories.forEach((category) => {
        const row = document.createElement('tr');

        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;
        row.appendChild(categoryCell);

        const activeNotesCountCell = document.createElement('td');
        const activeNotesCount = getNotesCountByCategory(category, false);
        activeNotesCountCell.textContent = activeNotesCount;
        row.appendChild(activeNotesCountCell);

        const archivedNotesCountCell = document.createElement('td');
        const archivedNotesCount = getNotesCountByCategory(category, true);
        archivedNotesCountCell.textContent = archivedNotesCount;
        row.appendChild(archivedNotesCountCell);

        summaryTable.appendChild(row);
    });
}

export function renderModal(title, onSave, onCancel, note = null, isEdit = false) {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'block'; // Відображаємо контейнер модального вікна
    modalContainer.innerHTML = `
      <dialog id="favDialog">
        <form method="dialog" id="formDialog">
            <h2>${title}</h2>
            <section>
                <label for="content">Content:</label>
                <input type="text" id="content" name="content" value="${note ? note.content : ''}">
            </section>
            <section>
                <p><label for="favCategory">Choose category:</label>
                    <select id="favCategory">
                        <option>Task</option>
                        <option>Random Thought</option>
                        <option>Idea</option>
                    </select>
                </p>
            </section>
            <menu>
                <button id="cancel" type="reset">Cancel</button>
                <button type="submit" id="add-note-button">Confirm</button>
            </menu>
        </form>
      </dialog>
    `;
  
    const contentInput = modalContainer.querySelector('#content');
    const categoryInput = modalContainer.querySelector('#favCategory');
    const cancelButton = modalContainer.querySelector('#cancel');
    const saveButton = modalContainer.querySelector('#add-note-button');
  
    cancelButton.addEventListener('click', () => {
      onCancel();
      closeModal();
    });
  
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
      onSave(contentInput.value, categoryInput.value);
      closeModal();
    });
  
    const dialog = modalContainer.querySelector('dialog');
    dialog.showModal();
  }
  
  function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'none';
    modalContainer.innerHTML = ''; 
  }
