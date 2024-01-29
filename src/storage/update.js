export function update(key, newValue) {
    let valuesEdit = JSON.parse(localStorage.getItem(key))
        .filter(item => item.id !== newValue.id)

    valuesEdit.push(newValue)
    localStorage.setItem(key, JSON.stringify(valuesEdit))
    return { status: 200 };
}