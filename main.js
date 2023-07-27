import { renderSummaryTable} from './render/summaryTable.js';
import { renderNotesTable } from './render/notesTable.js'
import { handleAddNote } from './handlers/noteHandlers.js'


function initializeApp() {
    const addTask = document.getElementById('modal-add-btn');

    addTask.addEventListener('click', function () {
        handleAddNote();
    });

    renderNotesTable();
    renderSummaryTable();
}

initializeApp();