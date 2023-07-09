import * as handlers from './modules/control.js';
import {renderContacts, renderPhoneBook} from './modules/render.js';
import {getStorage} from './modules/serviceStorage.js';

{
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

    window.phoneBookInit = init;
}
