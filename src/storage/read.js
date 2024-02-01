export function getItem(key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data ? data : [];
}

export function getItemById(key, id) {
    const data = JSON.parse(localStorage.getItem(key));
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                return data[i];
            }
        }
    }
    return null;
}

export function getItemByField(key, field, value) {
    const data = JSON.parse(localStorage.getItem(key));
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (data[i][field] == value) {
                return data[i];
            }
        }
    }
    return null;
}