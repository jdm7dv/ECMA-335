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
.assembly unbox1 {}
.class TestClass{
.method public static void unbox1(){
  ldstr      "Test is running"
  call       void [mscorlib]System.Console::WriteLine(class System.String)  
newobj  void [mscorlib]System.Object::.ctor()
unbox [mscorlib]System.Object
pop
  ret
}
.method public static void Main(class ['mscorlib']System.String[] arg)
{
    call void TestClass::unbox1()
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
