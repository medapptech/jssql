/**
 * @memberof STATEMENTS
 * @type {Function}
 * @param {Walker} walker - The walker instance used to parse the current 
 * statement
 * @return {void}
 */
STATEMENTS.CREATE_DATABASE = function(walker) {
	return function() {
		var q = new CreateDatabaseQuery();
		walker
		.optional("IF NOT EXISTS", function() {
			q.ifNotExists(true);
		})
		.someType(WORD_OR_STRING, function(token) {
			q.name(token[0]);
		})
		.nextUntil(";")
		.commit(function() {
			q.execute();
			walker.onComplete('Database "' + q.name() + '" created.');
		});
	};
};