export function pascalfy(str: string) {
	return str
		.split('-')
		.map(w => w[0].toUpperCase() + w.slice(1))
		.reduce((acc, curr) => `${acc}${curr}`);
}

export function upperfy(str: string) {
	return str.toUpperCase().replace('-', '_');
}