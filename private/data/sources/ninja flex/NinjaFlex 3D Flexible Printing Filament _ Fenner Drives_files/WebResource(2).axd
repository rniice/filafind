
function FieldValidatorEvaluateIsValid(val) {
    if (typeof(Page_IsValid) == "undefined")
        return true;

    if (typeof(val.suppliederrormessage) == 'undefined')
        val.suppliederrormessage = val.errormessage || '';
    
    var validateValue = ValidatorGetValue(val.controltovalidate);
    var isValid = true;
    var errorMessage = val.fieldname + ' ';
    
    if ((val.required != null && ValidatorTrim(val.required) == "true") || _fvIsRequiredByDependent(val)) {
        if (!RequiredFieldValidatorEvaluateIsValid(val)) {
            isValid = false;
            errorMessage += ' is required.';
    }	  }

    if (validateValue.length != 0) {
        if (val.alpha != null && ValidatorTrim(val.alpha) == "false" && validateValue.match( /[a-zA-Z]+/ )) {
            isValid = false;
            errorMessage += 'cannot contain letters.';
        } else if (val.numeric != null && ValidatorTrim(val.numeric) == "false" && validateValue.match( /\d+/ )) {
            isValid = false;
            errorMessage += 'cannot contain numbers.';
        } else if (val.special != null && ValidatorTrim(val.special) == "false" && validateValue.match( /[^0-9a-zA-Z]+/ )) {
            isValid = false;
            errorMessage += 'cannot contain special characters.';
        } else if (val.minlen != null && ValidatorTrim(val.minlen) >= 0 && validateValue.length < ValidatorTrim(val.minlen)) {
            isValid = false;
            errorMessage += 'must be at least ' + val.minlen + ' characters.';
        } else if (val.maxlen != null && ValidatorTrim(val.maxlen) >= 0 && validateValue.length > ValidatorTrim(val.maxlen)) {
            isValid = false;
            errorMessage += 'must be ' + val.maxlen + ' characters or less.';
        } else if (val.validationexpression != null && ValidatorTrim(val.validationexpression).length > 0 && !RegularExpressionValidatorEvaluateIsValid(val)) {
            isValid = false;
            errorMessage += (typeof(val.regexmessage) == 'undefined' || val.regexmessage.length == 0) ? 'is not valid.' : val.regexmessage;
        } else if (val.cardnumber != null && ValidatorTrim(val.cardnumber).length > 0 && !_fvValidateLuhn(validateValue)) {
            isValid = false;
            errorMessage += 'must be a valid card number.';
        } else if (val.strongpw != null && ValidatorTrim(val.strongpw) == "true" && !_fvValidateStrongPW(validateValue)) {
            isValid = false;
            errorMessage += "must contain at least one capital letter, and non-letter character.";
        }
    }

    if(!isValid) {
		  val.errormessage = (val.suppliederrormessage.length > 0) ? val.suppliederrormessage : errorMessage;
        var o = (document.getElementById) ? document.getElementById(val.controltovalidate) : document.all[val.controltovalidate];
		  _fvAddClass(o, 'invalid');
        o.onfocus = FieldValidatorResetColor;
    }

    return isValid;
}

function FieldValidatorResetColor()
{
	_fvRemoveClass(this, 'invalid');
}

function _fvValidateLuhn(value)
{
	if (value.match(/\*+[^\*]{0,4}$/))
		return true;

	var numberProduct;
   var numberProductDigitIndex;
   var checkSumTotal = 0;

   for (digitCounter = value.length - 1; digitCounter >= 0; digitCounter--)
   {
      checkSumTotal += parseInt(value.charAt(digitCounter));
      digitCounter--;
      numberProduct = String((value.charAt(digitCounter) * 2));
  
      for (var productDigitCounter = 0; productDigitCounter < numberProduct.length; productDigitCounter++)
      {
         checkSumTotal += parseInt(numberProduct.charAt(productDigitCounter), 10);
      }
   }

   return (checkSumTotal % 10 == 0);
}

function _fvValidateStrongPW(value) {
    if (!value.match(/[A-Z]+/))
        return false;
    if (!value.match(/[^a-zA-Z]+/))
        return false;
    return true;
}

function _fvIsRequiredByDependent(val)
{
	if (val.dependentControl == null || val.dependentControl.length == 0)
		return false;
	
	var required = false;
	var control = (document.getElementById) ? document.getElementById(val.dependentControl) : document.all[val.dependentControl]; 

	//Need to handle checkboxes differently since the built in ValidatorGetValue doesn't handle this correctly
	if (control != null && control.type == "checkbox")
	{
		required = ((control.checked && val.dependentControlValue == "on") || (!control.checked && val.dependentControlValue == "off"));
	}
	else if (control != null && control.type == "radio")
	{
		required = (control.checked && val.dependentControlValue == control.value);
	}
	else if (ValidatorCompare(ValidatorGetValue(val.dependentControl), val.dependentControlValue, (typeof(val.operator) == "string") ? val.operator : "Equal", val))
	{
		required = true;
	}
    
    return required;
}

function _fvContainsClass(obj, cssClass) {
	if (obj.className == '') {
        return false;
    } else {
        return new RegExp('\\b' + cssClass + '\\b').test(obj.className);
}	}

function _fvAddClass(obj, cssClass) {
	if (!_fvContainsClass(obj, cssClass)) {
		obj.className += (obj.className ? ' ' : '') + cssClass;
}	}

function _fvRemoveClass(obj, cssClass) {
	if (_fvContainsClass(obj, cssClass)) {
		obj.className = obj.className.replace(((obj.className.indexOf(' ' + cssClass) >= 0) ? ' ' + cssClass : cssClass), '');
}	}
