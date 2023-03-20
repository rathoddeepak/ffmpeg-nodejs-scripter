const isArray = (val) => {
	return typeof val === "object" && val?.length;
}

const isObject = (val) => {
	return typeof val === "object";
}

const isString = (val) => {
	return typeof val === "string";
}

const isNumber = () => {
	return typeof val === "number";
}

const withinArray = (inarray, value) => {
	return inarray?.indexOf(value) !== -1;
}

module.exports = {
	withinArray,
	isArray,
	isNumber,
	isObject,
	isString,
	withinArray
}