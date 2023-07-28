export function renderModal(title, onSave, note = null, currentCategory = '') {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'block';
    modalContainer.innerHTML = `
      <dialog id="favDialog">
        <form method="dialog" id="formDialog">
            <h2>${title}</h2>
            <div class="mb-3">
                <label for="content" class="form-label">Content:</label>
                <input type="text" id="content" class="form-control" name="content" value="${note ? note.content : ''}">
            </div>
            <div>
                <p><label for="favCategory">Choose category:</label>
                    <select id="favCategory" class="form-select">
                        <option ${currentCategory === 'Task' ? 'selected' : ''}>Task</option>
                        <option ${currentCategory === 'Random Thought' ? 'selected' : ''}>Random Thought</option>
                        <option ${currentCategory === 'Idea' ? 'selected' : ''}>Idea</option>
                    </select>
                </p>
            </div>
            <div class="active-btn">
                <button id="cancel" class="btn btn-warning" type="reset">Cancel</button>
                <button type="submit" id="add-note-button" class="btn btn-success">Confirm</button>
            </div>
        </form>
      </dialog>
    `;

    const contentInput = modalContainer.querySelector('#content');
    const categoryInput = modalContainer.querySelector('#favCategory');
    const cancelButton = modalContainer.querySelector('#cancel');
    const saveButton = modalContainer.querySelector('#add-note-button');


    cancelButton.addEventListener('click', () => {
        closeModal();
    });

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        onSave(note ? note.id : null, contentInput.value, categoryInput.value);
        closeModal();
    });

    const dialog = modalContainer.querySelector('dialog');
    dialog.showModal();
}

function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'none';
    modalContainer.innerHTML = '';
}