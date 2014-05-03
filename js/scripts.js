hostname = "http://www.tuquinielita.com";
//hostname = "http://localhost/tuquinielita";
Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}
var pool_profile_members_piechart;
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  onDeviceReady(); //this is the browser
}

function onDeviceReady(){	
	 $(document).on("mobileinit", function() {
        $.mobile.fixedtoolbar.prototype.options.tapToggle = false;
        $.mobile.fixedtoolbar.prototype.options.hideDuringFocus = "";
    });
	/*$("input").focus(function(){
		 alert("hide");
		$('footer').hide();
	});
	
	$("input").blur(function(){
		 alert("show");
		$('footer').show();
	});*/
	var diff;
	margin_left = 0;
	$('#lista3 li').live('touchstart', function(event){
		x = event.originalEvent.touches[0].pageX;
    })

    $('#lista3 li').live('touchmove', function(event){
		x2 = event.originalEvent.touches[0].pageX;
		diff = x2-x;
		el = $(this).find('.slider');
		if(diff>=0){
			if(diff<=90){
				el.css('-webkit-transform','rotateY('+(90-diff)+'deg)');
				el.css('opacity',diff/90);
			}
			if(margin_left<=90)
				$(this).css('margin-left',margin_left+diff);
		}else{
			$(this).css('margin-right',diff*-1);
		}
    })
        
    $('#lista3 li').live('touchend', function(event){
		if(diff>90){
			current_diff = 90;
			$(this).animate({marginLeft:90},'fast');
		}else{
			current_diff = 0;
			$(this).animate({marginLeft:0},'fast');
		}
    });
	var group_idGroup;
	var profile_idUser;
	var pool_profile_idPool;
	var pool_profile_idGroup;
	var pool_idPool;
	var pool_idUser;
	if(!$.browser.webkit){
		alert("Necesitas Coogle Chrome o safari. A continuación se redireccionará a sitio de descarga de Google Chrome");
		window.location.href="http://www.google.com/chrome";
	}
	$.ajaxSetup({ cache: false });
	imgError = function(image) {
		image.onerror = "";
		image.src = "images/logo2.png";
		return true;
	}

	$('.ui-collapsible').live('expand', function() {
		$(this).children().next().hide();
		$(this).children().next().slideDown(200);
		setTimeout(function(){
			$(".iscroll-wrapper").iscrollview("refresh");
		},1000);
	})
	
	$('.ui-collapsible').live('collapse', function() {
		$(this).children().next().slideUp(200);
		setTimeout(function(){
			$(".iscroll-wrapper").iscrollview("refresh");
		},1000);
	});
	refreshPage = function(){
		$.mobile.changePage(window.location.href, {
			allowSamePageTransition: true,
			transition: 'none',
			reloadPage: true
		});
	}
	document.addEventListener("offline", function(){ alert("No hay conexión a internet.") }, false);
}
				var overlay = false;
            	var color = "white";
				function showStatusBar(show) {
                    if (show) {
                            StatusBar.show();
                        StatusBar.overlaysWebView(g_overlay)
                    }
                    else
                        StatusBar.hide();
                }
        
                function overlayWebView(isOverlay) {
                    g_overlay = isOverlay;
                    StatusBar.overlaysWebView(g_overlay);
                }
        
                function setColor(inColor) {
                    g_color = inColor
                    StatusBar.backgroundColorByName(g_color);
        
                    if (g_color === "black")
                        StatusBar.styleLightContent();
                }

                function defaultStyle() {
                    g_color = "white"
                    StatusBar.styleDefault();
                    StatusBar.backgroundColorByName(g_color);
                }
        
                function lightContent() {
                    StatusBar.styleLightContent();
                    if (g_color === "white") {
                        g_color = "black";
                        StatusBar.backgroundColorByName(g_color);
                    }
                }

