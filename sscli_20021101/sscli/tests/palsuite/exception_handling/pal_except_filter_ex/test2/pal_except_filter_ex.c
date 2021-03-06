/*=====================================================================
**
** Source:  PAL_EXCEPT_FILTER_EX.c (test 2)
**
** Purpose: Tests the PAL implementation of the PAL_EXCEPT_FILTER_EX. 
**          There is a nested try blocks in this test. The nested 
**          PAL_TRY creates an exception and the FILTER creates another.
**          This test makes sure that this case does not end in a 
**          infinite loop.
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

BOOL bFilter = FALSE;
BOOL bTry = FALSE;
BOOL bTry2 = FALSE;
const int nValidator = 12321;

/* Filter function for the first try block.
 */
LONG Filter_01(EXCEPTION_POINTERS* ep, VOID *pnTestInt)
{
    int nTestInt = *(int *)pnTestInt;
    
    /* Signal main() that filter has been executed. */
    bFilter = TRUE;

    if (!bTry)
    {
        Fail("ERROR: The filter was executed without "
             "entering the first PAL_TRY.\n");
    }

    if (!bTry2)
    {
        Fail("ERROR: The filter was executed without "
             "entering the second PAL_TRY.\n");
    }

    /* Was the correct value passed? */
    if (nValidator != nTestInt)
    {
        Fail("ERROR: Parameter passed to filter function "
             "should have been \"%d\" but was \"%d\".\n",
             nValidator,
             nTestInt);
    }

    return EXCEPTION_EXECUTE_HANDLER;
}

int __cdecl main(int argc, char *argv[])
{
    int* p = 0x00000000;
    BOOL bExcept  = FALSE;
    BOOL bExcept2 = FALSE;

    /* Initalize the PAL.
     */
    if (0 != PAL_Initialize(argc, argv))
    {
        return FAIL;
    }

    /* Test a nested PAL_Try block.
     */
    PAL_TRY 
    {
        /* Signal entry into first PAL_TRY block.*/
        bTry = TRUE; 

        PAL_TRY
        {
            /* Signal entry into second PAL_TRY block.*/
            bTry2 = TRUE;
            /* Cause an exception.*/
            *p = 13;
        }
        PAL_EXCEPT_FILTER_EX(LABEL_1, Filter_01, (LPVOID)&nValidator)
        {
            /* Signal entry into second PAL_EXCEPT_EX filter.*/
            bExcept = TRUE;
            /* Cause another exception.*/
            *p = 13;
        }
        PAL_ENDTRY
        
    }
    PAL_EXCEPT_FILTER_EX(LABEL_2, Filter_01, (LPVOID)&nValidator)
    {
        /* Signal entry into second PAL_EXCEPT_EX filter.*/
        bExcept2 = TRUE;
    }
    PAL_ENDTRY;

    if (!bTry)
    {
        Trace("ERROR: The code in the first "
              "PAL_TRY block was not executed.\n");
    }
    
    if (!bTry2)
    {
        Trace("ERROR: The code in the nested "
              "PAL_TRY block was not executed.\n");
    }

    if (!bExcept)
    {
        Trace("ERROR: The code in the first "
              "PAL_EXCEPT_FILTER_EX block was not executed.\n");
    }

    if (!bExcept2)
    {
        Trace("ERROR: The code in the second "
              "PAL_EXCEPT_FILTER_EX block was not executed.\n");
    }

    if (!bFilter)
    {
        Trace("ERROR: The code in the first "
              "filter function was not executed.\n");
    }

    if(!bTry || !bTry2 || !bExcept || !bExcept2 || !bFilter )
    {
        Fail("");
    }

    /* Terminate the PAL.
     */
    PAL_Terminate();  
    return PASS;

}
