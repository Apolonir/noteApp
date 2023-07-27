export function renderModal(title, onSave, note = null, currentCategory = '') {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'block';
    modalContainer.innerHTML = `
      <dialog id="favDialog">
        <form method="dialog" id="formDialog">
            <h2>${title}</h2>
            <section>
                <label for="content">Content:</label>
                <input type="text" id="content" name="content" value="${note ? note.content : ''}">
            </section>
            <section>
                <p><label for="favCategory">Choose category:</label>
                    <select id="favCategory">
                        <option ${currentCategory === 'Task' ? 'selected' : ''}>Task</option>
                        <option ${currentCategory === 'Random Thought' ? 'selected' : ''}>Random Thought</option>
                        <option ${currentCategory === 'Idea' ? 'selected' : ''}>Idea</option>
                    </select>
                </p>
            </section>
            <menu>
                <button id="cancel" type="reset">Cancel</button>
                <button type="submit" id="add-note-button">Confirm</button>
            </menu>
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