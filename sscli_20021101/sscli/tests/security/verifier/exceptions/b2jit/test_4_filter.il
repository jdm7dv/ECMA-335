// ==++==
//
//   
//    Copyright (c) 2002 Microsoft Corporation.  All rights reserved.
//   
//    The use and distribution terms for this software are contained in the file
//    named license.txt, which can be found in the root of this distribution.
//    By using this software in any fashion, you are agreeing to be bound by the
//    terms of this license.
//   
//    You must not remove this notice, or any other, from this software.
//   
//
// ==--==
.assembly test_4_ter {}
.class TestClass{
.method public static void test_4_filter(){
.locals init(int32 locInt1)
  ldc.i4.1
  stloc locInt1
  ldstr      "Test is running"
  call       void [mscorlib]System.Console::WriteLine(class System.String)  
lbl_4_startTry:
lbl_4_endTry:
lbl_4_startFilter:
  ldc.i4.1
  endfilter
lbl_4_endFilter:
lbl_4_startFilterHandler:
  lbl_4_1:nop
  pop
  leave lbl_4_exitSEH
lbl_4_endFilterHandler:
.try  lbl_4_startTry to lbl_4_endTry filter lbl_4_startFilter handler lbl_4_startFilterHandler to lbl_4_endFilterHandler
lbl_4_exitSEH:
  ret
}
.method public static void Main(class ['mscorlib']System.String[] arg)
{
    call void TestClass::test_4_filter()
    .entrypoint
    ret
}
  .method public specialname rtspecialname instance void .ctor() il managed
  {
    .maxstack  8
    IL_0000:  ldarg.0
    IL_0001:  call       instance void ['mscorlib']System.Object::.ctor()
    IL_0006:  ret
  } 
}
