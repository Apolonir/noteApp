import { renderSummaryTable} from './render/summaryTable.js';
import { renderNotesTable } from './render/notesTable.js'
import { handleAddNote } from './noteHandlers.js'
import { renderArchiveTable } from './render/archiveTable.js';
import './scss/reset.scss';
import './scss/style.scss';
import * as bootstrap from 'bootstrap'


function initializeApp() {
    const addTask = document.getElementById('modal-add-btn');

    addTask.addEventListener('click', function () {
        handleAddNote();
    });

    renderNotesTable();
    renderSummaryTable();
    renderArchiveTable();
}

initializeApp();