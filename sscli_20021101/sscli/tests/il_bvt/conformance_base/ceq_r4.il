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
.class public _ceq {
.field public static	float32 _inf
.field public static	float32 _min
.field public static	float32 _one
.field public static	float32 _zero
.field public static	float32 zero
.field public static	float32 one
.field public static	float32 max
.field public static	float32 inf
.field public static	float32 NaN
.method public static	void initialize() {
.maxstack	10
	ldc.r4		float32(0xFF800000)
	stsfld	float32 _ceq::_inf
	ldc.r4		float32(0xFF7FFFFF)
	stsfld	float32 _ceq::_min
	ldc.r4		float32(0xBF800000)
	stsfld	float32 _ceq::_one
	ldc.r4		float32(0x80000000)
	stsfld	float32 _ceq::_zero
	ldc.r4		float32(0x00000000)
	stsfld	float32 _ceq::zero
	ldc.r4		float32(0x3F800000)
	stsfld	float32 _ceq::one
	ldc.r4		float32(0x7F7FFFFF)
	stsfld	float32 _ceq::max
	ldc.r4		float32(0x7F800000)
	stsfld	float32 _ceq::inf
	ldc.r4		float32(0x7FC00000)
	stsfld	float32 _ceq::NaN
	ret
}
.method public static	int32 main(class [mscorlib]System.String[]) {
.entrypoint
.maxstack		10
	call	void _ceq::initialize()
	ldsfld	float32 _ceq::_inf
	ldsfld	float32 _ceq::_inf
	ceq
	brfalse		FAIL
	ldsfld	float32 _ceq::_inf
	ldsfld	float32 _ceq::_min
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_inf
	ldsfld	float32 _ceq::_one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_inf
	ldsfld	float32 _ceq::_zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_inf
	ldsfld	float32 _ceq::zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_inf
	ldsfld	float32 _ceq::one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_inf
	ldsfld	float32 _ceq::max
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_inf
	ldsfld	float32 _ceq::inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_inf
	ldsfld	float32 _ceq::NaN
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_min
	ldsfld	float32 _ceq::_inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_min
	ldsfld	float32 _ceq::_min
	ceq
	brfalse		FAIL
	ldsfld	float32 _ceq::_min
	ldsfld	float32 _ceq::_one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_min
	ldsfld	float32 _ceq::_zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_min
	ldsfld	float32 _ceq::zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_min
	ldsfld	float32 _ceq::one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_min
	ldsfld	float32 _ceq::max
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_min
	ldsfld	float32 _ceq::inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_min
	ldsfld	float32 _ceq::NaN
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_one
	ldsfld	float32 _ceq::_inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_one
	ldsfld	float32 _ceq::_min
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_one
	ldsfld	float32 _ceq::_one
	ceq
	brfalse		FAIL
	ldsfld	float32 _ceq::_one
	ldsfld	float32 _ceq::_zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_one
	ldsfld	float32 _ceq::zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_one
	ldsfld	float32 _ceq::one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_one
	ldsfld	float32 _ceq::max
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_one
	ldsfld	float32 _ceq::inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_one
	ldsfld	float32 _ceq::NaN
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_zero
	ldsfld	float32 _ceq::_inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_zero
	ldsfld	float32 _ceq::_min
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_zero
	ldsfld	float32 _ceq::_one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_zero
	ldsfld	float32 _ceq::_zero
	ceq
	brfalse		FAIL
	ldsfld	float32 _ceq::_zero
	ldsfld	float32 _ceq::zero
	ceq
	brfalse		FAIL
	ldsfld	float32 _ceq::_zero
	ldsfld	float32 _ceq::one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_zero
	ldsfld	float32 _ceq::max
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_zero
	ldsfld	float32 _ceq::inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::_zero
	ldsfld	float32 _ceq::NaN
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::zero
	ldsfld	float32 _ceq::_inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::zero
	ldsfld	float32 _ceq::_min
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::zero
	ldsfld	float32 _ceq::_one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::zero
	ldsfld	float32 _ceq::_zero
	ceq
	brfalse		FAIL
	ldsfld	float32 _ceq::zero
	ldsfld	float32 _ceq::zero
	ceq
	brfalse		FAIL
	ldsfld	float32 _ceq::zero
	ldsfld	float32 _ceq::one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::zero
	ldsfld	float32 _ceq::max
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::zero
	ldsfld	float32 _ceq::inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::zero
	ldsfld	float32 _ceq::NaN
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::one
	ldsfld	float32 _ceq::_inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::one
	ldsfld	float32 _ceq::_min
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::one
	ldsfld	float32 _ceq::_one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::one
	ldsfld	float32 _ceq::_zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::one
	ldsfld	float32 _ceq::zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::one
	ldsfld	float32 _ceq::one
	ceq
	brfalse		FAIL
	ldsfld	float32 _ceq::one
	ldsfld	float32 _ceq::max
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::one
	ldsfld	float32 _ceq::inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::one
	ldsfld	float32 _ceq::NaN
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::max
	ldsfld	float32 _ceq::_inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::max
	ldsfld	float32 _ceq::_min
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::max
	ldsfld	float32 _ceq::_one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::max
	ldsfld	float32 _ceq::_zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::max
	ldsfld	float32 _ceq::zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::max
	ldsfld	float32 _ceq::one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::max
	ldsfld	float32 _ceq::max
	ceq
	brfalse		FAIL
	ldsfld	float32 _ceq::max
	ldsfld	float32 _ceq::inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::max
	ldsfld	float32 _ceq::NaN
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::inf
	ldsfld	float32 _ceq::_inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::inf
	ldsfld	float32 _ceq::_min
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::inf
	ldsfld	float32 _ceq::_one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::inf
	ldsfld	float32 _ceq::_zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::inf
	ldsfld	float32 _ceq::zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::inf
	ldsfld	float32 _ceq::one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::inf
	ldsfld	float32 _ceq::max
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::inf
	ldsfld	float32 _ceq::inf
	ceq
	brfalse		FAIL
	ldsfld	float32 _ceq::inf
	ldsfld	float32 _ceq::NaN
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::NaN
	ldsfld	float32 _ceq::_inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::NaN
	ldsfld	float32 _ceq::_min
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::NaN
	ldsfld	float32 _ceq::_one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::NaN
	ldsfld	float32 _ceq::_zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::NaN
	ldsfld	float32 _ceq::zero
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::NaN
	ldsfld	float32 _ceq::one
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::NaN
	ldsfld	float32 _ceq::max
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::NaN
	ldsfld	float32 _ceq::inf
	ceq
	brtrue		FAIL
	ldsfld	float32 _ceq::NaN
	ldsfld	float32 _ceq::NaN
	ceq
	brtrue		FAIL
PASS:
	ldc.i4	0x0000
	ret
FAIL:
	ldc.i4	0x0001
	ret
}
}
.assembly ceq_r4.exe{}
