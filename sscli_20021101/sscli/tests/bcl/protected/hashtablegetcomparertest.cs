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
using System;
using System.Collections;
using System.IO;
class MyCollection : Hashtable {
 public bool UseComparer() {
 try { 
 IComparer comparer = this.comparer;
 return true;
 }
 catch(Exception e) {  return false;}
 }
}
class Test {
 public static void Main() {
 int errors = 0;
 int testcases = 0;
 testcases++;
 MyCollection MyColl = new MyCollection();
 if(! MyColl.UseComparer())
   errors++;
 Environment.ExitCode = errors;
 }
}
