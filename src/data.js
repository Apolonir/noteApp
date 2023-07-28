let notesData = [
  {
    id: 1,
    createdAt: new Date('2023-07-24T09:00:00'),
    content: "Remember to buy groceries for the week.",
    category: "Task",
    archived: false,
    deleted: false,
  },
  {
    id: 2,
    createdAt: new Date('2023-07-23T16:30:00'),
    content: "Had an interesting dream last night.",
    category: "Random Thought",
    archived: false,
    deleted: false,
  },
  {
    id: 3,
    createdAt: new Date('2023-07-22T10:15:00'),
    content: "New project idea: Create a personal blog.",
    category: "Idea",
    archived: false,
    deleted: false,
  },
  {
    id: 4,
    createdAt: new Date('2023-07-21T14:45:00'),
    content: "I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    category: "Task",
    archived: false,
    deleted: false,
  },
  {
    id: 5,
    createdAt: new Date('2023-07-20T19:00:00'),
    content: "Learn a new song on the guitar.",
    category: "Idea",
    archived: false,
    deleted: false,
  },
  {
    id: 6,
    createdAt: new Date('2023-07-19T11:30:00'),
    content: "Book tickets for the upcoming concert.",
    category: "Task",
    archived: false,
    deleted: false,
  },
  {
    id: 7,
    createdAt: new Date('2023-07-18T08:15:00'),
    content: "Start reading a new book.",
    category: "Idea",
    archived: false,
    deleted: false,
  },
];

const categories = ['Task', 'Random Thought', 'Idea'];

export function getCategories() {
  return categories;
}

export function getAllNotes() {
  return notesData
    .filter((note) => !note.archived)
    .filter((note) => !note.deleted);
}

export function getAllArchiveNotes() {
  return notesData
    .filter((note) => note.archived)
    .filter((note) => !note.deleted);
}

export function addNewNote(note) {
  try {
    notesData.push(note);
  } catch (error) {
    // Обробка помилки при додаванні нової нотатки
    console.error('Error while adding new note:', error);
  }
}

export function editNote(noteId, updatedNote) {
  try {
    const index = notesData.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      notesData[index] = { ...notesData[index], ...updatedNote };
    }
  } catch (error) {
    // Обробка помилки при оновленні нотатки
    console.error('Error while editing note:', error);
  }
}

export function removeNote(noteId) {
  try {
    notesData
      .filter((note) => note.id === noteId)
      .forEach((note) => (note.deleted = true));
  } catch (error) {
    // Обробка помилки при видаленні нотатки
    console.error('Error while removing note:', error);
  }
}

export function archiveNote(noteId) {
  try {
    const note = notesData.find((note) => note.id === noteId);
    note.archived = true;
  } catch (error) {
    // Обробка помилки при архівації нотатки
    console.error('Error while archiving note:', error);
  }
}

export function unarchiveNote(noteId) {
  try {
    const note = notesData.find((note) => note.id === noteId);
    note.archived = false;
  } catch (error) {
    // Обробка помилки при розархівації нотатки
    console.error('Error while unarchiving note:', error);
  }
}

export function getNotesByCategory(category) {
  return getAllNotes().filter((note) => note.category === category);
}

export function getArchivedNotesByCategory(category) {
  return getAllArchiveNotes().filter((note) => note.category === category);
}
