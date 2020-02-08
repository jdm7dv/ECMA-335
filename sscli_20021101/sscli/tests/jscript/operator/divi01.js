//# ==++== 
//# 
//#   
//#    Copyright (c) 2002 Microsoft Corporation.  All rights reserved.
//#   
//#    The use and distribution terms for this software are contained in the file
//#    named license.txt, which can be found in the root of this distribution.
//#    By using this software in any fashion, you are agreeing to be bound by the
//#    terms of this license.
//#   
//#    You must not remove this notice, or any other, from this software.
//#   
//# 
//# ==--== 
//####################################################################################
@cc_on


import System;

var NULL_DISPATCH = null;
var apGlobalObj;
var apPlatform;
var lFailCount;


var iTestID = 52918;


function FuncRetVal() { return 655.35; }
function myObjVal() { return 123321; }


@if(!@aspx)
	function myObject() { this.toString = myObjVal; }
@else
	expando function myObject() { this.toString = myObjVal; }
@end

function divi01() {
    var tmp,res,expected,emptyVar;

    var myDate = new Date();
    myDate.setTime(0); // this is Wed Dec 31 16:00:00 1969

    var numvar = 4321;
    var strvar = "57";
    var boolvar = true; // new Boolean(true);
	var emptystrvar = "";

    var ary = new Array();
    ary[2] = 12.14;
    ary[3] = 13.14;
    ary[4] = 15.14;

    var myObj = new myObject();
    var myStr = new String("112");

    apInitTest("divi01");

    apInitScenario("numvar / numvar");
    res = numvar / numvar;
    expected = 1;
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("strvar / numvar");
    res = strvar / numvar;
    expected = 1.319139e-2;
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("ary[3] / numvar");
    res = ary[3] / numvar;
    expected = 3.04096274e-3
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("FuncRetVal() / numvar");
    res = FuncRetVal() / numvar;
    expected = .15166628095
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("myDate.getDate() / numvar");
    res = myDate.getDate() / numvar;
    expected = 7.174265e-3
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("boolvar / numvar");
    res = boolvar / numvar;
    expected = 2.314279e-4
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("numvar / strvar");
    res = numvar / strvar;
    expected = 75.80701
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("strvar / strvar");
    res = strvar / strvar;
    expected = 1
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("ary[3] / strvar");
    res = ary[3] / strvar;
    expected = .230526315789
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("FuncRetVal() / strvar");
    res = FuncRetVal() / strvar;
    expected = 11.4973684210526
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("myDate.getDate() / strvar");
    res = myDate.getDate() / strvar;
    expected = .5438597
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("boolvar / strvar");
    res = boolvar / strvar;
    expected = 1.754386e-2
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("numvar / ary[3]");
    res = numvar / ary[3];
    expected = 328.843226788432
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("strvar / ary[3]");
    res = strvar / ary[3];
    expected = 4.337899543379
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("ary[3] / ary[3]");
    res = ary[3] / ary[3];
    expected = 1
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("FuncRetVal() / ary[3]");
    res = FuncRetVal() / ary[3];
    expected = 49.8744292237443
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("myDate.getDate() / ary[3]");
    res = myDate.getDate() / ary[3];
    expected = 2.35920852359209
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("boolvar / ary[3]");
    res = boolvar / ary[3];
    expected = 0.076103500761035
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("numvar / FuncRetVal()");
    res = numvar / FuncRetVal();
    expected = 6.59342336156252
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("strvar / FuncRetVal()");
    res = strvar / FuncRetVal();
    expected = 8.69764248111696e-2
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("ary[3] / FuncRetVal()");
    res = ary[3] / FuncRetVal();
    expected = 2.00503547722591e-2
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("FuncRetVal() / FuncRetVal()");
    res = FuncRetVal() / FuncRetVal();
    expected = 1
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("myDate.getDate() / FuncRetVal()");
    res = myDate.getDate() / FuncRetVal();
    expected = 4.73029678797589e-2
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("boolvar / FuncRetVal()");
    res = boolvar / FuncRetVal();
    expected = 1.52590218955954e-3
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("numvar / myDate.getDate()");
    res = numvar / myDate.getDate();
    expected = 139.3871
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("strvar / myDate.getDate()");
    res = strvar / myDate.getDate();
    expected = 1.83871
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("ary[3] / myDate.getDate()");
    res = ary[3] / myDate.getDate();
    expected = .423870967741936
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("FuncRetVal() / myDate.getDate()");
    res = FuncRetVal() / myDate.getDate();
    expected = 21.1403225806452
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("myDate.getDate() / myDate.getDate()");
    res = myDate.getDate() / myDate.getDate();
    expected = 1
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("boolvar / myDate.getDate()");
    res = boolvar / myDate.getDate();
    expected = 3.225806e-2
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("numvar / boolvar");
    res = numvar / boolvar;
    expected = 4321
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("strvar / boolvar");
    res = strvar / boolvar;
    expected = 57;
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("ary[3] / boolvar");
    res = ary[3] / boolvar;
    expected = 13.14;
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("FuncRetVal() / boolvar");
    res = FuncRetVal() / boolvar;
    expected = 655.35;
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("myDate.getDate() / boolvar");
    res = myDate.getDate() / boolvar;
    expected = 31;
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("boolvar / boolvar");
    res = boolvar / boolvar;
    expected = 1;
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("numvar / myObj.retVal");
    res = numvar / myObj.retVal;
    expected = .035038638999035
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("strvar / myObj.retVal");
    res = strvar / myObj.retVal;
    expected = 4.62208383000462e-4
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("ary[3] / myObj.retVal");
    res = ary[3] / myObj.retVal;
    expected = 1.06551195660107e-4
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("FuncRetVal() / myObj.retVal");
    res = FuncRetVal() / myObj.retVal;
    expected = 5.31418006665531e-3
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("myDate.getDate() / myObj.retVal");
    res = myDate.getDate() / myObj.retVal;
    expected = 2.51376489000251e-4
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("boolvar / myObj.retVal");
    res = boolvar / myObj.retVal;
    expected = 8.10891900000811e-6
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apInitScenario("emptystrvar / numvar");
    res = emptystrvar / numvar;
    expected = 0;
    if (doVerify(expected,res)) {
    	apLogFailInfo("wrong return value",expected,res,"");
    }
    if (typeof(res) != "number") {
    	apLogFailInfo("wrong return type","number",res,"");
    }

    apEndTest();
}

