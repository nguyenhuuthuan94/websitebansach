 

/********************************************************************************************************************************
*
********************************************************************************************************************************/
function selectClass(target, tagName, className)
{
	var $parent = $(target).parent().parent();
	$parent.find(tagName).removeClass(className);
	$(target).addClass(className);
}
 
/********************************************************************************************************************************
*
********************************************************************************************************************************/
function doSearch(strUrl, searchForm)
{
	var validate = validateForm(searchForm);
	if(validate)
	{
		var postDataArray = $("#" + searchForm + " *").serializeArray();
		var postData = "";
	 
		$.each(postDataArray, function(i, field) 
		{
			if((field.name != "validationGroup") && (field.name != "validationObject"))
			{
				if(postData != "")
				{
					postData = postData + "&" + field.name + "=" + field.value;
				}
				else
				{
					postData = postData + field.name + "=" + field.value;
				}
			}
		});
		
		if(strUrl.indexOf("?") > 0)
		{
			strUrl = strUrl + "&" + postData;
		}
		else
		{
			strUrl = strUrl + "?" + postData;
		}
		window.location.href=strUrl;
	}
	return false;
}
/********************************************************************************************************************************
*
********************************************************************************************************************************/
function toggleObjectList(target, showCssName)
{
	var $parent = $(target).parent().parent().parent();
	$parent.find("." + showCssName).not($(target).parent().parent().find("." + showCssName)).hide(100);
	$(target).parent().parent().find("." + showCssName).toggle(300);
	return false;
}
/********************************************************************************************************************************
*
********************************************************************************************************************************/
 

function emailSignUp(emailControlName)
{
	var Email = document.getElementById(emailControlName).value;
	if(Email == "")
	{
		alert("Please enter your Email.");
	}
	else
	{
		//Redirect to sign up page
		var strUrl = "/index.php?module=mailinglist&content=register&email=" + Email;
		window.location.href=strUrl;
	}
	return false;
}
/********************************************************************************************************************************
*
********************************************************************************************************************************/
function buyNow(shoppingCartUrl, QuantityID, AttributeDetailName)
{
	var Quantity = document.getElementById(QuantityID).value;
	
	var padid = getListRadioValue(AttributeDetailName, 0)
	shoppingCartUrl = shoppingCartUrl + "&quantity=" + Quantity + "&padid=" + padid;
	window.location.href=shoppingCartUrl;
}

/********************************************************************************************************************************
*
********************************************************************************************************************************/
function ajaxBuyNow(shoppingCartUrl, QuantityID, AttributeDetailName)
{
	var Quantity = 1;
	if(QuantityID != "")
	{
		if(document.getElementById(QuantityID) != null)
		{
			Quantity = document.getElementById(QuantityID).value;
		}
	}
	var padid = 0;
	if(AttributeDetailName != "")
	{
		padid = getListRadioValue(AttributeDetailName, 0)
	}
	
	shoppingCartUrl = shoppingCartUrl + "&function=ajaxAddToCart&quantity=" + Quantity + "&padid=" + padid;
	//ajaxLinkControl(shoppingCartUrl, "", "/", "headerCartSection", "headerCartSection", true);
	shoppingCartUrl = appendUrl(shoppingCartUrl, 'from=ajax');
	
	var headerID = 'headerCartSection';
	var id = 'aShoppingCart';
	
	var titleHtml = '<span>' + 'Shopping Cart' + '</span>'+
							'<button type="button" id="close" class="close" onclick="$(&quot;#' + id + '&quot;).popover(&quot;hide&quot;);">&times;</button>'
		 
		
	$.ajax(
	{
		
		type: "GET",
		url: shoppingCartUrl,
		timeout: 150000,
		beforeSend: function(x) 
		{
						
		},
		dataType: "json",
		success: function(data)
		{
			$('#' + headerID).html(data.header);
			//alert(id + placement + data);
			$('#' + id).popover({
				trigger: 'focus',
				html: true, 
				title : titleHtml,
				content:data.content, 
				placement: 'bottom'
			});
			
			$('#' + id).popover('toggle')

		} 
	});
	 
	
	
	var cartLocation = $('#' + id).position();
	$('html').animate({scrollTop:cartLocation.top,scrollLeft:cartLocation.left}, 'slow');//IE, FF
    $('body').animate({scrollTop:cartLocation.top,scrollLeft:cartLocation.left}, 'slow');//chrome, don't know if safary works
	return false;
	//window.location.href=shoppingCartUrl;
}
/********************************************************************************************************************************
*
********************************************************************************************************************************/
function changeCartQuantity(target, strUrl, cartKey)
{
	strUrl = strUrl + "&quantity=" + target.value + "&cartkey=" + cartKey;
	ajaxLink(strUrl);
}
/********************************************************************************************************************************
*
********************************************************************************************************************************/
function changePaymentMethod(target)
{
	if(target.value == "CC")
	{
		$(".creditCardInformation").show();
	}
	else
	{
		$(".creditCardInformation").hide();
	}
}

