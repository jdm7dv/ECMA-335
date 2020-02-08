//------------------------------------------------------------------------------
// <copyright file="ISourceLineInfo.cs" company="Microsoft">
//     
//      Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
//     
//      The use and distribution terms for this software are contained in the file
//      named license.txt, which can be found in the root of this distribution.
//      By using this software in any fashion, you are agreeing to be bound by the
//      terms of this license.
//     
//      You must not remove this notice, or any other, from this software.
//     
// </copyright>
//------------------------------------------------------------------------------

namespace System.Xml.Xsl {
    internal interface ISourceLineInfo {
        string Uri      { get; }
        int StartLine   { get; }
        int StartPos    { get; }
        int EndLine     { get; }
        int EndPos      { get; }
        bool IsNoSource { get; }
    }
}
