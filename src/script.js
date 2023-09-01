import * as handlers from './script/control';
import {renderContacts, renderPhoneBook} from './script/render';
import {getStorage} from './script/serviceStorage';

import './index.html';
import './scss/index.scss';

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
    const {closeModal} = handlers.modalControl(btnAdd, formOverlay);

    handlers.hoverRow(allRow, logo);
    handlers.deleteControl(btnDel, list);
    handlers.formControl(form, list, closeModal);
    handlers.sortControlInit(data, list);
    handlers.sortControl(table, list);
};

init('#app', 'Ольга');

