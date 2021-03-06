/*=====================================================================
**
** Source:  ReadFile.c (test 1)
**
** Purpose: Tests the PAL implementation of the ReadFile function.
**          This test will attempt to read from a NULL handle and from 
**          a file without read permissions set.
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


int __cdecl main(int argc, char *argv[])
{
    HANDLE hFile = NULL;
    DWORD dwByteCount = 0;
    DWORD dwBytesRead = 0;
    BOOL bRc = FALSE;
    char szBuffer[256];
    char* szNonReadableFile = {"nonreadablefile.txt"};

    if (0 != PAL_Initialize(argc,argv))
    {
        return FAIL;
    }

    memset(szBuffer, 0, 256);

    /* Read from a NULL handle
    */

    bRc = ReadFile(hFile, szBuffer, 20, &dwBytesRead, NULL);

    if (bRc == TRUE)
    {
        Fail("ReadFile: ERROR -> Able to read from a NULL handle\n");
    }


    /* Read from a file without read permissions
    */

#if WIN32

#else
    /* attempt to read from the unreadable file
     * open a file without read permissions
     */
    hFile = CreateFile(szNonReadableFile, 
        GENERIC_WRITE,
        FILE_SHARE_WRITE,
        NULL,
        OPEN_EXISTING,
        FILE_ATTRIBUTE_NORMAL,
        NULL);

    if(hFile == INVALID_HANDLE_VALUE)
    {
        dwByteCount = GetLastError();
        Fail("ReadFile: ERROR -> Unable to create file \"%s\".\n", 
            szNonReadableFile);
    }

    bRc = ReadFile(hFile, szBuffer, 20, &dwBytesRead, NULL);

    if (bRc == TRUE)
    {
        Fail("ReadFile: ERROR -> Able to read from a file without read "
            "permissions\n");
    }
#endif


    PAL_Terminate();
    return PASS;
}
