import {handleEditNote, handleArchiveNote, handleDeleteNote} from '../noteHandlers.js';
import { extractDatesFromNoteContent } from '../utils/utils.js'
import { getAllNotes } from '../data.js';
import moment from 'moment';


const renderNoteColumns = () => `
<tr>
        <th>Time</th>
        <th>Category</th>
        <th>Content</th>
        <th>Dates</th>
        <th>Actions</th>
</tr>
`;

const getNoteRowActions = (note) => `
    <button class="edit btn btn-info" data-noteId="${note.id}">Edit</button>
    <button class="archive btn btn-secondary" data-noteId="${note.id}">Archive</button>
    <button class="delete btn btn-danger" data-noteId="${note.id}">Delete</button>
`;

const renderNoteRow = (note) => `
    <tr>
        <td>${moment(note.createdAt).format('LL')}</td>
        <td>${note.category}</td>
        <td>${note.content}</td>
        <td>${extractDatesFromNoteContent(note.content)}</td>
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

    attachEventHandlers();
}