/* Mouseover preview of metadata from list items or documents
 * ---------------------------------------------
 * Created by Alexander Bautz
 * alexander.bautz@gmail.com
 * http://sharepointjavascript.wordpress.com
 * Copyright (c) 2009-2010 Alexander Bautz (Licensed under the MIT X11 License)
 * v1.3  for SP2010
 * LastMod: 30.11.2011
 * ---------------------------------------------
 * Must include reference to jQuery
 * ---------------------------------------------
*/

var argObjHolder;

function handleError(){
	return true;
}

function initjLoadMe(argObj){
	window.onerror = handleError;
	if(argObj!==undefined){
		if(argObj.width===undefined){
			argObj.width = 500;
		}
		argObjHolder = argObj
	}else{
		argObj = argObjHolder;
	}
	if(argObj.stop===true){
		return;
	}	
	var ctxNum, thisListCTX, thisWPContainer, isListView, isCalView, vfArr, idIndex, intName, thisItemID, url, currTD, imgWrap, findRow;
	$("body").append("<div id='jLoadMe' style='display:none;'></div>");

	$("div[id^='WebPartWPQ']").each(function(){
		ctxNum = $(this).find(".ms-viewheadertr th div[ctxNum]").attr('ctxnum');
		if(ctxNum===undefined){			
			if($(this).find("div[id$='_CalendarView']").length===0){
				return;
			}else{
				isCalView = true;
				if(argObj.cal!==true){			
					_spBodyOnLoadFunctionNames.push('isAsyncCalView');
					argObj.cal = true;
				}
			}
		}else{
			thisListCTX = eval("(ctx"+ctxNum+")");		
			if(argObj.activeListGuids.length>0){
				if($.inArray(thisListCTX.listName,argObj.activeListGuids)===-1){
					return;
				}
			}
		}
		thisWPContainer = $(this);
		isListView = false;
		thisWPContainer.find(".ms-viewheadertr th").each(function(i){			
			if(i==0){
				isListView = true;
			}
			intName = $(this).find('div:first').attr('name');
			if(intName===undefined){
				intName = $(this).text();
			}			
			if(intName==='ID'){
				thisWPContainer.data("IDcolIndex",this.cellIndex);
				thisWPContainer.data("ctxNum",$(this).find('table:first').attr('CtxNum'));
				// Hide ID column
				if(argObj.hideIdColumn){
					$(this).addClass('dummyHideClass');
				}
			}
			if(argObj.hoverImg.active){
				if(intName===argObj.hoverImg.prependTo){
					thisWPContainer.data("hImgID",this.cellIndex);
				}
			}
		});
		if(isCalView===true){
				thisWPContainer.find("div.ms-acal-item a[href*='DispForm.aspx']").each(function(){
					$(this).parents('div:eq(1)').data('url',$(this).attr('href'));
					$(this).parents('div:eq(1)').hover(function(e){
						$(this).css('cursor','wait');
						$(this).attr('title','');
						posX = e.pageX;
						posY = e.pageY;
						var tr = $(this);
						tr.addClass('dummy-selected');
						setTimeout(function(){
							if(tr.hasClass('dummy-selected')){							
								jLoadMe(tr.data('url'),posX,posY,0,argObj);
								tr.css('cursor','default');
							}
						},argObj.hoverDelay);							
					},
					function(){
						$(this).removeClass('dummy-selected');
						$("#jLoadMe").html('').hide();
					});
				});
		}
		if(!isListView){
			return;
		}else if(isListView && location.href.match(/ShowInGrid=True/)===null){			
			vfArr = customGetViewFields(thisListCTX.listName,thisListCTX.view);
			idIndex = $.inArray('ID',vfArr);			
			if(idIndex>0){
				if(idIndex+1!==vfArr.length&&argObj.hideIdColumn){
					alert("["+thisListCTX.ListTitle+"]\n\nYou have selected to hide the ID column.\n\nIt must be placed to the far right in the view for this solution to work.");
					argObjHolder.stop = true;
					return;
				}
			}else if(idIndex<0){
				alert("["+thisListCTX.ListTitle+"]\n\nThe ID column must be in the view. If you select to hide it in this script, place it to the far right.");
				argObj.stop = true;
				return;
			}
		}		
		// Add description above ms-bodyareaframe
		if(argObj.hoverImg.active && $("#hoverImgInfo").length===0){
			$("div.menu-horizontal").css('width','60%').append("<span id='hoverImgInfo' style='float:right;padding-top:4px'><img src='" + argObj.hoverImg.path + "' height='"+argObj.hoverImg.height+"' width='"+argObj.hoverImg.width+"'>&nbsp;" + argObj.hoverImg.hoverImgDescription+ "&nbsp;</span>");
		}
		// List view
		thisWPContainer.find("table.ms-listviewtable tbody").each(function(i,t){	
			if(this.id.match('aggr')===null){
				$(this).find("tr:has(td.ms-vb2)").each(function(){
					if($(this).data('beenthere')){
						return;
					}else{
						$(this).data('beenthere',true);
					}
					// Hide ID column
					if(argObj.hideIdColumn){
						$(this).find(">td[cellIndex="+thisWPContainer.data("IDcolIndex")+"]").addClass('dummyHideClass');
					}
					thisItemID = $(this).find("td[cellIndex="+thisWPContainer.data("IDcolIndex")+"]").text();
					if(thisItemID===''){
						return;
					}
					if(thisListCTX.listBaseType===0){
						url = makeAbsUrl(thisListCTX.listUrlDir)+"/DispForm.aspx?ID=" + thisItemID;
					}else{
						url = makeAbsUrl(thisListCTX.listUrlDir)+"/Forms/DispForm.aspx?ID=" + thisItemID;
					}
					$(this).data('id',$(this).find("td[cellIndex="+thisWPContainer.data("IDcolIndex")+"]").text());
					$(this).data('url',url);
					$(this).data('basetype',thisListCTX.listBaseType);
					if(argObj.hoverImg.active){
						currTD = $(this).find(">td[cellIndex="+thisWPContainer.data("hImgID")+"]");
						imgWrap = "<a";
						if(argObj.hoverImg.openInDlg){
							imgWrap += " onclick='customOpenInDialog(\""+url+"\");return false;'";
						}
						imgWrap += " href='" + url + "'><img class='mouseOverImg' src='" + argObj.hoverImg.path + "' height='"+argObj.hoverImg.height+"' width='"+argObj.hoverImg.width+"' border='0'></a>&nbsp;";
						if(currTD.find('div').length>0){
							currTD.find('div:first').css('white-space','nowrap').prepend(imgWrap);
						}else if(currTD.find('nobr').length>0){
							currTD.find('nobr:first').prepend(imgWrap);
						}else if(currTD.find('span').length>0){
							currTD.find('span:first').css('white-space','nowrap').prepend(imgWrap);
						}else{
							currTD.css('white-space','nowrap').prepend(imgWrap);
						}
						findRow = "tr:first";	
					}
					if(argObj.hoverImg.active){	
						$(this).find(".mouseOverImg").hover(function(e){
							$(this).css('cursor','wait');
							posX = e.pageX;
							posY = e.pageY;
							var tr = $(this).parents(findRow);
							tr.addClass('dummy-selected');
							setTimeout(function(){							
								if(tr.hasClass('dummy-selected')){
									jLoadMe(tr.data('url'),posX,posY,thisListCTX.listBaseType,argObj);
									tr.find(".mouseOverImg").css('cursor','pointer');
								}
							},argObj.hoverDelay);
						},
						function(e){						
							$(this).parents(findRow).removeClass('dummy-selected');
							$("#jLoadMe").html('').hide();
						});
					}else{
						$(this).hover(function(e){
							posX = e.pageX;
							posY = e.pageY;							
							var tr = $(this);
							tr.css('cursor','wait');
							tr.addClass('dummy-selected');							
							setTimeout(function(){
								if(tr.hasClass('dummy-selected')){
									jLoadMe(tr.data('url'),posX,posY,tr.data('basetype'),argObj);
									tr.css('cursor','default');
								}
							},argObj.hoverDelay);
						},
						function(e){
							customMouseOutHideMe(e,this)		
						});
					}
				});
			}else if(this.id.match('aggr')!=null && argObj.hideIdColumn){
				$(this).find("td[cellIndex="+thisWPContainer.data("IDcolIndex")+"]").addClass('dummyHideClass');
			}
		});
	});
	// Hide ID column if specified
	if(argObj.stop!==true && argObj.hideIdColumn){
		$(".dummyHideClass").hide();
	}
}