created = false;
$("div[data-role=page]:not(#admin,#balance)").live("pageshow", function(event){
	$(".iscroll-wrapper").iscrollview("refresh");
});
$("div[data-role=page]").live("pagebeforecreate", function(event){
	if(window.device){
		//$(this).prepend('<div style="position:fixed; top:0; width:100%; height:30px; background:#000;"></div>');
		//$(this).find('div[data-role=header]').css('margin-top','20px');
		//$(this).find('div[data-role=content]').css('margin-top','20px');
	}
});
$("div[data-role=page]:not(#admin)").live("pageinit", function(event){
	if(!window.device)
		$(this).find(".iscroll-content").append("<br><br><br>");
	if(localStorage.type==12&&!created){
		created = true;
		$("div[data-role=footer] div[data-role=navbar] ul").append('<li><a href="admin.html" data-icon="config" data-transition="none">Admin</a></li>');
		$("div[data-role=footer]").navbar();
		
	}
	var output = ['<div data-role="navbar" data-iconpos="top"><ul>'];
    output.push('<li><a href="#home" data-icon="home2" data-transition="none">Inicio</a></li>');
    output.push('<li><a href="#groups" data-icon="group" data-transition="none">Grupos</a></li>');
    output.push('<li><a href="#profile_page" data-icon="profile" data-transition="none">Perfil</a></li>');
    if(localStorage.type==1){
        output.push('<li><a href="admin.html" data-icon="gear" >Admin</a></li>');
    }
    output.push('</ul></div>');
    $('[data-role="footer"]').html(output.join('')).trigger('create');
});	
$("div[data-role=page]").live("pagehide", function(event){
//	$(event.target).remove();
	$("div[data-role=footer] div[data-role=navbar] ul li a").removeClass('ui-btn-active ui-state-persist');
	$.ajax({
		dataType: "jsonp",
	  	url: hostname+"/data/last_access.php",
		data: {idUser: localStorage.idUser}
	});
});
$('#login').live("pageshow", function(){
	if (localStorage.username && localStorage.password){
		$.mobile.loading("show");
		setTimeout(function(){
			$.ajax({
				dataType: "jsonp",
				url: hostname+"/data/login.php",
				data: {username: localStorage.username, password: localStorage.password},
					success: function(response){
						if(response.success===true){           
							$.mobile.changePage("#home", {
								allowSamePageTransition: true,
								transition: 'none'
							});
						}else{
							localStorage.clear();
							location.href="index.html";
							console.log("Usuario o contraseña incorrecta");
						}
				}
			}).done(function(){
				$.mobile.loading( "hide");
			}).error(function(xhr,error,thrownError){
				alert(error);
				alert(thrownError);
			});
		},1500);
	}else{
		$('.overlay').hide();
	}
	$('#login-button').click(function() {
		$(this).button('disable');	
		$.mobile.loading( "show");
		$.ajax({
			dataType: "jsonp",
		  	url: hostname+"/data/login.php",
		 	data: {username: $('#username').val(), password: $('#password').val()},
		  	success: function(response){
				if(response.success===true){           
				  	localStorage.idUser = response.user.idUser;
					if(response.user.type==1)
						localStorage.type = response.user.type;
				  	localStorage.username = response.user.username;
				  	localStorage.password = response.user.password;
				  	localStorage.name = response.user.name;
				  	localStorage.lastname = response.user.lastname;
				  	localStorage.email = response.user.email;
				  	$.mobile.changePage("#home", {
						allowSamePageTransition: true,
						transition: 'none'
					});
			  	}else{
				  	$('#login-error').html("Usuario o contraseña incorrecto");
				  	setTimeout(function(){$('#login-error').html("");},2000);
			  	}
			}
		}).done(function(){
			$("#login-button").parent().removeClass("ui-btn-active");
			$('#login-button').button('enable');
			$.mobile.loading( "hide");
		});		 
	});
});
$('#home').live('pageshow', function(){
	$("div[data-role=footer] div[data-role=navbar] ul li a[data-icon=home2]").addClass('ui-btn-active ui-state-persist');
	if(new Date().getTime()-localStorage.last_time_home>120000){
		home_page();
	}
});
$('#home').live('pageinit', home_page = function(){
	localStorage.last_time_home = new Date().getTime();
	console.log("refresh home");
	$(".iscroll-wrapper", this).bind( {
		iscroll_onpulldown : function(event, data){
			setTimeout(function(){
				home_page();
			},1000);
		}
	});
	$('#lista li:not([data-role=list-divider])').remove();
	$('#lista2 li:not([data-role=list-divider])').remove();
	$('#lista3 li:not([data-role=list-divider])').remove();
	$.ajax({
		dataType: "jsonp",
		url: hostname+"/data/poollist.php",
		data: {idUser: localStorage.idUser},
		success: function(response){
			if(response.success!=false){
				$.each( response.items, function( i, item ) {
					$.mobile.loading( "show");
					switch(item.gtype){
						case '1': item.gtype = " (Publica)"; break;
						case '2': item.gtype = " (Privada)"; break;
					}
					$('<li><a href="#pool_profile" onClick="pool_profile_idGroup='+item.idGroup+';pool_profile_idPool='+item.idPool+'" data-transition="none"><img src="'+item.image+'" class="ui-li-icon ui-corner-none">'+item.name+item.gtype+'</a>'+'</li>')
					.hide()
					.animate({opacity:0},function(){
						$(this).appendTo('#lista');
						$('#lista').listview('refresh');
					})
					.slideDown('slow')
					.animate({opacity: 1.0});
				});
			}else{
				$('#lista').append('<li>No hay nuevas quinielas</li>').listview('refresh');
			}
		}
	}).done(function(){
		$(".iscroll-wrapper").iscrollview("refresh");
		$.mobile.loading("hide");
	});
	$.ajax({
		dataType: "jsonp",
		url: hostname+"/data/poollist.php",
		data: {idUser: localStorage.idUser, openpools: 1},
		success: function(response){
			if(response.success!=false){
				$.each( response.items, function( i, item ) {
					$.mobile.loading( "show");
					switch(item.gtype){
						case '1': item.gtype = " (Publica)"; break;
						case '2': item.gtype = " (Privada)"; break;
					}
					$('<li><a href="#pool_profile" onClick="pool_profile_idGroup='+item.idGroup+';pool_profile_idPool='+item.idPool+'" data-transition="none"><img src="'+item.image+'" class="ui-li-icon ui-corner-none">'+item.name+item.gtype+'</a>'+'</li>')
					.hide()
					.animate({opacity:0},function(){
						$(this).appendTo('#lista2');
						$('#lista2').listview('refresh');
					})
					.slideDown('slow')
					.animate({opacity: 1.0})
				});
			}else{
				$('#lista2').append('<li>No hay quinielas abiertas</li>');
				$('#lista2').listview('refresh');
			}
		}
	}).done(function(){
		$(".iscroll-wrapper").iscrollview("refresh");
		$.mobile.loading("hide");
	});
	$.ajax({
		dataType: "jsonp",
		url: hostname+"/data/poollist.php",
		data: {idUser: localStorage.idUser, pendingpools: 1},
		success: function(response){
			if(response.success!=false){
				$.each( response.items, function( i, item ) {
					$.mobile.loading( "show");
					switch(item.gtype){
						case '1': item.gtype = " (Publica)"; break;
						case '2': item.gtype = " (Privada)"; break;
					}
					$('<li><a href="#pool_profile" onClick="pool_profile_idGroup='+item.idGroup+';pool_profile_idPool='+item.idPool+'" data-transition="none"><img src="'+item.image+'" class="ui-li-icon ui-corner-none">'+item.name+item.gtype+'</a>'+'</li>')
					.hide(function(){
						$(this).appendTo('#lista3');
						$('#lista3').listview('refresh');
					})
					.css('opacity',0.0)
					.slideDown('slow')
					.animate({opacity: 1.0})
				});
			}else{
				$('<li>No hay quinielas en juego.</li>')
					.hide()
					.animate({opacity:0},function(){
						$(this).appendTo('#lista3');
						$('#lista3').listview('refresh');
					})
					.slideDown('slow')
					.animate({opacity: 1.0})
			}
		}
	}).done(function(){
		$(".iscroll-wrapper").iscrollview("refresh");
		$.mobile.loading("hide");
	});
});
$('#pool').live('pagehide', function(){
	$('#pool_title').html("&nbsp;");
	$('#pool').find('div[data-role=content]').hide();
	//localStorage.removeItem('pool_idPool');
	//pool_idPool=null;
});
$('#pool').live('pageshow', pool_page = function(){
	$(".iscroll-wrapper", this).bind( {
		iscroll_onpulldown : function(event, data){
			setTimeout(function(){
				pool_page();
			},1000);
		}
	});
	$(this).find('fieldset').remove();
	$("#multilistings").html("");
	if (typeof pool_idPool != 'undefined'){
		localStorage.pool_idPool = pool_idPool;
	}
	if (typeof pool_idUser!= 'undefined'){
		localStorage.pool_idUser = pool_idUser;
	}else{
		if(!localStorage.pool_idUser)
			localStorage.pool_idUser = localStorage.idUser;
	}
	$.mobile.loading( "show");

	pool_idPool = localStorage.pool_idPool;
	pool_idUser = localStorage.pool_idUser;
	if(!pool_idUser||!pool_idPool) location.href="index.html";
	//if(pool_idUser!=localStorage.idUser){}
	status = "2";
	error_reason = "";
	allowed = false;
	$.ajax({
		dataType: "jsonp",
		url: hostname+"/data/poolmatches.php",
		data: {idPool: pool_idPool, idUser: pool_idUser},
		async:false,
		success: function(response){
			if(response.success===true){
				status = response.pool.status;
				if(response.allowed){
					allowed = true;
				}else{
					error_reason = response.error_reason;
				}
				$('#pool_title').html(response.pool.name);
				partidos = "";
				$.each(response.pool.matches, function(i,item){
					asdf="";
					if(item.status=="3"){
						asdf = "border:thick solid #000;";	
					}else if(item.status=="2"){
						asdf = "border:thick solid #383;";	
					}
					if(item.type == 1){
						partidos += '<fieldset data-role="controlgroup" data-type="horizontal" type="'+item.type+'" style="'+asdf+'"><input type="radio" name="idMatch'+item.idMatch+'" id="id'+item.teams[0].idTeam+'" value="'+item.teams[0].idTeam+'" selection = "1" /><label for="id'+item.teams[0].idTeam+'" id="label'+item.teams[0].idTeam+'"><table><tr><td class="td-left"><img src="images/'+item.teams[0].image+'" class="teamicon"/></td><td class="td-center">'+item.teams[0].name+' <span class="nickname">'+item.teams[0].nickname+'</span></td><td class="td-right"><span class="score-spread">'+item.teams[0].spreadline+'</span><span class="score-spread" style="display:none">'+item.teams[0].score+'</span></td></tr></table></label><input type="radio" name="idMatch'+item.idMatch+'" id="id'+item.teams[1].idTeam+'" value="'+item.teams[1].idTeam+'" selection = "2"/><label for="id'+item.teams[1].idTeam+'" id="label'+item.teams[1].idTeam+'"><table><tr><td class="td-left"><img src="images/'+item.teams[1].image+'" class="teamicon"/></td><td class="td-center">'+item.teams[1].name+' <span class="nickname">'+item.teams[1].nickname+'</span></td><td class="td-right"><span class="score-spread">'+item.teams[1].spreadline+'</span><span class="score-spread" style="display:none">'+item.teams[1].score+'</span></td></tr></table></label></fieldset>';	
					}else if(item.type == 2){
					}else if(item.type == 3){
						partidos += '<fieldset data-role="controlgroup" data-type="horizontal" type="'+item.type+'" style="'+asdf+'"><input type="radio" name="idMatch'+item.idMatch+'OU" id="id'+item.teams[0].idTeam+'OU" value="'+item.teams[0].idTeam+'" selection = "1" /><label for="id'+item.teams[0].idTeam+'OU" id="label'+item.teams[0].idTeam+'OU"><table><tr><td class="td-left"><img src="images/'+item.teams[0].image+'" class="teamicon"/></td><td class="td-center">'+item.teams[0].name+' <span class="nickname">'+item.teams[0].nickname+'</span></td><td class="td-right"><span class="score-spread">O'+item.scoreline+'</span><span class="score-spread" style="display:none">'+item.teams[0].score+'</span></td></tr></table></label><input type="radio" name="idMatch'+item.idMatch+'OU" id="id'+item.teams[1].idTeam+'OU" value="'+item.teams[1].idTeam+'" selection = "2"/><label for="id'+item.teams[1].idTeam+'OU" id="label'+item.teams[1].idTeam+'OU"><table><tr><td class="td-left"><img src="images/'+item.teams[1].image+'" class="teamicon"/></td><td class="td-center">'+item.teams[1].name+' <span class="nickname">'+item.teams[1].nickname+'</span></td><td class="td-right"><span class="score-spread">U'+item.scoreline+'</span><span class="score-spread" style="display:none">'+item.teams[1].score+'</span></td></tr></table></label></fieldset>';
					}
					asdf = "";
				});
			}else{
				location.href="index.html";
			}
		}
	}).done(function(){
		$(".iscroll-wrapper").iscrollview("refresh");
		$('#multilistings').append(partidos).trigger('create');
		$.ajax({
			dataType: "jsonp",
			url: hostname+"/data/poolbets.php",
			data: {idPool: pool_idPool, idUser: pool_idUser},
			success: function(response){
				if(response.success===true){
					$("#quiniela :input").attr("disabled", true);
					$("#quiniela label").removeClass('ui-btn-active ui-radio-on');
					$.each(response.items, function(i,item){
						if(item.status!=1){
							$('#label'+item.idTeam).parent().parent().parent().bind('tap',function(){
								$(this).find('.score-spread').toggle();
							});
							if(item.type==1){ //SPREADLINE
								$('#label'+item.idTeam).addClass('ui-btn-active status-'+item.status+' ui-radio-on');
							}else if(item.type==3){ //OVER-UNDER
								$('#label'+item.idTeam+'OU').addClass('ui-btn-active status-'+item.status+' ui-radio-on');
							}
						}else{
							if(item.type==1){ //SPREADLINE
								$('#label'+item.idTeam).addClass('ui-btn-active status-'+item.status+' ui-radio-on');
							}else if(item.type==3){ //OVER-UNDER
								$('#label'+item.idTeam+'OU').addClass('ui-btn-active status-'+item.status+' ui-radio-on');
							}
						}
					});
				}else{
					if(status==1&&allowed){
						$('#multilistings').append('<input id="submit" type="button" onclick="validate_pool()" value="GUARDAR" data-transition="slide" data-corners="false" data-theme="a"/>').trigger('create');
					}else{
						$('#error_reason').html('<center>'+error_reason+'</center>');
					}
				}
			}
		}).done(function(){
			$('#pool').find('div[data-role=content]').show();
			$.mobile.loading( "hide");
			$(".iscroll-wrapper").iscrollview("refresh");
		});
	});
});

