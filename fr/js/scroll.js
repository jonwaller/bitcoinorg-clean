function addEvent(a,b,c){return (a.addEventListener)?a.addEventListener(b,c,false):(a.attachEvent)?a.attachEvent('on'+b,c):false;}

function removeEvent(a,b,c){return (a.removeEventListener)?a.removeEventListener(b,c,false):(a.detachEvent)?a.detachEvent('on'+b,c):false;}

function cancelEvent(e){(e.preventDefault)?e.preventDefault():e.returnValue=false;}

function getEvent(e,a){
if(!e)var e=window.event;
switch(a){
case 'type':return e.type;
case 'target':return (e.target&&e.target.nodeType==3)?e.target.parentNode:(e.target)?e.target:e.srcElement;
case 'key':return (e.charCode)?e.charCode:(e.which)?e.which:e.keyCode;
case 'mousex':return (e.pageX||e.pageX===0)?e.pageX:e.clientX+document.documentElement.scrollLeft;
case 'mousey':return (e.pageY||e.pageY===0)?e.pageY:e.clientY+document.documentElement.scrollTop;
}
}

function move(a,b,c,d,e){
//a is the node.
//b is the final left in px
//c is the final top in px
//[d] is the time that the animation should take,in milliseconds.
//[e] is the function to launch when the animation completed.
if(typeof(d)!='number')var d=400;
if(typeof(e)!='function')var e=function(){};
if(a.getAttribute('movestatus')!=null){clearInterval(a.getAttribute('movestatus'));a.removeAttribute('movestatus');}
switch(getStyle(a,'position')){
case 'fixed':
case 'absolute':
	var ple=a.offsetLeft;
	var pto=a.offsetTop;
break;
default:
	var pp=a.style.backgroundPosition;
	if(typeof(pp)==='undefined'||pp=='')pp='0px 0px';
	pp=pp.split(' ');
	var ple=parseInt(pp[0].replace('px',''));
	var pto=parseInt(pp[1].replace('px',''));
	if(isNaN(ple))ple=0;
	if(isNaN(pto))pto=0;
}
if(typeof(b)=='number'&&b!=ple){var le=b;var dle=le-ple;}
else var le=false;
if(typeof(c)=='number'&&c!=pto){var to=c;var dto=to-pto;}
else var to=false;
var end=function(){if(le!==false){a.style.left=le+'px';}if(to!==false){a.style.backgroundPosition='0px '+to.toFixed(0)+'px';}clearInterval(a.getAttribute('movestatus'));a.removeAttribute('movestatus');e();}
var oti=new Date().getTime();
if(to!==false)a.setAttribute('movestatus',setInterval(function(){var ti=new Date().getTime()-oti;if(ti>=d){end();return;}var p=ti/d;p=p*(1+(0.5*(1-p)));a.style.backgroundPosition='0px '+(pto+(dto*p)).toFixed(0)+'px';},10));
else end();
}

function getStyle(a,b){
if(window.getComputedStyle)return document.defaultView.getComputedStyle(a,null).getPropertyValue(b);
var n=b.indexOf('-');
if(n!==-1)b=b.substr(0,n)+b.substr(n+1,1).toUpperCase()+b.substr(n+2);
return a.currentStyle[b];
}

function debug(a){
if(!document.getElementById('debug'))document.body.appendChild(create('DIV',{'id':'debug'}));
var t=document.getElementById('debug');
t.insertBefore(document.createElement('BR'),t.firstChild);
t.insertBefore(document.createElement('BR'),t.firstChild);
t.insertBefore(document.createTextNode(a),t.firstChild);
}

function create(a,b,c){
if(typeof(b)=='undefined'||b==null)var b=[];
if(typeof(c)=='undefined'||c==null)var c=[];
var g=document.createElement(a);
for(var i in b){
	//Dumb Internet Explorer
	switch(i){
	case 'style':g.style.cssText=b[i];
	break;
	case 'class':g.className=b[i];
	break;
	default:g.setAttribute(i,b[i]);
	}
}
for(var n=c.length,i=0;i<n;i++)g.appendChild(c[i]);
return g;
}

window.onscroll=function(){
	var o=(window.pageYOffset) ? window.pageYOffset : document.documentElement.scrollTop;
	move(document.getElementById('back1'),null,o*-1.5);
	move(document.getElementById('back2'),null,o*-0.4);
};
