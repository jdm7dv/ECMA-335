// ==++==
// 
//   
//    Copyright (c) 2002 Microsoft Corporation.  All rights reserved.
//   
//    The use and distribution terms for this software are contained in the file
//    named license.txt, which can be found in the root of this distribution.
//    By using this software in any fashion, you are agreeing to be bound by the
//    terms of this license.
//   
//    You must not remove this notice, or any other, from this software.
//   
// 
// ==--==
/*============================================================
**
** Class:  ISymbolWriter
**
**                                               
**
** Represents a symbol writer for managed code. Provides methods to
** define documents, sequence points, lexical scopes, and variables.
**
** Date:  Thu Aug 19 13:38:32 1999
** 
===========================================================*/
namespace System.Diagnostics.SymbolStore {
    
	using System;
    using System.Reflection;

	// Interface does not need to be marked with the serializable attribute
    /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter"]/*' />
    public interface ISymbolWriter
    {
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.Initialize"]/*' />
        // Set the IMetaDataEmitter that this symbol writer is associated
        // with. This must be done only once before any other ISymbolWriter
        // methods are called.
        void Initialize(IntPtr emitter, String filename, bool fFullBuild);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.DefineDocument"]/*' />
        
        // Define a source document. Guid's will be provided for the
        // languages, vendors, and document types that we currently know
        // about.
        ISymbolDocumentWriter DefineDocument(String url,
                                          Guid language,
                                          Guid languageVendor,
                                          Guid documentType);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.SetUserEntryPoint"]/*' />
    
        // Define the method that the user has defined as their entrypoint
        // for this module. This would be, perhaps, the user's main method
        // rather than compiler generated stubs before main.
        void SetUserEntryPoint(SymbolToken entryMethod);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.OpenMethod"]/*' />
    
        // Open a method to emit symbol information into. The given method
        // becomes the current method for calls do define sequence points,
        // parameters and lexical scopes. There is an implicit lexical
        // scope around the entire method. Re-opening a method that has
        // been previously closed effectivley erases any previously
        // defined symbols for that method.
        //
        // There can be only one open method at a time.
        void OpenMethod(SymbolToken method);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.CloseMethod"]/*' />
    
        // Close the current method. Once a method is closed, no more
        // symbols can be defined within it.
        void CloseMethod();
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.DefineSequencePoints"]/*' />
    
        // Define a group of sequence points within the current method.
        // Each line/column defines the start of a statement within a
        // method. The arrays should be sorted by offset. The offset is
        // always the offset from the start of the method, in bytes.
        void DefineSequencePoints(ISymbolDocumentWriter document,
                                  int[] offsets,
                                  int[] lines,
                                  int[] columns,
                                  int[] endLines,
                                  int[] endColumns);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.OpenScope"]/*' />
    
        // Open a new lexical scope in the current method. The scope
        // becomes the new current scope and is effectivley pushed onto a
        // stack of scopes. startOffset is the offset, in bytes from the
        // beginning of the method, of the first instruction in the
        // lexical scope. Scopes must form a hierarchy. Siblings are not
        // allowed to overlap.
        //
        // OpenScope returns an opaque scope id that can be used with
        // SetScopeRange to define a scope's start/end offset at a later
        // time. In this case, the offsets passed to OpenScope and
        // CloseScope are ignored.
        //
        // Note: scope id's are only valid in the current method.
        //
        int OpenScope(int startOffset);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.CloseScope"]/*' />
    
        // Close the current lexical scope. Once a scope is closed no more
        // variables can be defined within it. endOffset points past the
        // last instruction in the scope.
        void CloseScope(int endOffset);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.SetScopeRange"]/*' />
    
        // Define the offset range for a given lexical scope.
        void SetScopeRange(int scopeID, int startOffset, int endOffset);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.DefineLocalVariable"]/*' />
    
        // Define a single variable in the current lexical
        // scope. startOffset and endOffset are optional. If 0, then they
        // are ignored and the variable is defined over the entire
        // scope. If non-zero, then they must fall within the offsets of
        // the current scope. This can be called multiple times for a
        // variable of the same name that has multiple homes throughout a
        // scope. (Note: start/end offsets must not overlap in such a
        // case.)
        void DefineLocalVariable(String name,
                                        FieldAttributes attributes,
                                        byte[] signature,
                                        SymAddressKind addrKind,
                                        int addr1,
                                        int addr2,
                                        int addr3,
                                        int startOffset,
                                        int endOffset);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.DefineParameter"]/*' />
    
        // Define a single parameter in the current method. The type of
        // each parameter is taken from its position (sequence) within the
        // method's signature.
        //
        // Note: if parameters are defined in the metadata for a given
        // method, then clearly one would not have to define them again
        // with calls to this method. The symbol readers will have to be
        // smart enough to check the normal metadata for these first then
        // fall back to the symbol store.
        void DefineParameter(String name,
                                    ParameterAttributes attributes,
                                    int sequence,
                                    SymAddressKind addrKind,
                                    int addr1,
                                    int addr2,
                                    int addr3);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.DefineField"]/*' />
    
        // Define a single variable not within a method. This is used for
        // certian fields in classes, bitfields, etc.
        void DefineField(SymbolToken parent,
                                String name,
                                FieldAttributes attributes,
                                byte[] signature,
                                SymAddressKind addrKind,
                                int addr1,
                                int addr2,
                                int addr3);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.DefineGlobalVariable"]/*' />
    
        // Define a single global variable.
        void DefineGlobalVariable(String name,
                                         FieldAttributes attributes,
                                         byte[] signature,
                                         SymAddressKind addrKind,
                                         int addr1,
                                         int addr2,
                                         int addr3);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.Close"]/*' />
    
        // Close will close the ISymbolWriter and commit the symbols
        // to the symbol store. The ISymbolWriter becomes invalid
        // after this call for further updates.
        void Close();
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.SetSymAttribute"]/*' />
    
        // Defines a custom attribute based upon its name. Not to be
        // confused with Metadata custom attributes, these attributes are
        // held in the symbol store.
        void SetSymAttribute(SymbolToken parent, String name, byte[] data);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.OpenNamespace"]/*' />
    
        // Opens a new namespace. Call this before defining methods or
        // variables that live within a namespace. Namespaces can be nested.
        void OpenNamespace(String name);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.CloseNamespace"]/*' />
    
        // Close the most recently opened namespace.
        void CloseNamespace();
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.UsingNamespace"]/*' />
    
        // Specifies that the given, fully qualified namespace name is
        // being used within the currently open lexical scope. Closing the
        // current scope will also stop using the namespace, and the
        // namespace will be in use in all scopes that inherit from the
        // currently open scope.
        void UsingNamespace(String fullName);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.SetMethodSourceRange"]/*' />
        
        // Specifies the true start and end of a method within a source
        // file. Use this to specify the extent of a method independently
        // of what sequence points exist within the method.
        void SetMethodSourceRange(ISymbolDocumentWriter startDoc,
                                         int startLine,
                                         int startColumn,
                                         ISymbolDocumentWriter endDoc,
                                         int endLine,
                                         int endColumn);
        /// <include file='doc\ISymWriter.uex' path='docs/doc[@for="ISymbolWriter.SetUnderlyingWriter"]/*' />

        // Used to set the underlying ISymUnmanagedWriter that a
        // managed ISymbolWriter may use to emit symbols with.
        void SetUnderlyingWriter(IntPtr underlyingWriter);
    }
}
