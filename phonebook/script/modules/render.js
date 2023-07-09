import createElements from './createElements.js';

const {
    createHeader,
    createLogo,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createRow,
    createFooter,
    createCopyright,
} = createElements;

export const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    console.log('allRow: ', allRow);
    elem.append(...allRow);

    return allRow;
};

export const addContactPage = (contact, list) => {
    list.append(createRow(contact));
};

export const renderPhoneBook = (app, title) => {
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
