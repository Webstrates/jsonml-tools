jsonml-tools
============

jsonml-tools is a super light weight library for converting [JsonML](http://www.jsonml.org) to XML.
It follows the syntax defined [here](http://www.jsonml.org/syntax/).

Usage
=====

	var jsonml = require("jsonml-tools");
	var xml = jsonml.toXML(["foo", ["bar", "baz"]]);
	
License
=======

This work is licenced under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)