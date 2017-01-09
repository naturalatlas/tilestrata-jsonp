var TileServer = require('tilestrata').TileServer;
var TileRequest = require('tilestrata').TileRequest;
var jsonp = require('../index.js');
var assert = require('chai').assert;

describe('Response Hook Implementation "jsonp"', function() {
	describe('reshook()', function() {
		it('should not wrap if content-type is not json', function(done) {
			var iface = jsonp({variable: 'cb'});
			var mockResult = {headers: {'Content-Type':'image/png'}, buffer: new Buffer('{"message":"hello"}', 'utf8'), status: 200};
			var mockTile = TileRequest.parse('/mylayer/0/0/0/tile.json?cb=mycallback');
			iface.reshook(null, mockTile, null, null, mockResult, function(err) {
				assert.isTrue(typeof err === 'undefined');
				assert.equal(mockResult.buffer.toString('utf8'), '{"message":"hello"}');
				done();
			});
		});
		it('should not wrap if callback variable not present', function(done) {
			var iface = jsonp({variable: 'cb'});
			var mockResult = {headers: {'Content-Type': 'application/json'}, buffer: new Buffer('{"message":"hello"}', 'utf8'), status: 200};
			var mockTile = TileRequest.parse('/mylayer/0/0/0/tile.json');
			iface.reshook(null, mockTile, null, null, mockResult, function(err) {
				assert.isTrue(typeof err === 'undefined');
				assert.equal(mockResult.buffer.toString('utf8'), '{"message":"hello"}');
				done();
			});
		});
		it('should not wrap if callback variable invalid', function(done) {
			var iface = jsonp({variable: 'cb'});
			var mockResult = {headers: {'Content-Type': 'application/json'}, buffer: new Buffer('{"message":"hello"}', 'utf8'), status: 200};
			var mockTile = TileRequest.parse('/mylayer/0/0/0/tile.json?cb=12151a');
			iface.reshook(null, mockTile, null, null, mockResult, function(err) {
				assert.isTrue(typeof err === 'undefined');
				assert.equal(mockResult.buffer.toString('utf8'), '{"message":"hello"}');
				done();
			});
		});
		it('should wrap if callback variable present (1)', function(done) {
			var iface = jsonp({variable: 'cb'});
			var mockResult = {headers: {'Content-Type': 'application/json; charset=UTF-8'}, buffer: new Buffer('{"message":"ȟello"}', 'utf8'), status: 200};
			var mockTile = TileRequest.parse('/mylayer/0/0/0/tile.json?cb=lu0.lu_13_1594_2964');
			iface.reshook(null, mockTile, null, null, mockResult, function(err) {
				assert.isTrue(typeof err === 'undefined');
				assert.equal(mockResult.headers['Content-Type'], 'text/javascript; charset=UTF-8');
				assert.equal(mockResult.buffer.toString('utf8'), 'if(typeof lu0.lu_13_1594_2964==="function"){lu0.lu_13_1594_2964({"message":"ȟello"})}');
				done();
			});
		});
		it('should wrap if callback variable present (2)', function(done) {
			var iface = jsonp({variable: 'cb'});
			var mockResult = {headers: {'Content-Type': 'application/json'}, buffer: new Buffer('{"message":"ȟello"}', 'utf8'), status: 200};
			var mockTile = TileRequest.parse('/mylayer/0/0/0/tile.json?cb=callback12125125&another');
			iface.reshook(null, mockTile, null, null, mockResult, function(err) {
				assert.isTrue(typeof err === 'undefined');
				assert.equal(mockResult.headers['Content-Type'], 'text/javascript; charset=UTF-8');
				assert.equal(mockResult.buffer.toString('utf8'), 'if(typeof callback12125125==="function"){callback12125125({"message":"ȟello"})}');
				done();
			});
		});
		it('should wrap if callback variable present (3)', function(done) {
			var iface = jsonp({variable: 'cb'});
			var mockResult = {headers: {'Content-Type': 'application/json'}, buffer: new Buffer('{"message":"ȟello"}', 'utf8'), status: 200};
			var mockTile = TileRequest.parse('/mylayer/0/0/0/tile.json?var&cb=callback12125125&another');
			iface.reshook(null, mockTile, null, null, mockResult, function(err) {
				assert.isTrue(typeof err === 'undefined');
				assert.equal(mockResult.headers['Content-Type'], 'text/javascript; charset=UTF-8');
				assert.equal(mockResult.buffer.toString('utf8'), 'if(typeof callback12125125==="function"){callback12125125({"message":"ȟello"})}');
				done();
			});
		});
	});
});
