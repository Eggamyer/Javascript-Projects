// script.js - Final Clean Version
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('editModal');
  const modalTitleHeader = document.getElementById('modalTitleHeader');
  const deleteBtn = document.getElementById('deleteBtn');
  const form = document.getElementById('editForm');

  const columns = {
    'to-do': document.getElementById('to-do'),
    'in-progress': document.getElementById('in-progress'),
    'ready-pr': document.getElementById('ready-pr'),
    'ready-test': document.getElementById('ready-test'),
    'in-testing': document.getElementById('in-testing'),
    'ready-pm': document.getElementById('ready-pm'),
    done: document.getElementById('done'),
  };

  let currentCard = null;
  let draggedCard = null;

  const genId = () => ('00000' + Math.floor(Math.random() * 100000)).slice(-5);

  // === COUNTERS ===
  const updateColumnCounters = () => {
    Object.values(columns).forEach((column) => {
      const count = column.querySelectorAll('.card').length;
      let counter = column.querySelector('.column-counter');
      if (!counter) {
        counter = document.createElement('span');
        counter.className = 'column-counter';
        column.querySelector('.column-header')?.appendChild(counter);
      }
      counter.textContent = count;
      counter.style.display = count === 0 ? 'none' : 'block';
    });
  };

  // === CARD SETUP FUNCTIONS ===
  const attachCardClick = (card) => {
    card.onclick = null;
    card.addEventListener('click', () => openEdit(card));
  };

  const makeCardDraggable = (card) => {
    card.draggable = true;
    card.addEventListener('dragstart', () => {
      draggedCard = card;
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      draggedCard = null;
    });
  };

  const setupCard = (card) => {
    // Add type label if missing
    if (!card.dataset.type) {
      card.dataset.type = Math.random() < 0.7 ? 'story' : 'bug';
    }
    if (!card.querySelector('.type-label')) {
      const label = document.createElement('div');
      label.className = `type-label ${card.dataset.type}`;
      label.textContent = card.dataset.type;
      card.appendChild(label);
    }
    attachCardClick(card);
    makeCardDraggable(card);
  };

  // === INITIAL SETUP ===
  document.querySelectorAll('.card-id').forEach((span) => {
    if (span.textContent === 'Backup-12345') {
      span.textContent = `Backup-${genId()}`;
    }
  });

  document.querySelectorAll('.card').forEach(setupCard);
  updateColumnCounters();

  // === DRAG AND DROP (Columns) ===
  Object.values(columns).forEach((column) => {
    column.addEventListener('dragover', (e) => {
      e.preventDefault();
      column.classList.add('drag-over');
    });
    column.addEventListener('dragleave', () => {
      column.classList.remove('drag-over');
    });
    column.addEventListener('drop', (e) => {
      e.preventDefault();
      if (draggedCard) {
        const newStatus = column.dataset.status;
        draggedCard.dataset.status = newStatus;
        column.appendChild(draggedCard);
        updateColumnCounters();
      }
      column.classList.remove('drag-over');
    });
  });

  // === MODAL FUNCTIONS ===
  const openEdit = (card) => {
    currentCard = card;
    modalTitleHeader.textContent = card.querySelector('.card-id').textContent;

    document.getElementById('modalTitle').value = card
      .querySelector('.title')
      .textContent.trim();
    document.getElementById('modalDescription').value = card
      .querySelector('.description')
      .textContent.replace(/\s+/g, ' ')
      .trim();

    const items = Array.from(card.querySelectorAll('.acceptance-criteria li'))
      .map((li) => li.textContent.replace(/\s+/g, ' ').trim())
      .filter((text) => text);
    document.getElementById('modalAC').value = items.join('\n');

    document.getElementById('modalStatus').value = card.dataset.status;
    document.getElementById('modalType').value = card.dataset.type || 'story';

    deleteBtn.style.display =
      card.dataset.status === 'done' ? 'inline-block' : 'none';
    modal.style.display = 'flex';
  };

  const closeModal = () => {
    modal.style.display = 'none';
    currentCard = null;
  };

  // === EVENT LISTENERS ===
  document.getElementById('createBtn').onclick = () => {
    currentCard = null;
    modalTitleHeader.textContent = `Backup-${genId()}`;
    form.reset();
    document.getElementById('modalStatus').value = 'to-do';
    deleteBtn.style.display = 'none';
    modal.style.display = 'flex';
  };

  document.querySelector('.close').onclick = closeModal;
  document.getElementById('cancelBtn').onclick = closeModal;
  window.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  deleteBtn.onclick = () => {
    if (
      confirm(
        'Please confirm this Jira is Complete. This will remove Jira from the board.'
      )
    ) {
      currentCard.remove();
      updateColumnCounters();
      closeModal();
    }
  };

  // === SAVE (CREATE OR UPDATE) ===
  form.onsubmit = (e) => {
    e.preventDefault();

    const title = document.getElementById('modalTitle').value.trim();
    const desc = document.getElementById('modalDescription').value.trim();
    const ac = document.getElementById('modalAC').value.trim();
    const status = document.getElementById('modalStatus').value;
    const type = document.getElementById('modalType').value;

    // === REQUIRED FIELD VALIDATION ===
    if (!title) {
      alert('Title is required!');
      return;
    }
    if (!desc) {
      alert('Description is required!');
      return;
    }
    if (!ac) {
      alert('Acceptance Criteria is required! (At least one bullet point)');
      return;
    }

    // === CONTINUE IF ALL FIELDS ARE FILLED ===
    if (currentCard === null) {
      // CREATE NEW CARD
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.status = status;
      card.dataset.type = type;

      const acHTML =
        '<ul>' +
        ac
          .split('\n')
          .map((l) => (l.trim() ? `<li>${l.trim()}</li>` : ''))
          .filter((line) => line)
          .join('') +
        '</ul>';

      card.innerHTML = `
        <div class="card-id">${modalTitleHeader.textContent}</div>
        <div class="type-label ${type}">${type}</div>
        <h3 class="title">${title}</h3>
        <p class="description">${desc}</p>
        <div class="acceptance-criteria">${acHTML}</div>
      `;

      columns[status].appendChild(card);
      setupCard(card);
      updateColumnCounters();
    } else {
      // UPDATE EXISTING CARD
      currentCard.querySelector('.title').textContent = title;
      currentCard.querySelector('.description').textContent = desc;

      const acContainer = currentCard.querySelector('.acceptance-criteria');
      acContainer.innerHTML = ac
        ? '<ul>' +
          ac
            .split('\n')
            .map((l) => (l.trim() ? `<li>${l.trim()}</li>` : ''))
            .filter((line) => line)
            .join('') +
          '</ul>'
        : '';

      currentCard.dataset.type = type;
      let label = currentCard.querySelector('.type-label');
      if (label) {
        label.className = `type-label ${type}`;
        label.textContent = type;
      }

      if (currentCard.dataset.status !== status) {
        currentCard.dataset.status = status;
        columns[status].appendChild(currentCard);
        updateColumnCounters();
      }
    }

    closeModal();
  };
});
