.assembly extern mscorlib {}
//access global private scope field in another module in another assembly. has VE 

.module 'scope15-2.exe'

.assembly 'scope15-2' // as "scope15-2.exe"
 { 
.custom instance void [mscorlib]System.Security.AllowPartiallyTrustedCallersAttribute::.ctor() = ( 01 00 00 00 )
 
  .hash algorithm 0x00008004
  .ver 0:0:0:0
}
 

.module extern anotherprivatescopediffassem.dll
.file anotherprivatescopediffassem.dll

.assembly extern anotherPrivateScopeDiffAssem
{
  .ver 0:0:0:0
}

.class public auto ansi TestClass
{

  .method private instance void Bar() il managed
  {
    // Code size       18 (0x12)
    .maxstack  8
   // IL_0000:  ldarg.0
    IL_0001:  ldc.i4.5
    IL_0002:  stsfld      int32 [.module anotherprivatescopediffassem.dll]::iPrivateScope
    IL_0007:  ldsfld     int32 [.module anotherprivatescopediffassem.dll]::iPrivateScope
    IL_000c:  call       void [mscorlib]System.Console::WriteLine(int32)
    IL_0011:  ret


  } // end of method 'TestClass::Bar'

  .method public static void  Main(class ['mscorlib']System.String[] args) il managed
  {
    .entrypoint
    // Code size       13 (0xd)
    .maxstack  1
     .locals init (class TestClass V_0, int32 V_1)
    .try {
      .try {
               newobj     instance void TestClass::.ctor()
               stloc.0
               ldloc.0
               call       instance void TestClass::Bar()
               leave.s    EndTry
               ldstr      "TEST FAILED"
               call       void ['mscorlib']System.Console::WriteLine(string)
               ldc.i4.1
               stloc      V_1
               leave.s    EndTry
      }  // end try
      catch ['mscorlib']System.FieldAccessException
      {
               pop
               ldstr      "TEST PASSED"
               call       void ['mscorlib']System.Console::WriteLine(string)
               ldc.i4.0
               stloc      V_1
               leave.s    EndTry

      }  // end handler
      EndTry: leave.s EndIL
    }  // end try 
    catch ['mscorlib']System.Exception 
    {
        pop
        ldstr      "TEST FAILED"
        call       void ['mscorlib']System.Console::WriteLine(string)
        ldc.i4.1
        stloc      V_1
        leave.s    EndIL
    }  // end handler

    EndIL:    ldloc  V_1 
              call       void [mscorlib]System.Environment::set_ExitCode(int32)
              ret
  } // end of method 'TestClass::Main'

  .method public specialname rtspecialname instance void .ctor() il managed
  {
    // Code size       7 (0x7)
    .maxstack  8
    IL_0000:  ldarg.0
    IL_0001:  call       instance void ['mscorlib']System.Object::.ctor()
    IL_0006:  ret
  } // end of method 'TestClass::.ctor'

} // end of class 'TestClass'

//*********** DISASSEMBLY COMPLETE ***********************