var validate_pool = function() {
	count = 0;
	$.mobile.loading( "show");
	$("#quiniela :input").attr("disabled", true);
	$('#quiniela fieldset').each(function(index, item) {
		if (($(item).find('input:radio').length > 0 && $(item).find('input:radio:checked').length === 0))
			count++;
	});
	if(count>0){
		$('#pool_error').popup('open');
		$("#quiniela :input").removeAttr("disabled");
		$.mobile.loading( "hide");
	}else{
		$('#pool_confirm').popup('open');
		$("#quiniela :input").removeAttr("disabled");
		$.mobile.loading( "hide");
	}
	return (count > 0) ? false : true;
};

var save_pool = function(){
	$('#pool_confirm a').hide();
	$.mobile.loading("show");
    var idPool = localStorage.pool_idPool;
	$.mobile.loading("show");
	$.ajax({
		dataType: "jsonp",
		url: hostname+"/data/saveuserpool.php",
		data: {idUser: localStorage.idUser, idPool: idPool},
		success: function(response){
			if(response.success!=false){
				console.log(response.msg_es);
			}else{
				console.log(response.msg_es);
			}
		}
	}).done(function(){
		$.mobile.loading("hide");
	});

	var len = $('#quiniela fieldset').length;
	$('#quiniela fieldset').each(function(index, item) {
		type = $(item).attr("type");
		if(type==1){
			selection = 1;
		}else if(type==2){
		}else{
			selection = $(item).find('input:radio:checked').attr('selection');
		}
		$.mobile.loading("show");
		$.ajax({
			dataType: "jsonp",
			url: hostname+"/data/savebet.php",
			data: {idUser: localStorage.idUser, idPool: idPool, idMatch: $(item).find('input:radio:checked').attr('name').substring(7), type: $(item).attr('type'), idTeam : $(item).find('input:radio:checked').attr('value'), selection: selection},
			async: false,
			success: function(response){
				if(response.success!=false){
					console.log(response.msg_es);
				}else{
					console.log(response.msg_es);
				}
			}
		}).done(function(){
			if (index == len - 1) {
				$.mobile.changePage("#pool_profile", {
					allowSamePageTransition: true,
					transition: 'none',
					reloadPage: true
				});
				setTimeout(function(){
					$('#pool_confirm a').show();
				},1000);
			}
			$.mobile.loading("hide");
		});
	});
};
$('#profile_page').live('pageshow', function(){
	$("div[data-role=footer] div[data-role=navbar] ul li a[data-icon=profile]").addClass('ui-btn-active ui-state-persist');
	if (typeof profile_idUser != 'undefined')
		if(profile_idUser!=localStorage.profile_idUser){
			localStorage.profile_idUser = profile_idUser;
			profile_page();
		}

//	if(new Date().getTime()-localStorage.last_time_profile>120000){
		profile_page();
//	}
});
$('#profile_page').live('pagehide', function(){
	$('#username_title').html("&nbsp;");
	
	localStorage.removeItem('profile_idUser');
	profile_idUser =null;
});

