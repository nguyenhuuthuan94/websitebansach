function ValidateRequiredFields(frm, arr)
{
	for (i = 0; i < arr.length; i++)
	{
		var e = frm.elements[arr[i]];
		if (e.value.length <= 0)
			return false;
	}	
	return true;
}

function ValidateRegular(source, reg)
{
	value = source.value;
	if (value.length == 0)
		return true;
	var rx = new RegExp(reg);
	var matches = rx.exec(value);
    return (matches != null && value == matches[0]);
}


function ValidateEmail(source)
{
	if  (!ValidateRegular(source, "\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*"))
	{
		source.select();
		source.focus();
		return false;
	}
	return true;
}

function ValidatePhone(source)
{
	if (!ValidateRegular(source, "((\\(\\d{3}\\) ?)|(\\d{3}-))?\\d{3}-\\d{4}"))
	{
		source.select();
		source.focus();
		return false;
	}
	return true;
}

function IsInteger(source)
{
	if (!ValidateRegular(source, "\\d*"))
	{
		source.select();
		source.focus();
		return false;
	}
	return true;
}

function ValidateURL(source)
{
	if (!ValidateRegular(source, "((\\(\\d{3}\\) ?)|(\\d{3}-))?\\d{3}-\\d{4}"))
	{
		source.select();
		source.focus();
		return false;
	}
	return true;
}

/*************************************************************************\
CheckCardNumber(form)
function called when users click the "check" button.
\*************************************************************************/
/*************************************************************************\
boolean isNum(String argvalue)
return true if argvalue contains only numeric characters,
else return false.
\*************************************************************************/
function isNum(argvalue) 
{
	argvalue = argvalue.toString();

	if (argvalue.length == 0)
	return false;

	for (var n = 0; n < argvalue.length; n++)
		if (argvalue.substring(n, n+1) < "0" || argvalue.substring(n, n+1) > "9")
			return false;
	return true;
}

//////////////////////////////////////
//VKAlbum, Inc Script code
////////////////////////////////////
/////////////////////////////////////////////////////////////////
//This function is check require field for a textbox
///////////////////////////////////////////////////////////
function GSCheckRequireField(object,strMesssage){
	if(object.value.length == 0){
		object.focus();
		return strMesssage;
		
	}
	else{
		return "";
	}
}

////////////////////////////////////////////////////////////////////////
//This function is check for compare 2 control
///////////////////////////////////////////////////////////////////////
function GSCheckCompareField(objControl1,objControl2,strMessage){
	
	if(objControl1.value != objControl2.value){
		objControl2.focus()
		return strMessage;
	}
	else{
		return "";
	}
}

////////////////////////////////////////////////////////////////////////
//This function is check for compare 2 control
///////////////////////////////////////////////////////////////////////
function GSCheckCompareFieldWithMessage(objControl1,objControl2,messageObjectID,strMessage, displayErrorType)
{
	
	if(objControl1.value != objControl2.value){
		displayErrorMessage(messageObjectID, objControl1, displayErrorType);
		//document.getElementById(messageObjectID).style.display = "";
		return strMessage;
	}
	else{
		document.getElementById(messageObjectID).style.display = "none";
		
		return "";
	}
}


///////////////////////////////////////////////////
//This function is check email but it only return a message
////////////////////////////////////////////////////////
function GSCheckEmail(object,strMessage){
	if(object.value.length > 0){
		if(ValidateEmail(object)){
			return "";
		}
		else
		{
			object.focus();
			return strMessage
		}
	}
	else{
		return "";
	}
}

///////////////////////////////////////////////////
//This function is check zipcode but it only return a message
////////////////////////////////////////////////////////
function GSValidateZipCode(source)
{
	if (!ValidateRegular(source, "\\d{5}(-\\d{4})?"))
	{
		source.select();
		source.focus();
		return false;
	}
	return true;
}
///////////////////////////////////////////////////
//This function is check website but it only return a message
////////////////////////////////////////////////////////
function GSValidateWebsite(object, strMessage)
{
	if(object.value.length > 0){
		if(ValidateWebsite(object)){
			return "";
		}
		else
		{
			return strMessage
			object.focus();
		}
	}
	return "";
}
function GSValidateDomainName(object, strMessage)
{
	if(object.value.length > 0){
		if(ValidateDomainName(object)){
			return "";
		}
		else
		{
			return strMessage
			object.focus();
		}
	}
	else{
		return "";
	}
}

