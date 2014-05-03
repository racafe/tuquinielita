/*
 *  metro.js - Win8 Metro UI onclick effect [custom]
 *  USO: $(CLASS, ID OR ELEMENT).metro();
 */

(function($){
	$.fn.metro = function(){

		return $(this).each(function(i,e){
			
			var el = $(this),
				duration = 100;
			/* animation data */
			el.data('metro',{
						clicking:   false,
						origin:     0,
						ang:        10,
						orizorvert: 0
					})
			/* better antialiasing */
			if(el.css('box-shadow')=='none')
				el.css({'box-shadow':'0 0 1px transparent'})
			el.parent().css({
				'-webkit-perspective':el.outerWidth()*5,
				'perspective':el.outerWidth()*5,
			})
			el.mousedown(function(e){
				var mouse = {
						x:e.pageX-el.offset().left,
						y:e.pageY-el.offset().top
					},
					metro=$(this).data('metro');
					metro.clicking=true;
				if( mouse.x < el.outerWidth()/3 ){
					metro.orizorvert = 1;
					metro.origin = 100;
					metro.ang = -metro.ang;
					/* left */
				}else if(mouse.x > parseInt(el.outerWidth()*2/3)){
					metro.orizorvert = 1;
					/* right */
				}else{
					if(mouse.y < el.outerHeight()/3){
						metro.orizorvert = 2;
						metro.origin = 100;
						/* top */
					}else if(mouse.y > parseInt(el.outerHeight()*2/3)){
						metro.orizorvert = 2;
						metro.ang = -metro.ang;
						/* bottom */
					}
				}
				el.data('metro',metro)
					el
						.css({'-webkit-transform-origin':'','-moz-transform-origin':''})
						.animate({'text-indent':el.css('text-indent')},{duration:duration, step: function(now,fx){
							anim = 'scale('+(1- Math.sin(fx.pos*Math.PI/2)/10)+')'
							el.css({
									'-webkit-transform' : anim,
									'-moz-transform'	: anim,
									'-o-transform'		: anim,
									'-ms-transform'		: anim,
									'transform'			: anim
								})
						},queue:false})
						.delay(duration)
			}).mouseup(function(e){
				var a = el.data('metro');
				if( a.clicking==true ){
						el
							.animate({'text-indent': el.css('text-indent')},{duration:duration, step: function(now,fx){
								anim = 'scale('+(1- Math.cos(fx.pos*Math.PI/2)/10)+')';
								el.css({
										'-webkit-transform' : anim,
										'-moz-transform'	: anim,
										'-o-transform'		: anim,
										'-ms-transform'		: anim,
										'transform'			: anim
									})
							},queue:false})
							.delay(duration)
					el.data('metro',{
								clicking:   false,
								origin:     0,
								ang:        10,
								orizorvert: 0
							})
				}
			}).mouseout(function(){
				if( el.data('metro').clicking ){
						el.mouseup();
				}
			}).click(function(){
				//document.getElementById('click').play();
			})
		})
	}
})(jQuery)