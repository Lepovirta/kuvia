(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var utils=require("./utils");function DomTools(window){this.window=window}DomTools.prototype.isIE=function(){return window.navigator.appVersion.indexOf("MSIE")!==-1};DomTools.prototype.getElementsByIds=function(ids){var doc=window.document;return utils.mapForKeys(ids,function(id){return doc.getElementById(id)})};DomTools.prototype.onLoad=function(fun){var doc=this.window.document;if(/in/.test(doc.readyState)){if(this.isIE())window.setTimeout(fun,9);else window.setTimeout(fun,9,false)}else{this.load(fun)}};DomTools.prototype.onKeyDown=function(handlermap){onEventNoPrevent(window,"keydown",function(e){var handler=handlermap[e.keyCode];if(typeof handler==="function"){handler(e);e.preventDefault()}})};var onEvent=function(obj,evname,fun){var handler=function(e){fun(e);e.preventDefault()};onEventNoPrevent(obj,evname,handler)};var onEventNoPrevent=function(obj,evname,fun){if(obj instanceof NodeList){utils.forEach(obj,function(el){addevent(el,evname,fun)})}else{addevent(obj,evname,fun)}};var addevent=function(el,evname,fun){if(typeof el.addEventListener==="function"){el.addEventListener(evname,fun,false)}else if(typeof el.attachEvent==="function"){el.attachEvent("on"+evname,handler)}else{console.log("Failed to attach event",el)}};var hasCssClass=function(element,cssClass){return element.className.indexOf(cssClass)>=0};var addCssClass=function(element,cssClass){element.className+=" "+cssClass};var removeCssClass=function(element,cssClass){var re=new RegExp("(\\s|^)"+cssClass+"(\\s|$)");element.className=element.className.replace(re,"")};var hide=function(element){if(element){element.style.display="none"}};var show=function(element,displayType){if(typeof displayType!=="string"){displayType="inline"}if(element){element.style.display=displayType}};var clearNode=function(node){while(node.hasChildNodes()){node.removeChild(node.lastChild)}};exports.DomTools=DomTools;exports.onEventNoPrevent=onEventNoPrevent;exports.onEvent=onEvent;exports.hasCssClass=hasCssClass;exports.addCssClass=addCssClass;exports.removeCssClass=removeCssClass;exports.hide=hide;exports.show=show;exports.clearNode=clearNode},{"./utils":7}],2:[function(require,module,exports){var StateList=require("./statelist").StateList;function Gallery(display,imageFactory){this.display=display;this.imageFactory=imageFactory;this.images=new StateList;display.addNextHandler(this.next.bind(this));display.addPreviousHandler(this.previous.bind(this))}Gallery.prototype.initialize=function(urls){var that=this;this.images.setList(this.createImages(urls));this.display.setImages(this.images.list);this.showCurrentImage()};Gallery.prototype.createImages=function(urls){var that=this;var onclick=function(){that.next()};var createImage=function(url){var image=that.imageFactory(url,onclick);image.addLinkOnClick(function(e){that.showImage(image)});return image};return urls.map(createImage)};Gallery.prototype.showImage=function(image){this.hideCurrentImage();image.show();this.images.setCurrentItem(image);this.setImageInfo()};Gallery.prototype.hideCurrentImage=function(){this.images.currentItem().hide()};Gallery.prototype.showCurrentImage=function(){this.images.currentItem().show();this.setImageInfo()};Gallery.prototype.next=function(){this.hideCurrentImage();var image=this.images.next();image.show();this.setImageInfo()};Gallery.prototype.previous=function(){this.hideCurrentImage();var image=this.images.previous();image.show();this.setImageInfo()};Gallery.prototype.setImageInfo=function(){var current=this.images.currentIndex+1;var total=this.images.lastIndex()+1;this.display.setImageInfoHtml(current+"/"+total)};exports.Gallery=Gallery},{"./statelist":6}],3:[function(require,module,exports){var dt=require("./domtools");function Image(document,src,onclick){this.src=src;this.shown=false;this.text=createTextFromSrc(src);this.image=createImageElement(document,onclick);this.link=createTextLink(document,src,this.text)}var createTextFromSrc=function(src){return src.substring(src.lastIndexOf("/")+1,src.length)};var createTextLink=function(document,src,text){var link=document.createElement("a");link.href="#";link.appendChild(document.createTextNode(text));return link};var createImageElement=function(document,onclick){var img=document.createElement("img");if(typeof onclick==="function"){img.onclick=onclick}return img};Image.prototype.loadImage=function(){if(this.image.src!==this.src){this.image.src=this.src}};Image.prototype.toggle=function(){if(this.shown){this.hide()}else{this.show()}};Image.prototype.hide=function(){dt.removeCssClass(this.image,"show");dt.removeCssClass(this.link,"show");this.shown=false};Image.prototype.show=function(){this.loadImage();dt.addCssClass(this.image,"show");dt.addCssClass(this.link,"show");this.shown=true};Image.prototype.setImageOnClick=function(handler){this.image.onclick=handler};Image.prototype.addLinkOnClick=function(handler){dt.onEvent(this.link,"click",handler)};var imageFactory=function(window){return function(src,onclick){return new Image(window.document,src,onclick)}};exports.Image=Image;exports.imageFactory=imageFactory},{"./domtools":1}],4:[function(require,module,exports){var dt=require("./domtools");var utils=require("./utils");var callEach=function(items,args){utils.forEach(items,function(item){item.apply(null,args)})};var createView=function(window){var that={},domtools=new dt.DomTools(window),elementIds=["previous","next","imginfo","imgarea","linksarea","sidebar"],elements={},nextHandlers=[],previousHandlers=[];that.initialize=function(){elements=domtools.getElementsByIds(elementIds);addClickHandlerForElement(elements.next,callNextHandlers);addClickHandlerForElement(elements.previous,callPreviousHandlers);addToggleSideBarHandler();domtools.onKeyDown({32:that.toggleSidebar,37:callPreviousHandlers,39:callNextHandlers})};var callNextHandlers=function(){callEach(nextHandlers)};var callPreviousHandlers=function(){callEach(previousHandlers)};var addClickHandlerForElement=function(element,handler){dt.onEvent(element,"click",function(e){e.preventDefault();handler()})};var addToggleSideBarHandler=function(){var togglers=window.document.getElementsByClassName("toggle_sidebar");dt.onEvent(togglers,"click",that.toggleSidebar)};that.toggleSidebar=function(){var sidebar=elements.sidebar;if(dt.hasCssClass(sidebar,"show")){dt.removeCssClass(sidebar,"show")}else{dt.addCssClass(sidebar,"show")}};that.addNextHandler=function(handler){nextHandlers.push(handler)};that.addPreviousHandler=function(handler){previousHandlers.push(handler)};that.setImageInfoHtml=function(html){elements.imginfo.innerHTML=html};that.setImages=function(images){var linksareaFragment=createDocumentFragment(),imgareaFragment=createDocumentFragment();utils.forEach(images,function(image){linksareaFragment.appendChild(createListElement(image.link));imgareaFragment.appendChild(image.image)});setChildElement(elements.linksarea,linksareaFragment);setChildElement(elements.imgarea,imgareaFragment)};var createListElement=function(element){var listElement=window.document.createElement("li");listElement.appendChild(element);return listElement};var createDocumentFragment=function(){return window.document.createDocumentFragment()};var setChildElement=function(parent,child){dt.clearNode(parent);parent.appendChild(child)};return that};exports.createView=createView},{"./domtools":1,"./utils":7}],5:[function(require,module,exports){(function(window,console){var Gallery=require("./gallery").Gallery,view=require("./instantgalleryview"),image=require("./image"),DomTools=require("./domtools").DomTools;var dt=new DomTools(window),factory=image.imageFactory(window),display=view.createView(window),gallery=new Gallery(display,factory);dt.onLoad(function(){display.initialize();gallery.initialize(window.imagelist);window.instantgallery=gallery})}).call(null,window,console)},{"./domtools":1,"./gallery":2,"./image":3,"./instantgalleryview":4}],6:[function(require,module,exports){function StateList(listItems){this.list=listItems;this.currentIndex=0}StateList.prototype.setList=function(listItems){this.list=listItems;this.currentIndex=0};StateList.prototype.currentItem=function(){return this.list[this.currentIndex]};StateList.prototype.next=function(){this.setCurrentIndex(this.currentIndex+1,0);return this.currentItem()};StateList.prototype.setCurrentIndex=function(index,fallback){if(this.isIndexOutOfBounds(index)){this.currentIndex=fallback}else{this.currentIndex=index}};StateList.prototype.isIndexOutOfBounds=function(index){return index<0||index>this.lastIndex()};StateList.prototype.lastIndex=function(){return this.list.length-1};StateList.prototype.previous=function(){this.setCurrentIndex(this.currentIndex-1,this.lastIndex());return this.currentItem()};StateList.prototype.setCurrentItem=function(item){var index=this.list.indexOf(item);this.setCurrentIndex(index,this.currentIndex)};exports.StateList=StateList},{}],7:[function(require,module,exports){var forEach=function(obj,cb){for(var i=0;i<obj.length;i++){cb(obj[i],i,obj)}};var mapForKeys=function(items,cb){var obj={};forEach(items,function(item){obj[item]=cb(item)});return obj};exports.forEach=forEach;exports.mapForKeys=mapForKeys},{}]},{},[5]);