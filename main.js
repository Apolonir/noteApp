import { getAllNotes, addNewNote, editNote, archiveNote, unarchiveNote, removeNote } from './data.js';
import { renderNotesTable, renderSummaryTable, renderModal } from './render.js';

const createIdFactory = ({ initialId = 1 } = {}) => {
  let currentPointer = initialId;
  return () => currentPointer++;
};

const getId = createIdFactory({ initialId: getAllNotes()[getAllNotes().length - 1].id + 1 });

function handleSaveAddNote(content, category) {
  if (content.trim() !== '') {
    const timestamp = new Date();
    const newNote = {
      id: getId(),
      timestamp,
      content,
      category,
      archived: false,
    };
    addNewNote(newNote);
    renderNotesTable();
    renderSummaryTable();
  }
}

function handleSaveEditNote(noteId, content) {
  const note = getAllNotes().find((note) => note.id === noteId);
  if (!note) {
    alert('Note not found!');
    return;
  }

  if (content.trim() !== '') {
    const updatedNote = { ...note, content };
    editNote(noteId, updatedNote);
    renderNotesTable();
  }
}

function handleCancelNote() {
  // Очищаємо модальне вікно при скасуванні
  renderModal('', () => {}, () => {});
}

function handleAddNote() {
  renderModal('Add New Note', handleSaveAddNote, handleCancelNote);
}

export function handleEditNote(noteId) {
  const note = getAllNotes().find((note) => note.id === noteId);
  if (!note) {
    alert('Note not found!');
    return;
  }

  renderModal('Edit Note', (content) => handleSaveEditNote(noteId, content), handleCancelNote, note, true);
}

export function handleArchiveNote(noteId) {
  const note = getAllNotes().find((note) => note.id === noteId);
  if (!note) {
    alert('Note not found!');
    return;
  }

  if (note.archived) {
    unarchiveNote(noteId);
  } else {
    archiveNote(noteId);
  }

  renderNotesTable();
  renderSummaryTable();
}

export function handleDeleteNote(noteId) {
  removeNote(noteId);
  renderNotesTable();
  renderSummaryTable();
}

function attachEventListeners() {
  const addTask = document.getElementById('modal-add-btn');
  const cancelButton = document.getElementById('cancel');

  addTask.addEventListener('click', function () {
    handleAddNote();
  });

  cancelButton.addEventListener('click', function () {
    handleCancelNote();
  });

  document.querySelector('#add-note-button').addEventListener('click', () => handleSaveAddNote());
  renderNotesTable();
  renderSummaryTable();
}

attachEventListeners();