(function(){
	//ADS命名空间
	if(!window.ADS){
		window.ADS={};
	}
	
	function isCompatible(other){
		//能力检测
		if(other===false
			||!Array.prototype.push
			||!Object.hasOwnProperty
			||!document.createElement
			||!document.getElementsByName
		){
			return false;
		}
		
		return true;
	}

	window.ADS.isCompatible=isCompatible;
	
	function $(){
		var elements=new Array();
		//查找作为参数提供的所有参数
		
		for(var i=0;i<arguments.length;i++){
			var element=arguments[i];
			//如果该参数是字符串，假设该参数为id
			if(typeof element=='string'){
				element=document.getElementById(element);
			}
			
			//如果只提供了一个参数，则立即返回这个参数
			if(arguments.length==1){
				return element;
			}
			//否则添加到数组中
			elements.push(element);
			
		}
		
		//返回包含元素的数组
		return elements;
		
	}
	
	window.ADS.$=$;
	
	function addEvent(node,type,listener){
		//兼容性监测，平稳降级
		if(!isCompatible()){return false;}
		
		if(!(node=$(node))){return false;}
		
		if(node.addEventListener){
			node.addEventListener(type,listener,false);
			return true;
		}else if(node.attachEvent){
			//MSIE事件绑定处理
			node['e'+type+listener]=listener;
			node[type+listener]=function(){
				node['e'+type+listener](window.event)
			}
			
			node.attachEvent('on'+type,node[type+listener]);
			
			return true;
		}
		
		//若两种都不支持，则直接返回false
		return false;
		
	}
	
	window.ADS.addEvent=addEvent;
	
	function removeEvent(node,type,listener){
		if(!(node=$(node))){return false;}
		
		if(node.removeEventListener){
			node.removeEventListener(type,listener,false);
			return true;
		}else if(node.detachEvent){
			//MSIE事件绑定处理

			node.detachEvent('on'+type,node[type+listener]);
			node[type+listener]=null;
			return true;
		}
		
		//若两种都不支持，则直接返回false
		return false;
	}
	
	window.ADS.removeEvent=removeEvent;
	
	
	function getElementsByClassName(className,tag,parent){
		parent=parent||document;
		
		if(!(parent=$(parent))){
			return false;
		}
		
		//查找所有匹配的标签
		var allTags=(tag=='*'&&parent.all)?parent.all:parent.getElementsByTagName(tag);
		
		var matchingElements=new Array();
		
		//处理下className中的连接符
		className==className.replace(/\-/g,'\\-');
		//创建一个className的正则表达式
		var regex=new RegExp('(^|\\s))'+className+'(\\s|$)');
		
		var element;
		
		for(var i=0;i<allTags.length;i++){
			element=allTags[i];
			//如果匹配
			if(regex.test(element.className)){
				matchingElements.push(element);
			}
		}
		
		//返回所有匹配的元素
		return matchingElements;
		
	}
	
	window.ADS.getElementsByClassName=getElementsByClassName;
	
	function toggleDisplay(node,value){
		if(!(node=$(node)){return false;}
		if(node.style.display!=='none'){
			node.style.display='none';
		}else{
			node.style.display=value||'';
		}
		
		return true;
	}
	
	window.ADS.toggleDisplay=toggleDisplay;
	
	function insertAfter(node,referenceNode){
		if(!(node=$(node)) return false;
		if(!(referenceNode=$(referenceNode)) return false;
		return referenceNode.parentNode.insertBefore(node,referenceNode.nextSibling)
	}
	
	window.ADS.insertAfter=insertAfter;
	
	
	function removeChildren(parent){
		if(!(parent=$(parent)) return false;
		
		//存在该子节点时删除该子节点
		while(parent.firstChild){
			parent.firstChild.parentNode.removeChild(parent.firstChild);
		}
		
		//再返回父节点，以实现链式语法
		return parent;
	}
	
	window.ADS.removeChildren=removeChildren;
	
	function prependChild(parent,newChild){
		if(!(parent=$(parent)) return false;
		if(!(newChild=$(newChild)) return false;
		
		
		if(parent.firstChild){
			//如果存在子节点，在这个子节点之前插入
			parent.insertBefore(newChild,parent.firstChild);
		}else{
			//如果没有，直接添加
			parent.appendChild(newChild);
		}
		//再返回父节点，以实现链式语法
		return parent;
	}
	
	window.ADS.prependChild=prependChild;
	
})()