function customMouseOutHideMe(e,elm){
	var target, relTarg, relTargID, isInWrapper;
	if(!e){
		var e = window.event;
	}
	target = e.srcElement || e.target;	
	relTarg = e.relatedTarget || e.toElement;
	relTargID = relTarg.id;
	relTargID = (relTargID===undefined)?'':relTargID;
	if(relTargID!=='jLoadMe'){
		$(elm).removeClass('dummy-selected');
		$("#jLoadMe").html('').hide();
	}
}
function customOpenInDialog(URL){
	SP.UI.ModalDialog.showModalDialog({url:URL});
}

function jLoadMe(url,pX,pY,listBaseType,argObj){
	var whatToLoad, contentWidth, contentHeight, winHeight, winWidth, winScroll, currWidth, currHeight, topScroll, leftScroll;
	if(listBaseType===1){
		whatToLoad = " #formTbl";
	}else{
		whatToLoad = " #part1";
	}
	$("#jLoadMe").load(url + whatToLoad, function(){
		$("#jLoadMe").css({'width':argObj.width});
		$("#jLoadMe td.ms-formlabel").css({'border-top':'1px #d8d8d8 solid','padding':'3px 8px 6px 0px','font-size':'8pt'});
		$("#jLoadMe td.ms-formbody").css({'border-top':'1px #d8d8d8 solid','padding':'3px 6px 4px 6px','font-size':'8pt','background-color':'#F6F6F6'});
		$("#jLoadMe .ms-formtoolbar:first").hide();
		$("#jLoadMe table.ms-toolbar").hide();
		$("#jLoadMe .ms-ButtonHeightWidth").hide();
		contentWidth = argObj.width;
		contentHeight = $("#jLoadMe").height();		
		if(argObj.arrOfFieldsToShow.length>0){			
			jLoadMeFields = getLoadedFields();
			$.each(jLoadMeFields,function(fin){
				if($.inArray(fin,argObj.arrOfFieldsToShow)===-1){
					$(jLoadMeFields[fin]).css('display','none');
				}
				if(!argObj.hideFormLabel){
					$.each(argObj.arrOfFieldsToShow,function(i,f){
						if(f.split('#').length>1){
							f  = f.split('#')[0];
							$(jLoadMeFields[f]).show().find('td.ms-formlabel').html('&nbsp;');
						}
					});
				}
			});
		}
		if($("#jLoadMe #idAttachmentsTable span").length===0){
			$("#jLoadMe #idAttachmentsRow").hide();
		}
		if(argObj.hideCreatedAndModified){
			$("#jLoadMe #onetidinfoblock1").parents('table:eq(2)').hide();
		}
		if(argObj.hideFormLabel){
			$("#jLoadMe .ms-formlabel").hide();
		}
		// Get height and width of current window
		winHeight = $(window).height();
		winWidth = $(window).width();
		topScroll = $("#s4-workspace").scrollTop();
		leftScroll = $("#s4-workspace").scrollLeft();
		currWidth = $("#jLoadMe").width();
		currHeight = $("#jLoadMe").height();
		// Calculate the best position for the popup X and Y
		pX += 30;
		if((pX)+currWidth>winWidth){
			//pX -= (pX+currWidth)-winWidth+30;
			contentWidth = winWidth-pX-15;
		}
		if((winHeight-pY)<currHeight){
			pY -= currHeight-(winHeight-pY-30);
		}
		// Show popup
		$("#jLoadMe")
			.css({'position':'absolute',
				'left':pX,
				'top':pY,
				'background-color':'#ffffff',
				'border':'2px silver ridge',
				'padding':'3px',
				'zIndex':2000,
				'width':contentWidth})
			.show();
	});	
}

