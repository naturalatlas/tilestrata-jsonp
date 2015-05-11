module.exports = function(options) {
	var cb = (options && options.variable) || 'cb';
	var regexp = new RegExp('(?:\\b|&)' + cb + '=([a-zA-Z$_][\.a-zA-Z0-9$_]*)(?:&|$)');
	return {
		reshook: function(server, tile, req, res, result, callback) {
			if (result.headers['Content-Type'] !== 'application/json') return callback();
			if (!tile.qs) return callback();
			var match = tile.qs.match(regexp);
			if (!match) return callback();
			var callbackName = match[1];
			var callbackLength = callbackName.length;
			var newBuffer = new Buffer(result.buffer.length + callbackLength + 2);
			newBuffer.write(callbackName + '(');
			newBuffer.write(result.buffer.toString('utf8'), callbackLength + 1);
			newBuffer.write(')', newBuffer.length - 1);
			result.buffer = newBuffer;
			result.headers['Content-Type'] = 'text/javascript';
			callback();
		}
	};
};
