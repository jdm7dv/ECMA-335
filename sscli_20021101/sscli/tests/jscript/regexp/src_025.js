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


var iTestID = 53643;

var sCat = '';
var regPat = "";
var objExp = "";
var m_scen = '';
var strTest = "";
var strTemp = "";
var regExp = "";



function verify(sCat1, sExp, sAct)
{
	//this function makes sure sAct and sExp are equal

	if (sExp != sAct)
		apLogFailInfo( m_scen+(sCat1.length?"--"+sCat1:"")+" failed", sExp,sAct, "");
}





function verifyStringObj(sCat1, sExp, sAct)
{
	//this function simply calls verify with the values of the string
	verify(sCat1, sExp.valueOf(), sAct.valueOf());
}





function ArrayEqual(sCat1, arrayExp, arrayAct)
{
	//redirects function call to verify
	verify(sCat1, arrayExp, arrayAct);
}





function regVerify(sCat1, ArrayReg, ArrayAct)
{
	var i;
	var expArray = new Array('','','','','','','','','');

	for (i in ArrayReg)
		if (i < 10)
			expArray[i] = ArrayReg[i];
		else
			break;

	for(i =0; i<9;i++)
		verify(sCat1 + ' RegExp.$'+ (i+1) +' ', expArray[i], eval('RegExp.$'+(i+1)));
}



