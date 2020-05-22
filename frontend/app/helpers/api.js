/**
 * Делает запрос к апи и возвращет результат
 * @param {String} path путь запроса
 * @param {Object} data параметры
 * @returns {Promise} результат запроса
 */
export default async function api(path, data, method = 'POST') {
    path = 'api/' + path;
    let result = await fetch(path, {
        method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    try {
        result = await result.json();
        if (!result) return null;
        if (result.success) {
            return result.data;
        }
        if (result.error) {
            console.log(`[api] request error:`, result.errorText, '(', result.statusCode, ') path:', path);
            return false;
        } else return result;
    } catch (error) {
        console.error(`[api] result parse error:`, error);
        window.location.reload();
        return false;
    }
}
