import { getAllNotes, addNewNote, editNote, archiveNote, unarchiveNote, removeNote } from '../data.js';
import { renderSummaryTable } from '../render/summaryTable.js';
import { renderNotesTable } from '../render/notesTable.js';
import { renderModal } from '../render/modals/modal.js';

const createIdFactory = ({ initialId = 1 } = {}) => {
    let currentPointer = initialId;
    return () => currentPointer++;
};

const getId = createIdFactory({ initialId: getAllNotes()[getAllNotes().length - 1].id + 1 });

export function handleSaveNoteOrEdit(noteId, content, category) {
    if (content.trim() !== '') {
      const timestamp = new Date();
      const newNote = {
        id: noteId || getId(),
        timestamp,
        content,
        category,
        archived: false,
      };
  
      if (noteId) {
        // Виконуємо редагування замітки
        editNote(noteId, newNote);
      } else {
        // Виконуємо додавання нової замітки
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