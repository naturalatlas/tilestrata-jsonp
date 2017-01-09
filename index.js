module.exports = function(options) {
	var cb = (options && options.variable) || 'cb';
	var regexp = new RegExp('(?:\\b|&)' + cb + '=([a-zA-Z$_][\.a-zA-Z0-9$_]*)(?:&|$)');
	return {
		name: 'jsonp',
		reshook: function(server, tile, req, res, result, callback) {
			var contentType = result.headers['Content-Type'];
			if (!contentType || contentType.substring(0,16) !== 'application/json') return callback();

			if (!tile.qs) return callback();
			var match = tile.qs.match(regexp);
			if (!match) return callback();
			var callbackName = match[1];
			var callbackLength = callbackName.length;
			var newBuffer = new Buffer(result.buffer.length + callbackLength * 2 + 28);
			newBuffer.write('if(typeof ' + callbackName + '==="function"){' + callbackName + '('); // 26 + 2 * callbackName
			newBuffer.write(result.buffer.toString('utf8'), callbackLength * 2 + 26);
			newBuffer.write(')}', newBuffer.length - 2);
			result.buffer = newBuffer;
			result.headers['Content-Type'] = 'text/javascript; charset=UTF-8';
			callback();
		}
	};
};
