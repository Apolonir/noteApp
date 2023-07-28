import { getAllNotes, addNewNote, editNote, archiveNote, unarchiveNote, removeNote } from '../src/data.js';
import { renderSummaryTable } from './render/summaryTable.js';
import { renderNotesTable } from './render/notesTable.js';
import { renderModal } from './render/modals/modal.js';
import { renderArchiveTable } from './render/archiveTable.js';

const createIdFactory = ({ initialId = 1 } = {}) => {
  let currentPointer = initialId;
  return () => currentPointer++;
};

const getId = createIdFactory({ initialId: getAllNotes()[getAllNotes().length - 1].id + 1 });

function reRender() {
  renderNotesTable();
  renderSummaryTable();
  renderArchiveTable();
}

export function handleSaveNoteOrEdit(noteId, content, category) {
  if(content.trim() === ''){
    alert("Error: Note content cannot be empty.");
  }else{
    const createdAt = new Date();
    const newNote = {
      id: noteId || getId(),
      createdAt,
      content,
      category,
      archived: false,
    };

    if (noteId) {
      editNote(noteId, newNote);
    } else {
      addNewNote(newNote);
    }

    renderNotesTable();
    renderSummaryTable();
  }
}

export function handleAddNote() {
  renderModal('Add New Note', handleSaveNoteOrEdit, null, "Task");
}

export function handleEditNote(noteId) {
  const note = getAllNotes().find((note) => note.id === noteId);
  if (!note) {
    alert('Note not found!');
    return;
  }

  renderModal('Edit Note', handleSaveNoteOrEdit, note, note.category);
}

export function handleArchiveNote(noteId) {
  archiveNote(noteId);
  reRender();
}

export function handleUnarchiveNote(noteId) {
  unarchiveNote(noteId);
  reRender();
}

export function handleDeleteNote(noteId) {
  removeNote(noteId);
  reRender();
}