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
.assembly test_1_try {}
.class TestClass{
.method public static void test_1_try(){
.locals init(int32 locInt1)
  ldc.i4.1
  stloc locInt1
  ldstr      "Test is running"
  call       void [mscorlib]System.Console::WriteLine(class System.String)  
  ldloc locInt1	
  brtrue  lbl_1_1
lbl_1_startTry:
  lbl_1_1: nop
 ldstr      "inside try"
  call       void [mscorlib]System.Console::WriteLine(class System.String)
  leave lbl_1_exitSEH
lbl_1_endTry:
lbl_1_startCatch:
 ldstr      "inside catch"
  call       void [mscorlib]System.Console::WriteLine(class System.String)
  leave lbl_1_exitSEH
lbl_1_endCatch:
.try  lbl_1_startTry to lbl_1_endTry catch ['mscorlib']System.Exception handler lbl_1_startCatch to lbl_1_endCatch
lbl_1_exitSEH:
  ret
}
.method public static void Main(class ['mscorlib']System.String[] arg)
{
    call void TestClass::test_1_try()
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
