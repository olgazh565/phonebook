export const getStorage = key => (JSON.parse(localStorage.getItem(key)) || []);

export const setStorage = (key, obj) => {
    const data = getStorage(key);
    data.push(obj);
    localStorage.setItem(key, JSON.stringify(data));
};

export const removeStorage = id => {
    const data = getStorage('phonebook');
    const newData = data.filter(item => item.id !== id);
    localStorage.setItem('phonebook', JSON.stringify(newData));
};

export const setSortStorage = (field, order) => {
    localStorage.setItem('sortField', JSON.stringify({
        field,
        order,
    }));
};


