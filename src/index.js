module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 != 0) return false;

	let result = str.split("");
	let lastLength = 0;

	while (true) {

		if (result.length === 0) return true;
		if (lastLength === result.length) return false;

		lastLength = result.length;

		for (let i = 1; i < str.length; i++) {
			for (let j = 0; j < bracketsConfig.length; j++) {
				if (result[i] === bracketsConfig[j][1] && result[i - 1] === bracketsConfig[j][0]) {
					result.splice(i - 1, 2);
				}
			}
		}
	}
}
