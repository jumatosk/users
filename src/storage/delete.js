export function deleteItem(key, id) {
    let newValues = JSON.parse(localStorage.getItem(key))
        .filter(item => item.id !== id)

    localStorage.setItem(key, JSON.stringify(newValues))
    return { status: 200 };
}