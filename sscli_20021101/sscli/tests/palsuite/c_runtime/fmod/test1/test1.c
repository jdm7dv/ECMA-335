/*=============================================================================
**
** Source: test1.c
**
** Purpose: Test to ensure that fmod return the correct values
** 
** Dependencies: PAL_Initialize
**               PAL_Terminate
**				 Fail
**               fabs
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

#define DELTA 0.0000001 //Error acceptance level to the 7th decimal

/**
 * Helper test structure
 */
struct test
{
    double valueX; // fmod param 1
    double valueY; // fmod param 2
    double result; // expected result
};

/**
 * main
 * 
 * executable entry point
 */
INT __cdecl main(INT argc, CHAR **argv)
{
    int i;

    struct test tests[] = 
    {
      // param 1    param 2     result
        { 3,        2,          1 },
        { -10,      3,         -1 },
        { 1,        0.0,        0 },
        { 1.7e308,  -1.7e308,   0 },
        { 100,      -1.1234,    0.017400 },
        { -100,     -1.1234,    -0.017400},
        { 0,        0,          0 },
        {-0,        1,          0 },
        {-0,        -0,         0 }
    };


    // PAL initialization
    if( PAL_Initialize(argc, argv) != 0 )
    {
	    return FAIL;
    }

    for( i = 0; i < sizeof(tests) / sizeof(struct test); i++ )
    {
        double result;
        double testDelta;

        result = fmod( tests[i].valueX, tests[i].valueY );

        // The test is valid when the difference between the
        // result and the expectation is less than DELTA
        testDelta = fabs( result - tests[i].result );
        if( testDelta >= DELTA )
        {
            Fail( "fmod(%f, %f) returned %f"
                  " when it should have returned %f",
                  tests[i].valueX,
                  tests[i].valueY,
                  result, 
                  tests[i].result );
        }
    }

    PAL_Terminate();
    return PASS;
}













