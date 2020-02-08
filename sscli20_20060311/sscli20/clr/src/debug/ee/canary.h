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
//*****************************************************************************
// File: Canary.h
//
// Header file Debugger Canary 
//
//*****************************************************************************

#ifndef CANARY_H
#define CANARY_H

//-----------------------------------------------------------------------------
// Canary.
// 
// The helper thread needs to be very careful about what locks it takes. If it takes a lock
// held by a suspended thread, then the whole process deadlocks (Since the suspended thread
// is waiting for the helper to resume it).
// In general, we try to avoid having the helper take such locks, but the problem is unsolvable
// because:
//   - we don't know what that set of locks are (eg, OS apis may take new locks between versions)
//   - the helper may call into the EE and that takes unsafe locks.
// The most prominent dangerous lock is the heap lock, which is why we have the "InteropSafe" heap.
// Since we don't even know what locks are bad (eg, we can't actually find the Heaplock), we can't 
// explicitly check if the lock is safe to take. 
// So we spin up an auxiallary "Canary" thread which can sniff for locks that the helper thread will 
// need to take. Thus the helper thread can find out if the locks are available without actually taking them.
// The "Canary" can call APIs that take the locks (such as regular "new" for the process heap lock).
// The helper will wait on the canary with timeout. If the canary returns, the helper knows it's
// safe to take the locks. If the canary times out, then the helper assumes it's blocked on the
// locks and thus not safe for the helper to take them.
//-----------------------------------------------------------------------------
class HelperCanary
{
public:
    HelperCanary();
    ~HelperCanary();

    bool AreLocksAvailable();
    void ClearCache();    

protected:
    static DWORD WINAPI ThreadProc(LPVOID param);
    void ThreadProc();
    void TakeLocks();
    bool AreLocksAvailableWorker();

    // Flag to tell Canary thread to exit.
    bool m_fStop;

    // Cache the answers between stops so that we don't have to ping the canary every time.
    bool m_fCachedValid;
    bool m_fCachedAnswer;
    
    HANDLE m_hCanaryThread; // handle for canary thread
    DWORD m_CanaryThreadId; // canary thread OS Thread ID

    // These counters are read + written by both helper and canary thread.
    // These need to be volatile because of how they're being accessed from different threads.
    // However, since each is only read from 1 thread, and written by another, and the WFSO/SetEvent
    // will give us a memory barrier, and we have a flexible polling operation, volatile is 
    // sufficient to deal with memory barrier issues.
    volatile DWORD m_RequestCounter;
    volatile DWORD m_AnswerCounter;
    HandleHolder m_hPingEvent;    

    // We use a Manual wait event to replace Sleep.
    HandleHolder m_hWaitEvent;    
};


#endif // CANARY_H