function getLoadedFields(){
	var res = {};
	$("#jLoadMe td.ms-formbody").each(function(){
		var myMatch = $(this).html().match(/FieldName="(.+)"\s+FieldInternalName="(.+)"/);	
		if(myMatch!=null){
			// Display name
			var disp = myMatch[1];
			// FieldInternalName
			var fin = myMatch[2];
			// Build object
			res[fin] = this.parentNode;
		}		
	});
	return res;
}

function customGetViewFields(listGuid,viewGuid){
var xmlBuffer, result, name;
	xmlBuffer = [];
	result = [];
	xmlBuffer.push("<GetView xmlns='http://schemas.microsoft.com/sharepoint/soap/'>");
	xmlBuffer.push("<listName>"+listGuid+"</listName>");
	xmlBuffer.push("<viewName>"+viewGuid+"</viewName>");
	xmlBuffer.push("</GetView>");
	spjs_wrapSoapRequest(L_Menu_BaseUrl+'/_vti_bin/views.asmx', 'http://schemas.microsoft.com/sharepoint/soap/GetView',xmlBuffer.join(''), function(data){
		$(data).find('ViewFields').find('FieldRef').each(function(i){
			name = $(this).attr('Name');
			if(name==='LinkTitle'||name==='LinkTitleNoMenu'){
				name = 'Title';
			}
			result.push(name);
		});
	});
	return result;
}