function doVerify(a,b) {
  if (a == b) { return 0; }
  var epsilon = a;
  if (b < a) epsilon = a;
  epsilon /= 1e6;
  var result = a - b;
  if (result < 0) result *= -1;

  if (result > epsilon) { return 1; } // failure!
  return 0; // success
}


divi01();


if(lFailCount >= 0) System.Environment.ExitCode = lFailCount;
else System.Environment.ExitCode = 1;

function apInitTest(stTestName) {
    lFailCount = 0;

    apGlobalObj = new Object();
    apGlobalObj.apGetPlatform = function Funca() { return "Rotor" }
    apGlobalObj.LangHost = function Funcb() { return 1033;}
    apGlobalObj.apGetLangExt = function Funcc(num) { return "EN"; }

    apPlatform = apGlobalObj.apGetPlatform();
    var sVer = "1.0";  //navigator.appVersion.toUpperCase().charAt(navigator.appVersion.toUpperCase().indexOf("MSIE")+5);
    apGlobalObj.apGetHost = function Funcp() { return "Rotor " + sVer; }
    print ("apInitTest: " + stTestName);
}

function apInitScenario(stScenarioName) {print( "\tapInitScenario: " + stScenarioName);}

function apLogFailInfo(stMessage, stExpected, stActual, stBugNum) {
    lFailCount = lFailCount + 1;
    print ("***** FAILED:");
    print ("\t\t" + stMessage);
    print ("\t\tExpected: " + stExpected);
    print ("\t\tActual: " + stActual);
}

function apGetLocale(){ return 1033; }
function apWriteDebug(s) { print("dbg ---> " + s) }
function apEndTest() {}
