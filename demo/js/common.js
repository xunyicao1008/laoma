
/**
 * 公共的js等
 */
	/****************************mustache********************************/	
	
	/**
	 * 解析mustache模版
	 * 1.options: 参数
	 * selector: 目标节点,
	 * data: 模版数据(json对象),
	 * url: 模版路径,
	 * extend: 额外的数据扩展(json对象),
	 * partial: 子模版参数{json对象}
	 * 如下:
	 * {
	 * 	"selector": ".tabbable",
	 * 	"data": data,
	 * 	"url": "pages/mst/travelMg/ticket/ticket_list/ticket_list.mst",
	 * 	"extend": extend,
	 * 	"partial": {
	 * 		"ticket_date": "pages/mst/travelMg/ticket/ticket_list/ticket_date.mst",
	 * 		"ticket_list_body": "pages/mst/travelMg/ticket/ticket_list/ticket_list_body.mst"
	 * 	}
	 * }
	 * 2.callback: 回调函数
	 * 
	 */
	function mstRender(options, callback){
		
		if(options && typeof options === 'object'){
			var selector = options.selector;
			var data = options.data;
			var templeteUrl = options.url;
			var templeteSelector = options.templete;
			var extend = options.extend;
			var partial = options.partial;
			
			var d = new Date();
			var rendered = "";
			if(templeteSelector){
				var tempHtml = $(templeteSelector).html();
				$.extend(true, data, extend);
				data = data ? data : {};
				rendered = Mustache.render(tempHtml, data);
		    	if(selector){
		    		$(selector).html(rendered);
		    	}
		    	if(callback){//回调
		    		callback(rendered);
		    	}				
			}else{
				$.ajax({
					async: false,
					type: "GET",
					url: templeteUrl,
					data: "_t=" + d.getTime(),
					success: function(tpl){
						$.extend(true, data, extend);//深度拷贝是否需要?
						data = data ? data : {};//return {} if data is invalid
				    	Mustache.parse(tpl);
				    	//partial options 子模版
				    	if(partial && typeof partial === 'object'){
				    		$.each(partial, function(name, url){
					    		$.ajax({
					    			async: false,//由于在循环里，这里使用同步请求
					    			type: "GET",
					    			url: url,
					    			data: "_t=" + d.getTime(),
					    			success: function(pTpl){
					    				partial[name] = pTpl;
					    			}
					    		});		    			
				    		});
				    	}
				    	rendered = Mustache.render(tpl, data, partial);
				    	if(selector){
				    		$(selector).html(rendered);
				    	}
				    	if(callback){//回调
				    		callback(rendered);
				    	}
					}
				});				
			}
			return rendered;
		}
	}
	
	
	
	/****************************获取url后面拼接的参数********************************/	
	
	//获取url后面拼接的参数
	function getUrlParams(key, url){
		var params = {};
		var url = url ? url : window.location.href;
		var pos = url.lastIndexOf("?");
		if(pos > 0){
			var paraStr = url.substring(pos + 1);
			var params = _convertParaStrToObject(paraStr);
			if(params){
				return key ? params[key] : params;
			}
		}else{
			return "";
		}
	}	
	
	//设置url参数
	function setUrlParams(url, params){
		if(url && params){
			var str = "";
			if(typeof params === 'string'){
				str = params;
			}
			if(typeof params === 'object'){
				$.each(params, function(key, value){
					if(key && value){
						if(typeof value === 'object'){
							value = JSON.stringify(value);
						}
						str += key + "=" + encodeURI(value) + "&";
					}
				});
			}
			if(url.indexOf("?") != -1){
				url += "&" + str;
			}else{
				url += "?" + str;
			}
		}
		return url;
	}
	
	//将url参数(如：name=jack&age=18&sex=1)转换为json对象
	function _convertParaStrToObject(paraStr){
		if(paraStr){
			var params = {};
			var arr = paraStr.split("&");
			for(var i = 0; i < arr.length; i ++){
				if(arr[i]){
					var para = arr[i].split("=");
					if(para && para.length == 2){
						params[para[0]] = decodeURI(para[1]);
					}
				}
			}
			return params;		
		}
	}
	
	//得到表单参数,利用formSerialize()方法序列化表单，然后再次解析，转换成json对象
	function getFormParams($form){
		if($form){
			var paraStr = $form.formSerialize();
			return _convertParaStrToObject(paraStr);
		}
	}
	
	