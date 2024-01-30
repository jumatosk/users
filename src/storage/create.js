export const create = (key, item) => {
    if (!checkIfExists(key)) {
        let _array = [];
        _array.push(item);
        setItem(key, _array);
        return { status: 201 };
    } else {
        let _array = getItem(key);
        _array.push(item);
        setItem(key, _array);

        return { status: 201 };
    }
};

function checkIfExists(key) {
    return localStorage.getItem(key);
}

function setItem(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
}

function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setItemId(key) {
    if (!checkIfExists(key)) return 1;

    return getItem(key).length + 1;
}

export function alreadyExist(key, value, field) {
    const data = getItem(key);
    let bool = false;

    if (data && data.length > 0) {
        data.forEach((element) => {
            if (String(element[field]).toLowerCase() === String(value).toLowerCase())
                bool = true;
        });
    }
    return bool;
}