/********************************************************************************************************************************
*
********************************************************************************************************************************/
function checkoutAsGuest(controlID, checkOutUrl)
{
	var strUrl = checkOutUrl;
	if(document.getElementById(controlID) != null)
	{
		var Email = document.getElementById(controlID).value;
		strUrl = strUrl + "&checkoutemail=" + Email;
	}
	window.location.href=strUrl;
	return false;
}

/********************************************************************************************************************************
*
********************************************************************************************************************************/
function doSearch(strUrl, searchForm)
{
	var validate = validateForm(searchForm);
	if(validate)
	{
		var postDataArray = $("#" + searchForm + " *").serializeArray();
		var postData = "";
	 
		$.each(postDataArray, function(i, field) 
		{
			if((field.name != "validationGroup") && (field.name != "validationObject"))
			{
				if(postData != "")
				{
					postData = postData + "&" + field.name + "=" + field.value;
				}
				else
				{
					postData = postData + field.name + "=" + field.value;
				}
			}
		});
		
		if(strUrl.indexOf("?") > 0)
		{
			strUrl = strUrl + "&" + postData;
		}
		else
		{
			strUrl = strUrl + "?" + postData;
		}
		window.location.href=strUrl;
	}
	return false;
}
/********************************************************************************************************************************
*
********************************************************************************************************************************/
function sameAsBillingAddress()
{
	$("#ShippingFirstName").val($("#BillingFirstName").val());
	$("#ShippingLastName").val($("#BillingLastName").val());
	$("#ShippingCompanyName").val($("#BillingCompanyName").val());
	$("#ShippingAddress").val($("#BillingAddress").val());
	$("#ShippingAddress2").val($("#BillingAddress2").val());
	$("#ShippingCity").val($("#BillingCity").val());
	$("#ShippingStateCode").val($("#BillingStateCode").val());
	$("#ShippingZip").val($("#BillingZip").val());
	$("#ShippingCountryCode").val($("#BillingCountryCode").val());
	$("#ShippingPhone").val($("#BillingPhone").val());
	$("#ShippingAltPhone").val($("#BillingAltPhone").val());
	$("#ShippingFax").val($("#BillingFax").val());
	$("#ShippingEmail").val($("#BillingEmail").val());
}
/********************************************************************************************************************************
*
********************************************************************************************************************************/
var originalEmailFriendMessage = "";
var previousEmailFriendFriendName = "";
function emailFriendPrefill(target, messageControlID)
{
	if(originalEmailFriendMessage == "")
	{
		originalEmailFriendMessage = document.getElementById(messageControlID).value;
	}
	
	var emailFriendMessage = document.getElementById(messageControlID).value;
	var friendName = target.value;
	if(previousEmailFriendFriendName != "")
	{
		emailFriendMessage = emailFriendMessage.replace("Hi " + previousEmailFriendFriendName + ",", "Hi, ");
	}
	if(emailFriendMessage.replace(/\s+/g, "").toLowerCase() == originalEmailFriendMessage.replace(/\s+/g, "").toLowerCase())
	{
		emailFriendMessage = emailFriendMessage.replace("Hi,", "Hi " + friendName + ",");
		previousEmailFriendFriendName = friendName;
		document.getElementById(messageControlID).value = emailFriendMessage;
	}
}

/********************************************************************************************************************************
*
********************************************************************************************************************************/
function changeProductAttribute(target)
{
	var priceText = $(target).attr("rel");
//	alert(priceText);
	$("#divProductViewPrice").html(priceText);
}
/********************************************************************************************************************************
*
********************************************************************************************************************************/
function printPage(buttonContainer)
{
	document.getElementById(buttonContainer).style.display = "none";
	window.print();
}