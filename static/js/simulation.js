(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Elements$Type$AManger = {$: 'AManger'};
var $author$project$Elements$Pietement$BoutDeTable = {$: 'BoutDeTable'};
var $author$project$Common$Mesures$Centimetre = function (a) {
	return {$: 'Centimetre', a: a};
};
var $author$project$Elements$Essence$Chene = {$: 'Chene'};
var $author$project$Elements$Table$tableAManger = {
	essence: $author$project$Elements$Essence$Chene,
	pietement: $author$project$Elements$Pietement$BoutDeTable,
	surface: {
		largeur: $author$project$Common$Mesures$Centimetre(70),
		longueur: $author$project$Common$Mesures$Centimetre(140)
	},
	type_: $author$project$Elements$Type$AManger
};
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2($author$project$Elements$Table$tableAManger, $elm$core$Platform$Cmd$none);
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Common$Mesures$fromCentimetres = function (value) {
	return A2(
		$elm$core$Maybe$map,
		$author$project$Common$Mesures$Centimetre,
		$elm$core$String$toInt(value));
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Elements$Table$withLargeur = F2(
	function (table, largeur) {
		var surface = table.surface;
		var updated = _Utils_update(
			surface,
			{largeur: largeur});
		return _Utils_update(
			table,
			{surface: updated});
	});
var $author$project$Elements$Table$withLongueur = F2(
	function (table, longueur) {
		var surface = table.surface;
		var updated = _Utils_update(
			surface,
			{longueur: longueur});
		return _Utils_update(
			table,
			{surface: updated});
	});
var $author$project$Elements$Table$withType = F2(
	function (type_, table) {
		if (type_.$ === 'Basse') {
			return {
				essence: table.essence,
				pietement: table.pietement,
				surface: {
					largeur: $author$project$Common$Mesures$Centimetre(50),
					longueur: $author$project$Common$Mesures$Centimetre(110)
				},
				type_: type_
			};
		} else {
			return {
				essence: table.essence,
				pietement: table.pietement,
				surface: {
					largeur: $author$project$Common$Mesures$Centimetre(70),
					longueur: $author$project$Common$Mesures$Centimetre(140)
				},
				type_: type_
			};
		}
	});
var $author$project$Main$update = F2(
	function (msg, table) {
		switch (msg.$) {
			case 'LongueurChanged':
				var centimetres = msg.a;
				return _Utils_Tuple2(
					A2(
						$author$project$Elements$Table$withLongueur,
						table,
						A2(
							$elm$core$Maybe$withDefault,
							table.surface.longueur,
							$author$project$Common$Mesures$fromCentimetres(centimetres))),
					$elm$core$Platform$Cmd$none);
			case 'LargeurChanged':
				var centimetres = msg.a;
				return _Utils_Tuple2(
					A2(
						$author$project$Elements$Table$withLargeur,
						table,
						A2(
							$elm$core$Maybe$withDefault,
							table.surface.largeur,
							$author$project$Common$Mesures$fromCentimetres(centimetres))),
					$elm$core$Platform$Cmd$none);
			case 'TableTypeChanged':
				var tableType = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Elements$Table$withType, tableType, table),
					$elm$core$Platform$Cmd$none);
			case 'EssenceChanged':
				var essence = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						table,
						{essence: essence}),
					$elm$core$Platform$Cmd$none);
			default:
				var positionPietement = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						table,
						{pietement: positionPietement}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$EssenceChanged = function (a) {
	return {$: 'EssenceChanged', a: a};
};
var $author$project$Main$PositionPietementChanged = function (a) {
	return {$: 'PositionPietementChanged', a: a};
};
var $author$project$Main$TableTypeChanged = function (a) {
	return {$: 'TableTypeChanged', a: a};
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$checked = $elm$html$Html$Attributes$boolProperty('checked');
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$html$Html$i = _VirtualDom_node('i');
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$html$Html$Attributes$name = $elm$html$Html$Attributes$stringProperty('name');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$html$Html$Events$targetChecked = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'checked']),
	$elm$json$Json$Decode$bool);
