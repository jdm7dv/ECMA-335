/*=====================================================================
**
** Source:  CreateFileW.c
**
** Purpose: Test the PAL implementation of the CreateFileW function
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
**===================================================================*/

#include <palsuite.h>

BOOL Cleanup(void)
{
    char FileName[20];
    int i;
    BOOL bRet = TRUE; // assume success

    // loop through all accesses, modes, dispositions and flags
    for (i=0; i<4*8*4*5; ++i) {
        sprintf(FileName, "test%03d.txt", i);
	if (DeleteFileA(FileName) == FALSE) {
	    if (GetLastError() != ERROR_FILE_NOT_FOUND) {
		bRet = FALSE;
	    }
	}
    }
    return bRet;
}


int __cdecl main(int argc, char *argv[])
{
    BOOL bSuccess = TRUE;
    int nCounter = 0;
    HANDLE hFile = NULL;
    WCHAR *lpFileName = NULL;
    char* pTemp = NULL;
    char string[40];
    FILE *outFile = NULL;
    char results[1024];
    int i, j, k, l;
    DWORD dwDesiredAccess[4] = {0,              // 0
                                GENERIC_READ,   // 1
                                GENERIC_WRITE,  // 2
                                GENERIC_READ | GENERIC_WRITE};  // 3
    DWORD dwShareMode[8] = {0,              // 0
                        FILE_SHARE_READ,    // 1
                        FILE_SHARE_WRITE,   // 2
                        FILE_SHARE_DELETE,  // 3
                        FILE_SHARE_READ | FILE_SHARE_WRITE,   // 4
                        FILE_SHARE_READ | FILE_SHARE_DELETE,  // 5
                        FILE_SHARE_WRITE | FILE_SHARE_DELETE, // 6
                        FILE_SHARE_READ|FILE_SHARE_WRITE|FILE_SHARE_DELETE};  // 7
    LPSECURITY_ATTRIBUTES lpAttr = NULL;
    DWORD dwCreationDisp[4] = {CREATE_NEW,          // 0
                                CREATE_ALWAYS,      // 1
                                OPEN_EXISTING,      // 2
                                OPEN_ALWAYS};       // 3
    DWORD dwFlagsAttrib[5] = {FILE_ATTRIBUTE_NORMAL,			// 0
                                FILE_FLAG_SEQUENTIAL_SCAN,	    // 1
                                FILE_FLAG_WRITE_THROUGH,		// 2
                                FILE_FLAG_NO_BUFFERING,			// 3
                                FILE_FLAG_RANDOM_ACCESS};		// 4
    HANDLE hTemplate = NULL;


    if (0 != PAL_Initialize(argc,argv))
    {
        return FAIL;
    }

    if (!Cleanup()) {
	Trace("Pre-test Cleanup() failed.  LastError=%d\n", GetLastError());
	return FAIL;
    }

    /* open the file to read the expected results */
    outFile = fopen("winoutput", "r");
    memset (results, 0, 1024);

    fgets(results, 1024, outFile);
    fclose(outFile);

    nCounter = 0;

    // desired access loop
    for (i = 0; i < 4; i++)
    {
        // share mode loop
        for (j = 0; j < 8; j++)
        {
            // security attributes loop
            for (k = 0; k < 4; k++)
            {
                // creation disp loop
                for (l = 0; l < 5; l++)
                {
                    sprintf(string, "test%03d.txt", nCounter);
                    lpFileName = convert(string);
                    hFile = CreateFileW(lpFileName,
                                        dwDesiredAccess[i],
                                        dwShareMode[j],
                                        lpAttr,
                                        dwCreationDisp[k],
                                        dwFlagsAttrib[l],
                                        hTemplate);
                    free(lpFileName);
                    if (hFile == INVALID_HANDLE_VALUE)
                    {
                        if (results[nCounter] == '1')
                        {
                            pTemp = convertC(lpFileName);
                            Trace("CreateFile: ERROR: Failed when expected "
                                "to pass %s [%d][%d][%d][%d]\n",
                                pTemp, i, j, k, l);
                            free(pTemp);
                            bSuccess = FALSE;
                        }
                    }
                    else
                    {
                        CloseHandle(hFile);
                        if (results[nCounter] == '0')
                        {
                            pTemp = convertC(lpFileName);
                            Trace("CreateFile: ERROR: Passed when expected "
                                "to fail %s [%d][%d][%d][%d]\n",
                                pTemp, i, j, k, l);
                            free(pTemp);
                            bSuccess = FALSE;
                        }
                    }
                    nCounter ++;
                }
            }
        }
    }

    if (!Cleanup()) {
	Trace("Post-test Cleanup() failed.  LastError=%d\n", GetLastError());
	return FAIL;
    }

    PAL_Terminate();  
    if (bSuccess == FALSE)
    {
        return FAIL;
    }

    return PASS;
}
