/*
	Preload functions
*/
$(document).ready(function()
{
	loadPage();
	
	//$(document).pngFix(); 
	if(typeof internalLoadPage == 'function') 
	{
		internalLoadPage();
		
		
	}
	
});
/********************************************************************************************************************************
* 
********************************************************************************************************************************/

 $(window).load(function() 
 {
	nivoSliderLoad();
	equalHeightBox();
 });
/********************************************************************************************************************************
* 
********************************************************************************************************************************/

function loadPage()
{
	 	

	$('form').preventDoubleAction('submit');
	$('a').preventDoubleAction('click');

	initManage();
	toggleCss();
	initFlippingTabs();

	initUI();
	initTooltip();
	 
	initTopMenu();
	//disableRightClick();
	initSlideShow();
	initSearchBox();
	styledCombobox();
	//initScrollToTop();
	initADGallery();
	initJcarousel();
	initJcarouselListImage();
	initScrollbar();
	initJQZoom();
	initFileUpload();
	initHomeSlideShow();
	initSubPageSlideShow();
	initPopup();
	

}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function loadPageAfterSubmit()
{
	initManage();
	styledCombobox();
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initManage()
{
	/********************************************************************************************************************************
	* Action for change color when select on theck box in mange page
	********************************************************************************************************************************/
	$("input[id='ckCheckAll']").bind("click", function()
	{
		var checked_status = this.checked;
		$("input[name='id[]']").each(function() {selectRow(this,checked_status, true)});
		//Select for or header footer checkbox too
		$("input[name='ckCheckAll']").each(function()
		{
			this.checked = checked_status;
		});
	});
	$("input[name='id[]']").bind("click", function()
	{
		var checked_status = !this.checked; //Because the tr checked too
		//alert(checked_status);
		selectRow(this, checked_status, true);
		
	});
	function selectRow(target, checked_status, isChecked)
	{
		if(isChecked)
		{
			$(target).attr("checked",checked_status);
		}
		//target.checked = checked_status;
		
		//change the color of tr
		if(checked_status)
		{
			$(target).parent().parent().addClass("warning");
		}
		else
		{
			$(target).parent().parent().removeClass("warning");
		}
	}
	/********************************************************************************************************************************
	* End of Action for change color when select on theck box in mange page
	********************************************************************************************************************************/
	 
	
	$(".table-responsive tbody tr td table, .table-responsive tbody tr td a, .table-responsive tbody tr td input[type=button]").bind("click", function(event)
	{
		event.stopPropagation();
	});
	
	$(".table-responsive tbody tr").bind("click", function()
	{
		var checkbox = $(this).find("input[name='id[]']");
		var isChecked = !checkbox.is(':checked');
		//alert(isChecked);
		//checkbox.attr("checked",isChecked);
		selectRow(checkbox, isChecked, true);
	});
	/********************************************************************************************************************************
	* End of Hover row when mouse over in manage page
	********************************************************************************************************************************/	
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initJcarouselListImage()
{
	
	if($(".jcarousel-skin-list_image")[0] != null)
	{
		$(".jcarousel-skin-list_image").each(function() 
		{
			var ID = $(this).attr("id");
			$('#' + ID + ' li').each(function(idx) {
				$(this).data('index', (++idx));
			});
		
			$('#' + ID).jcarousel({
				scroll: 4,
				vertical: true 
			})
			 
			// load and fade-in thumbnails
			$('#' + ID + ' li img').css('opacity', 0).each(function() {    
				if (this.complete || this.readyState == 'complete') { $(this).animate({'opacity': 1}, 300) } 
				else { $(this).load(function() { $(this).animate({'opacity': 1}, 300) }); }
			});
		
			
			$('#' + ID + ' li a').bind('click', function() {
				$('#main_image').css({opacity:0.0});
				$('#main_image').css({opacity:0.0}).animate({opacity:1.0}, 1500);
				return false;
			});
			 


		});
		
		 
	}
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initJcarousel()
{
	
	if($(".jcarousel")[0] != null)
	{
		$(".jcarousel").each(function() 
		{
			var ID = $(this).attr("id");
			if($(this).attr("rel") != null)
			{
				effect = $(this).attr("rel");
			}
			jQuery('#' + ID).jcarousel(
			{
				visible: 5,
				scroll: 5,
				auto: 5,
				wrap: 'last'
		
			}
			);


		});
		
		 
	}
}


 /********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initTopMenu()
{
	
	$('#top_menu .sub_menu').hide();
	 
	 
	$('#top_menu li').hover(function () {
		$(this).find('> .sub_menu').stop(true, true).slideDown('slow');
	}, function() {
		$(this).find('> .sub_menu').stop(true, true).slideUp('fast');
		//$(this).find('> .sub_menu').hide();
	});
	
	
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initScrollbar()
{
	if($(".scroll_content").length > 0)
	{
		
		$(".scroll_content").each(function() 
		{
			var ID = $(this).attr("id");
			var html_content = $(this).html();
			var new_html_conent = "";
			new_html_conent = new_html_conent + "<div class=\"scrollbar\"><div class=\"track\"><div class=\"thumb\"><div class=\"end\"></div></div></div></div>"
			new_html_conent = new_html_conent + "<div class=\"viewport\"><div class=\"overview\">" + html_content + "</div></div>"
			$(this).html(new_html_conent);
			//$(this).prepend("<div class=\"scrollbar\"><div class=\"track\"><div class=\"thumb\"><div class=\"end\"></div></div></div></div>");
			$(this).tinyscrollbar();;
			$('a[href^="#"]').click(function() {
				// Find the bottom of the box with the scrollbar
				// (close approximation: the top position of the last element in the box)
				var bottom = $('.viewport .overview').children().last().position().top;
			
				// Determine what position this internal link is located at
				// (if you use <a name=".."> you will need to change this,
				// right now it only matches element IDs like <h1 id="link0">
				var href_name = $(this).attr('href');
				href_name = href_name.replace("#", "");
				//var cur = $($(this).attr('href')).position().top;
				 
				var cur = $("a[name='" + href_name + "']").position().top;
			
				// If the position of the link is too low for the scrollbar in this box,
				// just set it to the bottom
				if (cur >= bottom - $('.viewport').height()) {
					cur = 'bottom';
				}
				else {
					cur = cur + 'px';
				}
			
				$(this).tinyscrollbar_update(cur);
			});


		});
		
		
	}
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function nivoSliderLoad()
{
	
	if($(".nivoSlider")[0] != null)
	{
		$(".nivoSlider").each(function() 
		{
			var ID = $(this).attr("id");
			var effect = "random";
			if($(this).attr("rel") != null)
			{
				effect = $(this).attr("rel");
			}
			randomList('#' + ID);
			$('#' + ID).nivoSlider({
				effect: effect, // Specify sets like: 'fold,fade,sliceDown'
				slices: 15, // For slice animations
				boxCols: 8, // For box animations
				boxRows: 4, // For box animations
				animSpeed: 500, // Slide transition speed
				pauseTime: 3000, // How long each slide will show
				startSlide: 0, // Set starting Slide (0 index)
				directionNav: true, // Next & Prev navigation
				controlNav: true, // 1,2,3... navigation
				controlNavThumbs: false, // Use thumbnails for Control Nav
				pauseOnHover: true, // Stop animation while hovering
				manualAdvance: false, // Force manual transitions
				prevText: 'Prev', // Prev directionNav text
				nextText: 'Next', // Next directionNav text
				randomStart: false, // Start on a random slide
				beforeChange: function(){}, // Triggers before a slide transition
				afterChange: function(){}, // Triggers after a slide transition
				slideshowEnd: function(){}, // Triggers after all slides have been shown
				lastSlide: function(){}, // Triggers when last slide is shown
				afterLoad: function(){} // Triggers when slider has loaded
			});
		});
		
		 
	}
//http://dev7studios.com/nivo-slider/#/documentation
/*
sliceDown
sliceDownLeft
sliceUp
sliceUpLeft
sliceUpDown
sliceUpDownLeft
fold
fade
random
slideInRight
slideInLeft
boxRandom
boxRain
boxRainReverse
boxRainGrow
boxRainGrowReverse
*/
	 
}

  /********************************************************************************************************************************
* 
********************************************************************************************************************************/
 function initPopup()
 {
	 if($("a[class=popup_control]")[0] != null)
	{
		$("a[class=popup_control]").each(function() 
		{
			var href = $(this).attr("href");
			var width = $(this).attr("width");
			var height = $(this).attr("height");
			 TINY.box.show({url:href,post:'id=0',width:width,height:height,opacity:20,topsplit:3})
			 
		});
	}
 }
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function randomList(selectObjectID) 
{
	if($(selectObjectID) != null)
	{
		var group = $(selectObjectID).children();
		var count = group.length;
		var temp,x;
		for (var i = 0; i < count; i++) 
		{
			temp = group[i];
			x = Math.floor(Math.random() * count);
			group[i] = group[x];
			group[x] = temp;
		}
		$(group).remove();
		$(selectObjectID).append($(group));
	}
}
 
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function equalHeightBox() 
{
	if($(".equalheight>div")[0] != null)
	{
		$(".equalheight").each(function() 
		{
			if(bootstrapIsApply($(this).find(">div")) )
			{
				var id = $(this).attr("id");
				
				
				var heightArray =  $(this).find(">div").map(function()
				{
					return $(this).height();
				}).get();
				var maxHeight = Math.max.apply(Math, heightArray);
				$(this).find(">div").height(maxHeight);
			}
		});
	}
	if($(".equalheight_inner>div .inner")[0] != null)
	{
		
		$(".equalheight_inner").each(function() 
		{
			if(bootstrapIsApply($(this).find(">div .inner")) )
			{
				var heightArray = $(this).find(">div .inner").map(function()
				{
					//alert($(this).height());
					return  $(this).height();
				}).get();
				var maxHeight = Math.max.apply(Math, heightArray);
				//alert("----------" + maxHeight);
				$(this).find(">div .inner").height(maxHeight);
			}
		});

	}
	
}
 
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function bootstrapGetScreenSize() 
{
	var envs = ['xs', 'sm', 'md', 'lg'];

	$el = $('<div>');
	$el.appendTo($('body'));

	for (var i = envs.length - 1; i >= 0; i--) {
		var env = envs[i];

		$el.addClass('hidden-'+env);
		if ($el.is(':hidden')) {
			$el.remove();
			return env
		}
	};
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function bootstrapIsApply(target) 
{
	var bReturnValue = true;
	if(target != undefined)
	{
		var sizes = ['xs', 'sm', 'md', 'lg'];
		var sizesCompare = {'xs':0, 'sm':1, 'md':2, 'lg':3};
		var screenSize = bootstrapGetScreenSize() 
		var itemSize = '';
		for(var i = 0; i < sizes.length; i++)
		{
			
			var size = sizes[i];
			if ($(target).attr('class').indexOf('col-' + size +'-') > -1) {
				// do something
				itemSize = size;
			}
		}
		
		if(itemSize != '')
		{
			if(sizesCompare[screenSize] < sizesCompare[itemSize])
			{
				bReturnValue = false;
			}
		}
	}
	return bReturnValue;
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
jQuery.fn.preventDoubleAction = function(actionName) {

    var last_clicked, time_since_clicked;

    jQuery(this).bind(actionName, function(event) {

        if(last_clicked) {
            time_since_clicked = jQuery.now() - last_clicked;
        }
			        last_clicked = jQuery.now();

        if(time_since_clicked < 500) {
            // Blocking form submit because it was too soon after the last submit.
            event.preventDefault();
        }

        return true;
    });
};

/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initTooltip() {
    if ($(".tool_tip")[0] != null) {
         
        $(".tool_tip").each(function () {
			
            $(this).tooltip({
				content: function () {
				  return $(this).prop('title');
			  },
                position: {
                    my: "center bottom-20",
                    at: "center top",
                    using: function (position, feedback) {
                        $(this).css(position);
                        $("<div>")
                          .addClass("arrow")
                          .addClass(feedback.vertical)
                          .addClass(feedback.horizontal)
                          .appendTo(this);
                    }
                }
            });
        });
    }

}

/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function disableRightClick()
{
	if($("#inAdminPanel")[0] == null)
	{
		 $(document).bind("contextmenu",function(e){
			return false;
		});
	}
}
 /********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initScrollToTop()
{
	if($("#inAdminPanel")[0] == null)
	{
		$().UItoTop({ easingType: 'easeOutQuart' });
	}
}
 /********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initADGallery()
{
	if($(".ad-gallery")[0] != null)
	{
		 var galleries = $('.ad-gallery').adGallery({'effect':'fade'});
		 
		  $(document).on("click", ".ad-image", function() {
			  $.fancybox.open({
				href : $(this).find("img").attr("src"),
				closeBtn: false,
				closeClick : true,
				openEffect : 'elastic',
				openSpeed  : 150,
				closeEffect : 'elastic',
				closeSpeed  : 150,
				helpers : {
				  overlay : null
				}
			  });
			});
    
	}
}
 /********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initHomeSlideShow()
{
	if($("#home_page_carousel")[0] != null)
	{
		jQuery('#home_page_carousel').jcarousel({
			auto: 2,
			scroll: 1,
			wrap: 'circular',
			initCallback: home_page_carousel_initCallback
		});
	}
}
function home_page_carousel_initCallback(carousel)
{
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
    });

    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto();
    });
};
 /********************************************************************************************************************************
* 
********************************************************************************************************************************/

function initSubPageSlideShow()
{
	if($("#sub_page_carousel")[0] != null)
	{
		 jQuery('#sub_page_carousel').jcarousel({
			auto: 2, //Second to scroll
			scroll: 1,
			wrap: 'circular',
			initCallback: sub_page_carousel_initCallback
		});
	}
}

function sub_page_carousel_initCallback(carousel)
{
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
    });

    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto();
    });
};
  