var $elm$html$Html$Events$onCheck = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'change',
		A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetChecked));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Common$ImageOptionField$displayOne = F2(
	function (_v0, _v1) {
		var current = _v0.current;
		var onChange = _v0.onChange;
		var fieldId = _v1.fieldId;
		var value = _v1.value;
		var labelString = _v1.labelString;
		var image = _v1.image;
		var selected = _Utils_eq(value, current);
		return A2(
			$elm$html$Html$label,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$for(fieldId)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('image-title'),
							$elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2('selected', selected)
								]))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(labelString)
						])),
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$alt(labelString),
							$elm$html$Html$Attributes$src(image)
						]),
					_List_Nil),
					A2(
					$elm$html$Html$i,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('fas fa-check-circle'),
							$elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2('show', selected)
								]))
						]),
					_List_Nil),
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('radio'),
							$elm$html$Html$Attributes$id(fieldId),
							$elm$html$Html$Attributes$name('essence'),
							$elm$html$Html$Attributes$checked(selected),
							$elm$html$Html$Attributes$value(fieldId),
							$elm$html$Html$Events$onCheck(
							function (_v2) {
								return onChange(value);
							})
						]),
					_List_Nil)
				]));
	});
var $author$project$Common$ImageOptionField$display = F2(
	function (toto, fields) {
		return A2(
			$elm$core$List$map,
			$author$project$Common$ImageOptionField$displayOne(toto),
			fields);
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Elements$Essence$Chataignier = {$: 'Chataignier'};
var $author$project$Elements$Essence$Exotique = {$: 'Exotique'};
var $author$project$Elements$Essence$Frene = {$: 'Frene'};
var $author$project$Elements$Essence$Noyer = {$: 'Noyer'};
var $author$project$Elements$Essence$Prestige = {$: 'Prestige'};
var $author$project$Elements$Essence$all = _List_fromArray(
	[$author$project$Elements$Essence$Chene, $author$project$Elements$Essence$Chataignier, $author$project$Elements$Essence$Frene, $author$project$Elements$Essence$Noyer, $author$project$Elements$Essence$Prestige, $author$project$Elements$Essence$Exotique]);
var $author$project$Common$ImageOptionField$Model = F4(
	function (fieldId, labelString, image, value) {
		return {fieldId: fieldId, image: image, labelString: labelString, value: value};
	});
var $author$project$Elements$Essence$essenceField = function (essence) {
	var _v0 = function () {
		switch (essence.$) {
			case 'Chene':
				return _Utils_Tuple3('chene', 'Chêne', '/images/simulation/essences-img/chene.jpg');
			case 'Chataignier':
				return _Utils_Tuple3('chataignier', 'Châtaignier', '/images/simulation/essences-img/chataigner.jpg');
			case 'Frene':
				return _Utils_Tuple3('frene', 'Frêne', '/images/simulation/essences-img/frene.jpg');
			case 'Noyer':
				return _Utils_Tuple3('noyer', 'Noyer', '/images/simulation/essences-img/noyer.jpg');
			case 'Prestige':
				return _Utils_Tuple3('prestige', 'Prestige', '/images/simulation/essences-img/olivier.jpg');
			default:
				return _Utils_Tuple3('exotique', 'Exotique', '/images/simulation/essences-img/bubinga.jpg');
		}
	}();
	var fieldId = _v0.a;
	var labelString = _v0.b;
	var image = _v0.c;
	return A4($author$project$Common$ImageOptionField$Model, fieldId, labelString, image, essence);
};
var $author$project$Elements$Essence$essencesFields = A2($elm$core$List$map, $author$project$Elements$Essence$essenceField, $author$project$Elements$Essence$all);
var $author$project$Elements$Pietement$Central = {$: 'Central'};
var $author$project$Common$Images$boutDeTable = ' data:image/png;base64,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';
var $author$project$Common$Images$central = ' data:image/jpeg;base64,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';
var $author$project$Elements$Pietement$field = function (position) {
	if (position.$ === 'BoutDeTable') {
		return {fieldId: 'bout-de-table', image: $author$project$Common$Images$boutDeTable, labelString: 'Bout de table', value: position};
	} else {
		return {fieldId: 'central', image: $author$project$Common$Images$central, labelString: 'Central', value: position};
	}
};
var $author$project$Elements$Pietement$fields = A2(
	$elm$core$List$map,
	$author$project$Elements$Pietement$field,
	_List_fromArray(
		[$author$project$Elements$Pietement$BoutDeTable, $author$project$Elements$Pietement$Central]));
var $author$project$Elements$Type$Basse = {$: 'Basse'};
var $author$project$Elements$Type$tableTypeField = function (tableType) {
	var _v0 = function () {
		if (tableType.$ === 'Basse') {
			return _Utils_Tuple3('basse', 'Table basse', '/images/simulation/table-basse.jpg');
		} else {
			return _Utils_Tuple3('a-manger', 'Table à manger', '/images/simulation/table-a-manger.jpg');
		}
	}();
	var fieldId = _v0.a;
	var labelString = _v0.b;
	var image = _v0.c;
	return A4($author$project$Common$ImageOptionField$Model, fieldId, labelString, image, tableType);
};
var $author$project$Elements$Type$fields = A2(
	$elm$core$List$map,
	$author$project$Elements$Type$tableTypeField,
	_List_fromArray(
		[$author$project$Elements$Type$AManger, $author$project$Elements$Type$Basse]));
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Common$Prix$print = function (prix) {
	var _int = prix.a;
	return $elm$core$String$fromFloat(_int) + ' €';
};
var $author$project$Common$Mesures$m2 = function (surface) {
	if (surface.$ === 'Centimetre2') {
		var centimetre2 = surface.a;
		return centimetre2 / 10000;
	} else {
		var _float = surface.a;
		return _float;
	}
};
var $author$project$Common$Mesures$Centimetre2 = function (a) {
	return {$: 'Centimetre2', a: a};
};
var $author$project$Common$Mesures$centimetres = function (taille) {
	var _int = taille.a;
	return _int;
};
var $elm$core$Tuple$mapBoth = F3(
	function (funcA, funcB, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			funcA(x),
			funcB(y));
	});
var $author$project$Common$Mesures$times = F2(
	function (a, b) {
		return $author$project$Common$Mesures$Centimetre2(
			function (_v0) {
				var largeur = _v0.a;
				var longueur = _v0.b;
				return largeur * longueur;
			}(
				A3(
					$elm$core$Tuple$mapBoth,
					$author$project$Common$Mesures$centimetres,
					$author$project$Common$Mesures$centimetres,
					_Utils_Tuple2(a, b))));
	});
var $author$project$Common$Surface$m2 = function (surface) {
	return $author$project$Common$Mesures$m2(
		A2($author$project$Common$Mesures$times, surface.largeur, surface.longueur));
};
var $author$project$Common$Prix$Euros = function (a) {
	return {$: 'Euros', a: a};
};
var $author$project$Common$Prix$plus = F2(
	function (a, b) {
		var _v0 = _Utils_Tuple2(a, b);
		var a1 = _v0.a.a;
		var b1 = _v0.b.a;
		return $author$project$Common$Prix$Euros(a1 + b1);
	});
var $author$project$Elements$Essence$prix = function (essence) {
	switch (essence.$) {
		case 'Chene':
			return $author$project$Common$Prix$Euros(900);
		case 'Chataignier':
			return $author$project$Common$Prix$Euros(900);
		case 'Frene':
			return $author$project$Common$Prix$Euros(850);
		case 'Noyer':
			return $author$project$Common$Prix$Euros(950);
		case 'Prestige':
			return $author$project$Common$Prix$Euros(1000);
		default:
			return $author$project$Common$Prix$Euros(900);
	}
};
var $author$project$Elements$Pietement$prix = F2(
	function (type_, position) {
		if (type_.$ === 'Basse') {
			if (position.$ === 'BoutDeTable') {
				return $author$project$Common$Prix$Euros(180);
			} else {
				return $author$project$Common$Prix$Euros(250);
			}
		} else {
			if (position.$ === 'BoutDeTable') {
				return $author$project$Common$Prix$Euros(250);
			} else {
				return $author$project$Common$Prix$Euros(500);
			}
		}
	});
var $elm$core$Basics$round = _Basics_round;
var $author$project$Common$Prix$round = function (prix) {
	var _float = prix.a;
	return $author$project$Common$Prix$Euros(
		10 * $elm$core$Basics$round(_float / 10));
};
var $author$project$Common$Prix$times = F2(
	function (_float, prix) {
		var euros = prix.a;
		return $author$project$Common$Prix$Euros(euros * _float);
	});
var $author$project$Elements$Table$prix = function (table) {
	return $author$project$Common$Prix$round(
		A2(
			$author$project$Common$Prix$plus,
			A2($author$project$Elements$Pietement$prix, table.type_, table.pietement),
			A2(
				$author$project$Common$Prix$times,
				$author$project$Common$Surface$m2(table.surface),
				$author$project$Elements$Essence$prix(table.essence))));
};
var $author$project$Main$LargeurChanged = function (a) {
	return {$: 'LargeurChanged', a: a};
};
var $author$project$Main$LongueurChanged = function (a) {
	return {$: 'LongueurChanged', a: a};
};
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$step = function (n) {
	return A2($elm$html$Html$Attributes$stringProperty, 'step', n);
};
var $author$project$Main$surfaceFields = F2(
	function (surface, _v0) {
		var largeurs = _v0.largeurs;
		var longueurs = _v0.longueurs;
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('range-field')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$label,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$for('longueur')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								'Longueur: ' + ($elm$core$String$fromInt(
									$author$project$Common$Mesures$centimetres(surface.longueur)) + ' cm'))
							])),
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('longueur'),
								$elm$html$Html$Attributes$type_('range'),
								$elm$html$Html$Attributes$min(
								$elm$core$String$fromInt(
									$author$project$Common$Mesures$centimetres(longueurs.min))),
								$elm$html$Html$Attributes$max(
								$elm$core$String$fromInt(
									$author$project$Common$Mesures$centimetres(longueurs.max))),
								$elm$html$Html$Attributes$step('5'),
								$elm$html$Html$Attributes$value(
								$elm$core$String$fromInt(
									$author$project$Common$Mesures$centimetres(surface.longueur))),
								$elm$html$Html$Events$onInput($author$project$Main$LongueurChanged)
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('range-field')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$label,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$for('largeur')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								'Largeur: ' + ($elm$core$String$fromInt(
									$author$project$Common$Mesures$centimetres(surface.largeur)) + ' cm'))
							])),
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('largeur'),
								$elm$html$Html$Attributes$type_('range'),
								$elm$html$Html$Attributes$min(
								$elm$core$String$fromInt(
									$author$project$Common$Mesures$centimetres(largeurs.min))),
								$elm$html$Html$Attributes$max(
								$elm$core$String$fromInt(
									$author$project$Common$Mesures$centimetres(largeurs.max))),
								$elm$html$Html$Attributes$step('5'),
								$elm$html$Html$Attributes$value(
								$elm$core$String$fromInt(
									$author$project$Common$Mesures$centimetres(surface.largeur))),
								$elm$html$Html$Events$onInput($author$project$Main$LargeurChanged)
							]),
						_List_Nil)
					]))
			]);
	});
