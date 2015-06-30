jsonml-tools
============

jsonml-tools is a super light weight library for converting [JsonML](http://www.jsonml.org) to XML.
It follows the syntax defined [here](http://www.jsonml.org/syntax/).

Usage
=====

	var jsonml = require("jsonml-tools");
	var xml = jsonml.toXML(["foo", ["bar", "baz"]]);