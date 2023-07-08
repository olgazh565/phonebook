'use strict';

{
    const getStorage = key => (localStorage.getItem(key) ?
        JSON.parse(localStorage.getItem(key)) : []);

    const setStorage = (key, obj) => {
        const data = getStorage(key);
        data.push(obj);
        localStorage.setItem(key, JSON.stringify(data));
    };

    const removeStorage = phone => {
        const data = getStorage('phonebook');
        const newData = data.filter(item => item.phone !== phone);
        localStorage.setItem('phonebook', JSON.stringify(newData));
    };

    const createContainer = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    };

    const createHeader = () => {
        const header = document.createElement('header');
        header.classList.add('header');

        const headerContainer = createContainer();
        header.append(headerContainer);

        header.headerContainer = headerContainer;

        return header;
    };

    const createLogo = title => {
        const h1 = document.createElement('h1');
        h1.classList.add('logo');
        h1.textContent = `Телефонный справочник. ${title}`;

        return h1;
    };

    const createMain = () => {
        const main = document.createElement('main');
        const mainContainer = createContainer();
        main.append(mainContainer);
        main.mainContainer = mainContainer;

        return main;
    };

    const createButtonsGroup = params => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');

        const btns = params.map(({className, type, text}) => {
            const button = document.createElement('button');
            button.type = type;
            button.textContent = text;
            button.className = className;
            return button;
        });

        btnWrapper.append(...btns);

        return {
            btnWrapper,
            btns,
        };
    };

    const createTable = () => {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        thead.insertAdjacentHTML('beforeend', `
            <tr>
                <th class="delete">Удалить</th>
                <th data-name="name">Имя</th>
                <th data-name="surname">Фамилия</th>
                <th>Телефон</th>
                <th>Редактировать</th>
            </tr>
        `);

        const tbody = document.createElement('tbody');

        table.append(thead, tbody);
        table.tbody = tbody;

        return table;
    };

    const createForm = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('form-overlay');

        const form = document.createElement('form');
        form.classList.add('form');

        form.insertAdjacentHTML('beforeend', `
            <button class="close" type="button"></button>
            <h2 class="form-title">Добавить контакт</h2>
            <div class="form-group">
                <label class="form-label" for="name">Имя:</label>
                <input class="form-input" name="name" id="name"
                    type="text" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="surname">Фамилия:</label>
                <input class="form-input" name="surname" id="surname"
                    type="text" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="phone">Телефон:</label>
                <input class="form-input" name="phone" id="phone"
                    type="number" required>
            </div>
        `);

        const buttonGroup = createButtonsGroup([
            {
                className: 'btn btn-primary mr-3',
                type: 'submit',
                text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'reset',
                text: 'Отмена',
            },
        ]);

        form.append(...buttonGroup.btns);

        overlay.append(form);

        return {
            overlay,
            form,
        };
    };

    const createRow = ({name: firstName, surname, phone}) => {
        const tr = document.createElement('tr');
        tr.classList.add('contact');
        const tdDel = document.createElement('td');
        tdDel.classList.add('delete');
        const buttonDel = document.createElement('button');
        buttonDel.classList.add('del-icon');
        tdDel.append(buttonDel);

        const tdName = document.createElement('td');
        tdName.textContent = firstName;

        const tdSurname = document.createElement('td');
        tdSurname.textContent = surname;

        const tdPhone = document.createElement('td');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phone}`;
        phoneLink.textContent = phone;
        tr.phoneLink = phoneLink;
        tdPhone.append(phoneLink);

        // Добавление кнопки "Редактировать"
        const tdEdit = document.createElement('td');
        const tdEditBtn = document.createElement('button');
        tdEditBtn.classList.add('edit-btn');
        tdEdit.append(tdEditBtn);

        tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

        return tr;
    };

    const renderContacts = (elem, data) => {
        const allRow = data.map(createRow);
        console.log('allRow: ', allRow);
        elem.append(...allRow);

        return allRow;
    };

    const hoverRow = (allRow, logo) => {
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

    const createFooter = () => {
        const footer = document.createElement('footer');
        footer.classList.add('footer');

        const footerContainer = createContainer();
        footer.append(footerContainer);

        footer.footerContainer = footerContainer;

        return footer;
    };

    const createCopyright = title => {
        const text = document.createElement('p');
        text.innerHTML = `Все права защищены &copy;${title}`;

        return text;
    };

    const renderPhoneBook = (app, title) => {
        const header = createHeader();
        const logo = createLogo(title);
        const main = createMain();
        const buttonGroup = createButtonsGroup([
            {
                className: 'btn btn-primary mr-3',
                type: 'button',
                text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'button',
                text: 'Удалить',
            },
        ]);

        const table = createTable();
        const {form, overlay} = createForm();
        const footer = createFooter();
        const copyrightText = createCopyright(title);

        header.headerContainer.append(logo);
        main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
        footer.footerContainer.append(copyrightText);
        app.append(header, main, footer);

        return {
            list: table.tbody,
            logo,
            btnAdd: buttonGroup.btns[0],
            btnDel: buttonGroup.btns[1],
            formOverlay: overlay,
            form,
            table,
        };
    };

    const modalControl = (btnAdd, formOverlay) => {
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

    const deleteControl = (btnDel, list) => {
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
                const phone = removedContact.cells[3].textContent;
                removeStorage(phone);
            }
        });
    };

    const addContactPage = (contact, list) => {
        list.append(createRow(contact));
    };

    const formControl = (form, list, closeModal) => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(e.target);
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

    const setSortStorage = (field, order) => {
        localStorage.setItem('sortField', JSON.stringify({
            field,
            order,
        }));
    };

    const sortControl = (table, list) => {
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

    const sortControlInit = (data, list) => {
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

    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const data = getStorage('phonebook');
        const {
            list,
            logo,
            btnAdd,
            btnDel,
            formOverlay,
            form,
            table,
        } = renderPhoneBook(app, title);

        //  Функционал
        const allRow = renderContacts(list, data);
        console.log('allRow: ', allRow);
        const {closeModal} = modalControl(btnAdd, formOverlay);

        hoverRow(allRow, logo);
        deleteControl(btnDel, list);
        formControl(form, list, closeModal);
        sortControlInit(data, list);
        sortControl(table, list);
    };

    window.phoneBookInit = init;
}
