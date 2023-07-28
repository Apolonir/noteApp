import { getNotesByCategory, getArchivedNotesByCategory, getCategories } from '../data.js';


const renderSummaryColumns = () => `
<tr>
        <th>Category</th>
        <th>Active</th>
        <th>Archived</th>
</tr>
`;

const renderSummaryRow = (category, activeNotesCount, archivedNotesCount) => `
    <tr>
        <td>${category}</td>
        <td>${activeNotesCount}</td>
        <td>${archivedNotesCount}</td>
    </tr>
`;

export function renderSummaryTable() {
    const summaryTable = document.querySelector('#summary-table');
    summaryTable.innerHTML = '';

    const categories = getCategories();

    const tableBody = document.createElement('tbody');

    tableBody.innerHTML = renderSummaryColumns();

    categories.forEach((category) => {
        const activeNotesCount = getNotesByCategory(category).length;
        const archivedNotesCount = getArchivedNotesByCategory(category).length;
        tableBody.innerHTML += renderSummaryRow(category, activeNotesCount, archivedNotesCount);
    });

    summaryTable.appendChild(tableBody);
}