/*============================================================================
**
** Source: test2.c
**
** Purpose: Tests that WideCharToMultiByte respects the length of the wide 
**          character string.
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
**==========================================================================*/

#include <palsuite.h>


int __cdecl main(int argc, char *argv[])
{    
    char mbStr[128];
    WCHAR wideStr[128];
    int ret;
    int i;
    int k;
    BOOL bRet=TRUE;

    /* These codepages are currently supported by the PAL */
    int codePages[] ={
        CP_ACP,
        932,
        949,
        950,
        1252,
        1258,
        CP_UTF8
    };

    if (PAL_Initialize(argc, argv))
    {
        return FAIL;
    }

    /* Go through all of the code pages */
    for(i=0; i<(sizeof(codePages)/sizeof(int)); i++)
    {

        /* Filling the arrays */
        for (k=0; k<128; k++)
        {
            wideStr[k] = 'a';
            mbStr[i] = 0;
        }

        wideStr[127] = 0;

        /* Passing a buffer that is too small */
        ret = WideCharToMultiByte(codePages[i], 0, wideStr, 10, 
                                  mbStr, 0, NULL, NULL);
        if (ret != 10)
        {
            Trace("WideCharToMultiByte did not return correct string length!\n"
                  "Got %d, expected %d for %d with error %u.\n", ret, 10, 
                  codePages[i], GetLastError());
            bRet = FALSE;
        }

        /* Passing a sufficiently large buffer */
        mbStr[10] = 'b';
        ret = WideCharToMultiByte(codePages[i], 0, wideStr, 10, 
                                  mbStr, 128, NULL, NULL);
        if (ret != 10)
        {
            Trace("WideCharToMultiByte did not return correct string length!\n"
                  "Got %d, expected %d for code page %d with error %u.\n", 
                  ret, 10, codePages[i], GetLastError());
            bRet = FALSE;
        }

        /* Verifying overflow of the destination string did not occur */
        if (mbStr[10] != 'b')
        {
            Trace("WideCharToMultiByte overflowed the destination buffer for "
                  "code page %d.\n", codePages[i]);
            bRet = FALSE;
        }

    }

    PAL_Terminate();

    if(!bRet)
    {
        return FAIL;
    }

    return PASS;
}

