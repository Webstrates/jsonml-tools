jsonml-tools
============

jsonml-tools is a super light weight library for converting [JsonML](http://www.jsonml.org) to XML.
It follows the syntax defined [here](http://www.jsonml.org/syntax/).

Usage
=====

	var jsonml = require("jsonml-tools");
	var xml = jsonml.toXML(["foo", ["bar", "baz"]]);
	
Per default jsonml-tools self closes tags.
Add a list of tags to selfclose to toXML to white list tags for self close. Add an empty list to disable selfclose.

	var xml = jsonml.toXML(["foo", ["bar"], ["baz"]], ["bar"]); 
	//Results in <foo><bar/><baz></baz></foo>
	
License
=======

This work is licenced under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)