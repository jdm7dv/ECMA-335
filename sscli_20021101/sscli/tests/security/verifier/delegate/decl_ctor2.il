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
// decl_ctor2.il
//
// NEGATIVE
// invalid ctor declaration
.assembly extern mscorlib { }
.assembly decl_ctor2 { }
.class public auto ansi sealed TestDelegate
       extends [mscorlib]System.MulticastDelegate
{
  .method public hidebysig specialname rtspecialname 
          instance void  .ctor(object 'object',
                               float64) runtime managed { }
  .method public hidebysig virtual instance class TestDelegate
          Invoke() runtime managed { }
}
.class public auto ansi beforefieldinit TestClass
       extends [mscorlib]System.Object
{
  .method public hidebysig newslot virtual 
          instance class TestDelegate Method() il managed
  {
    .maxstack  3
    .locals init (class TestDelegate V_0)
    IL_0000:  ldarg.0
    IL_0001:  dup
    IL_0002:  ldvirtftn  instance class TestDelegate TestClass::Method()
    IL_0008:  newobj     instance void TestDelegate::.ctor(object,
                                                           native unsigned int)
    IL_000d:  stloc.0
    IL_000e:  br.s       IL_0010
    IL_0010:  ldloc.0
    IL_0011:  ret
  }
  .method public hidebysig static void  Main(class System.String[] args) il managed
  {
    .entrypoint
    .maxstack  8
    IL_0000:  newobj     instance void TestClass::.ctor()
    ldc.r8 0
    IL_000c:  newobj     instance void TestDelegate::.ctor(object,
                                                           float64)
    IL_0011:  callvirt   instance class TestDelegate TestDelegate::Invoke()
    IL_0016:  callvirt   instance class TestDelegate TestDelegate::Invoke()
    IL_001b:  pop
    IL_001c:  ret
  }
  .method public hidebysig specialname rtspecialname 
          instance void .ctor() il managed
  {
    .maxstack  8
    IL_0000:  ldarg.0
    IL_0001:  call       instance void [mscorlib]System.Object::.ctor()
    IL_0006:  ret
  }
}