var $author$project$Elements$Type$tailles = function (tableType) {
	if (tableType.$ === 'Basse') {
		return {
			largeurs: {
				max: $author$project$Common$Mesures$Centimetre(300),
				min: $author$project$Common$Mesures$Centimetre(50)
			},
			longueurs: {
				max: $author$project$Common$Mesures$Centimetre(300),
				min: $author$project$Common$Mesures$Centimetre(50)
			}
		};
	} else {
		return {
			largeurs: {
				max: $author$project$Common$Mesures$Centimetre(600),
				min: $author$project$Common$Mesures$Centimetre(65)
			},
			longueurs: {
				max: $author$project$Common$Mesures$Centimetre(600),
				min: $author$project$Common$Mesures$Centimetre(65)
			}
		};
	}
};
var $author$project$Main$view = function (table) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('simulation-columns')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('fields')
					]),
				_Utils_ap(
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Type')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('radio-field')
								]),
							A2(
								$author$project$Common$ImageOptionField$display,
								{current: table.type_, onChange: $author$project$Main$TableTypeChanged},
								$author$project$Elements$Type$fields)),
							A2(
							$elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Essence de bois')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('radio-field essence')
								]),
							A2(
								$author$project$Common$ImageOptionField$display,
								{current: table.essence, onChange: $author$project$Main$EssenceChanged},
								$author$project$Elements$Essence$essencesFields)),
							A2(
							$elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Taille du plateau')
								]))
						]),
					_Utils_ap(
						A2(
							$author$project$Main$surfaceFields,
							table.surface,
							$author$project$Elements$Type$tailles(table.type_)),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$h2,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Piétement')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('radio-field')
									]),
								A2(
									$author$project$Common$ImageOptionField$display,
									{current: table.pietement, onChange: $author$project$Main$PositionPietementChanged},
									$author$project$Elements$Pietement$fields))
							])))),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('result')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Estimation')
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('estimate')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$Common$Prix$print(
									$author$project$Elements$Table$prix(table)))
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('D\'autres options sont disponibles.')
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('Pour concevoir votre projet entièrement sur mesure et recevoir votre devis, '),
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('mailto:tom@woodriver.fr')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('contactez-moi par mail.')
									]))
							]))
					]))
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));