/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initSearchBox()
{
	$(".search_box .search_text_box").bind("click", function()
	{
		var value = this.value;
		$(".search_box .search_text").hide();
	});
}

/********************************************************************************************************************************
* 
********************************************************************************************************************************/
var currentFileUploadText = "Select File";
function initFileUpload()
{
	$(".file_upload").each(function() 
	{
		var btnUpload=$(this);
		btnUpload.show();
		var uploadControlName = btnUpload.attr("id");
		var fileNameControl = uploadControlName.replace(/_AjaxControl/gi,"");
		 
		
		var singleButtonText = currentFileUploadText;
		var isMultiple = false;
		if($("#" + uploadControlName + " .button_text")[0] != null)
		{
			$("#" + uploadControlName + " .button_text").show();
			singleButtonText = $("#" + uploadControlName + " .button_text").html();
			var multipleAttribute = $("#" + uploadControlName + " .button_text").attr("rel");
			var multipleText = $("#" + uploadControlName + " .button_text").attr("title");
			 
			if(multipleAttribute != null) if(multipleAttribute == "multiple")
			{
				isMultiple = true;
			}
			if(multipleText != null) 
			{
				btnUpload.parent().parent().parent().parent().parent().append("<div class=\"message\">" + multipleText + "</div>")
			}
			currentFileUploadText = singleButtonText;
		}
		var actionUrl = window.location.toString();
		 
		actionUrl = appendUrl(actionUrl, "uploadaction=upload" + "&controlid=" + fileNameControl);
		 
		
		var allowExtension = "";
		$(btnUpload).parent().find("input[type='hidden']").each(function()
		{
			
			if($(this).attr("id").indexOf("." + uploadControlName) >= 0)
			{
				allowExtension = $(this).val();
				allowExtension = allowExtension.replace(/ /gi,"");
			}
		});
		var arrAllowExtension = new Array();
		if(allowExtension != "")
		{
			arrAllowExtension = allowExtension.split(",");
		}
		var uploader = new qq.FileUploader({
			// pass the dom node (ex. $(selector)[0] for jQuery users)
			element: this,
			// path to server-side upload script
			//action: '../client/do-nothing.htm',
			//action: 'my-test.php?uploadaction=upload',
			action: actionUrl,
			multiple: isMultiple,
			buttonText: singleButtonText,
			dropFileHereText: "Drop files here to upload",
			
			params: {},
	
			// validation    
			// ex. ['jpg', 'jpeg', 'png', 'gif'] or []
			allowedExtensions: arrAllowExtension,        
			// each file size limit in bytes
			// this option isn't supported in all browsers
			sizeLimit: 0, // max size   
			minSizeLimit: 0, // min size
			
			// set to true to output server response to console
			debug: false,
			
			// events         
			// you can return false to abort submit
			onSubmit: function(id, fileName){
				$("#" + fileNameControl + "_response").html("");
				},
			onProgress: function(id, fileName, loaded, total){},
			onComplete: function(id, fileName, responseJSON)
						{
							if(responseJSON != null)
							{
								 
								$.each(responseJSON, function(entryIndex, entry) 
								{
									//alert(entryIndex + " " + entry);
									if(entryIndex == 'html_response')
									{
										entry = base64_decode(entry);
										//alert(entry);
										var htmlControl = entry;
										if(isMultiple)
										{
											htmlControl = $("#" + fileNameControl + "_response").html() + entry;
										}
										$("#" + fileNameControl + "_response").html(htmlControl);
										 
										//alert("#" + fileNameControl + "_response" + "|" + entry);
									}
									if(entryIndex == 'filename')
									{
										var fileNameValue = entry;
										if(isMultiple)
										{
											if( $("#" + fileNameControl).val() != "")
											{
												fileNameValue = $("#" + fileNameControl).val() + "|" + entry;
											}
											
										}
										$("#" + fileNameControl).val(fileNameValue);
										//alert($("input[name='" + fileNameControl + "']").val());
										//alert("#" + fileNameControl + "_response" + "|" + entry);
									}
									
									 
								});
							}
							if(typeof uploadDoneTrigger == 'function')  //check is there a trigger fucntion when upload done
							{
								 
								//alert(document.getElementById(fileNameControl).value);
								uploadDoneTrigger(fileNameControl, responseJSON);
								
								 
							}
						},
			onCancel: function(id, fileName){},
			
			messages: {
				// error messages, see qq.FileUploaderBasic for content  
				        
			},
			showMessage: function(message){ alert(message); }
	
		});
		
		 
	});
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initUI()
{
	try
	{
		if($("#PublishedDate")[0] != null) 
		{
			$("#PublishedDate").datepicker();
		}
		if($("#ExpireDate")[0] != null) 
		{
			$("#ExpireDate").datepicker();
		}
		if($(".datepicker")[0] != null) 
		{
			$(".datepicker").datepicker();
			
		}
		if($(".js_show")[0] != null) 
		{
			$(".js_show").show(0);
			
		}
		if($(".js_hide")[0] != null) 
		{
			$(".js_hide").hide(0);
			
		}
		if($(".colorpicker")[0] != null) 
		{
			$('.colorpicker').colorpicker({
					parts: 'full',
					showOn: 'both',
					buttonColorize: true,
					showNoneButton: true,
					alpha: true
				});
			
		}
		
		
		
		
		//$('#PublishedDate').datepicker('option', {dateFormat: 'dd/mm/yy'}); for formating
		
	}
	catch(e){}
	
	if(typeof initInternalUI == 'function')  //check is there a trigger fucntion when upload done
	{
		initInternalUI();
	}
	displayDialog();
	initBootstrapPopover();
	initStarVote();
	
}


/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initJQZoom()
{
	if($('.jqzoom')[0] != null)
		{
			$('.jqzoom').jqzoom({
				zoomType: 'standard',  
				lens:true,  
				preloadImages: true,  
				alwaysOn:false,  
				zoomWidth: 400,  
				zoomHeight: 250,  
				xOffset:10,  
				yOffset:0,  
				position:'right'  

			});
		}
}/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initFlippingTabs()
{
	if($("#flip-container").length > 0)
	{
		var maxHeight = 0;
		
		$("#flip-container div").each(function()
		{
			var containerDiv=$(this);
			if(maxHeight < containerDiv.height())
			{
				maxHeight = containerDiv.height();
			}
			 
		
		});
		$("#flip-container").height(maxHeight); //Set the height
		
		$('#flip-container').quickFlip();
		
		$('#flip-navigation li a').each(function(){
			$(this).click(function(){
				$('#flip-navigation li').each(function(){
					$(this).removeClass('selected');
				});
				$(this).parent().addClass('selected');
				var flipid=$(this).attr('id').substr(4);
				$('#flip-container').quickFlipper({ }, flipid, 1);
				
				return false;
			});
		});
	}
}

/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initSlideShow()
{
	
	if($(".slideshow")[0] != null)
	{
		$(".slideshow").each(function() 
		{
			//alert($(this).html())
			//var id = $(this).attr("id");
			if($(this).find("div").length > 1)
			{
				$(this).find("div:first").addClass('active');
				
				//setInterval(slideChangeImage, 5000);
				var target = this
				setInterval( function() { slideChangeImage(target); }, 5000 );
			}
		});
	}
	
	 
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function styledCombobox()
{
	
	if($(".styled_combobox select")[0] != null)
	{
		 $(".styled_combobox select").selectbox();
	}
	
	 
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/

function slideChangeImage(target)
{
	
	var active = $(target).find("div.active");
	
	if(active.length == 0)
	{
		active = $(target).find("div:last");
	}
	//alert(active.html());
	var next = active.next().length ? active.next() : $(target).find("div:first");
	active.addClass('lastactive');
	next.css({opacity:0.0})
			.addClass('active')
			.animate({opacity:1.0}, 1500, function()
			{
				active.removeClass("active lastactive");	
			});
	//alert(next.html())
	 
}

/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function initStarVote()
{
	//Hide the radio button
	$("#vote_section input[type=radio]").hide();
	$("#vote_section .vote_score").mouseover(function() {
		var currentSelect = parseInt($(this).attr("alt"));
		for(i = 1; i <=currentSelect;i++)
		{
			var currentVoteImg = $("#vote_section img[alt='" + i + "']").attr("src");
			var newVoteImg = currentVoteImg.substring(0,currentVoteImg.lastIndexOf("/")) + "/1.gif";
			$("#vote_section img[alt='" + i + "']").attr("src", newVoteImg);
		}
	 // alert($(this).attr("alt"));
	});
	
	$("#vote_section .vote_score").mouseout(function() {
		//reset
		var clickIndex = 0;
		for(i = 1; i <=5;i++)
		{
			if($("#vote_section img[alt='" + i + "']").attr("alreadyclick") == "1")
			{
				 clickIndex = parseInt($("#vote_section img[alt='" + i + "']").attr("alt"));
				 //alert(clickIndex);
			}
		}
		for(i = clickIndex + 1; i <=5;i++)
		{
			var currentVoteImg = $("#vote_section img[alt='" + i + "']").attr("src");
			var newVoteImg = currentVoteImg.substring(0,currentVoteImg.lastIndexOf("/")) + "/0_0.gif";
			
			$("#vote_section img[alt='" + i + "']").attr("src", newVoteImg);
		}
	 // alert($(this).attr("alt"));
	});
	$("#vote_section .vote_score").click(function() {
		for(i = 1; i <=5;i++)
		{
			$("#vote_section img[alt='" + i + "']").attr("alreadyclick","0");
			
			var currentVoteImg = $("#vote_section img[alt='" + i + "']").attr("src");
			var newVoteImg = currentVoteImg.substring(0,currentVoteImg.lastIndexOf("/")) + "/0_0.gif";
			
			$("#vote_section img[alt='" + i + "']").attr("src",newVoteImg);
		}
		 
		var currentSelect = parseInt($(this).attr("alt"));
		for(i = 1; i <=currentSelect;i++)
		{
			var currentVoteImgEx = $("#vote_section img[alt='" + i + "']").attr("src");
			var newVoteImgEx = currentVoteImg.substring(0,currentVoteImg.lastIndexOf("/")) + "/1.gif";
			
			$("#vote_section img[alt='" + i + "']").attr("src", newVoteImgEx);
		}
		$(this).attr("alreadyclick","1");
		$("#vote_section #score").val(currentSelect);
	});
	
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function displayDialog()
{
	
	$("*[data-bs='show-dialog']").click
	(
		function()
		{
			var actionUrl = $(this).attr("href");
			var dataActionUrl = $(this).attr("data-href");
			if(jQuery.trim(dataActionUrl) != "")
			{
				actionUrl = dataActionUrl;
			}
			
			actionUrl = appendUrl(actionUrl, 'from=ajax');
			var title = $(this).attr("title");
			var id = $(this).attr("id");
			
			var modalDialogID = id + "_dialog";
			var modalDialogContentID = id + "_dialog_content";
			if($("#" + modalDialogID).length <= 0)
			{
				//Build modal div
				var modalDialogHtml = '';
				modalDialogHtml = modalDialogHtml + '<div class="modal fade" id="' + modalDialogID + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
				modalDialogHtml = modalDialogHtml + '    <div class="modal-dialog">';
				modalDialogHtml = modalDialogHtml + '        <div class="modal-content" id="' + modalDialogContentID + '" >';
				modalDialogHtml = modalDialogHtml + '        </div>';
				modalDialogHtml = modalDialogHtml + '    </div>';
				modalDialogHtml = modalDialogHtml + '</div>';
				
				$( modalDialogHtml ).insertAfter( "#" + id ); //Insert dialog after href
			}
			//Load href data
			//alert(actionUrl);
			$.ajax(
			{
				type: "GET",
				url: actionUrl,
				timeout: 150000,
				beforeSend: function(x) 
				{
		
		
				},
				dataType: "html",
				success: function(data)
				{
					var modalDialogContentHtml = '';
					modalDialogContentHtml = modalDialogContentHtml + '<div class="modal-header">';
					modalDialogContentHtml = modalDialogContentHtml + '  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
					modalDialogContentHtml = modalDialogContentHtml + '  <h4 class="modal-title">' + title + '</h4>';
					modalDialogContentHtml = modalDialogContentHtml + '</div>';
					modalDialogContentHtml = modalDialogContentHtml + '<div class="modal-body">';
					modalDialogContentHtml = modalDialogContentHtml + '  <div class="te">' + data + '</div>';
					modalDialogContentHtml = modalDialogContentHtml + '</div>';
					/*
					modalDialogContentHtml = modalDialogContentHtml + '<div class="modal-footer">';
					modalDialogContentHtml = modalDialogContentHtml + '  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
					modalDialogContentHtml = modalDialogContentHtml + '  <button type="button" class="btn btn-primary">Save changes</button>';
					modalDialogContentHtml = modalDialogContentHtml + '</div>';
					*/

					$("#" + modalDialogContentID).html(modalDialogContentHtml);
					$('#' + modalDialogID).modal({
					  keyboard: false
					})
				} 
			});
			return false;
			 
		}
	);

	
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/


function initBootstrapPopover()
{
	 
	$("*[data-bs='show-popover']").click
	(
		function()
		{
			var actionUrl = $(this).attr("data-href")? $(this).attr("data-href") : $(this).attr("href");
			actionUrl = appendUrl(actionUrl, 'from=ajax');
			var title = $(this).attr("data-title");
			var id = $(this).attr("id");
			var placement = $(this).attr("data-placement") ? $(this).attr("data-placement") : 'right' ;
			var titleHtml = '<span>' + title + '</span>'+
							'<button type="button" id="close" class="close" onclick="$(&quot;#' + id + '&quot;).popover(&quot;hide&quot;);">&times;</button>'
		 
			$.ajax(
			{
				
				type: "GET",
				url: actionUrl,
				timeout: 150000,
				beforeSend: function(x) 
				{
								
				},
				dataType: "html",
				success: function(data)
				{
					//alert(id + placement + data);
					$('#' + id).popover({
						trigger: 'focus',
						html: true, 
						title : titleHtml,
						content:data, 
						placement: placement
					});
					
					$('#' + id).popover('toggle')

				} 
			});
			 
			return false;
			 
		}
		
	);
	
}

/********************************************************************************************************************************
* 
********************************************************************************************************************************/

function displayObject(checkbox, className)
{
	if(checkbox.checked)
	{
		$("." + className).show(300);
	}
	else
	{
		$("." + className).hide(300);
	}
	return false;
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/

function toggleObject(objectName, isShow, appendHide, appendShow)
{
	if(isShow)
	{
		$("#" + objectName).show(300);
		if((appendHide != null) && (appendHide != ""))
		{
			$("#" + objectName + appendHide).hide();
		}
		if((appendShow != null) && (appendShow != ""))
		{
			$("#" + objectName + appendShow).show();
		}
	}
	else
	{
		$("#" + objectName).hide(300);
	}
	return false;
}

/********************************************************************************************************************************
* 
********************************************************************************************************************************/

function toggleObjectEx(showObject, hideObject)
{
	$("#" + showObject).show(300);
	$("#" + hideObject).hide(300);
	return false;
}

/********************************************************************************************************************************
* 
********************************************************************************************************************************/

function appendObject(aName, objectName, isShow)
{
	if(isShow)
	{	
		$("#" + aName).after($("#" + objectName));
		$("#" + objectName).show(300);
	}
	else
	{
		$("#" + objectName).hide(300);
	}
	return false;
}



/********************************************************************************************************************************
* 
********************************************************************************************************************************/

function toggleCss()
{
	$(".toggle").each(function() 
	{
		var id = $(this).attr("id");
		toggleMenu(id)
		 
	});
	return false;
}



/********************************************************************************************************************************
* 
********************************************************************************************************************************/

function toggleMenu(objectName)
{
	$("#" + objectName + "_detail").toggle(300);
	$("#" + objectName).clicktoggle(
	function()
	{
		$("#" + objectName + "_detail").show(300);
		$("#" + objectName + " a").css('background','url(/includes/images/left_arrow.gif) no-repeat right');
	}, 
	function()
	{	
		$("#" + objectName + "_detail").hide(300);
		$("#" + objectName + " a").css('background','url(/includes/images/down_arrow.gif) no-repeat right');
	});
	return false;
}

/********************************************************************************************************************************
* Function Name: ajaxSubmit
* Description: Perform a submit form using ajax
********************************************************************************************************************************/
function ajaxSubmitXML(formName, buttonName, validationGroup, waitingMessage, websiteUrl)
{
	
	var validate = validateForm(validationGroup);
	//alert(buttonName);
	var continueAfterError = false;
	if(validate)
	{
		//Do ajax submit
		var form = $('#' + formName);
		var actionUrl = form.attr("action");
		
		var postData = form.serialize();
		postData = postData + "&" + buttonName + "=submit";
		actionUrl = appendUrl(actionUrl, 'from=ajaxxml');
		
		
		//prompt('aaa',actionUrl + "\r\n" + form.serialize());
		$.ajax(
		{
			type: "POST",
			url: actionUrl,
			data: postData,
			timeout: 150000,
			beforeSend: function(x) 
			{
				var waitingIdicator = "<img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage;
				$("#PageMessage").html(waitingIdicator);
			},
			dataType: "xml",
			success: function(data)
			{
				//alert(data);
				$('Field',data).each(function(i)
				{
					var name = $(this).attr("name");
					var value = $(this).text();
					//alert(name + "-----" + value);
					if(($('#' + name).is('input')) || ($('#' + name).is('textarea')) || ($('#' + name).is('select')) || ($('#' + name).is('input')))
					{
						$('#' + name).val(value.toString());
					}
					else
					{
						
						$('#' + name).html(value);
					}
					$('#' + name + "_View").html(value);
				});
				if(typeof submitFormDoneTrigger == 'function')  //check is there a trigger fucntion when upload done
				{
					
					submitFormDoneTrigger();
				}
				//Remove the waiting Idicator
				//$("#PageMessage").html("");
				loadPageAfterSubmit();
				//alert(data.PageMessage);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
		});
		
	}
	return continueAfterError;
}

/********************************************************************************************************************************
* Function Name: ajaxSubmit
* Description: Perform a submit form using ajax
********************************************************************************************************************************/
function ajaxSubmitJSON(formName, buttonName, validationGroup, waitingMessage, websiteUrl)
{
	var validate = validateForm(validationGroup);
	var continueAfterError = false;
	if(validate)
	{
		//Do ajax submit
		var form = $('#' + formName);
		var actionUrl = form.attr("action");
		//alert(form.serialize());
		var postData = form.serialize();
		postData = postData + "&" + buttonName + "=submit"
		actionUrl = appendUrl(actionUrl, 'from=ajax');
		
		$.ajax(
		{
			type: "POST",
			url: actionUrl,
			data: postData,
			timeout: 150000,
			beforeSend: function(x) 
			{
				var waitingIdicator = "<img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage;
				$("#PageMessage").html(waitingIdicator);
				if(x && x.overrideMimeType) 
				{
					x.overrideMimeType("application/j-son;charset=UTF-8");
				}
			},
			dataType: "json",
			success: function(data)
			{
				
				//Remove the waiting Idicator
				$("#PageMessage").html("");
				$.each(data, function(entryIndex, entry) 
				{
					//alert('#' + entryIndex + "|" + ($('#' + entryIndex).is('select')) + "|" + entry);
					if(($('#' + entryIndex).is('input')) || ($('#' + entryIndex).is('textarea')) || ($('#' + entryIndex).is('select')) || ($('#' + entryIndex).is('input')))
					{
						$('#' + entryIndex).val(entry.toString());
					}
					else
					{
						
						$('#' + entryIndex).html(entry);
					}
					$('#' + entryIndex + "_View").html(entry);
				});
				//alert(data.PageMessage);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
		});
		
	}
	return continueAfterError;
}

/********************************************************************************************************************************
* Function Name: ajaxSubmit
* Description: Perform a submit form using ajax
********************************************************************************************************************************/

function ajaxSubmitDiv(divName, buttonName, validationGroup, responseObjectName, waitingObjectName, displayRow, actionUrl, waitingMessage, websiteUrl, displayErrorType)
{
	 
	var continueAfterError = false;
	if(displayErrorType == null)
	{
		displayErrorType = 1;
	}
	 
	var validate = validateForm(validationGroup, displayErrorType);
	if(validate)
	{
		//Do ajax submit
		if(responseObjectName == "")
		{
			responseObjectName = "l_content";
		}
		if(waitingObjectName == "")
		{
			waitingObjectName = "PageMessage";
		}
		var appendDisplayRow = "";
		if(displayRow != null)
		{
			if(displayRow > 0)
			{
				appendDisplayRow = "&displayrow=" + displayRow;
			}
		}
		var postData = $("#" + divName + " *").serialize();
		postData = postData + "&" + buttonName + "=submit"
		actionUrl = actionUrl + appendDisplayRow + "&from=ajax";
		
		$.ajax(
		{
			type: "POST",
			url: actionUrl,
			data: postData,
			timeout: 150000,
			beforeSend: function(x) 
			{
				var waitingIdicator = "<div class=\"waitingmessage\" name=\"waitingMessage\"><img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage + "</div>";
				$("#" + waitingObjectName).prepend(waitingIdicator);
			},
			dataType: "html",
			success: function(data)
			{
				//return false;
				//Remove the waiting Idicator
				$("#" + waitingObjectName).html("");
				$("#" + responseObjectName).html(data);
				//alert(responseObjectName + "|" + data);
				loadPageAfterSubmit();
				//alert(data.PageMessage);
				if(typeof internalLoadPage == 'function')  //check is there a trigger fucntion when upload done
				{
					internalLoadPage();
				}
				
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
		});
		
	}
	return continueAfterError;
}
/********************************************************************************************************************************
* Function Name: ajaxSubmit
* Description: Perform a submit form using ajax
********************************************************************************************************************************/

function ajaxSubmitDivNoAjax(divName, buttonName, validationGroup, responseObjectName, waitingObjectName, displayRow, actionUrl, waitingMessage, websiteUrl, displayErrorType)
{
	var continueAfterError = false;
	if(displayErrorType == null)
	{
		displayErrorType = 1;
	}
	var validate = validateForm(validationGroup, displayErrorType);
	
	if(validate)
	{
		
		
		return true;
	}
	return false;
}
/********************************************************************************************************************************
* Function Name: ajaxSubmit
* Description: Perform a submit form using ajax
********************************************************************************************************************************/
		    
function ajaxSubmitDivXML(divName, buttonName, validationGroup, actionUrl, isResetForm, waitingMessage, websiteUrl, displayType, displayErrorType)
{
	var continueAfterError = false;
	if(displayErrorType == null)
	{
		displayErrorType = 1;
	}
	var validate = validateForm(validationGroup, displayErrorType);
	
	if(displayType == null)
	{
		displayType = 1;
	}
	if(validate)
	{
		//Do ajax submit
		var postData = $("#" + divName + " *").serialize();
		//alert(actionUrl);
		//alert(postData);
		postData = postData + "&" + buttonName + "=submit";
		actionUrl = appendUrl(actionUrl, 'from=ajaxxml');
		
		$.ajax(
		{
			type: "POST",
			async: false,
			url: actionUrl,
			data: postData,
			timeout: 150000,
			beforeSend: function(x) 
			{
				var waitingIdicator = "<div class=\"waitingmessage\" name=\"waitingMessage\"><img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage + "</div>";
				switch(displayType)
				{
					case 1:
						$("#" + divName).prepend(waitingIdicator);
						break;
					case 2:
						$("#" + divName).html(waitingIdicator);
						break;
				}
			},
			dataType: "xml",
			success: function(data)
			{
				//$("#" + waitingObjectName).html("");
				$("#" + divName).parent().find('.waitingmessage').remove();
				$('Field',data).each(function(i)
				{
					var name = $(this).attr("name");
					var value = $(this).text();
					//alert(name + "-----" + value);
					if(($(divName + ' ' + '#' + name).is('input')) || ($('#' + name).is('textarea')) || ($('#' + name).is('select')) || ($('#' + name).is('input')))
					{
						$('#' + name).val(value.toString());
					}
					else
					{
						
						$('#' + name).html(value);
					}
					if(isResetForm)
					{
						$("#" + divName).find("input[type=text]").each(function()
						{
							$(this).val("");
						});
					}
				});
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
		});
		
	}
	//alert(continueAfterError);
	return continueAfterError;
}
/********************************************************************************************************************************
* Function Name: ajaxDeleteItem
* Description: delete 1 item
********************************************************************************************************************************/
function ajaxActionItem(confirmMessage, waitingMessage, strDeleteUrl, websiteUrl)
{
	var continueAfterError = false;
	if(confirm(confirmMessage))	
	{
		var actionUrl = strDeleteUrl;
		actionUrl = appendUrl(actionUrl, 'from=ajax');
		actionUrl = actionUrl + "&confirm=yes";
		//alert(actionUrl);
		$.ajax(
		{
			type: "GET",
			url: actionUrl,
			timeout: 150000,
			beforeSend: function(x) 
			{
				var waitingIdicator = "<img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage;
				$("#PageMessage").html(waitingIdicator);
			},
			dataType: "html",
			success: function(data)
			{
				//Remove the waiting Idicator
				$("#PageMessage").html("");
				
				$("#l_content").html(data);
				
				//alert(data.PageMessage);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
		});
	}
	return continueAfterError;
}
/********************************************************************************************************************************
* Function Name: ajaxLink
* Description: 
********************************************************************************************************************************/
function ajaxView(containerObject, strUrl, waitingMessage, websiteUrl, isDisplayCancel, cancelTitle)
{
	var continueAfterError = false;
	var actionUrl = strUrl;
	actionUrl = appendUrl(actionUrl, 'from=ajax');
	//alert(strUrl);
	
	$.ajax(
	{
		type: "GET",
		url: actionUrl,
		timeout: 150000,
		beforeSend: function(x) 
		{
			var waitingIdicator = "<img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage;
			$("#" + containerObject).html(waitingIdicator);
		},
		dataType: "html",
		success: function(data)
		{
			$("#" + containerObject).hide();
			$("#" + containerObject).show(300);
			//Remove the waiting Idicator
			if(isDisplayCancel)
			{
				data = data + "<div><input type=\"button\" value=\"" + cancelTitle + "\" onclick=\"toggleObject('" + containerObject + "', false);\" /><div>";
			}
			$("#" + containerObject).html(data);
			loadPageAfterSubmit();
			//alert(data.PageMessage);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
	});
	return continueAfterError;
}
/********************************************************************************************************************************
* Function Name: ajaxLink
* Description: 
********************************************************************************************************************************/
function ajaxGetUrlContent(strUrl)
{
	var strReturnValue = "";
	$.ajax(
	{
		type: "GET",
		url: strUrl,
		async:false,
		timeout: 150000,
		dataType: "html",
		success: function(data)
		{
			strReturnValue = data;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
	});
	return strReturnValue;
}
/********************************************************************************************************************************
* Function Name: ajaxChangeCombo
* Description: 
********************************************************************************************************************************/
function ajaxChangeCombo(target, urlparams, strUrl, waitingMessage, websiteUrl)
{
	return changeCombo(target, urlparams, strUrl);
	 
	strUrl = replaceUrlParam(urlparams, strUrl, target.value);
	ajaxLink(strUrl, waitingMessage, websiteUrl);
}
/********************************************************************************************************************************
* Function Name: ajaxChangeCombo
* Description: 
********************************************************************************************************************************/
function changeCombo(target, urlparams, strUrl)
{
	 
	strUrl = replaceUrlParam(urlparams, strUrl, target.value);
	//alert(strUrl);
	window.location.href = strUrl;
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function replaceUrlParam(urlparams, strUrl, value)
{
	if(urlparams != null)
	{
		var queryType = "?";
		if(strUrl.indexOf("?") >= 0)
		{
			queryType = "&";
		}
		
		$.each(urlparams, function(queryKey, queryValue) 
		{
			if(strUrl.indexOf("?" + queryKey + "=") > 0)
			{
				strUrl = strUrl.replace("?" + queryKey + "=" + queryValue, "?" + queryKey + "=" + value);
			}
			else if(strUrl.indexOf("&" + queryKey + "=") > 0)
			{
			
				strUrl = strUrl.replace("&" + queryKey + "=" + queryValue, "&" + queryKey + "=" + value);
			}
			else
			{
				strUrl = strUrl + queryType + queryKey + "=" + value
			}
		});
	}
	return strUrl;
}

/********************************************************************************************************************************
* Function Name: ajaxChangeCombo
* Description: 
********************************************************************************************************************************/
function ajaxControlAction(target, urlparams, strUrl, waitingMessage, websiteUrl, responseObjectName, waitingObjectName, isHiddenLoading)
{
	 
	strUrl = replaceUrlParam(urlparams, strUrl, target.value);
	ajaxLinkControl(strUrl, waitingMessage, websiteUrl, responseObjectName, waitingObjectName, isHiddenLoading);
}
/********************************************************************************************************************************
* Function Name: ajaxTabLinkControl
* Description: 
********************************************************************************************************************************/
function ajaxTabLinkControl(tabID, target, strUrl, waitingMessage, websiteUrl, responseObjectName, waitingObjectName)
{
	ajaxLinkControl(strUrl, waitingMessage, websiteUrl, responseObjectName, waitingObjectName);
	$("#" + tabID + " li").removeAttr("class");
	$(target).parent().attr("class", "selected");
	return false;
}
/********************************************************************************************************************************
* Function Name: ajaxLink
* Description: 
********************************************************************************************************************************/
function ajaxLinkControl(strUrl, waitingMessage, websiteUrl, responseObjectName, waitingObjectName, isHiddenLoading)
{
	var continueAfterError = false;
	var actionUrl = strUrl;
	
	if(actionUrl.indexOf("?") >= 0)
	{
		actionUrl = actionUrl + "&from=ajaxcontrol";
	}
	else
	{
		actionUrl = actionUrl + "?from=ajaxcontrol";
	}
	 
	//Do ajax submit
	if((responseObjectName == null) || (responseObjectName == ""))
	{
		responseObjectName = "l_content";
	}
	if((waitingObjectName == "") || (waitingObjectName == null))
	{
		waitingObjectName = "PageMessage";
	}
	if(isHiddenLoading == null)
	{
		isHiddenLoading = false;
	}
	
	//alert(actionUrl);
	$.ajax(
	{
		type: "GET",
		url: actionUrl,
		timeout: 150000,
		beforeSend: function(x) 
		{
			if(!isHiddenLoading)
			{
				var waitingIdicator = "<img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage;
				$("#" + waitingObjectName).html(waitingIdicator);
			}
		},
		dataType: "html",
		success: function(data)
		{
			//Remove the waiting Idicator
			$("#" + waitingObjectName).html("");
			//alert("-------" + data);
			$("#" + responseObjectName).html(data);
			loadPageAfterSubmit();
			//alert(data.PageMessage);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
	});
	return continueAfterError;
}

/********************************************************************************************************************************
* Function Name: ajaxLink
* Description: 
********************************************************************************************************************************/
function ajaxLink(strUrl, waitingMessage, websiteUrl, responseObjectName, waitingObjectName)
{
	var continueAfterError = false;
	var actionUrl = strUrl;
	actionUrl = appendUrl(actionUrl, 'from=ajax');
	//Do ajax submit
	if((responseObjectName == null) || (responseObjectName == ""))
	{
		responseObjectName = "l_content";
	}
	if((waitingObjectName == "") || (waitingObjectName == null))
	{
		waitingObjectName = "PageMessage";
	}
	
	$.ajax(
	{
		type: "GET",
		url: actionUrl,
		timeout: 150000,
		beforeSend: function(x) 
		{
			var waitingIdicator = "<img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage;
			$("#" + waitingObjectName).html(waitingIdicator);
		},
		dataType: "html",
		success: function(data)
		{
			//Remove the waiting Idicator
			
			$("#" + waitingObjectName).html("");
			$("#" + responseObjectName).html(data);
			loadPageAfterSubmit();
			//alert(data.PageMessage);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
	});
	return continueAfterError;
}
/********************************************************************************************************************************
* Function Name: ajaxLinkXML
* Description: Perform an ajax link and return as xml format
********************************************************************************************************************************/
function ajaxLinkXML(strUrl, waitingMessage, websiteUrl, confirmMessage, waitingObjectName)
{
	var continueAfterError = false;
	var actionUrl = strUrl;
	actionUrl = appendUrl(actionUrl, 'from=ajaxxml');
	if((waitingObjectName == null) || (waitingObjectName == ""))
	{
		waitingObjectName = "PageMessage";
	}
	var bConfirm = true;
	if(confirmMessage != "")
	{
		bConfirm = confirm(confirmMessage);
	}
	if(bConfirm)
	{
		$.ajax(
		{
			type: "GET",
			url: actionUrl,
			timeout: 150000,
			beforeSend: function(x) 
			{
				var waitingIdicator = "<img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage;
				$("#" + waitingObjectName).html(waitingIdicator);
			},
			dataType: "xml",
			success: function(data)
			{
				$("#" + waitingObjectName).html("");
				$('Field',data).each(function(i)
				{
					var name = $(this).attr("name");
					var value = $(this).text();
					if(($('#' + name).is('input')) || ($('#' + name).is('textarea')) || ($('#' + name).is('select')) || ($('#' + name).is('input')))
					{
						$('#' + name).val(value.toString());
					}
					else
					{
						$('#' + name).html(value);
						$('#' + name + "_View").html(value);
						
					}
				});
				
				//Remove the waiting Idicator
				//$("#PageMessage").html("");
				 
				//alert(data.PageMessage);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
		});
	}
	return continueAfterError;
}

/********************************************************************************************************************************
* Function Name: ajaxActionItemAll
* Description: delete item base on checkbox
********************************************************************************************************************************/
function ajaxActionItemAll(formName,  buttonName, controlName, action, confirmMessage, notSelectMessage, waitingMessage, websiteUrl)
{
	var continueAfterError = false;
	var count = 0;
	$("input[name='id[]']").each(function() 
	{
		if($(this).is(':checked'))
		{
			count++;
		}
	});
	confirmMessage = confirmMessage.replace("{count}", count);
	if(count > 0)
	{
		if(confirm(confirmMessage))	
		{
			var form = $('#' + formName);
			var actionUrl = form.attr("action");
			actionUrl = actionUrl + "&action=" + action;
			actionUrl = appendUrl(actionUrl, 'from=ajax');
			actionUrl = actionUrl + "&confirm=yes";
			 
			var postData = form.serialize();
			postData = postData + "&" + buttonName + "=submit"
			var waitingIdicator = "<img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage;
			$("#PageMessage").html(waitingIdicator);
			$.ajax(
			{
				type: "POST",
				url: actionUrl,
				timeout: 150000,
				beforeSend: function(x) 
				{
					var waitingIdicator = "<img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage;
					$("#PageMessage").html(waitingIdicator);
				},
				data: postData,
				dataType: "html",
				success: function(data)
				{
					//Remove the waiting Idicator
					 
					$("#PageMessage").html("");
					$("#l_content").html(data);
					loadPageAfterSubmit();
					//alert(data.PageMessage);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
			});
		}
	}
	else
	{
		alert(notSelectMessage);
	}
	return continueAfterError;
}
/********************************************************************************************************************************
* Function Name: changeAction
* Description: change action
********************************************************************************************************************************/
function changeAction(target, formName,  arrConfirmMessage, arrNotSelectMessage, arrWaitingMessage, websiteUrl)
{
	var continueAfterError = false;
	var count = 0;
	$("input[name='id[]']").each(function() 
	{
		if($(this).is(':checked'))
		{
			count++;
		}
	});
	var selectedIndex = target.selectedIndex;
	confirmMessage = arrConfirmMessage[selectedIndex];
	notSelectMessage = arrNotSelectMessage[selectedIndex];
	waitingMessage = arrNotSelectMessage[arrWaitingMessage];
	
	confirmMessage = confirmMessage.replace("{count}", count);
	var buttonName = "btn" + target.value;
	var action = target.value.toLowerCase();
	if(count > 0)
	{
		var bIsConfirm = true;
		if(confirmMessage != "")
		{
			bIsConfirm = confirm(confirmMessage);
		}
		if(bIsConfirm)	
		{
			switch(action)
			{
				case "":
					$("input[name='id[]']").each(function() 
					{
						if($(this).is(':checked'))
						{
							toggleObject('quickEdit_' + $(this).attr("value"), false, "", " table tfoot");
						}
					});
					$('#btnSaveAll').hide();
					 
					break;
				case "quickedit":
					$("input[name='id[]']").each(function() 
					{
						if($(this).is(':checked'))
						{
							toggleObject('quickEdit_' + $(this).attr("value"), true, " table tfoot");
						}
					});
					 $('#btnSaveAll').show();
					break;
				default:
						var form = $('#' + formName);
						var actionUrl = form.attr("action");
						actionUrl = actionUrl + "&action=" + action;
						actionUrl = appendUrl(actionUrl, 'from=ajax');
						actionUrl = actionUrl + "&confirm=yes";
						var postData = form.serialize();
						postData = postData + "&" + buttonName + "=submit"
						var waitingIdicator = "<img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage;
						$("#PageMessage").html(waitingIdicator);
						$.ajax(
						{
							type: "POST",
							url: actionUrl,
							timeout: 150000,
							beforeSend: function(x) 
							{
								var waitingIdicator = "<img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage;
								$("#PageMessage").html(waitingIdicator);
							},
							data: postData,
							dataType: "html",
							success: function(data)
							{
								//Remove the waiting Idicator
								$("#PageMessage").html("");
								$("#l_content").html(data);
								loadPageAfterSubmit();
								//alert(data.PageMessage);
							},
							error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
						});
					break;
			}

		}
		
	}
	else
	{
		alert(notSelectMessage);
	}
	target.selectedIndex = 0;
	return continueAfterError;
}
/********************************************************************************************************************************
* Function Name: ajaxSubmit
* Description: perform submit form using ajax & display html
********************************************************************************************************************************/
function ajaxSubmit(formName,  buttonName, controlName, validationGroup, waitingMessage, completeMessage, websiteUrl, urlparams)
{
	var continueAfterError = false;
	var validate = true;
	if(validationGroup != '')
	{
		validate = validateForm(validationGroup);
	}
	if(validate)
	{
		var form = $('#' + formName);
		var actionUrl = form.attr("action");
		actionUrl = appendUrl(actionUrl, 'from=ajax');
		
		actionUrl = addToUrl(actionUrl, urlparams);
		var postData = form.serialize();
		postData = postData + "&" + buttonName + "=submit"
		
		$.ajax(
		{
			type: "POST",
			url: actionUrl,
			timeout: 150000,
			beforeSend: function(x) 
			{
				var waitingIdicator = "<img src=\"" + websiteUrl + "includes/images/ajax-loader.gif\" align=\"left\" hspace=\"6\" />" + waitingMessage;
				$("#PageMessage").html(waitingIdicator);
			},
			data: postData,
			dataType: "html",
			success: function(data)
			{
				//Remove the waiting Idicator
				$("#PageMessage").html("<div class=\"alert alert-success\">" + completeMessage + "</div>");
				$("#l_content").html(data);
				loadPageAfterSubmit();
				//alert(data.PageMessage);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){continueAfterError = displayError(XMLHttpRequest, textStatus, errorThrown);} 
		});
	}
	return continueAfterError;
}
/********************************************************************************************************************************
* Function Name: displayError
* Description: handle ajax error
********************************************************************************************************************************/
function displayError(XMLHttpRequest, textStatus, errorThrown) 
{
	try 
	{
		
		//alert(XMLHttpRequest + "-----" + errorThrown);
		if (textStatus == "timeout") 
		{
		}
		else
		{
			
		}
	}
	catch (e) 
	{
	}
	//return confirm("Có lỗi khi thực thi AJAX. Bạn click nút OK để tiếp tục. Error:" + textStatus);
} 
/*
	End of AJAX functions
*/
/********************************************************************************************************************************
* Function Name: toggleValue
********************************************************************************************************************************/
function dumpObject(a)
{
	var acc = []
	$.each(a, function(index, value) {
		acc.push(index + ': ' + value);
	});
	alert(JSON.stringify(acc));
	
}
/********************************************************************************************************************************
* Function Name: redirect
* Description: redirect to an strUrl
********************************************************************************************************************************/

function redirect(strUrl, urlparams)
{
	strUrl = addToUrl(strUrl, urlparams);
	window.location.href = 	strUrl;
	return false;
}
/********************************************************************************************************************************
* Function Name: addToUrl
* Description: add to strUrl with the values from urlparams
********************************************************************************************************************************/


function addToUrl(strUrl, urlparams)
{
	//prepare for url
	if(urlparams != null)
	{
		$.each(urlparams, function(queryKey, queryObjectName) 
		{
			if(queryObjectName.indexOf("|") >= 0)
			{
				var arrQueryObjectName = queryObjectName.split("|");
				for(var i = 0; i < arrQueryObjectName.length;i++)
				{
					if(document.getElementById(arrQueryObjectName[i]) != null)
					{
						var queryValue = $("#" + arrQueryObjectName[i]).val();
						strUrl = strUrl + "&" + queryKey + "=" + queryValue;
						break;
					}
				}
			}
			else
			{
				var queryValue = $("#" + queryObjectName).val();
				strUrl = strUrl + "&" + queryKey + "=" + queryValue;
			}
		});
	}
	return strUrl;
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function displayTab(containerTabID, displayTab, listHideTab, target)
{
	//hide all tab
	
	$("#" + containerTabID + " a").removeAttr("class");
	$(target).attr("class", "selected");


	var arrAllTab = listHideTab.split("|");;
	for(var i = 0; i < arrAllTab.length; i++)
	{
		$("#" + arrAllTab[i]).hide();
	}
	$("#" + displayTab).show(300);
	return false;
}
/********************************************************************************************************************************
* 
********************************************************************************************************************************/
function getListRadioValue(radioName, defaultValue)
{
	var value = defaultValue;
	$("input[name='" + radioName + "']").each(function() 
	{
		if($(this).is(':checked'))
		{
			value = $(this).val();
		}
	});
	return value;
}
/********************************************************************************************************************************
* Function Name: gotoNexField
* Description: go to next field when the current field is enough length
********************************************************************************************************************************/
function gotoNexField(target, nextFieldName, maxlength)
{
	var str = target.value;
	str = jQuery.trim(str);
	if(str.length >= maxlength)
	{
		document.getElementById(nextFieldName).focus();
	}
}
/********************************************************************************************************************************
* Function Name: emptyObject
* Description: empty object content
********************************************************************************************************************************/

function emptyObject(objectName)
{
	$("#" + objectName).html("");;
}
/********************************************************************************************************************************
* Function Name: open Window
* Description: open new window
********************************************************************************************************************************/

function openNewWindow(strUrl, iWidth, iHeight, windowTitle)
{
	var width=iWidth-10;
	var height=iHeight-10;
	if((windowTitle == null) || (windowTitle == ""))
	{
		windowTitle = "LF";
	}
	var LeftPosition = (screen.width) ? (screen.width-width)/2 : 0;
	var TopPosition = (screen.height) ? (screen.height-height)/2 : 0;
	
	if(iHeight<screen.height)
	{
		window.open(strUrl,windowTitle,'top='+TopPosition+',left='+LeftPosition+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width='+width+',height='+height+'').focus();
	}
	else
	{
		window.open(strUrl,windowTitle,'top='+TopPosition+',left='+LeftPosition+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width='+width+',height='+height+'').focus();
	}
}



 
/********************************************************************************************************************************
*
********************************************************************************************************************************/
function appendUrl(strUrl, queryString)
{
	if(queryString != "")
	{
		if(strUrl.indexOf("?") >= 0)
		{
			strUrl = strUrl + "&" + queryString;
		}
		else
		{
			strUrl = strUrl + "?" + queryString;
		}
	}
	return strUrl;
}
  


/********************************************************************************************************************************
* Function Name: closedivWindow
* Description: close the current chat window 
********************************************************************************************************************************/
function closeDivWindow(divID)
{
		if(divID == null)
		{
			divID="divWindow";
		}
		//$("#" + divID).animate({top:"0px"}, 1000);
		$("#" + divID).hide(500, function()
			{
				$("#" + divID).show().remove();
			}
		);
		

}
/********************************************************************************************************************************
* Function Name: closedivWindow
* Description: close the current chat window 
********************************************************************************************************************************/
function doSearchEx(strUrl, fieldName)
{
	var fieldValue = document.getElementById(fieldName).value;
	strUrl = strUrl + "&" + fieldName + "=" + escape(fieldValue);
	window.location.href=strUrl;
	return false;
}

/********************************************************************************************************************************
* Function Name: formatNumber
* Description: format the number using US formated
********************************************************************************************************************************/
function formatNumber(num)
{
	if(!isNaN(num))
	{
		//Round the number
		num = Math.round(num*100)/100;
		var strReturnValue = formatNumberFull(num,2,true,false,true);
		var iStart = strReturnValue.indexOf(".");
		var strTempDecimal = strReturnValue.substring(iStart,strReturnValue.length);
		if(strTempDecimal.length == 2)
		{
		    strReturnValue = strReturnValue + "0";
		}
		return strReturnValue;
	}
	else
	{
		return "";
	}
}
/********************************************************************************************************************************
* Function Name: view More
* Description: view more click on menu
********************************************************************************************************************************/
function viewMore(menuID, viewMoreID, viewMoreText, viewLessText)
{
	$("#" + menuID + " " + ".menu_hide").toggle(300);
	if($( "#" + viewMoreID).text() == viewLessText)
	{
		$( "#" + viewMoreID).text(viewMoreText);
	}
	else
	{
		$( "#" + viewMoreID).text(viewLessText);
	}
}
/********************************************************************************************************************************
* Function Name: changeProductOptionDetail
* Description: change product attribute detail on combobox text
********************************************************************************************************************************/
function changeProductOptionDetail(comboboxName, textBoxControlName)
{
 
	var ProductOptionDetailID = document.getElementById(comboboxName).value;
	if(ProductOptionDetailID == "-2")
	{
		document.getElementById(textBoxControlName).style.display = "";
	}
	else
	{
		document.getElementById(textBoxControlName).style.display = "none";
	}
}

/********************************************************************************************************************************
* Function Name: formatNumberFull
* Description: core format number function
********************************************************************************************************************************/

function formatNumberFull(num,decimalNum,bolLeadingZero,bolParens,bolCommas)
/**********************************************************************
	IN:
		NUM - the number to format
		decimalNum - the number of decimal places to format the number to
		bolLeadingZero - true / false - display a leading zero for
										numbers between -1 and 1
		bolParens - true / false - use parenthesis around negative numbers
		bolCommas - put commas as number separators.
 
	RETVAL:
		The formatted number!
 **********************************************************************/
{ 
    if (isNaN(parseInt(num))) return "NaN";

	var tmpNum = num;
	var iSign = num < 0 ? -1 : 1;		// Get sign of number
	 
	// Adjust number so only the specified number of numbers after
	// the decimal point are shown.
	tmpNum *= Math.pow(10,decimalNum);
	tmpNum = Math.round(Math.abs(tmpNum))
	tmpNum /= Math.pow(10,decimalNum);
	tmpNum *= iSign;					// Readjust for sign
	
	
	// Create a string object to do our formatting on
	var tmpNumStr = new String(tmpNum);

	// See if we need to strip out the leading zero or not.
	if (!bolLeadingZero && num < 1 && num > -1 && num != 0)
		if (num > 0)
			tmpNumStr = tmpNumStr.substring(1,tmpNumStr.length);
		else
			tmpNumStr = "-" + tmpNumStr.substring(2,tmpNumStr.length);
   
	// See if we need to put in the commas
	if (bolCommas && (num >= 1000 || num <= -1000)) {
		var iStart = tmpNumStr.indexOf(".");
		if (iStart < 0)
			iStart = tmpNumStr.length;

		iStart -= 3;
		while (iStart >= 1) {
			tmpNumStr = tmpNumStr.substring(0,iStart) + "," + tmpNumStr.substring(iStart,tmpNumStr.length)
			iStart -= 3;
		}		
	}

	// See if we need to use parenthesis
	if (bolParens && num < 0)
		tmpNumStr = "(" + tmpNumStr.substring(1,tmpNumStr.length) + ")";

	return tmpNumStr;		// Return our formatted string!
}
/********************************************************************************************************************************
* Function Name: toggleValue
********************************************************************************************************************************/
function toggleValue(value, replaceValue)
{
	var strReturnValue = replaceValue;
	if((value != null) && (value != ""))
	{
		strReturnValue = value;
	}
	return strReturnValue;
}
/********************************************************************************************************************************
* Function Name: displayControl
********************************************************************************************************************************/
function displayControl(target, displayControlName, displayValue)
{
	if(target.value == displayValue)
	{
		$("#" + displayControlName).show();
	}
	else
	{
		$("#" + displayControlName).hide();
	}
}
/********************************************************************************************************************************
* Function Name: toggleValue
********************************************************************************************************************************/

function getFileExtension(filename)
{
    var found = filename.lastIndexOf('.') + 1;
    return (found > 0 ? filename.substr(found) : "");
}

/********************************************************************************************************************************
* Function Name: toggleValue
********************************************************************************************************************************/
function buildComboBox(comboName, comboValue, data, attribute)
{
	var strReturnValue = "";
	strReturnValue = strReturnValue + "            <select name=\"" + comboName + "\" id=\"" + comboName + "\" " + attribute + ">" + "\r\n";
	
	
		
	$.each(data, function(entryIndex, entry) 
	{
		var selected = "";
		//alert(comboValue + "----" + entryIndex);
		if($.trim(comboValue.toLowerCase()) == $.trim(entryIndex.toLowerCase()))
		{
			selected = "selected=\"selected\"";
		}
		strReturnValue = strReturnValue + "                <option " + selected + " value=\"" + entryIndex + "\">" + entry + "</option>" + "\r\n";
	});
	strReturnValue = strReturnValue + "              </select>" + "\r\n";

	return strReturnValue;
}
/********************************************************************************************************************************
* Function Name: toggleValue
********************************************************************************************************************************/
function doSearchControlName(controlName, strUrl)
{
	var Keywords = document.getElementById(controlName).value;
	if(strUrl.indexOf("?") >= 0)
	{
		strUrl = strUrl + "&keywords=" + Keywords;
	}
	else
	{
		strUrl = strUrl + "?keywords=" + Keywords;
	}
	window.location.href = strUrl;
}
