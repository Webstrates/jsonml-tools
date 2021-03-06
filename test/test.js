/* Copyright 2015 Clemens N. Klokmose, Aarhus University

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var jsonml = require("../index.js");
var assert = require("assert");

/*
TESTLIST

 + ["foo"] should return <foo/>
 + ["foo", ["bar"]] should return <foo><bar/></foo>
 + ["foo", "bar", ["baz"]] should return <foo>bar<baz/></foo>
 + ["foo", {"bar": "baz"}] should return <foo bar="baz"/>
 + ["foo", ["bar", ["baz"]]] should return <foo><bar><baz/></bar></foo>
 + [{}] should throw an error
 + ["foo", ["bar", [{}]]] should throw an error
 + ["foo", "bar", {}] should throw an error
 + "foo" should return "foo"
 + ["foo", {bar: true}] should return <foo bar="true"/>
 + ["foo", ["bar"], ["baz"]] should return <foo><bar/><baz/></foo>
 + ["foo", {hello: "world"}, ["bar"], ["baz"]] should return <foo hello="world"><bar/><baz/></foo>
 + ["!", "This is a comment"] should return <!--This is a comment-->
 + ["br"] with selfclose=["br"] should return <br/>
 + ["foo"] with selfclose=["br"] should return <foo></foo>
 + ["foo"] with selfclose=[] should return <foo></foo>
 + ["foo", ["bar"], ["baz"]] with selfclose=["bar"] should return <foo><bar/><baz></baz></foo>
 - ["BR"] with selfclose=["br"] should return <BR/>
 
*/

describe("JsonML", function() {
   describe("#toXML()", function() {
       
       it('should return <foo><foo/> on ["foo"]', function() {
           assert.equal("<foo/>", jsonml.toXML(['foo']));
       });
       
       it('should return <foo><bar/></foo> on ["foo", ["bar"]]', function() {
           assert.equal("<foo><bar/></foo>", jsonml.toXML(["foo", ["bar"]])); 
       });
       
       it('should return <foo><bar><baz/></bar></foo> on ["foo", ["bar", ["baz"]]]', function() {
           assert.equal("<foo><bar><baz/></bar></foo>", jsonml.toXML(["foo", ["bar", ["baz"]]])); 
       });
       
       it('should return <foo>bar<baz/></foo> on ["foo", "bar", ["baz"]]', function() {
           assert.equal("<foo>bar<baz/></foo>", jsonml.toXML(["foo", "bar", ["baz"]]));
       });
       
       it('should return <foo bar="baz"/> on ["foo", {"bar": "baz"}]', function() {
           assert.equal('<foo bar="baz"/>', jsonml.toXML(["foo", {"bar": "baz"}]));
       });
       
       it('should return "foo on ["foo"]"', function() {
           assert.equal('foo', jsonml.toXML("foo"));
       });
       
       it('should return <foo bar="true"/> on ["foo", {bar: true}]', function() {
           assert.equal('<foo bar="true"/>', jsonml.toXML(["foo", {bar: true}])) ;
       });
       
       it('should return <foo><bar/><baz/></foo> on ["foo", ["bar"], ["baz"]]', function() {
           assert.equal('<foo><bar/><baz/></foo>', jsonml.toXML(["foo", ["bar"], ["baz"]]));
       });
       
       it('should return <foo hello="world"><bar/><baz/></foo> on ["foo", {hello: "world"} ["bar"], ["baz"]]', function() {
           assert.equal('<foo hello="world"><bar/><baz/></foo>', jsonml.toXML(["foo", {hello: "world"}, ["bar"], ["baz"]]));
       });
       
       it('should throw an error on [{}]', function() {
           assert.throws( function() { jsonml.toXML([{}]) }, Error, "Invalid JsonML");
       });
       
       it('should throw an error on ["foo", ["bar", [{}]]]', function() {
           assert.throws( function() { jsonml.toXML(["foo", ["bar", [{}]]]) }, Error, "Invalid JsonML");
       });
       
       it('should throw an error on ["foo", "bar", {}]', function() {
           assert.throws( function() { jsonml.toXML(["foo", "bar", {}]) }, Error, "Invalid JsonML");
       });
       
       it('should return <!--This is a comment--> on ["!", "This is a comment"]', function() {
           assert.equal("<!--This is a comment-->", jsonml.toXML(["!", "This is a comment"]));
       });
       
       it('should return <!--This is a comment--> on ["!", "This is ", "a", " comment"]', function() {
           assert.equal("<!--This is a comment-->", jsonml.toXML(["!", "This is ", "a", " comment"]));
       });
       
       it('should return <!--This is a comment--> on ["#comment", "This is a comment"]', function() {
           assert.equal("<!--This is a comment-->", jsonml.toXML(["#comment", "This is a comment"]));
       });
       
       it('should return <foo></foo> on ["foo"] with selfclose=["br"]', function() {
           assert.equal("<foo></foo>", jsonml.toXML(["foo"], ["br"]));
       });
       
       it('should return <br/> on ["br"] with selfclose=["br"]', function() {
           assert.equal("<br/>", jsonml.toXML(["br"], ["br"]));
       });
       
       it('should return <foo></foo> on ["foo"] with selfclose=[]', function() {
           assert.equal("<foo></foo>", jsonml.toXML(["foo"], []));
       });
       
       it('should return <foo><bar/><baz></baz></foo> on ["foo", ["bar"], ["baz"]] with selfclose=["bar"]', function() {
           assert.equal("<foo><bar/><baz></baz></foo>", jsonml.toXML(["foo", ["bar"], ["baz"]], ["bar"]));
       });
       
       it('should return <BR/> on ["BR"] with selfclose=["br"]', function() {
           assert.equal("<BR/>", jsonml.toXML(["BR"], ["br"]));
       });
       
   }); 
});