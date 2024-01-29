export function getItem(key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data ? data : [];
}