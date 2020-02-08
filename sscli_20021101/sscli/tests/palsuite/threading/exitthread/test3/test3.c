/*=============================================================================
**
** Source: test3.c
**
** Purpose: Test to ensure ExitThread() results in any loaded dynamic
**          libraries having their entry point called with a THREAD_DETACH
**          notification.
** 
** Dependencies: PAL_Initialize
**               PAL_Terminate
**               Fail
**               GetCurrentDirectoryW
**               CreateThread
**               ResumeThread
**               LoadLibrary
**               FreeLibrary
**               GetProcAddress
**               WaitForSingleObject
**               GetLastError
**               strlen
**               strncpy
** 
** 
**  Copyright (c) 2002 Microsoft Corporation.  All rights reserved.
** 
**  The use and distribution terms for this software are contained in the file
**  named license.txt, which can be found in the root of this distribution.
**  By using this software in any fashion, you are agreeing to be bound by the
**  terms of this license.
** 
**  You must not remove this notice, or any other, from this software.
** 
**
**===========================================================================*/
#include <palsuite.h>


/* define our test function type */
typedef int ( PALAPI *LPTESTFUNC )( void );


/**
 * ThreadFunc
 *
 * Dummy thread function for causing DLL thread notifications.
 */
DWORD PALAPI ThreadFunc( LPVOID param )
{
    /* simulate some brief "work" */
    int i;
    for( i=0; i<100000; i++ )
        ;
        
    ExitThread( 0 );
    return (0);
}


/* main program entry point */
int __cdecl main( int argc, char **argv ) 

{
    /* local variables */
#if WIN32
    const char* rgchLibraryFile = "dllmain";
    char        szFunction[] = "_GetDetachCount@0";
#else
#if defined(__APPLE__)
    const char* rgchLibraryFile = "dllmain.dylib";
#else   // __APPLE__
    const char* rgchLibraryFile = "dllmain.so";
#endif  // __APPLE__
    char        szFunction[] = "GetDetachCount";
#endif

    HANDLE      hLib = NULL;
    LPTESTFUNC  pFunc;
    int         detachCount1 = 0;
    int         detachCount2 = 0;
    
    HANDLE      hThread = NULL;
    DWORD       IDThread;

    /* initialize the PAL */
    if( PAL_Initialize(argc, argv) != 0 )
    {
	    return( FAIL );
    }
    
    /* Load the test library */
    hLib = LoadLibrary( rgchLibraryFile );
    if(hLib == NULL)
    {
        Fail("ERROR: Unable to load library %s\n", rgchLibraryFile );
    }
    

    /* Get the address of our test function in the dll */
    pFunc = (LPTESTFUNC)GetProcAddress( hLib, szFunction );
    if( pFunc == NULL )
    {
        Trace( "ERROR:%lu%:Unable to load function \"%s\" library \"%s\"\n",
                GetLastError(),
                szFunction,
                rgchLibraryFile );
        if( ! FreeLibrary( hLib ) ) {
            Trace( "FreeLibrary() failed with error code %lu\n",
                    GetLastError() );
        }
        Fail( "Exiting\n" );
    }
    
    /* Execute the test function to get the detach count */
    detachCount1 = pFunc();
    
    /* run another dummy thread to cause notification of the library       */
    hThread = CreateThread(    NULL,             /* no security attributes */
                               0,                /* use default stack size */
      (LPTHREAD_START_ROUTINE) ThreadFunc,       /* thread function        */
                      (LPVOID) NULL,             /* pass thread index as   */
                                                 /* function argument      */
                               CREATE_SUSPENDED, /* create suspended       */
                               &IDThread );      /* returns thread id      */

    /* Check the return value for success. */
    if( hThread == NULL )
    {
        /* error creating thread */
        Trace( "Unexpected CreateThread error %d\n",
              GetLastError() );
        if( ! FreeLibrary( hLib ) ) {
            Trace( "FreeLibrary() failed with error code %lu\n",
                    GetLastError() );
        }
        Fail( "Exiting\n" );
    }
    
    /* Resume the suspended thread */
    ResumeThread( hThread );

    /* wait for the thread to complete */
    WaitForSingleObject( hThread, INFINITE );

    /* Execute the test function to get the new detach count */
    detachCount2 = pFunc();
    
    /* Unload the test library */ 
    if( !FreeLibrary( hLib ) )
    {
        Fail( "ERROR:%u: Unable to free library \"%s\"\n",
                GetLastError(),
                rgchLibraryFile );
    }
    
    /* validate the result */
    if( detachCount2 != (detachCount1 + 1) )
    {
        Fail( "FAIL: unexpected DLL detach count %d, expected %d\n",
                detachCount2,
                (detachCount1 + 1) );
    }
    
    
    /* terminate the PAL */
    PAL_Terminate();
    
    /* return success */
    return PASS; 
}