function src_025() {
	

apInitTest("src_025");


	m_scen = ('Test 1 UpperCase /ABC|ASDIASLKDLAKJSD/');

	sCat = "Pattern: exist | non-exist ";
	apInitScenario(m_scen);
	regPat = /ABC|ASDIASLKDLAKJSD/;
	objExp = new Array('ABC');
	regExp = new Array();
	
	objExp = 0;
	strTest = 'ABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	objExp = 1;
	strTest = 'DABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	strTest = 'DABCE';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABCE';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 6;
	strTest = '      ABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end
	
	objExp = 10;
	strTest = '          ABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end
	
	objExp = 11;
	strTest = '          DABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end
	
	objExp = 3;
	strTest = 'AB ABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end
	
	objExp = 8;
	strTest = 'AB      ABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end
	
	objExp = 2;
	strTest = 'ABABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 3;
	strTest = 'AB	ABCE       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 12;
	strTest = 'AB          ABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = 'ABE          DABCE       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 2 Slightly more complex strings');

	objExp = 0;
	strTest = 'ABC AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = '              ABC AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end
	
	objExp = 0;
	strTest = 'ABC AB C ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end
	
	objExp = 15;
	strTest = '              DABC AB C ABRACADABRAB'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABC AB C ABRACADABRAB C            '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end
	
	objExp = 15;
	strTest = '              EABC AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end
	
	objExp = 1;
	strTest = 'NABC AB C ABRACADABRAB D            '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	m_scen = ('Test 3 UpperCase tests w/ multiples');

	objExp = 0;
	strTest = 'ABC ABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 5;
	strTest = '     ABC ABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC ABC      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABC ABCE      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 9;
	strTest = '         ABC ABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '         ABCD EABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 4 Slightly more complex strings w/ multiple finds');

	objExp = 0;
	strTest = 'ABC ABC ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = '              ABC ABC ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC ABC ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 18;
	strTest = '              ORANABCABO SIENABCATHEDRAL ABRACADABRAE'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 4;
	strTest = 'ORANABCABO SIENABCATHEDRAL ABRACADABRAE              '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              DABCE FABCG EABRACADABRAS'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'TABCN DABC ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 12;
	strTest = '           DABCN SABC ABRACADABRAD             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'SABC BABC RABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              SABC BABC RABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC ABC ABCADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              SABCR BABCA ABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'RABC VABC ABCADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              AABCD AABABCAB AAABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 2;
	strTest = 'FGABCDG MAABCDS RZABCXAADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 13;
	strTest = '           MTABCDG DFABCWO MKNOABCADABRABLOL             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 5 UpperCase /ASDIASLKDLAKJSD|ABC/');

	sCat = "Pattern: non-exist | exist ";
	apInitScenario(m_scen);
	regPat = /ASDIASLKDLAKJSD|ABC/;
	objExp = new Array('ABC');
	regExp = new Array();

	objExp = 0;
	strTest = 'ABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	objExp = 1;
	strTest = 'DABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	strTest = 'DABCE';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABCE';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 6;
	strTest = '      ABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 10;
	strTest = '          ABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 11;
	strTest = '          DABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 3;
	strTest = 'AB ABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 8;
	strTest = 'AB      ABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 2;
	strTest = 'ABABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 3;
	strTest = 'AB	ABCE       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 12;
	strTest = 'AB          ABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = 'ABE          DABCE       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 6 Slightly more complex strings');

	objExp = 0;
	strTest = 'ABC AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = '              ABC AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC AB C ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              DABC AB C ABRACADABRAB'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABC AB C ABRACADABRAB C            '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              EABC AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'NABC AB C ABRACADABRAB D            '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	m_scen = ('Test 7 UpperCase tests w/ multiples');

	objExp = 0;
	strTest = 'ABC ABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 5;
	strTest = '     ABC ABC';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC ABC      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABC ABCE      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 9;
	strTest = '         ABC ABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '         ABCD EABC       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 8 Slightly more complex strings w/ multiple finds');

	objExp = 0;
	strTest = 'ABC ABC ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = '              ABC ABC ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC ABC ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 18;
	strTest = '              ORANABCABO SIENABCATHEDRAL ABRACADABRAE'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 4;
	strTest = 'ORANABCABO SIENABCATHEDRAL ABRACADABRAE              '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              DABCE FABCG EABRACADABRAS'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'TABCN DABC ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 12;
	strTest = '           DABCN SABC ABRACADABRAD             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'SABC BABC RABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              SABC BABC RABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC ABC ABCADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              SABCR BABCA ABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'RABC VABC ABCADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              AABCD AABABCAB AAABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 2;
	strTest = 'FGABCDG MAABCDS RZABCXAADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 13;
	strTest = '           MTABCDG DFABCWO MKNOABCADABRABLOL             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	m_scen = ('Test 9 UpperCase /ABC|MNZ/');

	sCat = "Pattern: exist found | exist ";
	apInitScenario(m_scen);
	regPat = /ABC|MNZ/;
	objExp = new Array('ABC');
	regExp = new Array();

	objExp = 0;
	strTest = 'ABCMNZ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	objExp = 1;
	strTest = 'DABCMNZ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	strTest = 'DABCEMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABCEMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 6;
	strTest = '      ABCMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC       MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABC       MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 10;
	strTest = '          ABC       MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 11;
	strTest = '          DABC       MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 3;
	strTest = 'AB ABCMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 8;
	strTest = 'AB      ABCMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 2;
	strTest = 'ABABC MNZD      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 3;
	strTest = 'AB	ABCE MNZD      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 12;
	strTest = 'AB          ABC   MNZD    ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = 'ABE          DABCE  MNZD     ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 10 Slightly more complex strings');

	objExp = 0;
	strTest = 'ABCMNZD AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = '              ABCMNZD AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 6;
	strTest = 'AB C DABCVMNZD  ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              DABCMNZD AB C ABRACADABRAB'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABCMNZD AB C ABRACADABRAB C            '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              EABC AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'NABC MNZD AB C ABRACADABRAB D            '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	m_scen = ('Test 11 UpperCase tests w/ multiples');

	objExp = 0;
	strTest = 'ABC MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 5;
	strTest = '     ABC MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC MNZD      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABC MNZD      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 9;
	strTest = '         ABC MNZD       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '         ABCD EMNZD       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 12 Slightly more complex strings w/ multiple finds');

	objExp = 0;
	strTest = 'ABC MNZD ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = '              ABC MNZD ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC MNZD ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 18;
	strTest = '              ORANABCABO SIENMNZDTHEDRAL ABRACADABRAE'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 4;
	strTest = 'ORANABCABO SIENMNZDTHEDRAL ABRACADABRAE              '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              DABCE FMNZD EABRACADABRAS'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'TABCN DMNZD ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 12;
	strTest = '           DABCN SMNZD ABRACADABRAD             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'SABC BMNZD RABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              SABC BMNZD RABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC MNZD ABCADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              SABCR BMNZDA ABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'RABC VMNZD ABCADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              AABCD AABMNZDAB AAABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 2;
	strTest = 'FGABCDG MAMNZDS RZABCXAADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 13;
	strTest = '           MTABCDG DFMNZD MKNOABCADABRABLOL             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 13 UpperCase /MNZ|ABC/');

	sCat = "Pattern: exist | exist found ";
	apInitScenario(m_scen);
	regPat = /MNZ|ABC/;
	objExp = new Array('ABC');
	regExp = new Array();

	objExp = 0;
	strTest = 'ABCMNZ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	objExp = 1;
	strTest = 'DABCMNZ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	strTest = 'DABCEMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABCEMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 6;
	strTest = '      ABCMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC       MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABC       MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 10;
	strTest = '          ABC       MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 11;
	strTest = '          DABC       MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 3;
	strTest = 'AB ABCMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 8;
	strTest = 'AB      ABCMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 2;
	strTest = 'ABABC MNZD      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 3;
	strTest = 'AB	ABCE MNZD      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 12;
	strTest = 'AB          ABC   MNZD    ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = 'ABE          DABCE  MNZD     ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 14 Slightly more complex strings');

	objExp = 0;
	strTest = 'ABCMNZD AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = '              ABCMNZD AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 6;
	strTest = 'AB C DABCVMNZD  ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              DABCMNZD AB C ABRACADABRAB'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABCMNZD AB C ABRACADABRAB C            '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              EABC AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'NABC MNZD AB C ABRACADABRAB D            '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	m_scen = ('Test 15 UpperCase tests w/ multiples');

	objExp = 0;
	strTest = 'ABC MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 5;
	strTest = '     ABC MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC MNZD      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABC MNZD      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 9;
	strTest = '         ABC MNZD       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '         ABCD EMNZD       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 16 Slightly more complex strings w/ multiple finds');

	objExp = 0;
	strTest = 'ABC MNZD ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = '              ABC MNZD ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC MNZD ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 18;
	strTest = '              ORANABCABO SIENMNZDTHEDRAL ABRACADABRAE'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 4;
	strTest = 'ORANABCABO SIENMNZDTHEDRAL ABRACADABRAE              '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              DABCE FMNZD EABRACADABRAS'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'TABCN DMNZD ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 12;
	strTest = '           DABCN SMNZD ABRACADABRAD             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'SABC BMNZD RABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              SABC BMNZD RABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC MNZD ABCADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              SABCR BMNZDA ABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'RABC VMNZD ABCADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              AABCD AABMNZDAB AAABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 2;
	strTest = 'FGABCDG MAMNZDS RZABCXAADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 13;
	strTest = '           MTABCDG DFMNZD MKNOABCADABRABLOL             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	m_scen = ('Test 17 UpperCase /ABC|ABC/');

	sCat = "Both Patterns Same ";
	apInitScenario(m_scen);
	regPat = /ABC|ABC/;
	objExp = new Array('ABC');
	regExp = new Array();

	objExp = 0;
	strTest = 'ABCMNZ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	objExp = 1;
	strTest = 'DABCMNZ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	strTest = 'DABCEMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABCEMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 6;
	strTest = '      ABCMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC       MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABC       MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 10;
	strTest = '          ABC       MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 11;
	strTest = '          DABC       MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 3;
	strTest = 'AB ABCMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 8;
	strTest = 'AB      ABCMNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 2;
	strTest = 'ABABC MNZD      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 3;
	strTest = 'AB	ABCE MNZD      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 12;
	strTest = 'AB          ABC   MNZD    ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = 'ABE          DABCE  MNZD     ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 18 Slightly more complex strings');

	objExp = 0;
	strTest = 'ABCMNZD AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = '              ABCMNZD AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 6;
	strTest = 'AB C DABCVMNZD  ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              DABCMNZD AB C ABRACADABRAB'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABCMNZD AB C ABRACADABRAB C            '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              EABC AB C ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'NABC MNZD AB C ABRACADABRAB D            '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	m_scen = ('Test 19 UpperCase tests w/ multiples');

	objExp = 0;
	strTest = 'ABC MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 5;
	strTest = '     ABC MNZD';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC MNZD      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'DABC MNZD      ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 9;
	strTest = '         ABC MNZD       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '         ABCD EMNZD       ';
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 20 Slightly more complex strings w/ multiple finds');

	objExp = 0;
	strTest = 'ABC MNZD ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 14;
	strTest = '              ABC MNZD ABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC MNZD ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 18;
	strTest = '              ORANABCABO SIENMNZDTHEDRAL ABRACADABRAE'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 4;
	strTest = 'ORANABCABO SIENMNZDTHEDRAL ABRACADABRAE              '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              DABCE FMNZD EABRACADABRAS'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'TABCN DMNZD ABRACADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 12;
	strTest = '           DABCN SMNZD ABRACADABRAD             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'SABC BMNZD RABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              SABC BMNZD RABRACADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 0;
	strTest = 'ABC MNZD ABCADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              SABCR BMNZDA ABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 1;
	strTest = 'RABC VMNZD ABCADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 15;
	strTest = '              AABCD AABMNZDAB AAABCADABRA'; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 2;
	strTest = 'FGABCDG MAMNZDS RZABCXAADABRA             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	objExp = 13;
	strTest = '           MTABCDG DFMNZD MKNOABCADABRABLOL             '; 
	ArrayEqual(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 21 Failure - UpperCase /ABC|ABC/');

	sCat = "Both Patterns do not exist ";
	apInitScenario(m_scen);
	regPat = /ABCG|MNZOD/;
objExp = -1;
	regExp = new Array();

	strTest = 'ABCMNZ';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	strTest = 'DABCMNZ';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	strTest = 'DABCEMNZD';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'ABCEMNZD';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '      ABCMNZD';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'ABC       MNZD';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'DABC       MNZD';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '          ABC       MNZD';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '          DABC       MNZD';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'AB ABCMNZD';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'AB      ABCMNZD';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'ABABC MNZD      ';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'AB	ABCE MNZD      ';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'AB          ABC   MNZD    ';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'ABE          DABCE  MNZD     ';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 22 Failure - Slightly more complex strings');

	strTest = 'ABCMNZD AB C ABRACADABRA'; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '              ABCMNZD AB C ABRACADABRA'; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'AB C DABCVMNZD  ABRACADABRA             '; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '              DABCMNZD AB C ABRACADABRAB'; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'DABCMNZD AB C ABRACADABRAB C            '; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '              EABC AB C ABRACADABRA'; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'NABC MNZD AB C ABRACADABRAB D            '; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end


	m_scen = ('Test 23 Failure - UpperCase tests w/ multiples');

	strTest = 'ABC MNZD';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '     ABC MNZD';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'ABC MNZD      ';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'DABC MNZD      ';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '         ABC MNZD       ';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '         ABCD EMNZD       ';
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	m_scen = ('Test 24 Failure - Slightly more complex strings w/ multiple finds');

	strTest = 'ABC MNZD ABRACADABRA'; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '              ABC MNZD ABRACADABRA'; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'ABC MNZD ABRACADABRA             '; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '              ORANABCABO SIENMNZDTHEDRAL ABRACADABRAE'; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'ORANABCABO SIENMNZDTHEDRAL ABRACADABRAE              '; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '              DABCE FMNZD EABRACADABRAS'; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'TABCN DMNZD ABRACADABRA             '; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '           DABCN SMNZD ABRACADABRAD             '; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'SABC BMNZD RABCADABRA'; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '              SABC BMNZD RABRACADABRA'; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'ABC MNZD ABCADABRA             '; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '              SABCR BMNZDA ABCADABRA'; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'RABC VMNZD ABCADABRA             '; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '              AABCD AABMNZDAB AAABCADABRA'; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = 'FGABCDG MAMNZDS RZABCXAADABRA             '; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end

	strTest = '           MTABCDG DFMNZD MKNOABCADABRABLOL             '; 
	verify(sCat+strTest, objExp, strTest.search(regPat));
	@if (!@_fast)
		regVerify(sCat+strTest, regExp, strTest.search(regPat));
	@end
/*****************************************************************************/
	apEndTest();
}


src_025();


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
