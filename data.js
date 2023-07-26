let notesData = [
  {
    id: 1,
    timestamp: new Date('2023-07-24T09:00:00'),                     //createdAt
    content: "Remember to buy groceries for the week.",
    category: "Task",
    archived: false,
  },
  {
    id: 2,
    timestamp: new Date('2023-07-23T16:30:00'),
    content: "Had an interesting dream last night.",
    category: "Random Thought",
    archived: false,
  },
  {
    id: 3,
    timestamp: new Date('2023-07-22T10:15:00'),
    content: "New project idea: Create a personal blog.",
    category: "Idea",
    archived: false,
  },
];

export function getAllNotes() {
  return notesData;
}

export function addNewNote(note) {
  notesData.push(note);
}

export function editNote(noteId, updatedNote) {
  const index = notesData.findIndex((note) => note.id === noteId);
  if (index !== -1) {
    notesData[index] = { ...notesData[index], ...updatedNote };
  }
}

export function removeNote(noteId) {
  notesData = notesData.filter((note) => note.id !== noteId);

}

export function archiveNote(noteId) {
  const index = notesData.findIndex((note) => note.id === noteId);
  if (index !== -1) {
    notesData[index].archived = true;
  }
}

export function unarchiveNote(noteId) {
  const index = notesData.findIndex((note) => note.id === noteId);
  if (index !== -1) {
    notesData[index].archived = false;
  }
}

export function getNotesCountByCategory(category, archived) {
  return notesData.reduce((count, note) => {
    if (note.category === category && (archived === undefined || note.archived === archived)) {
      count++;
    }
    return count;
  }, 0);
}