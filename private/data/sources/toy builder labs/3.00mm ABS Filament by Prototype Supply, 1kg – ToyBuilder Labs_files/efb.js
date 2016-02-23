if ( eFB == undefined )
{
	var eFB 			= {};
    
	(function() {

		// Localize $ variable
		
		var $;

		/******** Load jQuery if not present *********/
		//if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.11.2') {
			
			var script_tag = document.createElement('script');
			script_tag.setAttribute("type","text/javascript");
			script_tag.setAttribute("src",
				"//cdn.fishbowlprizes.com/efbv2/jquery-1.11.2.min.js");
			if (script_tag.readyState) {
			  script_tag.onreadystatechange = function () { // For old versions of IE
				  if (this.readyState == 'complete' || this.readyState == 'loaded') {
					  scriptLoadHandler();
				  }
			  };
			} else { // Other browsers
			  script_tag.onload = scriptLoadHandler;
			}
			// Try to find the head, otherwise default to the documentElement
			(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
		   
	/*	} 
		else{
			// The jQuery version on the window is the one we want to use
			$ = window.jQuery;
			console.log('loaded existing version of jquery');
			main();
		}*/

		/******** Called once jQuery has loaded ******/
		function scriptLoadHandler() {
			$ = window.jQuery.noConflict(true);
			main(); // Run main() once jQuery has loaded
		}

		/******** Our main function ********/
		function main() { 
		  $(document).ready(function($) { 
			  var params =	(document.getElementById('wdgtscr').src.split('?'));
			  var code = eFB.getParam('wg', params[1]);
			  eFB.code = code;
			  eFB.init(eFB.code);
		  });
		}
		
		var head  = document.getElementsByTagName('head')[0];
		var link1  = document.createElement('link');
		link1.rel  = 'stylesheet';
		link1.type = 'text/css';
		link1.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css';
		link1.media = 'all';
		head.appendChild(link1);

		var link2  = document.createElement('link');
		link2.rel  = 'stylesheet';
		link2.type = 'text/css';
		link2.href = '//fonts.googleapis.com/css?family=Montserrat';
		link2.media = 'all';
		head.appendChild(link2);

		var link3  = document.createElement('link');
		link3.rel  = 'stylesheet';
		link3.type = 'text/css';
		link3.href = '//fonts.googleapis.com/css?family=Lato';
		link3.media = 'all';
		head.appendChild(link3);

		var link4  = document.createElement('link');
		link4.rel  = 'stylesheet';
		link4.type = 'text/css';
		link4.href = 'https://cdn.fishbowlprizes.com/efbv2/fbprizes-widget.css?v=20160203_3';
		link4.media = 'all';
		head.appendChild(link4);

		var link5  = document.createElement('link');
		link5.rel  = 'stylesheet';
		link5.type = 'text/css';
		link5.href = '//fonts.googleapis.com/css?family=Raleway';
		link5.media = 'all';
		head.appendChild(link5);	
		
		var efb_protocol 	= '';
		eFB = {
			efb_url  :  efb_protocol+'//service.fishbowlprizes.com/',
			efb_cdn  :  efb_protocol+'//cdn.fishbowlprizes.com/efbv2/',
			code     : '',
			user_info: '',
			campaign : '',
			pos : 'top',
			custom_pos : '0',
			widget_ht : '0px',
			loaded : 0,
			posted : true,
			block_init :  0,
			init: function(code) {
					eFB.code = code;
					eFB.renderMainBlocks();
					eFB.getGiveAwayInfo();
			},
			getParam: function(key, strQS) {
				//var strQS = unescape(document.location.search);
				var re = new RegExp('('+key+'=){1}[^&]*', 'ig');
				x = strQS.match(re);
				if ( x != null ) { y = x.toString().split('='); return y[1]; }
				return x;
			},
			viewport: function (){
				var e = window;
				var a = 'inner';
				if (!('innerWidth' in window)){
					a = 'client';
					e = document.documentElement || document.body;
				}
				return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
			},	
			loadScript: function(url) {
				  var head = document.head;
				  var script = document.createElement("script");
				  script.setAttribute("src", url);
				  script.setAttribute('type','application/javascript');
				  head.appendChild(script);
				  head.removeChild(script);
			},		
			getGiveAwayInfo: function() {
				
				if(eFB.code != '' && eFB.code != null)
				{
					
					eFB.loadScript(eFB.efb_url+"giveaway/"+eFB.code+"?jcb=eFB.setGiveAwayInfo"); 
				}
				else
				{
					 try {eFB.setGiveAwayInfo(previewefbdata);} catch (t){}
				}
			},
			setGiveAwayInfo: function(data) {
				
				if( (document.domain == 'fishbowlprizes.com' || document.domain == 'www.fishbowlprizes.com' ) && previewefbdata == '' )
				{
					data.efb.url = '//www.fishbowlprizes.com'; 
					data.efb.image = '//cdn.fishbowlprizes.com/efbv2/images/20150916110908-10000013-Example-Prize-Giveaway.png';
					data.efb.all_total = '5352';
				}
				
				var date1 = new Date();
				var date2 = new Date(data.efb.draw_date);
				var timeDiff = date2.getTime() - date1.getTime();
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
				if(diffDays < -7 )
				{
					return;
				}
				
				eFB.campaign = data;
				var widget_settings	=	JSON.parse(eFB.campaign.efb.widget_settings);
                if(widget_settings.widget_on_off == 'off')
                {
                    return;
                }
				if(widget_settings.is_widget_paused == 'Y')
				{
						
				}else{
					eFB.renderFishbowlBlocks();
				}
			},		
			renderMainBlocks: function(){
				var vp = eFB.viewport();
				var html = '';
				if(vp.width <= 600){
					html += '<div class="fbwlprize-widget" id="fbwlprize-mobile" style="display:none;">';
					html += '		<div class="fbwlprize-widget-relative">';
					html += '			<div class="fbwlprizeWidget-trigger" id="fbwlprizeWidget-trigger-mobile">';
					html += '				<div style="position:relative"><span class="fbwlprizeWidget-icon"></span> <span class="fbptext fbwlprizeWidget-title">Test</span></div>'; //
					html += '			</div>';
					html += '	</div>';
					html += '</div>';
				}
				html += '<div class="fbwlprize-widget" id="fbwlprize-default"  style="display:none;" >';
				html += '		<div class="fbwlprize-widget-relative">';
				if(vp.width <= 600){
					html += '<a href="#" class="fbwl-mobile-close"><img src="'+eFB.efb_cdn+'images/slide-close.png"></a>';
					html += '			<div class="fbwlprizeWidget-trigger" id="fbwlprizeWidget-trigger" style="display:none;">';
				}else{
					html += '			<div class="fbwlprizeWidget-trigger" id="fbwlprizeWidget-trigger" >';
				}
				html += '					<div style="position:relative"><span class="fbwlprizeWidget-icon"></span> <span class="fbptext fbwlprizeWidget-title"></span></div>'; //
				html += '			</div>';
				html += '			<div class="fbwlprizeWidget-wrap">';
				html += '				<div class="fbwlprizeWidget-hd">';
				if(vp.width <= 600){
					html += '					<span class="fbptext fbwlprizeWidget-title"></span>';
				}
				
				html += '					<a href="#" id="fbwlprizeWidget-hdlink" target="_blank"><img id="fbwlprizeWidget-hdimg"></a>';
				html += '					<div class="fbwlprizeWidget-unverified" style="display:none;">';
				html += '					<h3>YOU\'RE NOT DONE</h3>';
				html += '						<p>Verify your email address to complete your entry.</p>';
				html += '						<p>Go check your email now!</p>';
				html += '					</div>';
				html += '					<div class="fbwlprizeWidget-hd-share">';
				html += '						<a href="javascript:;" class="fbwlprizeWidget-hd-fb" id="fbwlprizeWidget-fblink" target="_blank"><i class="fa fa-facebook"></i></a>';
				html += '						<a href="javascript:;" class="fbwlprizeWidget-hd-tw" id="fbwlprizeWidget-twtlink" target="_blank"><i class="fa fa-twitter"></i></a>';
				html += '					</div>';
				html += '				</div>';
				html += '				<div class="fbwlprizeWidget-cont">';
				html += '					<div id="fbwlprizeWidget-new"></div>';
				html += '					<div id="fbwlprizeWidget-ext"></div>';
				html += '					<div id="fbwlprizeWidget-ppd"></div>';
				html += '					<div class="fbwlprizeWidget-terms">';
				html += '						<p class="fbwlprizeWidget-powered">POWERED BY <a title="logo" href="'+efb_protocol+'//www.fishbowlprizes.com/" target="_blank">FISHBOWL PRIZES</a></p>';			
				html += '					</div>';
				html += '				</div>';
				html += '			</div>';
				html += '		</div>';
				html += '	</div>';
				 
				html += '<iframe id="efb_ifr" name="efb_ifr" style="position:absolute;top:-10px;width:0px;height:0px;" ></iframe>';
				$('body').append(html);
				
				$('body').on('click', '#fbwlprizeWidget-trigger', function(){
					 var efb_ht 			= $('.fbwlprizeWidget-wrap').css('height');
						efb_ht 				= efb_ht.replace('px','');
						efb_ht				= parseInt(efb_ht) + 2;
						efb_ht				= efb_ht + 'px';
						
						var efb_wd 			= $('.fbwlprizeWidget-wrap').css('width');
						efb_wd 				= efb_wd.replace('px','');
						efb_wd				= parseInt(efb_wd) + 2;
						efb_wd				= efb_wd + 'px';
						
						var efb_rt 			= $('.fbwlprizeWidget-wrap').css('right');
						var efb_lt 			= $('.fbwlprizeWidget-wrap').css('left');

						var btflag 			= $('.fbwlprize-widget.btflag').size();
						var ltflag 			= $('.fbwlprize-widget.ltflag').size();
						var rtflag 			= $('.fbwlprize-widget.rtflag').size();
						var is_bottom 		= $('.fbpWidgetBottomLeft').size() + $('.fbpWidgetBottomRight').size();
						var is_left			= $('.fbpWidgetLeftTop').size() + $('.fbpWidgetLeftBottom').size();	
						var is_right		= $('.fbpWidgetRightTop').size() + $('.fbpWidgetRightBottom').size(); 
						
						if( is_bottom )
						{
							if(btflag == 0){
								$('.fbwlprize-widget').css('bottom', '-'+efb_ht);
								$('.fbwlprize-widget').addClass('btflag');
							}
							else{
								$('.fbwlprize-widget').css('bottom', '0px');
								$('.fbwlprize-widget').removeClass('btflag');
							}
						}
						if( is_left )
						{
							if(ltflag == 0){
								$('.fbwlprize-widget').css('left', '-'+efb_wd);
								$('.fbwlprize-widget').addClass('ltflag');
							}
							else{
								$('.fbwlprize-widget').css('left', '0px');
								$('.fbwlprize-widget').removeClass('ltflag');
							}
						}				
						if( is_right )
						{
							if(rtflag == 0){
								$('.fbwlprize-widget').css('right', '-'+efb_wd);
								$('.fbwlprize-widget').addClass('rtflag');
							}
							else{
								$('.fbwlprize-widget').css('right', '0px');
								$('.fbwlprize-widget').removeClass('rtflag');
							}
						}
				});
				
				$('body').on('click', '#fbwlprizeWidget-trigger-mobile, .fbwl-mobile-close', function(){
					 var tpflag 			= $('.fbwlprize-widget.tpflag').length;
						if(tpflag == 0){
							$('#fbwlprize-default').css('visibility', 'visible');
							$('#fbwlprize-default').css('top', '50px');
							$('.fbwlprize-widget').addClass('tpflag');
							$('#fbwlprizeWidget-trigger-mobile').hide();
						}
						else{
							$('#fbwlprize-default').css('top', '-500px');
							$('#fbwlprize-default').css('visibility', 'hidden');
							$('.fbwlprize-widget').removeClass('tpflag');
							$('#fbwlprizeWidget-trigger-mobile').show();
						}
				});
			},
			renderFishbowlBlocks: function() {
				var html 					=   '';
				var act_url 				=   '';
				var cdata 					=	eFB.campaign;
				var days_left 				=   '';
				cdata.efb.entries			=	cdata.efb.all_total + ' Entries';
				if( cdata.efb.currency_code == 'USD' )
						cdata.efb.currency_code	=	'36';
				
				if(cdata.efb.days_left != "")
				{
					days_left 					=	cdata.efb.days_left;
					days_left 					=	days_left.replace('D', ' Days');
					days_left 					=	days_left.replace('H', ' Hours');
					days_left 					=	days_left.replace('M', ' Minutes');
					days_left					=	days_left + " left";
				}else{
					days_left 					=	cdata.efb.draw_date;
				}
				if(cdata.user == undefined || cdata.user == null || cdata.user == "")
				{
					$(".fbwlprizeWidget-unverified").hide();
					eFB.posted = false;
					html += '					 <div class="fbwlprizeWidget-prize-blk">';
					html += '						<span class="fbwlprizeWidget-entries"><i class="fa fa-ticket"></i>  '+cdata.efb.entries+'</span>';
					html += '						<span class="fbwlprizeWidget-dayslft"><i class="fa fa-calendar"></i> '+days_left+'</span>';
					html += '						<div class="fbpwidgetclearfix"></div>';
					html += '						<span class="fbwlprizeWidget-money"><i class="fa fa-money"></i> &#'+cdata.efb.currency_code+';'+cdata.efb.prize_value+' Value </span>';
					html += '					</div>';
					if(cdata.efb.days_left != "" )
					{
						html += '	<form role="form" method="post" id="efb_frm" name="efb_frm" target="efb_ifr" action="'+eFB.efb_url+'join/" onsubmit="return eFB.validateFrm();">';
						html += '		<div class="fbwlprizeWidget-form">';
						html += '		 	<input type = "hidden" name="efb_id" value="'+cdata.efb._id.$oid+'" >';
						html += ' 			<input type="hidden" name="agreed_tnc" value="true">';
						html += ' 			<input type = "hidden" name="efb_code" value="'+eFB.code+'" >';
						html += '			<input type="email" class="fbwlprizeWidget-input-email" name="email_id" id="efb_email_id" placeholder="E-mail Address">';
						html += '			<button type="submit" class="fbwlprizeWidget-btn-default" id="fbwlprizeWidget-sub">Enter To Win</button>';
						html += '		</div>';
						if(cdata.country_code == 'CA' && cdata.already_agreed_tnc == false)
						{
							html += '		<div class="fbwlprizeWidget-terms">';
							html += '		<p><input type="checkbox" class="fbwlprizeWidget-check" id="accept_efb"> By entering to win you agree to the <a title="Terms" href="'+efb_protocol+'//www.fishbowlprizes.com/terms-of-use/" target="_blank"> terms and rules </a> of this contest</p>';
							html += '		</div>';
						}
						html += '	</form> ';
					}else{
							html+='<div class="fbp-giveaway-complete"><span>This Giveaway is Complete!</span><br />Check your email, you may have won<br />Or go to the Winners page on <br /><a href="//www.fishbowlprizes.com">www.fishbowlprizes.com</a></div>';
					}
					$('#fbwlprizeWidget-new').html(html).show();
					$('#fbwlprizeWidget-ext').html('').hide();
					$('#fbwlprizeWidget-ppd').html('').hide();
				}
				else if(cdata.user.ap == 'true')
				{
						if( cdata.user.email_verified == true )
							$(".fbwlprizeWidget-unverified").hide();
						else
							$(".fbwlprizeWidget-unverified").show();
						if(cdata.efb.days_left != "" )
						{
							html += '	<div class="fbwlprizeWidget-entered">';
							html += '	<img src="'+eFB.efb_cdn+'images/fbp-entered.png">';
							if(cdata.user.shared_fb == false || cdata.user.shared_twitter == false )
							{
								html += '	<div class="fbwlprizeWidget-shareInfo">';
								html += '		Share this giveway for 5 more entries!';
								html += '	</div>';
							}
							html += '	<div class="fbwlprizeWidget-share-blk fbpwidgetclearfix">';
							if(cdata.user.shared_fb == false || cdata.user.shared_twitter == false )
							{
									if(cdata.user.shared_fb == false)
									{
										act_url = eFB.efb_url+'share/?share=fb';
										html += '<iframe id="ifr-efb-fb-share" name="ifr-efb-fb-share" src="'+eFB.efb_cdn+'fbshare.htm?efb_id='+cdata.efb._id.$oid+'&efb_code='+eFB.code+'&email_id='+cdata.user.email_id+'&url='+cdata.efb.url.replace('|','-')+'" frameborder="0" scrolling="no" width="76" height="32" style="float:left;overflow:hidden;" class="fbwlprizeWidget-fb"></iframe>';
									}else{
										html += '<a class="fbwlprizeWidget-fb"><i class="fa fa-check-circle"></i><span class="fbwlprizeWidget-entries-count">+5</span></a>';
									}
									if(cdata.user.shared_twitter == false)
									{
										act_url = eFB.efb_url+'share/?share=twitter';
										html += '<iframe id="ifr-efb-twt-share" name="ifr-efb-twt-share" src="'+eFB.efb_cdn+'twtshare.htm?efb_id='+cdata.efb._id.$oid+'&efb_code='+eFB.code+'&email_id='+cdata.user.email_id+'&url='+cdata.efb.url.replace('|','-')+'&text='+cdata.efb.tag_line+'" frameborder="0" scrolling="no" width="76" height="32" style="float:right;overflow:hidden;"  class="fbwlprizeWidget-tw"></iframe>';
									}else{
										html += '<a class="fbwlprizeWidget-tw"><i class="fa fa-check-circle"></i><span class="fbwlprizeWidget-entries-count">+5</span></a>';
									}
								
							}
							else{
								html += '<a class="fbwlprizeWidget-fb"><i class="fa fa-check-circle"></i><span class="fbwlprizeWidget-entries-count">+5</span></a>';
								html += '<a class="fbwlprizeWidget-tw"><i class="fa fa-check-circle"></i><span class="fbwlprizeWidget-entries-count">+5</span></a>';
							}
							html += '	</div>';
							html += '	<p id="fbwlprizeWidget-logged">Logged in as '+cdata.user.email_id+'.<br /><a href="javascript:;" id="fbwlprizeWidget-logout">Not you?</a></p>';
							html += '	</div>';
						}else{
							html += '					 <div class="fbwlprizeWidget-prize-blk">';
							html += '						<span class="fbwlprizeWidget-entries"><i class="fa fa-ticket"></i>  '+cdata.efb.entries+'</span>';
							html += '						<span class="fbwlprizeWidget-dayslft"><i class="fa fa-calendar"></i> '+days_left+'</span>';
							html += '						<div class="fbpwidgetclearfix"></div>';
							html += '						<span class="fbwlprizeWidget-money"><i class="fa fa-money"></i> &#'+cdata.efb.currency_code+';'+cdata.efb.prize_value+' Value </span>';
							html += '					</div>';
							html+='<div class="fbp-giveaway-complete"><span>This Giveaway is Complete!</span><br />Check your email, you may have won<br />Or go to the Winners page on <br /><a href="//www.fishbowlprizes.com">www.fishbowlprizes.com</a></div>';
						}
					
					$('#fbwlprizeWidget-new').html('').hide();
					$('#fbwlprizeWidget-ext').html(html).show();
					$('#fbwlprizeWidget-ppd').html('').hide();
				}
				else
				{
					$(".fbwlprizeWidget-unverified").hide();
					html += '					 <div class="fbwlprizeWidget-prize-blk">';
					html += '						<span class="fbwlprizeWidget-entries"><i class="fa fa-ticket"></i>  '+cdata.efb.entries+'</span>';
					html += '						<span class="fbwlprizeWidget-dayslft"><i class="fa fa-calendar"></i> '+days_left+'</span>';
					html += '						<div class="fbpwidgetclearfix"></div>';
					html += '						<span class="fbwlprizeWidget-money"><i class="fa fa-money"></i> &#'+cdata.efb.currency_code+';'+cdata.efb.prize_value+' Value </span>';
					html += '					</div>';
					if(cdata.efb.days_left != "" )
					{
						html += '	<form role="form" method="post" id="efb_frm" name="efb_frm" target="efb_ifr" action="'+eFB.efb_url+'join/" onsubmit="return eFB.validateFrm();">';
						html += '		<div class="fbwlprizeWidget-form fbwlprizeWidget-alrdy-logged">';
						html += '		 	<input type = "hidden" name="efb_id" value="'+cdata.efb._id.$oid+'" >';
						html += ' 			<input type="hidden" name="agreed_tnc" value="true">';
						html += ' 			<input type = "hidden" name="efb_code" value="'+eFB.code+'" >';
						html += '			<input type="hidden" name="email_id" id="efb_email_id" value="'+cdata.user.email_id+'">';
						html += '			<button type="submit" class="fbwlprizeWidget-btn-default" id="fbwlprizeWidget-sub">Enter To Win</button>';
						html += '		</div>';
						html += '		<div class="fbwlprizeWidget-terms">';				
							if(cdata.country_code == 'CA' && cdata.already_agreed_tnc == false)
							{
								html += '		<p><input type="checkbox" class="fbwlprizeWidget-check" id="accept_efb"> By entering to win you agree to the <a title="Terms" href="'+efb_protocol+'//www.fishbowlprizes.com/terms-of-use/" target="_blank"> terms and rules </a> of this contest</p>';
							}
						html += '		</div>';
						html += '		<p id="fbwlprizeWidget-logged">Logged in as '+cdata.user.email_id+'.<br /><a href="javascript:;" id="fbwlprizeWidget-logout">Not you?</a></p>';	
						html += '	</form> ';
					}else{
						html+='<div class="fbp-giveaway-complete"><span>This Giveaway is Complete!</span><br />Check your email, you may have won<br />Or go to the Winners page on <br /><a href="//www.fishbowlprizes.com">www.fishbowlprizes.com</a></div>';
					}

					$('#fbwlprizeWidget-new').html('').hide();
					$('#fbwlprizeWidget-ext').html('').hide();
					$('#fbwlprizeWidget-ppd').html(html).show();
				}
				
				if(eFB.block_init == 0)
				{
					eFB.initFishbowlBlocks();
					eFB.block_init = 1;
				}

				window.setTimeout(function(){ eFB.setClassicIconPosition(); }, 1000);
				window.setTimeout(function(){ eFB.setClassicIconPosition(); }, 2000);
				window.setTimeout(function(){ eFB.setClassicIconPosition(); }, 3000);
				$('.fbwlprize-widget').show();
				window.setTimeout(function(){
					$('.fbwlprizeWidget-icon').css('display','inline-block');
				},3000);
			},
			initFishbowlBlocks : function(){
				var cdata 					=	eFB.campaign;
				var widget_settings			=	JSON.parse(cdata.efb.widget_settings);
				
				$('.fbwlprizeWidget-trigger').addClass(widget_settings.callout.style);
				$('.fbwlprizeWidget-title').html(widget_settings.callout.text);
				$('.fbwlprizeWidget-trigger').css('color', widget_settings.callout.textcolor);
				$('.fbwlprizeWidget-trigger').css('background-color', widget_settings.callout.backgroundcolor);
				$('.fbwlprizeWidget-trigger').css('border-color', widget_settings.callout.bordercolor);
				
				if(widget_settings.callout.style == 'callout1-classic')
				{
					$('.fbwlprize-widget').addClass(widget_settings.callout.style);
				}
				
				$('.fbwlprize-widget').addClass('fbpWidget'+widget_settings.position+' fbpWidget-'+widget_settings.theme);
				$('.fbwlprizeWidget-icon').addClass("fbwlprizeWidget-"+widget_settings.callout.icon);
				
				var custom_position			=	(widget_settings.custom_position == '') ? 50 : widget_settings.custom_position;
				var css_pos = 'top';
				switch(widget_settings.position)
				{
					case 'LeftTop':
					case 'RightTop':
					default:
							css_pos = 'top';
						break;
					case 'LeftBottom':
					case 'RightBottom':
							css_pos = 'bottom';
						break;	
					case 'BottomLeft':
							css_pos = 'left';
						break;
					case 'BottomRight':
							css_pos = 'right';
						break;					
				}
				
				$('.fbwlprize-widget').css(css_pos, custom_position+'px' );
				
				var gw_img = cdata.efb.image;
				if (window.location.protocol == "https:" && gw_img.indexOf('http:') == 0 )
				{
					$('#fbwlprizeWidget-hdimg').attr('src', gw_img.replace("http://", "https://"));
				}
				else{
					$('#fbwlprizeWidget-hdimg').attr('src', gw_img);
				}
				$('#fbwlprizeWidget-hdlink').attr('href', cdata.efb.url.replace('|','-'));			
				$('#fbwlprizeWidget-fblink').attr('href', 'https://www.facebook.com/sharer/sharer.php?u='+cdata.efb.url.replace('|','-'));
				$('#fbwlprizeWidget-twtlink').attr('href', 'https://twitter.com/intent/tweet?url='+cdata.efb.url.replace('|','-'));
				
				$('body').on('click', '#fbwlprizeWidget-logout', function() {
					$('#efb_ifr').attr('src',eFB.efb_url+'logout/');
					eFB.posted = false;
					window.setTimeout(function(){
						eFB.getGiveAwayInfo();
					}, 2000);
				});
				
				$('body').on('click', '#fbwlprizeWidget-sub', function(event,index){
					eFB.validateFrm();
				});
				
				var vp = eFB.viewport();
				if(vp.width > 600){
					window.setTimeout(function(){
						eFB.setWidgetPosition();
					},2000);
				}else{
					if(css_pos == 'top' || css_pos == 'bottom') {
							$('.fbwlprize-widget-relative').addClass('fbwlprize-widget-relative-nonbottom');
					}
					
					$('#fbwlprize-default').css('visibility', 'hidden');
					$('#fbwlprize-default').css('top', '-500px');
					$('#fbwlprize-default').css('left', ((vp.width-284)/2)+"px");
				}
			},
			setClassicIconPosition : function(){
				var cdata 					=	eFB.campaign;
				var widget_settings			=	JSON.parse(cdata.efb.widget_settings);
				
				//For Classic
				if(widget_settings.callout.style == 'callout1-classic')
				{
					if( widget_settings.position == 'LeftBottom' ||  widget_settings.position == 'RightBottom' )
					{
						var widget_ht 			=	 $('.fbwlprizeWidget-wrap').css('height'); //test
						widget_ht 				= 	 widget_ht.replace('px','');
						$('#fbwlprize-default .fbwlprizeWidget-icon').css('top', (widget_ht - 40)+'px');
					}
				}
			},
			setWidgetPosition : function(){

					var efb_ht 			= $('.fbwlprizeWidget-wrap').css('height'); //test
					efb_ht 				= efb_ht.replace('px','');
					efb_ht				= parseInt(efb_ht) + 2;
					efb_ht				= efb_ht + 'px';
					
					var efb_wd 			= $('.fbwlprizeWidget-wrap').css('width'); //test
					efb_wd 				= efb_wd.replace('px','');
					efb_wd				= parseInt(efb_wd) + 2;
					efb_wd				= efb_wd + 'px';
					
					var btflag 			= $('.fbwlprize-widget.btflag').size();
					var ltflag 			= $('.fbwlprize-widget.ltflag').size();
					var rtflag 			= $('.fbwlprize-widget.rtflag').size();
					var is_bottom 		= $('.fbpWidgetBottomLeft').size() + $('.fbpWidgetBottomRight').size();
					var is_left			= $('.fbpWidgetLeftTop').size() + $('.fbpWidgetLeftBottom').size();	
					var is_right		= $('.fbpWidgetRightTop').size() + $('.fbpWidgetRightBottom').size(); 
					
					if( is_bottom )
					{
						if(btflag == 0){
							$('.fbwlprize-widget').css('bottom', '-'+efb_ht);
							$('.fbwlprize-widget').addClass('btflag');
						}
					}
					if( is_left )
					{
						if(ltflag == 0){
							$('.fbwlprize-widget').css('left', '-'+efb_wd);
							$('.fbwlprize-widget').addClass('ltflag');
						}
					}
					if( is_right )
					{
						if(rtflag == 0){
							$('.fbwlprize-widget').css('right', '-'+efb_wd);
							$('.fbwlprize-widget').addClass('rtflag');
						}
					}
			},
			validateFrm : function(){
				if( $('#fbwlprizeWidget-sub').attr('rel') == 'efb-dn' ) return false;
				var email = $('#efb_email_id').val();
				var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
				if( !re.test(email) ) {
					$("#efb_email_id").css('border-color','red');
					$("#efb_email_id").val('');
					$("#efb_email_id").attr('placeholder','Enter Valid Email Address');
					return false;
				}else{
					$("#efb_email_id").css('border-color','');
				}
				if($('#accept_efb').prop('checked') == false) { alert('Please agree to our terms and conditions'); return false; }
				$('#fbwlprizeWidget-sub').attr('rel','efb-dn');
				document.efb_frm.submit();
				eFB.posted = false;
				window.setTimeout(function(){
					eFB.getGiveAwayInfo();
				}, 2000);
			}		
		}

	})(); // We call our anonymous function immediately
}