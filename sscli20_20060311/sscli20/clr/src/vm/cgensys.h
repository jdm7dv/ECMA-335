// ==++==
//
//   
//    Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
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
// CGENSYS.H -
//
// Generic header for choosing system-dependent helpers
//
//

#ifndef __cgensys_h__
#define __cgensys_h__

class MethodDesc;
class Stub;
class PrestubMethodFrame;
class Thread;
class NDirectMethodFrame;
class DelegateTransitionFrame;
class PInvokeCalliFrame;
class CallSig;
class IFrameState;
class CrawlFrame;
struct EE_ILEXCEPTION_CLAUSE;



#include <cgencpu.h>


void ResumeAtJitEH   (CrawlFrame* pCf, BYTE* startPC, EE_ILEXCEPTION_CLAUSE *EHClausePtr, DWORD nestingLevel, Thread *pThread, BOOL unwindStack);
int  CallJitEHFilter (CrawlFrame* pCf, BYTE* startPC, EE_ILEXCEPTION_CLAUSE *EHClausePtr, DWORD nestingLevel, OBJECTREF thrownObj);
void CallJitEHFinally(CrawlFrame* pCf, BYTE* startPC, EE_ILEXCEPTION_CLAUSE *EHClausePtr, DWORD nestingLevel);






// Non-CPU-specific helper functions called by the CPU-dependent code
extern "C" const BYTE * __stdcall PreStubWorker(PrestubMethodFrame *pPFrame);
extern "C" INT64 __stdcall NDirectGenericStubWorker(Thread *pThread,
                                                           NDirectMethodFrame * pFrame);
extern "C" INT64 __stdcall DllImportForDelegateGenericStubWorker(Thread* pThread,
                                                                          DelegateTransitionFrame * pFrame);

// Returns information about the CPU processor.
// Note that this information may be the least-common-denominator in the
// case of a multi-proc machine.

#ifdef _X86_
extern "C" void __stdcall GetSpecificCpuInfo(CORINFO_CPU * cpuInfo);
#else
extern "C" inline void __stdcall GetSpecificCpuInfo(CORINFO_CPU * cpuInfo)
{
    LEAF_CONTRACT;    
    cpuInfo->dwCPUType = 0;
    cpuInfo->dwFeatures = 0;
    cpuInfo->dwExtendedFeatures = 0;
}

#endif // !_X86_




#ifndef DACCESS_COMPILE
// Given an address in a slot, figure out if the prestub will be called
BOOL DoesSlotCallPrestub(const BYTE *pCode);
#endif

#ifdef DACCESS_COMPILE

// Used by dac/strike to make sense of non-jit/non-jit-helper call targets
// generated by the runtime.
BOOL GetAnyThunkTarget (CONTEXT *pctx, TADDR *pTarget, TADDR *pTargetMethodDesc);

#endif // DACCESS_COMPILE


Stub *CreatePrepadSimulationThunk(CPUSTUBLINKER *psl, MethodDesc *pMD, const BYTE *pTarget);


//
// ResetProcessorStateHolder saves/restores processor state around calls to
// mscorlib during exception handling.
//
class ResetProcessorStateHolder
{

public:

    ResetProcessorStateHolder ()
    {
    }

    ~ResetProcessorStateHolder ()
    {
    }
};


#endif // !__cgensys_h__
