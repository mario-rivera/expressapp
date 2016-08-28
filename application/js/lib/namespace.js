function Namespace( namespace, parent ){
	var child = parent;

	if( typeof namespace != 'string' || !namespace.length ){
		return {};
	}

	var parts = namespace.split('.');

	for( var i = 0; i < parts.length; i++ ){
		child[ parts[i] ] = child[ parts[i] ] || {};
		child = child[ parts[i] ];
	}

	return child;
};