/*============================================================
**
** Source : test.c
**
** Purpose: Test for GetEnvironmentVariable() function
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
**=========================================================*/

#define UNICODE
#include <palsuite.h>

int __cdecl main(int argc, char *argv[]) 
{

    /* Define some buffers needed for the function */
    WCHAR * pResultBuffer = NULL;
    int size = 0;
  
    /* A place to stash the returned values */
    int ReturnValueForLargeBuffer = 0;
  
    /*
     * Initialize the PAL and return FAILURE if this fails
     */

    if(0 != (PAL_Initialize(argc, argv)))
    {
        return FAIL;
    }

    /* Recieve and allocate the correct amount of memory for the buffer */
    size = ReturnValueForLargeBuffer = 
        GetEnvironmentVariable(convert("PATH"),    
                               pResultBuffer,  
                               0);
  
    pResultBuffer = malloc(size*sizeof(WCHAR));
    if ( pResultBuffer == NULL )
    {
	Fail("ERROR: Failed to allocate memory for pResultBuffer pointer. "
             "Can't properly exec test case without this.\n");
    }
  
  
    /* Normal case, PATH should fit into this buffer */
    ReturnValueForLargeBuffer = GetEnvironmentVariable(convert("PATH"),        
                                                       pResultBuffer,  
                                                       size); 
    free(pResultBuffer); 
  
    /* Ensure that it returned a positive value */
    if(ReturnValueForLargeBuffer <= 0)
    {
        Fail("The return was %d, which indicates that the function failed.\n",
             ReturnValueForLargeBuffer);
    }
  
    /* Ensure that it succeeded and copied the correct number of characters.
       If this is true, then the return value should be one less of the 
       size of the buffer.  (Doesn't include that NULL byte)
    */
    if(ReturnValueForLargeBuffer != size-1)
    {
        Fail("The value returned was %d when it should have been %d.  This "
             "should be the number of characters copied, "
	     "minus the NULL byte.\n", ReturnValueForLargeBuffer, size-1);
    }
  
    PAL_Terminate();
    return PASS;
}



