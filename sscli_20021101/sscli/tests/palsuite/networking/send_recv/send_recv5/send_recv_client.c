/*=============================================================
**
** Source: send_recv_client.c
**
** Purpose: Positively test the send and recv API.
**          This is a client routine. This client routine must be
**          started after the related server is started.
**          This test case is to test send and recv 
**          INT_MAX AND (2147483647)
**          UINT_MAX (0xFFFFFFFF)
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
**============================================================*/
#include <palsuite.h>


int __cdecl main(int argc, char *argv[])
{
    WORD VersionRequested = MAKEWORD(2,2);
    WSADATA WsaData;
    int err;
    int socketID;
    struct sockaddr_in mySockaddr;
    
    struct stru
            {
                int i;
                u_long ul;
            } mydata;

    mydata.i = INT_MAX;
    mydata.ul = UINT_MAX;
   

    /*Initialize the PAL environment*/
    err = PAL_Initialize(argc, argv);
    if(0 != err)
    {
        return FAIL;
    }

    /*initialize to use winsock2.dll*/
    err = WSAStartup(VersionRequested,&WsaData);
    if ( err != 0 )
    {
        Fail("\nFailed to find a usable WinSock DLL!\n");
    }

    /*Confirm that the WinSock DLL supports 2.2.*/
    if( LOBYTE( WsaData.wVersion ) != 2 ||
            HIBYTE( WsaData.wVersion ) != 2 )
    {
        Trace("\nFailed to find a usable WinSock DLL!\n");
        err = WSACleanup();
        if(SOCKET_ERROR == err)
        {
            Trace("\nFailed to call WSACleanup API!\n");
        }
        Fail("");
    }

    /*create a stream socket in AF_INET domain*/
    socketID = socket(AF_INET,SOCK_STREAM,0);

    if(INVALID_SOCKET == socketID)
    {
        Trace("\nFailed to call socket API to creat a steam socket!\n");
        err = WSACleanup();
        if(SOCKET_ERROR == err)
        {
            Trace("\nFailed to call WSACleanup API!\n");
        }
        Fail("");
    }


    /*prepare the sockaddr_in structure*/
    mySockaddr.sin_family = AF_INET;
    mySockaddr.sin_port = getRotorTestPort();
    mySockaddr.sin_addr.S_un.S_addr = inet_addr("127.0.0.1");
    memset( &(mySockaddr.sin_zero), 0, 8);

    /*connect to a stream server*/
    err = connect(socketID, (struct sockaddr *)&mySockaddr, 
                sizeof(struct sockaddr));
    if(SOCKET_ERROR == err)
    {
        Trace("\nFailed to call connect API to connect a stream server!\n");
        err = closesocket(socketID);
        if(SOCKET_ERROR == err)
            {
            Trace("\nFailed to call closesocket API!\n");
        }
        err = WSACleanup();
        if(SOCKET_ERROR == err)
        {
            Trace("\nFailed to call WSACleanup API!\n");
        }
        Fail("");
    }

    err = send(socketID, (char *)&mydata, sizeof(struct stru), 0);
 
    if(SOCKET_ERROR == err)
    {
        Trace("\nFailed to call send API to send data to a server!\n");
        err = closesocket(socketID);
        if(SOCKET_ERROR == err)
        {    
            Trace("\nFailed to call closesocket API!\n");
        }
        err = WSACleanup();
        if(SOCKET_ERROR == err)
        {
            Trace("\nFailed to call WSACleanup API!\n");
        }
        Fail("");
    }

    /*further check the sent data number is correct*/
    if(err != (int)sizeof(struct stru))
    {
        Trace("\nFailed to call send API to send data to a server, "
             "the sent data number is not correct!\n");

        err = closesocket(socketID);
        if(SOCKET_ERROR == err)
        {    
            Trace("\nFailed to call closesocket API!\n");
        }

        err = WSACleanup();
        if(SOCKET_ERROR == err)
        {
            Trace("\nFailed to call WSACleanup API!\n");
        }
        Fail("");
    }

    err = closesocket(socketID);
    if(SOCKET_ERROR == err)
    {
        Trace("\nFailed to call closesocket API!\n");
        err = WSACleanup();
        if(SOCKET_ERROR == err)
        {
            Trace("\nFailed to call WSACleanup API!\n");
        }
        Fail("");
    }

    err = WSACleanup();
    if(SOCKET_ERROR == err)
    {
        Fail("\nFailed to call WSACleanup API!\n");
    }

    PAL_Terminate();
    return PASS;
}
