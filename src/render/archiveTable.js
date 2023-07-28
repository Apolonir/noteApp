import { getAllArchiveNotes } from '../data.js';
import { handleUnarchiveNote, handleDeleteNote } from '../noteHandlers.js';
import { extractDatesFromNoteContent } from '../utils/utils.js'
import moment from 'moment';

const renderArchiveColumns = () => `
<tr>
        <th>Time</th>
        <th>Category</th>
        <th>Content</th>
        <th>Dates</th>
        <th>Actions</th>
</tr>
`;

const getArchiveNoteRowActions = (note) => `
    <button class="unarchive btn btn-secondary" data-noteId="${note.id}">Unarchive</button>
    <button class="deleteArchive btn btn-danger" data-noteId="${note.id}">Delete</button>
`;

const renderArchiveNoteRow = (note) => `
    <tr>
        <td>${moment(note.createdAt).format('LL')}</td>
        <td>${note.category}</td>
        <td>${note.content}</td>
        <td>${extractDatesFromNoteContent(note.content)}</td>
        <td>${getArchiveNoteRowActions(note)}</td>
    </tr>
`;


function attachEventHandlers() {
    const archiveButtons = document.querySelectorAll('.unarchive');
    archiveButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const noteId = Number(event.target.dataset.noteid);
            handleUnarchiveNote(noteId);
        });
    });

    const deleteButtons = document.querySelectorAll('.deleteArchive');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const noteId = Number(event.target.dataset.noteid);
            handleDeleteNote(noteId);
        });
    });

}

export function renderArchiveTable() {
    const archiveTable = document.querySelector('#archived-notes-table');
    archiveTable.innerHTML = '';

    const archiveNotes = getAllArchiveNotes();

    const tableBody = document.createElement('tbody');

    tableBody.innerHTML = renderArchiveColumns();

    archiveNotes.forEach((note) => {
        tableBody.innerHTML += renderArchiveNoteRow(note);
    });
    archiveTable.appendChild(tableBody);

    attachEventHandlers();
}