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
// ===========================================================================
// File: ClassFactory.h
// 
// ===========================================================================

//*****************************************************************************
// ClassFactory.h
//
// Class factories are used by the pluming in COM to activate new objects.  
// This module contains the class factory code to instantiate the
// ISymUnmanaged Reader,Writer and Binder
//*****************************************************************************
#ifndef __ClassFactory__h__
#define __ClassFactory__h__

// This typedef is for a function which will create a new instance of an object.
typedef HRESULT (* PFN_CREATE_OBJ)(REFIID riid, void**ppvObject);

//*****************************************************************************
// This structure is used to declare a global list of coclasses.  The class
// factory object is created with a pointer to the correct one of these, so
// that when create instance is called, it can be created.
//*****************************************************************************
struct COCLASS_REGISTER
{
	const GUID *pClsid;					// Class ID of the coclass.
	LPCWSTR		szProgID;				// Prog ID of the class.
	PFN_CREATE_OBJ pfnCreateObject;		// Creation function for an instance.
};



//*****************************************************************************
// One class factory object satifies all of our clsid's, to reduce overall 
// code bloat.
//*****************************************************************************
class CClassFactory :
	public IClassFactory
{
	CClassFactory() { }						// Can't use without data.
	
public:
	CClassFactory(const COCLASS_REGISTER *pCoClass)
		: m_cRef(1), m_pCoClass(pCoClass)
	{ }

	
	//
	// IUnknown methods.
	//

    virtual HRESULT STDMETHODCALLTYPE QueryInterface( 
        REFIID		riid,
        void		**ppvObject);
    
    virtual ULONG STDMETHODCALLTYPE AddRef()
	{
		return InterlockedIncrement(&m_cRef);
	}
    
    virtual ULONG STDMETHODCALLTYPE Release()
	{
		LONG		cRef = InterlockedDecrement(&m_cRef);
		if (cRef <= 0)
			delete this;
		return (cRef);
	}


	//
	// IClassFactory methods.
	//

    virtual HRESULT STDMETHODCALLTYPE CreateInstance( 
        IUnknown	*pUnkOuter,
        REFIID		riid,
        void		**ppvObject);
    
    virtual HRESULT STDMETHODCALLTYPE LockServer( 
        BOOL		fLock);


private:
	LONG		m_cRef;						// Reference count.
	const COCLASS_REGISTER *m_pCoClass;		// The class we belong to.
};



#endif // __ClassFactory__h__
