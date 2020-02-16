/**
 * Transforms string into PascalCase
 * @param str
 */
export function pascalfy(str: string) {
	return str
		.split('-')
		.map(w => w[0].toUpperCase() + w.slice(1))
		.reduce((acc, curr) => `${acc}${curr}`);
}

/**
 * Transforms string into Uppercase
 * @param str 
 */
export function upperfy(str: string) {
	return str.toUpperCase().replace('-', '_');
}