import {handleEditNote, handleArchiveNote, handleDeleteNote} from '../handlers/noteHandlers.js';
import { getAllNotes } from '../data.js';


const renderNoteColumns = () => `
<tr>
        <th>Category</th>
        <th>Content</th>
        <th>Actions</th>
</tr>
`;

const getNoteRowActions = (note) => `
    <button class="edit" data-noteId="${note.id}">Edit</button>
    <button class="archive" data-noteId="${note.id}">${note.archived ? 'Unarchive' : 'Archive'}</button>
    <button class="delete" data-noteId="${note.id}">Delete</button>
`;

const renderNoteRow = (note) => `
    <tr>
        <td>${note.timestamp.toLocaleString()}</td>
        <td>${note.category}</td>
        <td>${note.content}</td>
        <td>${getNoteRowActions(note)}</td>
    </tr>
`;


function attachEventHandlers() {
    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const noteId = Number(event.target.dataset.noteid);
            handleEditNote(noteId);
        });
    });

    const archiveButtons = document.querySelectorAll('.archive');
    archiveButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const noteId = Number(event.target.dataset.noteid);
            handleArchiveNote(noteId);
        });
    });

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const noteId = Number(event.target.dataset.noteid);
            handleDeleteNote(noteId);
        });
    });

    
}


// Function to render the notes table
export function renderNotesTable() {
    const notesTable = document.querySelector('#notes-table');
    notesTable.innerHTML = '';

    const notes = getAllNotes();

    const tableBody = document.createElement('tbody');

    tableBody.innerHTML = renderNoteColumns();

    notes.forEach((note) => {
        tableBody.innerHTML += renderNoteRow(note);
    });
    notesTable.appendChild(tableBody);

    // Після додавання елементів таблиці прив'язуємо обробники подій
    attachEventHandlers();
}