@if "%_echo%"=="" echo off
REM ==++==
REM 
REM 
REM  Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
REM 
REM  The use and distribution terms for this software are contained in the file
REM  named license.txt, which can be found in the root of this distribution.
REM  By using this software in any fashion, you are agreeing to be bound by the
REM  terms of this license.
REM 
REM  You must not remove this notice, or any other, from this software.
REM 
REM 
REM ==--==

REM WARNING: This script is a thin wrapper around win.env.bat
REM to specify the deprecation warning message. All the
REM intelligence for setting up the build environment is
REM encapsulated in win.env.bat and env.core.pl. If you want to
REM modify the environment setup, please change win.env.bat and
REM env.core.pl directly.

%~dp0win.env.bat %1 %2 %3 %4 %5 %6 %7 %8 %9
