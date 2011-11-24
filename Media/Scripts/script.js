$(document).ready(function(){
	var loc="http://127.0.0.1:8000/";
	var frame_loc="";
	
	$.fn.textNodes = function() {
		var ret = [];
		$.each(this[0].childNodes, function() {
			if (!($.nodeName(this, "script"))){
				if ( this.nodeType == 3 || $.nodeName(this, "br") ) 
					if($(this).text().length()>0){
						ret.push( this );
					}
				else $.each(this.childNodes, arguments.callee);
			}
		});
		return $(ret);
	}
	
	function get_base_url(){
		frame_loc=document.getElementById("web_reader").contentWindow.location.href;
		frame_loc=frame_loc.replace(/.*lingo\/proxy\?mediate_uri\=/i, "");
		return decodeURIComponent(frame_loc);
	}
	
	function basify(url){
		href=get_base_url();
		base=href.match(/(http\:\/\/)?[^\/]*/)[0]+"/";
		if (url.indexOf("http://")==0){
			return url;
		}
		if (url.indexOf("/")==0){
			return base+url;
		}
		return href+url;
	}
	
	function rewrite(url){
		url=basify(url);
		return url;
	}
	
	function proxy_rewrite(url){
		url=basify(url)
		url=encodeURIComponent(url);
		return (loc+"lingo/proxy?mediate_uri="+url);
	}
	
	$("#web_reader").load(function(){
		$(this).contents().find('a').each(function(){
			href=$(this).attr("href");
			if(href!=undefined){
				$(this).attr("href", proxy_rewrite(href));
			}
		});
		
		nodes=$("#web_reader").contents().find('body').textNodes();
		nodes.each(function(){
		});
		/*
		$(this).contents().find('script').each(function(){
			href=$(this).attr("src");
			if(href!=undefined){
				$(this).attr("src", rewrite(href));
			}
		});

		$(this).contents().find('img').each(function(){
			href=$(this).attr("src");
			if(href!=undefined){
				$(this).attr("src", rewrite(href));
			}
		});

		$(this).contents().find('link').each(function(){
			href=$(this).attr("href");
			if(href!=undefined){
				$(this).attr("href", rewrite(href));
			}
		});
		*/
	});
});