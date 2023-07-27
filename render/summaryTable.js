import { getNotesCountByCategory } from '../data.js';

// Function to render the summary table
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

// Function to render the summary table
export function renderSummaryTable() {
    const summaryTable = document.querySelector('#summary-table');
    summaryTable.innerHTML = '';

    const categories = ['Task', 'Random Thought', 'Idea']; //sent to data.js

    const tableBody = document.createElement('tbody');

    tableBody.innerHTML = renderSummaryColumns();

    categories.forEach((category) => {
        const activeNotesCount = getNotesCountByCategory(category, false);
        const archivedNotesCount = getNotesCountByCategory(category, true);
        tableBody.innerHTML += renderSummaryRow(category, activeNotesCount, archivedNotesCount);
    });

    summaryTable.appendChild(tableBody);
}