function spjs_wrapSoapRequest(webserviceUrl,requestHeader,soapBody,successFunc){
	var xmlWrap = [];
		xmlWrap.push("<?xml version='1.0' encoding='utf-8'?>");
		xmlWrap.push("<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>");
		xmlWrap.push("<soap:Body>");
		xmlWrap.push(soapBody);
		xmlWrap.push("</soap:Body>");
		xmlWrap.push("</soap:Envelope>");
		xmlWrap = xmlWrap.join('');
	$.ajax({
		async:false,
		type:"POST",
		url:webserviceUrl,
		contentType:"text/xml; charset=utf-8",
		processData:false,
		data:xmlWrap,
		dataType:"xml",
		beforeSend:function(xhr){
			xhr.setRequestHeader('SOAPAction',requestHeader);
		},
		success:successFunc,
		error:function(xhr){		
			//alert("status:\n"+xhr.status+"\n\nresponseText:\n"+xhr.responseText+"\n\nwebserviceUrl:\n"+webserviceUrl+"\n\nsoapBody:\n"+soapBody);
		}
	});
}

function isAsyncCalView(){
	SP.UI.Notify.removeNotification = function (a) {
	    ULSdih: {
	    }
	    removeNotification(a);
	    initjLoadMe();
	}
}

function handleGroupedPaging(){
	var loaded = true;
	$(".ms-listviewtable tbody").each(function(){
		if(this.isloaded==='false'){
			loaded = false;
			return false;
		}
	});
	if(!loaded){
		setTimeout(function(){
			handleGroupedPaging();
		},10);
	}else{
		$(".ms-listviewtable tbody[id$='__page'] a").click(function(){
			setTimeout(function(){
				initjLoadMe();
			},500);
		});
	}	
}

function customTimeoutLoop(id){
var obj = $("#"+id);
var isloaded = ($(obj).attr('isloaded')=='true')?true:false;
	if(!isloaded){
		$(obj).hide();
		setTimeout(function(){
			customTimeoutLoop(id);
		},10);
	}else{
		$(obj).show();
		handleGroupedPaging();
		initjLoadMe();		
	}
}

function ExpGroupRenderData(d, a, e) {
    ULSA13: {
    }
    var c = document.getElementById("tbod" + a + "_"), b = document.createElement("DIV"), f = a.split("-");
    b.innerHTML = "<TABLE><TBODY id=\"tbod" + a + "_\" isLoaded=\"" + e + "\">" + d + "</TBODY></TABLE>";
    c.parentNode.replaceChild(b.firstChild.firstChild, c); 
 customTimeoutLoop("tbod" + a + "_");   
}

