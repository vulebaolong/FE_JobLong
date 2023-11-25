export const getCookies = (cookieString: string) => {
    const cookies = cookieString.split('; ').map((item) => {
        const arr = item.split(', ')
        const isArrToken = arr.length === 3

        if (isArrToken) {
            const [name, value] = arr[2].split('=')
            return { [name]: value }
        }
        const [name, value] = item.split('=');
        return { [name]: value }
    })

    return cookies.reduce((acc, obj) => {
        const [key, value] = Object.entries(obj)[0] || [];
        if (value !== '' && value !== undefined) {
            acc = Object.assign(acc, { [key]: value });
        }
        return acc;
    }, {});
}
