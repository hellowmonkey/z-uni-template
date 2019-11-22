export const isEmpty = (data) => {
	return data === '' || data === null || data === undefined || (typeof data === 'number' && isNaN(data))
}

export const getParams = (url = window.location.href) => {
	const arr = url.split('?')
	const query = arr[1]
	const paramsArr = query.split('&')
	const params = {}
	paramsArr.map((item) => {
		const arrs = item.split('=')
		params[arrs[0]] = arrs[1]
	})
	return params
}

export const getType = (item) => {
	const str = Object.prototype.toString.call(item)
	return str.substring(8, str.length - 1).toLocaleLowerCase()
}

export const random = (n, m) => {
	return Math.floor(Math.random() * (m - n + 1) + n)
}