function ValidateWebsite(source)
{
	if (!ValidateRegular(source, "(http://)?([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?"))
	{
		source.select();
		source.focus();
		return false;
	}
	return true;
}
function ValidateUserName(source)
{
	if (!ValidateRegular(source, "(\\w+([-+]\\w+)*"))
	{
		source.select();
		source.focus();
		return false;
	}
	return true;
}
/////////////////////////////////////////////////////////
function GSCheckUserName(object,strMessage){
	if(object.value.length > 0){
		if(ValidateUserName(object)){
			return "";
		}
		else
		{
			return strMessage
			object.focus();
		}
	}
	else{
		return "";
	}
}
/////////////////////////////////////////////////////////
function GSCheckPhone(object,strMessage){
	if(object.value.length > 0){
		if(ValidatePhone(object)){
			return "";
		}
		else
		{
			return strMessage
			object.focus();
		}
	}
	else{
		return "";
	}
}
/////////////////////////////////////////////////////////////////////
function GSCheckZipCode(object,strMessage){
	if(object.value.length > 0){
		if(GSValidateZipCode(object)){
			return "";
		}
		else
		{
			object.focus();
			return strMessage;
			
		}
	}
	else{
		return "";
	}
}
//////////////////////////////////////////////////////////////////
function GSCheckCombo(object,strMessage){
	if(object.selectedIndex == 0){
		return strMessage
		object.focus();
	}
	else{
		return "";
	}
}
//////////////////////////////////////////////////////////////////
function GSCheckListBox(object,strMessage){
	if(object.length == 0){
		return strMessage
		object.focus();
	}
	else{
		return "";
	}
}
function VK2CheckListBox(object1, object2, strMessage)
{
	if((GSCheckListBox(object1, strMessage).length > 0) && (GSCheckListBox(object2, strMessage).length > 0))
	{
		return strMessage;
	}
	else{
		return "";
	}
}
////////////////////////////////////////////////////////////////////////
//This function is check for require file
///////////////////////////////////////////////////////////////////////

function GSCheckFileExtension(strFile,strMessage,strFileExtension ){
	if(strFile)
	{
		return true;
	}
	else{
		if(checkFile(strFile, strFileExtension))
		{
			return true;
		}
		else
		{			
			return false;
		}
	}
}
////////////////////////////////////////////////////////////////////////
//This function is check for require file
///////////////////////////////////////////////////////////////////////

function checkFileType(objControl,strMessage,strFileExtension ){
	if(objControl.value == "")
	{
		return "";
	}
	else{
		
		if(checkFile(objControl.value, strFileExtension))
		{
			return "";
		}
		else
		{
			objControl.select();
			objControl.focus();
			return strMessage;
		}
	}
}

////////////////////////////////////////////////////////////////////////
//This function is check for require file
///////////////////////////////////////////////////////////////////////
	function checkFile(strValue, strFileExtension)
	{
		var strExtension = strValue.substr((strValue.lastIndexOf(".") + 1), strValue.length);
		var arrExtension = strFileExtension.split(",");
		var bFound = false;
		for(var i = 0; i < arrExtension.length;i++)
		{
			if(jQuery.trim(strExtension.toLowerCase()) == jQuery.trim(arrExtension[i].toLowerCase()))
			{
				bFound = true;
			}
		}
		return bFound;
	}
/////////////////////////////////////////////////////////////////
//Validation convert from asp.net
///////////////////////////////////////////////////////////
function GSCheckRequireFieldWithMessage(object,messageObjectID, strMesssage, displayErrorType){
	
	if(object.value.length == 0)
	{
		//object.focus();
		//document.getElementById(messageObjectID).style.display = "";
		displayErrorMessage(messageObjectID, object, displayErrorType);
		return strMesssage;
		
	}
	else{
		document.getElementById(messageObjectID).style.display = "none";
		return "";
	}
}

///////////////////////////////////////////////////
//This function is check email but it only return a message
////////////////////////////////////////////////////////
function GSValidateExpression(object,strMessage,Expression){
	if(object.value.length > 0){
		if(ValidateRegular(object,Expression)){
			return "";
		}
		else
		{
			//object.focus();
			return strMessage
		}
	}
	else{
		return "";
	}
}
///////////////////////////////////////////////////
//This function is check email but it only return a message
////////////////////////////////////////////////////////
function GSValidateExpressionWithMessage(object,messageObjectID,strMessage,Expression, displayErrorType){
	if(object.value.length > 0){
		if(ValidateRegular(object,Expression)){
			document.getElementById(messageObjectID).style.display = "none";
			return "";
		}
		else
		{
			//object.focus();
			//document.getElementById(messageObjectID).style.display = "";
			displayErrorMessage(messageObjectID, object, displayErrorType);
			return strMessage;
		}
	}
	else{
		return "";
	}
}
	
