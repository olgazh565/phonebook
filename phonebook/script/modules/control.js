import {
    getStorage,
    setStorage,
    removeStorage,
    setSortStorage,
} from './serviceStorage.js';

import {renderContacts, addContactPage} from './render.js';

export const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach(contact => {
        contact.addEventListener('mouseenter', () => {
            logo.textContent = contact.phoneLink.textContent;
        });
        contact.addEventListener('mouseleave', () => {
            logo.textContent = text;
        });
    });
};

export const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
        formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
        formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', () => {
        openModal();
    });

    formOverlay.addEventListener('click', (e) => {
        const target = e.target;
        if (target === formOverlay ||
            target.closest('.close')) {
            closeModal();
        }
    });

    return {
        closeModal,
    };
};

export const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
        document.querySelectorAll('.delete').forEach(del => {
            del.classList.toggle('is-visible');
        });
    });

    list.addEventListener('click', e => {
        const target = e.target;
        if (target.closest('.del-icon')) {
            const removedContact = target.closest('.contact');
            removedContact.remove();
            removeStorage(removedContact.id);
        }
    });
};

export const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.set('id', Math.round(Math.random() * 1e9));
        const newContact = Object.fromEntries(formData);

        addContactPage(newContact, list);
        setStorage('phonebook', newContact);
        form.reset();
        closeModal();
    });
};

// Сортировка

const sortByField = (data, list, field, order) => {
    list.innerHTML = '';

    const sortField = (field) =>
        (a, b) =>
            (a[field] > b[field] ? 1 * order : -1 * order);

    data.sort(sortField(field));
    renderContacts(list, data);
};


export const sortControl = (table, list) => {
    const ths = document.querySelectorAll('[data-name]');

    table.addEventListener('click', e => {
        const target = e.target;
        const index = target.cellIndex;
        const field = target.dataset.name;
        const sortOrder = (
            target.dataset.sortOrder = -(target.dataset.sortOrder || -1)
        );
        const data = getStorage('phonebook');

        // Удалить data-sort-order у эл-тов, не являющихся target
        ths.forEach(th => {
            if (th !== target) {
                delete th.dataset.sortOrder;
            }
        });

        if (target.tagName === 'TH' && (index === 1 || index === 2)) {
            // сортировка массива данных по выбранному полю
            sortByField(data, list, field, sortOrder);

            // Добавляем/удаляем класс у target
            ths.forEach(th => th.classList.toggle('sorted', th === target));

            // Сохраняем данные в localStorage
            setSortStorage(field, sortOrder);
        }
    });
};

// Сохранение сортировки по выбранному полю после перезагрузки

export const sortControlInit = (data, list) => {
    const storage = JSON.parse(localStorage.getItem('sortField'));
    const field = storage?.field;
    const sortOrder = storage?.order;

    // Добавление стрелок сортировки сохраненному полю
    const ths = document.querySelectorAll('[data-name]');
    ths.forEach(th => {
        if (th.dataset.name === field) {
            th.classList.add('sorted');
            th.dataset.sortOrder = sortOrder;
        }
    });

    sortByField(data, list, field, sortOrder);
};