$('#profile_page').live('pageinit', profile_page = function(){	
	localStorage.last_time_profile = new Date().getTime();
	if (typeof profile_idUser != 'undefined')
		if(profile_idUser!=localStorage.profile_idUser)
			localStorage.profile_idUser = profile_idUser;
	$(".iscroll-wrapper", this).bind( {
		iscroll_onpulldown : function(event, data){
			setTimeout(function(){
				profile_page();
			},1000);
		}
	});
	$('#custom').val(localStorage.idUser);
	if(localStorage.profile_idUser){
		idUser = localStorage.profile_idUser;
	}else{
		idUser = localStorage.idUser;
		var changingToBalance = false;
		$('#user_balance_div', this).bind('tap',function(){
			$.mobile.changePage('#balance',{
				allowSamePageTransition: true,
				transition: 'none'});
		});
	}
	if(!idUser){
		$.ajax({
			dataType: "jsonp",
			url: hostname+"/data/balance.php",
			data: {idUser: idUser},
			success: function(response){
				if(response.success!=false){		
					$('#user_balance').html(response.balance);
				}
			}
		});
	}else{
		if(idUser == localStorage.idUser){
			$.ajax({
				dataType: "jsonp",
				url: hostname+"/data/balance.php",
				data: {idUser: idUser},
				success: function(response){
					if(response.success!=false){		
						$('#user_balance').html(response.balance);
					}
				}
			});
		}
		$(this).find('.ui-header').prepend('<a href="index.html" data-icon="arrow-l" data-rel="back" data-theme="a" data-iconpos="notext" data-transition="slide" data-direction="reverse" class="ui-btn-left ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" title="Atrás"><span class="ui-btn-inner"><span class="ui-btn-text">Atrás</span><span class="ui-icon ui-icon-back ui-icon-shadow">&nbsp;</span></span></a>').trigger('create');
	}
	$.ajax({
		dataType: "jsonp",
		url: hostname+"/data/user.php",
		data: {idUser: idUser},
		success: function(response){
			if(response.success!=false){
				d = new Date();
				$('#profile_pic').attr('src','http://www.tuquinielita.com/data/images/profile_pics/'+response.user.idUser+'.jpg?'+d.getTime());
				$('#popupProfilePic .popphoto').attr('src',$('#profile_pic').attr('src'));
				$('#profile_pic').on('error',function(){
					$(this).attr('src','images/logo.png');
					$('#popupProfilePic .popphoto').attr('src','images/logo.png');
				});
				$('#username_title').html(response.user.username);
				$('#name').html('<h4>'+response.user.name+' '+response.user.lastname+'</h4>');
				if(response.user.email!='null'&&response.user.email!=""&&response.user.email!=null)
					$('#name').append('<a href="mailto:'+response.user.email+'" class="ui-link">'+response.user.email+'</a>');
				$('#user_pools_number').html(response.user.pools);
				$('#user_groups_number').html(response.user.groups);
				if(idUser == localStorage.idUser){
					$('#profile_edit_button').html('<li><a href="#popupEdit" data-rel="popup" data-transition="fade">Editar perfil</a></li>').listview('refresh');
					localStorageValues();
				}else{
					$('#profile_edit_button').html('<li data-theme="a">&nbsp;</li>').listview('refresh');
				}
			}else{
				
			}
		}
	}).done(function(){
		$.mobile.loading("hide");
		$('#profile_page').find('div[data-role=content]').show();
	});
	localStorageValues = function(){
		$('#input_name').val(localStorage.name);
		$('#input_lastname').val(localStorage.lastname);
		$('#input_email').val(localStorage.email);
	}
	updateUser = function(){
		if($('#input_name').val()!=""&&$('#input_lastname').val()!=""&&$('#input_email').val()!=""){
			$.ajax({
				dataType: "jsonp",
				url: hostname+"/data/update_user.php",
				data: {idUser:localStorage.idUser, name: $('#input_name').val(), lastname: $('#input_lastname').val(), email: $('#input_email').val()},
				success: function(response){
					if(response.success!=false){
						$.mobile.loading( "show");
						$('#password-error').html("Contraseña actualizada");
						localStorage.name = $('#input_name').val();
						localStorage.lastname = $('#input_lastname').val();
						localStorage.email = $('#input_email').val();
						setTimeout(function(){
							$('#popupEditInfo').popup('close');
							$('#info-error').html("");
							localStorageValues();
						},1000);
					}else{
						$('#info-error').html(response.msg_es);
						setTimeout(function(){$('#info-error').html("");},1500);
					}
				}
			}).done(function(){
				$.mobile.loading("hide");
			});
		}else{
			$('#info-error').html('Favor de llenar todos los campos.');
			setTimeout(function(){$('#info-error').html("");},1500);
		}
	};
	updatePassword = function(){
		if($('#pw1').val()!=""&&$('#pw1').val()==$('#pw2').val()){
			$.ajax({
				dataType: "jsonp",
				url: hostname+"/data/update_password.php",
				data: {idUser:localStorage.idUser, old_password: $('#pw').val(), new_password: $('#pw1').val()},
				success: function(response){
					if(response.success!=false){
						$.mobile.loading( "show");
						$('#password-error').html("Contraseña actualizada");
						setTimeout(function(){
							$('#password-error').html("");
							$('#popupPassword input').val('')
							$('#popupPassword').popup('close');
						},1000);
						localStorage.password = $('#pw1').val();
					}else{
						$('#password-error').html(response.msg_es);
						setTimeout(function(){$('#password-error').html("");},1500);
					}
				}
			}).done(function(){
				$.mobile.loading("hide");
			});
		}else{
			$('#password-error').html('La nueva contraseña no coincide o está vacía.');
			setTimeout(function(){$('#password-error').html("");},1500);
		}
	};

	$('#change_photo').bind('tap',function(){
		navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
        	destinationType :	navigator.camera.DestinationType.FILE_URI,
			allowEdit		:	true,
			sourceType      :	navigator.camera.PictureSourceType.PHOTOLIBRARY });
		
		function onSuccess(fileURI) {
			$('#popupEdit').popup('close');
			$.mobile.loading( "show");
			var options = new FileUploadOptions();
			options.fileKey = "file";
			options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
			options.mimeType="image/jpeg";
			
			var params = {};
			params.idUser = localStorage.idUser;
			
			options.params = params;
			var ft = new FileTransfer();
			ft.upload(fileURI, encodeURI("http://www.tuquinielita.com/data/upload.php"), function(r){$.mobile.loading("hide");d = new Date();$('#profile_pic').attr('src','http://www.tuquinielita.com/data/images/profile_pics/'+response.user.idUser+'.jpg?'+d.getTime());$('#image_saving_status h4').html("Foto de perfil actualizada");$('#image_saving_status').popup('open');alert("Foto de perfil actualizada");}, function(message){$.mobile.loading("hide");$('#image_saving_status h4').html('Error: ' + message);$('#image_saving_status').popup('open');},options);
		}
		function onFail(message) {
			$.mobile.loading( "hide");
			$('#image_saving_status h4').html('Error: ' + message);
			$('#image_saving_status').popup('open');
		}
	});
	$('#logout').click(function(){
		localStorage.clear();
		location.href="index.html";
	});
	$('#profile_stats_button').click(function(e) {
        $('.profile_divs').hide();
		$('#profile_stats_div').fadeIn();
    });
	$('#profile_points_button').click(function(e) {
        $('.profile_divs').hide();
		$('#profile_points_div').fadeIn();
    });
});
$('#groups').live('pageshow', function(){
	$("div[data-role=footer] div[data-role=navbar] ul li a[data-icon=group]").addClass('ui-btn-active ui-state-persist');
	if(new Date().getTime()-localStorage.last_time_groups>120000){
		groups_page();
	}
});
$('#groups').live('pageinit', groups_page = function(){
	localStorage.last_time_groups = new Date().getTime();
	$(".iscroll-wrapper", this).bind( {
		iscroll_onpulldown : function(event, data){
			setTimeout(function(){
				groups_page();
			},1000);
		}
	});
	$('#private_groups').parent().trigger('collapse');
	$('#public_groups li').remove();
	$('#private_groups li').remove();
	$('#admin_groups li').remove();
	$.ajax({
		dataType: "jsonp",
		url: hostname+"/data/grouplist.php",
		data: {idUser: localStorage.idUser},
		success: function(response){
			if(response.success!=false){
				$.each( response.items, function( i, item ) {
					$.mobile.loading( "show");
					if(item.image==null)
						item.image="images/logo.png";
					$('<li><a href="#group?idGroup='+item.idGroup+'" onclick="group_idGroup\='+item.idGroup+'"  data-transition="slide"><img src="'+item.image+'" class="ui-li-icon ui-corner-none">'+item.name+'</a>'+'</li>').appendTo('#public_groups').parent().listview('refresh');
				});
			}else{
				$('#public_groups').append('<li>No hay grupos públicos.</li>').parent().listview('refresh');
			}
		}
	}).done(function(){
		$(".iscroll-wrapper").iscrollview("refresh");
		$.mobile.loading("hide");
	});
	$.ajax({
		dataType: "jsonp",
		url: hostname+"/data/grouplist.php",
		data: {idUser: localStorage.idUser, private: 1},
		success: function(response){
			if(response.success!=false){
				$.each( response.items, function( i, item ) {
					$.mobile.loading( "show");
					if(item.image==null)
						item.image="images/logo.png";
					$('<li><a href="#group" onclick="group_idGroup\='+item.idGroup+'"  data-transition="slide"><img src="'+item.image+'" class="ui-li-icon ui-corner-none">'+item.name+'</a>'+'</li>').appendTo('#private_groups').parent().listview('refresh');
				});
			}else{
				$('#private_groups').append('<li>No hay grupos privados.</li>').parent().listview('refresh');
			}
		}
	}).done(function(){
		$('#private_groups').parent().trigger('expand');
		$(".iscroll-wrapper").iscrollview("refresh");
		$.mobile.loading("hide");
	});
	$.ajax({
		dataType: "jsonp",
		url: hostname+"/data/grouplist.php",
		data: {idUser: localStorage.idUser, admin: 1},
		success: function(response){
			if(response.success!=false){
				$.each( response.items, function( i, item ) {
					$.mobile.loading( "show");
					if(item.image==null)
						item.image="images/logo.png";
					$('<li><a href="#group?idGroup='+item.idGroup+'" data-transition="slide"><img src="'+item.image+'" class="ui-li-icon ui-corner-none">'+item.name+'</a>'+'</li>').appendTo('#admin_groups').parent().listview('refresh');
				});
			}else{
				$('#admin_groups').append('<li>No tienes grupos en los que seas administrador.</li>').listview('refresh');
			}
		}
	}).done(function(){
		$.mobile.loading("hide");
		$(".iscroll-wrapper").iscrollview("refresh");
	});
});
$('#group').live('pageshow', function(){
	if (typeof group_idGroup != 'undefined')
		if(group_idGroup!=localStorage.group_idGroup){
			localStorage.group_idGroup = group_idGroup;
			group_page();
		}else{
			$('#group').find('div[data-role=content]').show();
		}
	if(new Date().getTime()-localStorage.last_time_group>120000){
		group_page();
	}
});
$('#group').live("pagehide", function(){
	
});
$('#group').live("pageinit", group_page = function(){
	localStorage.last_time_group = new Date().getTime();
	$(".iscroll-wrapper", this).bind( {
		iscroll_onpulldown : function(event, data){
			setTimeout(function(){
				group_page();
			},1000);
		}
	});
	if (typeof group_idGroup != 'undefined')
		if(group_idGroup!=localStorage.group_idGroup)
			localStorage.group_idGroup = group_idGroup;
	$('#current_group_pools').parent().trigger('collapse');
	$('#group_stats_standing li').remove();
	$('#group_members_list li').remove();
	$('#current_group_pools li').remove();
	$('#week_group_pools li').remove();
	$('#all_group_pools li').remove();
    var idGroup = localStorage.group_idGroup;
	if(idGroup){
		$.ajax({
			dataType: "jsonp",
			url: hostname+"/data/group.php",
			data: {idGroup: idGroup, idUser: localStorage.idUser},
			success: function(response){
				if(response.success!=false){
					$('#group_pic').attr('src','http://www.tuquinielita.com/data/images/group_pics/'+response.group.idGroup+'.jpg').on('error',function(){$(this).attr('src','images/logo.png');});
					$('#group_title').html(response.group.name);
					$('#group_pools_number').html(response.group.pools);
					$('#group_members_number').html(response.group.members);
					if(response.group.current_user_member==1){
						$('#join_group_button').html('<li>Eres miembro</li>').listview('refresh');;
					}else{
						$('#join_group_button').html('<li data-theme="b"><a href="#popupInfo" data-rel="popup">UNIRME AL GRUPO</a></li>').listview('refresh');
					}
				}else{
					
				}
			}
		}).done(function(){
			$.mobile.loading("hide");
		});
		$.ajax({
			dataType: "jsonp",
			url: hostname+"/data/userlist.php",
			data: {idGroup: idGroup, idUser:localStorage.idUser, idPool: 1, tabla_posiciones: true, overall: true},
			success: function(response){
				if(response.success!=false){
					$.each( response.items, function( i, item ) {
						$.mobile.loading( "show");
						tiebreaker = "";
						if(item.tiebreaker != 0)
							tiebreaker = "+"+item.tiebreaker;
							item.won = parseInt(item.won);
							item.lost = parseInt(item.lost);
							item.tied = parseInt(item.tied);
							sum = item.lost+item.tied+item.won;
							percentage = (item.won/sum)*100;
							percentage = percentage.toFixed(0);
						$('<li><a href="#profile_page" onClick="profile_idUser='+item.idUser+'" data-transition="slide">'+item.name+' '+item.lastname+' ['+item.won+'-'+item.lost+'-'+item.tied+'] '+percentage+'%</a>'+'</li>').appendTo('#group_stats_standing').parent().listview('refresh');
					});
				}
			}
		}).done(function(){
			$(".iscroll-wrapper").iscrollview("refresh");
			$.mobile.loading("hide");
		});
		$.ajax({
			dataType: "jsonp",
			url: hostname+"/data/userlist.php",
			data: {idUser: localStorage.idUser, idGroup: idGroup},
			success: function(response){
				if(response.success!=false){
					$.each( response.items, function( i, item ) {
						$.mobile.loading( "show");
						$('<li><a href="#profile_page" onClick="profile_idUser='+item.idUser+'" data-transition="slide">'+item.name+' '+item.lastname+'</a>'+'</li>').appendTo('#group_members_list').parent().listview('refresh');
					});
				}else{
					$('#group_members_list').append('<li>No hay miembros.</li>');
					$('#group_members_list').listview('refresh');
				}
			}
		}).done(function(){
			$(".iscroll-wrapper").iscrollview("refresh");
			$.mobile.loading("hide");
		});
		$.ajax({
			dataType: "jsonp",
			url: hostname+"/data/poollist.php",
			data: {idUser: localStorage.idUser, idGroup: idGroup},
			success: function(response){
				if(response.success!=false){
					$.each( response.items, function( i, item ) {
						$.mobile.loading( "show");
						if(item.status=="2"&&!item['open']||item.status=="1"&&item['open'])
							$('<li><a href="#pool_profile" onClick="pool_profile_idGroup='+idGroup+';pool_profile_idPool='+item.idPool+';" data-transition="slide"><img src="'+item.image+'" class="ui-li-icon ui-corner-none">'+item.name+'</a>'+'</li>').appendTo('#current_group_pools').parent().listview('refresh');
						this_week = new Date();
						this_week = this_week.getWeek();
						week = new Date(item.end_date);
						week = week.getWeek()+1;
						week2 = new Date(item.start_date);
						week2 = week2.getWeek()+1;
						if(item.status!="1" && (week==this_week||week2==this_week)||(item.status=="1"||item.status=="2")&&item['open']&&(week==this_week||week2==this_week))
							$('<li><a href="#pool_profile" onClick="pool_profile_idGroup='+idGroup+';pool_profile_idPool='+item.idPool+';" data-transition="slide"><img src="'+item.image+'" class="ui-li-icon ui-corner-none">'+item.name+'</a>'+'</li>').appendTo('#week_group_pools').parent().listview('refresh');
						if(!item.status=="1"&&item['open']||!item['open'])
							$('<li><a href="#pool_profile" onClick="pool_profile_idGroup='+idGroup+';pool_profile_idPool='+item.idPool+';" data-transition="slide"><img src="'+item.image+'" class="ui-li-icon ui-corner-none">'+item.name+'</a>'+'</li>').appendTo('#all_group_pools').parent().listview('refresh');
					});
				}else{
					$('#current_group_pools').append('<li>No hay quinielas.</li>').listview('refresh');
					$('#week_group_pools').append('<li>No hay quinielas.</li>').listview('refresh');
					$('#all_group_pools').append('<li>No hay quinielas.</li>').listview('refresh');
				}
			}
		}).done(function(){
			$('#group').find('div[data-role=content]').show();
			if($('#current_group_pools > li').size()>0){
				$('#current_group_pools').parent().trigger('expand');
			}else if($('#week_group_pools > li').size()>0){
				$('#current_group_pools').append('<li>No hay quinielas.</li>').listview('refresh');
				$('#week_group_pools').parent().trigger('expand');
			}else if($('#all_group_pools > li').size()>0){
				$('#current_group_pools').append('<li>No hay quinielas.</li>').listview('refresh');
				$('#week_group_pools').append('<li>No hay quinielas.</li>').listview('refresh');
				$('#all_group_pools').parent().trigger('expand');
			}
			$.mobile.loading("hide");
			$(".iscroll-wrapper").iscrollview("refresh");
		});
		$('#pools_button').click(function(e) {
			$('.group_divs').hide();
			$('#group_pools_div').fadeIn();
			setTimeout(function(){$(".iscroll-wrapper").iscrollview("refresh");},500);
		});
		$('#stats_button').click(function(e) {
			$('.group_divs').hide();
			$('#group_stats_div').fadeIn();
			setTimeout(function(){$(".iscroll-wrapper").iscrollview("refresh");},500);
		});
		$('#members_button').click(function(e) {
			$('.group_divs').hide();
			$('#group_members_div').fadeIn();
			setTimeout(function(){$(".iscroll-wrapper").iscrollview("refresh");},500);
		});
	}else{
		$.mobile.changePage("#home", {
			allowSamePageTransition: true,
			transition: 'none'
		});
	}
});
$('#pool_profile').live('pageshow', function(){
	if (typeof pool_profile_idGroup != 'undefined' && typeof pool_profile_idPool != 'undefined')
		if(pool_profile_idGroup!=localStorage.pool_profile_idGroup||pool_profile_idPool!=localStorage.pool_profile_idPool){
			localStorage.pool_profile_idGroup = pool_profile_idGroup;
			localStorage.pool_profile_idPool = pool_profile_idPool;
			pool_profile();
			
		}else{
			
		}
	if(new Date().getTime()-localStorage.last_time_pool_profile>120000){
		pool_profile();
	}
});
$('#pool_profile').live("pagehide", function(){
	
});
$('#pool_profile').live("pageinit", pool_profile = function(){
	if (typeof pool_profile_idGroup != 'undefined' && typeof pool_profile_idPool != 'undefined')
		if(pool_profile_idGroup!=localStorage.pool_profile_idGroup||pool_profile_idPool!=localStorage.pool_profile_idPool){
			localStorage.pool_profile_idGroup = pool_profile_idGroup;
			localStorage.pool_profile_idPool = pool_profile_idPool;
		}
	$(".iscroll-wrapper", this).bind( {
		iscroll_onpulldown : function(event, data){
			setTimeout(function(){
				pool_profile();
			},1000);
		}
	});
	localStorage.last_time_pool_profile = new Date().getTime();
	$('#pool_profile_members_list li').remove();
	$('#pool_profile_standing li').remove();

    var idGroup = localStorage.pool_profile_idGroup;
    var idPool = localStorage.pool_profile_idPool;
if (idGroup&&idPool){
		$('#pool_profile .back').attr('href','#group');
		$.ajax({
		dataType: "jsonp",
		url: hostname+"/data/pool.php",
		data: {idGroup: idGroup, idPool: idPool, idUser: localStorage.idUser},
		success: function(response){
			if(response.success!=false){
				$('#pool_profile_title').html(response.pool.name);
				$('#pool_description').html(response.pool.description);
				if(response.pool.amount){
					$('#pool_amount').html('$'+response.pool.amount);
					$('#monto').fadeIn();
				}
				participating = response.pool.current_player_participating;
				pool_status = response.pool.status;
				$.ajax({
					dataType: "jsonp",
					url: hostname+"/data/userlist.php",
					data: {idGroup: idGroup, idUser:localStorage.idUser, idPool: idPool},
					success: function(response){
						if(response.success!=false){
							count = response.items.length;
							$.each( response.items, function( i, item ) {
								$.mobile.loading( "show");
								if(participating||pool_status!=1||1==1){
									$('<li><a href="#pool" onClick="pool_idPool='+idPool+';pool_idUser='+item.idUser+'" data-transition="slide">'+item.name+' '+item.lastname+'</a>'+'</li>').appendTo('#pool_profile_members_list').parent().listview('refresh');
								}else{
									$('<li><a href="#popupParticipate" data-rel="popup" data-transition="fade">'+item.name+' '+item.lastname+'</a>'+'</li>').appendTo('#pool_profile_members_list').parent().listview('refresh');
								}
								if (!--count){
									pool_profile_members_piechart = new Highcharts.Chart({
										chart: {renderTo: 'pool_profile_members_piechart',type: 'bar'},
										title: {text: 'Miembros participando'},
										tooltip: {pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'},
										plotOptions: {pie: {dataLabels: {enabled: false},showInLegend: true}},
										series: [{type: 'pie', name: 'Miembros:', data: [['No participando',response.total_group_members-i],{name: 'Participando', y: i+1, sliced: true, selected: true}]}]
									});
								}
							});
						}else{
							$('#pool_profile_members_list').append('<li>No hay miembros participando.</li>').listview('refresh');
						}
					}
				}).done(function(){
					$(".iscroll-wrapper").iscrollview("refresh");
					$.mobile.loading("hide");
				});
				if(response.pool.current_player_participating){
					$("#participate_button_container").html('<a href="#pool" onClick="pool_idPool='+idPool+';pool_idUser='+localStorage.idUser+'" data-role="button" data-transition="slide" data-corners="false" data-theme="a">Ver mi quiniela</a>').trigger('create');
				}else if(response.pool.status=="1")
					$("#participate_button_container").html('<a href="#pool" onClick="pool_idPool='+idPool+';pool_idUser='+localStorage.idUser+'" data-role="button" data-transition="slide" data-corners="false" data-theme="a">Participar</a>').trigger('create');
				if(response.pool.status!="1"){
					$.ajax({
						dataType: "jsonp",
						url: hostname+"/data/userlist.php",
						data: {idGroup: idGroup, idUser:localStorage.idUser, idPool: idPool, tabla_posiciones: true},
						success: function(response){
							if(response.success!=false){
								$.each( response.items, function( i, item ) {
									$.mobile.loading( "show");
									tiebreaker = "";
									if(item.tiebreaker != 0)
										tiebreaker = "+"+item.tiebreaker;
									$('<li><a href="#pool" onClick="pool_idPool='+idPool+';pool_idUser='+item.idUser+'" data-transition="slide">'+item.name+' '+item.lastname+' ['+item.won+'-'+item.lost+'-'+item.tied+'] '+tiebreaker+'</a>'+'</li>').appendTo('#pool_profile_standing').parent().listview('refresh');
								});
							}else{
								$('#pool_profile_members_list').append('<li>No hay miembros participando.</li>').listview('refresh');
							}
						}
					}).done(function(){
						$(".iscroll-wrapper").iscrollview("refresh");
						$.mobile.loading("hide");
					});
				}
			}else{
				location.href="#home";
			}
		}
		}).done(function(){
			$.mobile.loading("hide");
			
		});
		$('#pool_profile_info_button').click(function(e) {
			$('.pool_profile_divs').hide();
			$('#pool_profile_info_div').fadeIn();
			setTimeout(function(){$(".iscroll-wrapper").iscrollview("refresh");},500);
		});
		$('#pool_profile_stats_button').click(function(e) {
			$('.pool_profile_divs').hide();
			$('#pool_profile_stats_div').fadeIn();
			setTimeout(function(){$(".iscroll-wrapper").iscrollview("refresh");},500);
		});
		$('#pool_profile_members_button').click(function(e) {
			if(window.device)
				navigator.notification.vibrate(2000);
			if (typeof pool_profile_members_piechart != "undefined") 
				pool_profile_members_piechart.redraw();
			$('.pool_profile_divs').hide();
			$('#pool_profile_members_div').fadeIn();
			setTimeout(function(){$(".iscroll-wrapper").iscrollview("refresh");},500);
		});
	}else{
		$.mobile.changePage("#home", {
			allowSamePageTransition: true,
			transition: 'none'
		});
	}
});
$('#balance').live('pagehide', function(){
	$('#balance-table-rows').html("");
});
$('#balance').live('pagebeforeshow', function(){
	$.mobile.loading("show");
//	console.log("entro");
	$('#balance-table-rows').empty();
	$("#balance-table").tablesorter({headers:{0:{sorter:'customDate'}}});
	$.ajax({
		dataType: "jsonp",
		url: hostname+"/data/balance_list.php",
		data: {idUser: localStorage.idUser},
			success: function(response){
				if(response.success===true){           
					$.each(response.items,function(i,item){
						$('#balance-table-rows').append('<tr class="'+item.type+'"><td><b class="ui-table-cell-label">Fecha</b>'+item.date+'</td><td><b class="ui-table-cell-label">Tipo</b>'+item.description+'</td><td><b class="ui-table-cell-label">Monto</b>'+item.amount+'</td></tr>');
					});
				}
		}
	}).done(function(){
		$.mobile.loading("hide");
		var sorting = [[0,1]];
		$("#balance-table").trigger("update");
		setTimeout(function(){
			$("#balance-table").trigger("sorton",[sorting]); 
		},1500);
	});
});

$('#admin').live("pageshow", admin = function(){
	$.mobile.loading("show");
	$.ajax({
		dataType: "jsonp",
		url: hostname+"/data/list.php",
		data: {table: 'Sport'},
			success: function(response){
				if(response.success===true){           
					$.each(response.items,function(i,item){
						$('#sports_select').append('<option value="'+item.idSport+'">'+item.name+'</option>').selectmenu("refresh");
					});
				}
		}
	}).done(function(){
		$.mobile.loading("hide");
	});
	$('#sports_select').change(function(){
		$('select:not(#sports_select,#match_status) option').remove();
		$('.admin_section').slideUp();
		if($(this).val()!=0){
			$('#league_select').append('<option value="0">Selecione una liga</option>').selectmenu("refresh");
			$('#league_section').fadeIn();
			$.mobile.loading("show");
			$.ajax({
				dataType: "jsonp",
				url: hostname+"/data/list.php",
				data: {table: 'League', params: 'WHERE Sport_idSport = '+$(this).val()},
					success: function(response){
						if(response.success===true){           
							$.each(response.items,function(i,item){
								$('#league_select').append('<option value="'+item.idLeague+'">'+item.name+'</option>').selectmenu("refresh");
							});
						}
				}
			}).done(function(){
				$.mobile.loading("hide");
			});
		}
	});
	$('#league_select').change(function(a,b){
		$('select:not(#sports_select,#league_select,#match_status) option').remove();
		$('.admin_section:not(#league_section)').slideUp();
		if($(this).val()!=0){
			$('#season_select').append('<option value="0">Selecione una temporada</option>').selectmenu("refresh");
			$('#season_section').fadeIn();
			$.mobile.loading("show");
			$.ajax({
				dataType: "jsonp",
				url: hostname+"/data/list.php",
				data: {table: 'Season', params: 'WHERE League_idLeague = '+$(this).val()},
					success: function(response){
						if(response.success===true){           
							$.each(response.items,function(i,item){
								$('#season_select').append('<option value="'+item.idSeason+'">'+item.name+'</option>').selectmenu("refresh");
						});
						}
				}
			}).done(function(){
				$.mobile.loading("hide");
			});
		}
	});
	$('#season_select').change(function(a,b){
		$('select:not(#sports_select,#league_select,#season_select,#match_status) option').remove();
		$('.admin_section:not(#league_section,#season_section)').slideUp();
		if($(this).val()!=0){
			$('#fixture_select').append('<option value="0">Selecione una jornada</option>').selectmenu("refresh");
			$('#fixture_section').fadeIn();
			$.mobile.loading("show");
			$.ajax({
				dataType: "jsonp",
				url: hostname+"/data/list.php",
				data: {table: 'Fixture', params: 'WHERE Season_idSeason = '+$(this).val()},
					success: function(response){
						if(response.success===true){           
							$.each(response.items,function(i,item){
								$('#fixture_select').append('<option value="'+item.idFixture+'">'+item.name+'</option>').selectmenu("refresh");
							});
						}
				}
			}).done(function(){
				$.mobile.loading("hide");
			});
		}
	});
	$('#fixture_select').change(function(a,b){
		$('select:not(#sports_select,#league_select,#season_select,#fixture_select,#match_status) option').remove();
		$('.admin_section:not(#league_section,#season_section,#fixture_section)').slideUp();
		if($(this).val()!=0){
			$('#match_select').append('<option value="0">Selecione un partido</option>').selectmenu("refresh");
			$('#match_section').fadeIn();
			$.mobile.loading("show");
			$.ajax({
				dataType: "jsonp",
				url: hostname+"/data/list.php",
				data: {table: 'Match', params: 'm, Match_Team mt, Team t WHERE m.idMatch = mt.Match_idMatch AND mt.Team_idTeam = t.idTeam AND m.Fixture_idFixture = '+$(this).val()},
					success: function(response){
						if(response.success===true){           
							$.each(response.items,function(i,item){
								//console.log(item);
								if(i%2==0){
									temp = '<option value="'+item.idMatch+'">'+item.name+' @ ';
								}else{
									//console.log(temp+item.name+' '+'</option>');
									$('#match_select').append(temp+item.name+' '+'</option>').selectmenu("refresh");
									
									temp = "";
								}
							});
						}
				}
			}).done(function(){
				$.mobile.loading("hide");
			});
		}
	});
	$("#admin_match_popup").on('popupbeforeposition', function(){
		$(this).popup({tolerance: "45,0,53,0"});
	});
	$('#match_section a[data-icon=edit]').click(function(e) {
		$.mobile.loading("show");
		$.ajax({
			dataType: "jsonp",
			url: hostname+"/data/match.php",
			data: {idMatch: $('#match_select').val()},
				success: function(response){
					if(response.success===true){
						$('#match_datetime').val(response.matches.date.replace(/ /g,"T"));
						$('#match_scoreline').val(response.matches.scoreline);
						$('#match_status').val(response.matches.status);
						$('#match_status').selectmenu('refresh');
						
						$('#match_away_idTeam').val(response.matches.teams[0].idTeam);
						$('#match_away_teamname').val(response.matches.teams[0].name);
						$('#match_away_score').val(response.matches.teams[0].score);
						$('#match_away_scoreline').val(response.matches.teams[0].scoreline);
						$('#match_away_moneyline').val(response.matches.teams[0].moneyline);
						$('#match_away_spreadline').val(response.matches.teams[0].spreadline);
						
						$('#match_home_idTeam').val(response.matches.teams[1].idTeam);
						$('#match_home_teamname').val(response.matches.teams[1].name);
						$('#match_home_score').val(response.matches.teams[1].score);
						$('#match_home_scoreline').val(response.matches.teams[1].scoreline);
						$('#match_home_moneyline').val(response.matches.teams[1].moneyline);
						$('#match_home_spreadline').val(response.matches.teams[1].spreadline);
					}
			}
		}).done(function(){
			$('#admin_match_popup').popup('open');
			$.mobile.loading("hide");
		});
    });
	save_match = function(){
		$.mobile.loading("show");
		$.ajax({
			dataType: "jsonp",
			url: hostname+"/data/update_match.php",
			data: {idMatch: $('#match_select').val(), idTeam1: $('#match_away_idTeam').val(), score1: $('#match_away_score').val(), idTeam2: $('#match_home_idTeam').val(), score2: $('#match_home_score').val(), status: $('#match_status').val()},
				success: function(response){
					if(response.success===true){
						
					}
			}
		}).done(function(){
			$('#admin_match_popup').popup('close');
			$.mobile.loading("hide");
		});
	};
	
});