///////////////////////////////////////////////////
//This function is check email but it only return a message
////////////////////////////////////////////////////////
function GSCheckRangeWithMessage(object,messageObjectID,strMessage,MinimumValue, MaximumValue, displayErrorType){
	if(object.value.length > 0){
		
		var bIsValidate = true;
		var value = object.value;
		if(!isNaN(value))
		{
			bIsValidate = false;
			value = parseFloat(value);
			MinimumValue = parseFloat(MinimumValue);
			MaximumValue = parseFloat(MaximumValue);
			if(MaximumValue > MinimumValue)
			{
				if (( MinimumValue <= value) &&  (value <= MaximumValue)) 
					{
						bIsValidate = true;
					}
			}
			else
			{
				if (( MinimumValue <= value)) 
				{
					bIsValidate = true;
				}
			}
			if(bIsValidate){
				document.getElementById(messageObjectID).style.display = "none";
				return "";
			}
			else
			{
				displayErrorMessage(messageObjectID, object, displayErrorType);
				return strMessage;
			}
		}
	}
	else{
		return "";
	}
}
	
//////////////////////////////////////////////////////////////////////////////////
//Get Offset top of object
//////////////////////////////////////////////////////////////////////////////////
var validationAlreadyFocus = false;

function validateForm(validationGroup, displayErrorType)
{
	if(displayErrorType == null)
	{
		displayErrorType = 1;
	}
	validationAlreadyFocus = false;
	var arrValidator = $("#" + validationGroup + " span[id]");
	var strAlert = "";
	$("span[rel='validation']").each(function()
	{
		//alert($(this).attr("id"));
	});
	for(errorIndex = 0; errorIndex < arrValidator.length; errorIndex++)
	{
		var e = arrValidator[errorIndex];
		//alert(e + " " + e.getAttribute("title"));
		if(e.getAttribute("id") != null)
		{
			var controlRawID = e.getAttribute("id");
			
			if(controlRawID.indexOf("validator.") >= 0)
			{
				var ValidateType = 0; //Requre validation
				if(controlRawID.indexOf(".require.") >= 0)
				{
					ValidateType = 1;
				}
				else if(controlRawID.indexOf(".regularexpression.") >= 0)
				{
					ValidateType = 2;
				}
				else if(controlRawID.indexOf(".clientvalidationfunction.") >= 0)
				{
					ValidateType = 3;
				}
				else if(controlRawID.indexOf(".compare.") >= 0)
				{
					ValidateType = 4;
				}
				else if(controlRawID.indexOf(".range.") >= 0)
				{
					ValidateType = 5;
				}
				else if(controlRawID.indexOf(".filetype.") >= 0)
				{
					ValidateType = 6;
				}
				var arrControlRawID = controlRawID.split(".");
			
				var controlID = arrControlRawID[3];
				//Check control id
				var enableValidate = true;
				if(controlID.indexOf("|") > 0)
				{
					var arrControlID = controlID.split("|");
					if(arrControlID.length > 1)
					{
						controlID = arrControlID[0];
						var arrCondition = arrControlID[1].split("=");
						if(arrCondition.length > 1)
						{
							var conditionControlID = arrCondition[0];
							var conditionControlValue = arrCondition[1];
							var conditionControlObject = $("#" + validationGroup + " #" + conditionControlID)[0];
							if(conditionControlObject != null)
							{
								if(conditionControlObject.value != conditionControlValue)
								{
									enableValidate = false;
								}
							}
						}
					}
				}
				var controlObject = $("#" + validationGroup + " #" + controlID)[0];
				var controlObjectName = $("#" + validationGroup + " input[name=" + controlID + "]");
				 
				if(controlObject == null)
				{
					enableValidate = false;
				}
				if(controlObjectName.length  != null)
				{
					if(controlObjectName.length > 1)
					{
						enableValidate = true;
					}
				}
			
				if(enableValidate) 
				{
					switch(ValidateType)
					{
						case 1:
							
							//alert(controlID + "-" + document.getElementsByName(controlID));
							//Check if validate for radio
							var bValidateForRadio = false;
							//alert(controlObject + " " + controlID);
							/*
							if(controlObject.length  != null)
							{
								if(controlObject.length > 1)
								{
									//For firefox
									if(!$(controlObject).is('select'))
									{
										bValidateForRadio = true;
									}
									
								}
							}
							*/
							if(controlObjectName.length  != null)
							{
								if(controlObjectName.length > 1)
								{
									bValidateForRadio = true;
									//alert(bValidateForRadio);
								}
							}
							
							if(!bValidateForRadio)
							{
								if(controlID.indexOf(",") >=0)
								{
									//Validate for mult
									var arrControlID = controlID.split(",");
									var isBlankAll = true;
									for(k = 0; k < arrControlID.length; k++)
									{
										var itemControlID = arrControlID[k];
										if(document.getElementById(itemControlID).value != "")
										{
											isBlankAll = false;
										}
									}
									if(isBlankAll)
									{
										strAlert = strAlert + e.getAttribute("title") + "\n";
									}
								}
								else
								{
									
									strAlert = strAlert + GSCheckRequireFieldWithMessage(controlObject, e.id, e.getAttribute("title") + "\n", displayErrorType);
								}
							}
							else
							{
								//Validation for list radio or list checkbox
								
								if(document.getElementsByName(controlID) != null)
								{	
									var bIsHaveCheck = false;
									for (subErrorIndex = 0; subErrorIndex < document.getElementsByName(controlID).length; subErrorIndex++)
									{	
										checkcontrol = document.getElementsByName(controlID)[subErrorIndex];
										//alert(checkcontrol.id + "-" + checkcontrol.checked);
										if (checkcontrol.checked == true)
										{
											bIsHaveCheck = true;
										}
									}
									if(!bIsHaveCheck)
									{
										strAlert = strAlert + e.getAttribute("title") + "\n";
										
										displayErrorMessage(e.id, null, displayErrorType);
									}
									else
									{
										document.getElementById(e.id).style.display = "none";		
									}
								}
							}
							break;
						case 2:
							if(controlObject != null)
							{
								var ValidationExpression = document.getElementById("regularExpression." + validationGroup + "." + controlID).value;
								//alert(ValidationExpression);
								strAlert = strAlert + GSValidateExpressionWithMessage(controlObject,e.id, e.getAttribute("title") + "\n",ValidationExpression, displayErrorType);
							}
							break;
						case 3:
							var ClientValidationFunction = e.getAttribute("ClientValidationFunction") + "()";
							//alert(ClientValidationFunction);
							if(!eval(ClientValidationFunction))
							{
								strAlert = strAlert + e.getAttribute("title") + "\n";
								displayErrorMessage(e.id, null, displayErrorType);
							}
							else
							{
								document.getElementById(e.id).style.display = "none";		
							}
							break;
						case 4:
							var controlToCompareID = arrControlRawID[4];
							var controlToCompareObject = $("#" + validationGroup + " #" + controlToCompareID)[0];
							if((controlObject != null) && (controlToCompareObject != null))
							{
								strAlert = strAlert + GSCheckCompareFieldWithMessage(controlObject,controlToCompareObject, e.id,e.getAttribute("title") + "\n", displayErrorType);
							}
							break;
						case 5:
							if(controlObject != null)
							{
								var MinimumValue = document.getElementById("minvalue." + validationGroup + "." + controlID).value;
								var MaximumValue = document.getElementById("maxvalue." + validationGroup + "." + controlID).value;
								
								
								strAlert = strAlert + GSCheckRangeWithMessage(controlObject,e.id, e.getAttribute("title") + "\n", MinimumValue,MaximumValue, displayErrorType);
							}
							break;

						case 6:
							if(controlObject != null)
							{
								var AcceptType = document.getElementById("fileType." + validationGroup + "." + controlID).value;
								//alert(AcceptType);
								
								strAlert = strAlert + checkFileType(controlObject,e.getAttribute("title") + "\n",AcceptType );
							}
							break;
							 
					}
				}
			}
		}
	}
	//return false;
	
	if(strAlert != "")
	{
		alert(strAlert);
		
		//document.getElementById("divtitle").innerHTML = strAlert.replace("\n","<br />");
		return false;
	}
	else
	{
		//document.getElementById("divtitle").innerHTML = "";
		return true;
	}
	
}	
/////////////////////////////////////////////////////////////
// 
///////////////////////////////////////////////////////
function displayErrorMessage(messageControl, formControl, displayErrorType)
{
	//alert(displayErrorType);
	switch(displayErrorType)
	{
		case 1:
			if(document.getElementById(messageControl) != null)
			{
				document.getElementById(messageControl).style.display = "";
				//$(formControl).css({ border: "1px dotted red", background: "#F9C" });
				$(formControl).addClass("validation error");
				if(!validationAlreadyFocus)
				{
					$(formControl).focus()
					validationAlreadyFocus = true;
				}
			}
			break;
		case 2:
			//Not display
			if(document.getElementById(messageControl) != null)
			{
				document.getElementById(messageControl).style.display = "none";
				if(formControl != null)
				{
					//formControl.style.borderColor = "red";
				}
			}
			break;
		case 3:
			//highligh the control
			
			break;
	}
	
}
/////////////////////////////////////////////////////////////
// End of  code
///////////////////////////////////////////////////////