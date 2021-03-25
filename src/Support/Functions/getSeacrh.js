export const getQuery = (search) => {
    let queque = {}
    let hasSpilt = search.replace('?', '').split('&').map((val, i) => {
        return val.split('=')
    })
    hasSpilt.forEach((val, i) => {
        queque[val[0]] = [val[1]]
    })
    return queque
}