async function pipe(functions) {
	const args = Array.prototype.slice.call(arguments, 0);
	const onFail = args.pop();

	let lastResult;

	for (const fun of args) {
		try {
			lastResult = await fun(lastResult);
		} catch (e) {
      await onFail(e.message);
      break;
		}
	}
}

module.exports = pipe;
