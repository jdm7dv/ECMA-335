//------------------------------------------------------------------------------
// <copyright file="CodeCatchClause.cs" company="Microsoft">
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

namespace System.CodeDom {

    using System.Diagnostics;
    using System;
    using Microsoft.Win32;
    using System.Collections;
    using System.Runtime.InteropServices;

    /// <devdoc>
    ///    <para>Represents a catch exception block.</para>
    /// </devdoc>
    [
        ClassInterface(ClassInterfaceType.AutoDispatch),
        ComVisible(true),
        Serializable,
    ]
    public class CodeCatchClause {
        private CodeStatementCollection statements;
        private CodeTypeReference catchExceptionType;
        private string localName;

        /// <devdoc>
        ///    <para>
        ///       Initializes an instance of <see cref='System.CodeDom.CodeCatchClause'/>.
        ///    </para>
        /// </devdoc>
        public CodeCatchClause() {
        }

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        public CodeCatchClause(string localName) {
            this.localName = localName;
        }

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        public CodeCatchClause(string localName, CodeTypeReference catchExceptionType) {
            this.localName = localName;
            this.catchExceptionType = catchExceptionType;
        }

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        public CodeCatchClause(string localName, CodeTypeReference catchExceptionType, params CodeStatement[] statements) {
            this.localName = localName;
            this.catchExceptionType = catchExceptionType;
            Statements.AddRange(statements);
        }

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        public string LocalName {
            get {
                return (localName == null) ? string.Empty: localName;
            }
            set {
                localName = value;
            }
        }

        /// <devdoc>
        ///    <para>[To be supplied.]</para>
        /// </devdoc>
        public CodeTypeReference CatchExceptionType {
            get {
                if (catchExceptionType == null) {
                    catchExceptionType = new CodeTypeReference(typeof(System.Exception));
                }
                return catchExceptionType;
            }
            set {
                catchExceptionType = value;
            }
        }

        /// <devdoc>
        ///    <para>
        ///       Gets or sets the statements within the clause.
        ///    </para>
        /// </devdoc>
        public CodeStatementCollection Statements {
            get {
                if (statements == null) {
                    statements = new CodeStatementCollection();
                }
                return statements;
            }
        }
    }
}
