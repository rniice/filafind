<!--
// *********************************************************************************************************
// String Prototypes
// *********************************************************************************************************
String.prototype.ltrim = function() {return this.replace(/^\s*/, '');};
String.prototype.rtrim = function() {return this.replace(/\s*$/, '');};
String.prototype.trim = function() {return this.ltrim().rtrim();};
// *********************************************************************************************************
// Global Variables
// *********************************************************************************************************
var fd_isIE = (navigator.userAgent.indexOf('MSIE') == -1) ? false : true;		// Internet Explorer?
var fd_isSafari = (navigator.userAgent.indexOf('Safari') == -1) ? false : true;		// Safari?
var fd_isFirefox = (navigator.userAgent.indexOf('Firefox') == -1) ? false : true;	// Firefox?
var fd_isOpera = (navigator.userAgent.indexOf('Opera') == -1) ? false : true;		// Opera?
// *********************************************************************************************************

/* Added by Terri Ilaria : 06/26/2008 */
function FD_isNumber(e)
{
	var keynum;
	var keychar;
	var numcheck;

	// IE
	if(window.event)
	{
		keynum = e.keyCode;
	}
	// Netscape/Firefox/Opera
	else if(e.which)
	{
		keynum = e.which;
	}

	// allow backspace, and delete for firefox / safari
	if((fd_isFirefox) && ((keynum == 8) || (keynum == undefined) || (keynum == 9)))
	{
		return true;
	}
	else if((fd_isSafari) && ((keynum == 8) || (keynum == 0) || (keynum == 9)))
	{
		return true;
	}
	else
	{
		keychar = String.fromCharCode(keynum);

		// regular expression to test for number
		numcheck = /\d/;

		// return the evaluation test as to whether or not the character is a number
		return numcheck.test(keychar);
	}
}

/* Added by Terri Ilaria : 06/26/2008 */
function FD_isAllowedChar(e,arr_char)
{
	var keynum;
	var keychar;
	var numcheck;
	var ret_val = false;

	// IE
	if(window.event)
	{
		keynum = e.keyCode;
	}
	// Netscape/Firefox/Opera
	else if(e.which)
	{
		keynum = e.which;
	}

	keychar = String.fromCharCode(keynum);

	for(var x = 0; x < arr_char.length; x++)
	{
		if(keychar == arr_char[x])
		{
			ret_val = true;
			break;
		}
	}

	return ret_val;
}

/* Added by Terri Ilaria : 06/26/2008 */
function FD_isValidNumber(obj, int_len, int_dec, str_dec)
{
	var ret_val = true;

	try
	{
		// split the value where the decimal place is
		var arr_num = obj.value.split(str_dec);
		var len_num = (arr_num[0]) ? arr_num[0].length : 0;
		len_num += (arr_num[1]) ? arr_num[1].length : 0;

		if(arr_num.length > 2)
		{
			throw 'Only one decimal place is allowed';
		}
		else if(parseInt(len_num) > parseInt(int_len))
		{
			throw 'The total number of digits can not exceed ' + int_len;
		}
		else if((arr_num[1]) && (parseInt(arr_num[1].length) > parseInt(int_dec)))
		{
			throw 'The number of digits after the decimal can not exceed ' + int_dec;
		}
	}
	catch(e)
	{
		var msg = (e.description) ? e.description : ((e.message) ? e.message : e);
		alert(msg);
		ret_val = false;
	}
	finally
	{
		return ret_val;
	}
}

/* Added by Terri Ilaria : 06/26/2012 */
function FD_click(str_id) {
	$('[id$=":' + str_id + '"]').click();
}

/* Added by Terri Ilaria : 06/13/2014 */
/* Needed for HUB OD Calculator */
function FD_ConvertPSI(str_psi,str_yld,str_mult)
{
    try
    {
        var dbl_mult = parseFloat(str_mult);
        var elem_psi = $('[id$=":' + str_psi + '"]');
        var dbl_psi = (elem_psi && elem_psi.val() != '') ? parseFloat(elem_psi.val()) : null;
        var elem_yld = $('[id$=":' + str_yld + '"]');

        if((dbl_psi && (dbl_psi > 0)) && elem_yld)
        {
            elem_yld.val((dbl_psi * dbl_mult).toFixed(3));
            elem_psi.val('');
        }
    }
    catch(e)
    {
        var msg = (e.description) ? e.description : ((e.message) ? e.message : e);
		alert(msg);
    }
}
// -->