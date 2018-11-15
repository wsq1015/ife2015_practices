/*判断是否是数组 */
function isArray(arr){
    return typeof (arr) === "object" && Object.prototype.toString.call(arr) === "[object Array]";
}
/*判断是否是函数*/
function isFunction(fn){
    return typeof (fn) === "function";
}
/**深度复制，被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等 */
function cloneObject(src){
    var result;
    switch(Object.prototype.toString.call(src))
    {
        case '[object Number]':
        result=(typeof src==='object')?new Number(src):parseInt(src.toString());
        break;
        case '[object String]':
        result=(typeof src==='object')?new String(src):src.toString();
        break;
        case '[object Boolean]':
        result=(typeof src=='object')?new Boolean(src):src;
        break;
        case '[object Date]':
        result=new Date(src);
        break;
        case '[object Array]':
        result=[];
        for (var i in src) {
            if (src.hasOwnProperty(i)) {
                if(typeof src[i]==='object'){
                    result[i]=cloneObject(src[i]);
                }else{
                    result[i]=src[i];
                } 
            }
        }
        break;
        case '[object Object]':
        result={};
        for (var i in src) {
            if (src.hasOwnProperty(i)) {
                if(typeof src[i]==='object'){
                    result[i]=cloneObject(src[i]);
                }else{
                    result[i]=src[i];
                } 
            }
        }
        break;
    }
    return result;
}
/**对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组 */
function uniqArray(arr){
    var array=new Array();
    for (var i = 0; i < arr.length; i++) {
        if(array.indexOf(arr[i])===-1){
            array.push(arr[i]);
        }
    }
    return array;
}
/**实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符,假定空白字符只有半角空格、Tab */
function simpleTrim(str){
    var newStr;
    for(var i=0;i<str.length;i++){
        if(str[i]!=' '&&str[i]!='\t'){
           break;
        }
    }
    for(var j=str.length-1;j>0;j--){
        if(str[j]!=' '&&str[j]!='\t'){
            break;
        }
    }
    newStr=str.slice(i,j+1);
    return newStr;
}
/**对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串 */
function trim(str){
    var newStr;
    newStr=str.replace(/^\s+|\s+$/g,"");
    return newStr;
}
/**实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递 */
function each(arr,fn){
    for(var i=0;i<arr.length;i++){
       fn(arr[i],i);
    }
}
/**获取一个对象里面第一层元素的数量，返回一个整数 */
function getObjectLength(obj){
    var num=0;
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            num++;
        }
    }
    return num;
}
/**判断是否为邮箱地址 */
function isEmail(emailStr){
    var reg=/^(\w+\.)*\w+@\w+(\.\w+)+$/;
    console.log(reg.test(emailStr));
}
/**判断是否为手机号 */
function isMobilePhone(phone){
    var reg=/^1[3|5|8][0-9]{9}$/;
    console.log(reg.test(phone));
}

/**DOM */
/**element增加一个样式名为newClassName的新样式 */
/**element中是否含有newClassName */
function hasClass(element,sClass){
    return element.className.match(new RegExp("(\\s+|^)"+sClass+"(\\s+|$)"));
}
function addClass(element,newClassName){
    if(!hasClass(element,newClassName)){
        element.className+=' '+newClassName;
    }
}
/**移除element中的样式oldClassName */
function removeClass(element,oldClassName){
    if(hasClass(element,oldClassName)){
        var reg=new RegExp("(\\s+|^)"+oldClassName+"(\\s|$)");
        element.className=element.className.replace(reg,'');
    }
    element.className.replace(oldClassName,'');
}
/** 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值 */
function isSiblingNode(element,siblingNode){
    return element.parentNode===siblingNode.parentNode;
}
/**获取element相对于浏览器窗口的位置，返回一个对象{x, y} */
function getPosition(element){
    var obj={};
    obj.x=element.getBoundingClientRect().left+Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
    obj.y=element.getBoundingClientRect().top+Math.max(document.documentElement.scrollTop,document.body.scrollTop);
    return obj;
}
/**实现一个简单的Query */
// function $(selector){
//     var firstChat=selector.charAt(0);
//     if(firstChat=='#'){
//         var len=selector.split(' ');
//         if(len.length==1){
//             return document.getElementById(selector.slice(1,selector.length))
//         }
//         else{
//             var resu=[];
//             var getId=document.getElementById(len[0].slice(1,len[0].length));
//             for(var i=0;i<getId.children.length;i++){
//                 if(getId.children[i].className==len[1].slice(1,len[1].length)){
//                     resu.push(getId.children[i]);
//                 }
//             }
//             return resu[0];
//         }
//     }else if(firstChat=='.'){
//         return document.getElementsByClassName(selector.slice(1,selector.length))[0];
//     }else if(firstChat=='['){
//         if(selector.match(/=/)){
//             var index=selector.indexOf('=');
//             var s1=selector.slice(1,index);
//             var s2=selector.slice(index+1,selector.length-1);
//             var all=document.getElementsByClassName('*');
//             var res=[];
//             for(var i=0;i<all.length;i++){
//                 if(all[i].getAttribute(s1)&&all[i].getAttribute(s1)===s2){
//                     res[i].push(all[i]);
//                 }
//             }
//             return res[0];
//         }else{
//             var s=selector.slice(1,slice.length-1);
//             var all=document.getElementsByClassName('*');
//             var res=[];
//             for(var i=0;i<all.length;i++){
//                 if(all[i].getAttribute(s)){
//                     res.push(all[i]);
//                 }
//             }
//             return res[0];
//         }
//     }else{
//         return document.getElementsByTagName(selector)[0];
//     }
// }
function $(selector){
    var element=[];
    var allChildren=null;
    root=root||document;
    switch(selector.charAt(0)){
        case '#':
        break;
        case '.':
        if(root.getElementBysByClassName){
            element=root.getElementBysByClassName(selector.subString(1));
        }else{
            allChildren=root.getElementsByClassName('*');
            var reg=new RegExp('\\b'+selector.subString(1)+'\\b');
            for(var i=0;i<allChildren.length;i++){
                if(reg.test(allChildren[i].className)){
                    element.push(allChildren[i]);
                }
            }
        }
        break;
        case '[':
        if(selector.indexOf('=')===-1){
            allChildren=root.getElementsByTagName('*');
            for(var i=0;i<allChildren.length;i++){
                if(allChildren[i].getAttribute(selector.slice(1,-1))!==null){
                    element.push(allChildren[i]);
                }
            }
        }else{
            var index=selector.indexOf('=');
            allChildren=root.getElementsByTagName('*');
            for(var i=0;i<allChildren,length;i++){
                if(allChildren[i].getAttribute(selector.slice(1,index)===selector.slice(index,-1))){
                    element.push(allChildren[i]);
                }
            }
        }
        break;
        default:
        element=root.getElementsByTagName(selector)[0];
    }
    return element;
}
/** */
/**给一个element绑定一个针对event事件的响应，响应函数为listener */
function addEvent(element,event,listener){
    if(element.addEventListener){
        element.addEventListener(event,listener,false);
    }else if(element.attachEvent){
        element.attachEvent('on'+event,listener);
    }else{
        element['on'+event]=listener;
    }
}
/**移除element对象对于event事件发生时执行listener的响应 */
function removeEvent(element,event,listener){
    if(element.removeEventListener){
        element.removeEventListener(event,listener,false);
    }else if(element.detachEvent){
        element.detachEvent('on'+event,listener);
    }else{
        element['on'+event]=null;
    }
}
/**实现对click事件的绑定 */
function addClickEvent(element,listener){
    addEvent(element,'click',listener);
}
/**实现对于按Enter键时的事件绑定 */
function addEnterEvent(element,listener){
    addEvent(element,'keydown',function(ev){
        var ev=ev||window.event;
        if(ev.keycode===13){
            listener();
        }
    });
}
/**将上面几个函数和$结合 */
$.on=function(element,event,listener){
    return addEvent(element,event,listener);
}
$.un=function(element,event,listener){
    return removeEvent(element,event,listener);
}
$.click=function(element,listener){
    return addClickEvent(element,listener);
}
$.enter=function(element,listener){
    return addEnterEvent(element,listener);
}
/**事件委托 */
function delegateEvent(element,tag,eventName,listener){
    return addEvent(element,eventName,function(ev){
        var ev=ev||window.event;
        var target=ev.target||ev.srcElement;
        if(target.tagName.toLocaleLowerCase()==tag){
            listener.call(target,ev);
        }
    });
}
/**函数封装 */
$.on=function (selector,event,listener) {
    return addEvent($(selector),event,listener);
}
$.un=function(selector,event,listener){
    return removeEvent($(selector),event,listener);
}
$.click=function (selector,event,listener) {  
    return addClickEvent($(selector),event,listener);
}
$.enter=function(selector,event,listener){
    return addEnterEvent($(selector),event,listener);
}
$.delegate=function(selector,tag,event,listener){
    return delegateEvent($(selector),tag,event,listener);
}
/**判断是否为IE浏览器，返回-1或者版本号 */
function isIE(){
    var userAgent=navigator.userAgent;
    var isIe=userAgent.indexOf("compatible")>-1&&userAgent.indexOf("MISE")>1;
    var isIe11=userAgent.indexOf("Trident")>-1&&userAgent.indexOf("rv:11.0")>-1;
    if(isIE){
        var reIE=new RegExp("MISE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIeVersion=parseFloat(RegExp['$1']);
        if(fIeVersion==7){
            return 7;
        }else if(fIeVersion==8){
            return 8;
        }else if(fIeVersion==9){
            return 9;
        }else if(fIeVersion==10){
            return 10;
        }else{
            return 6;
        }
    }else if(isIe11){
        return 11;
    }else{
        return -1;
    }
}
/**设置cookie */
function setCookie(cookieName,cookieValue,expiredays){
    if(expiredays){
        var date=new date();
        date.setTime(date.getTime()+expiredays*24*3600*1000);
        var expiresStr="expires="+date.toGMTString()+';';
    }else{
        var expires='';
    }
    document.cookie=cookieName+'='+escape(cookieValue)+';'+expiresStr;
}
/**获取cookie值 */
function getCookie(cookieName){
    var arr=document.cookie.match(new RegExp('^| '+name+'=([^;]*)(;|$)'));
    if(arr!=null){
        return unescape(arr[2]);
    }else{
        return null;
    }
}
/**获取cookie，方法二 */
function getCookieTwo(cookieName){
    var arr=document.cookie.split("; ");
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split("=");
        if(arr2[0]==cookieName){
            return arr2[1];
        }
    }
    return '';
}
/**封装Ajax */
function ajax(url,options){
    var oAjax=null;
    if(window.XMLHttprequest){
        oAjax=new XMLHttpRequest();
    }else{
        oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }

    var param='';
    var data=options.data?options.data:-1;
    if(typeof(data)==='object'){
        for(var key in data){
            if(data.hasOwnProperty(key)){
                param+=key+'='+data[key]+'&';
            }
        }
        param.replace(/&$/,'');
    }else{
        param='timestamp='+new Date().getTime();
    }

    var type=options.type?options.type.toUperCase():'GET';
    if(type==='GET'){
        oAjax.open('GET',url+'?'+param,true);
        oAjax.send();
    }else{
        oAjax.open('POST',url,true);
        oAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        oAjax.send(param);
    }

    oAjax.onreadystatechange=function(){
        if(oAjax.readyState===4){
            if(oAjax.status===200){
                options.onsuccess(oAjax.responseText,oAjax);
            }else{
                if(oAjax.onfail){
                    options.onfail(oAjax);
                }
            }
        }
    };
    return oAjax;
}
/**测试 */
// var test1=5;
// function test2(){

// }
// var srcObj = {
//     a: 1,
//     b: {
//         b1: ["hello", "hi"],
//         b2: "JavaScript"
//     }
// };
// console.log(isArray(test1));
// console.log(isFunction(test2));
// var abObj = srcObj;
// var tarObj = cloneObject(srcObj);
// // alert(cloneObject(test1));
// abObj.a=2;
// abObj.b.b1[0]='HELLO';
// console.log(abObj.a);
// console.log(abObj.b.b1[0]);
// console.log(tarObj.a);
// console.log(tarObj.b.b1[0]);

// var a = [1, 3, 5, 7, 5, 3];
// var b = uniqArray(a);
// console.log(b);

// var str = '   hi!  ';
// str = simpleTrim(str);
// console.log(str); // 'hi!'

// var str = '   hi!  ';
// str = trim(str);
// console.log(str);

// var arr = ['java', 'c', 'php', 'html'];
// function output(item) {
//     console.log(item)
// }
// each(arr, output);
// var arr = ['java', 'c', 'php', 'html'];
// function output(item, index) {
//     console.log(index + ': ' + item)
// }
// each(arr, output);

// var obj = {
//     a: 1,
//     b: 2,
//     c: {
//         c1: 3,
//         c2: 4
//     },
//     d:"s"
// };
// console.log(getObjectLength(obj));

// isMobilePhone(12345678987);
// isMobilePhone(18345678987);
// isEmail('123@as.com');

window.onload=function(){
    /**第一阶段 */
    var oHobby=document.getElementById('hobby');
    var oFilter=document.getElementById('filter');
    var oHobbyP=document.getElementById('hobbyP');
    
    // oFilter.onclick=function(){
    //     var arr=[];
    //     var hobbys=oHobby.value.split(/\,|\, /);
    //     var uniqHobbys=uniqArray(hobbys);
    //     for(var i=0;i<uniqHobbys.length;i++){
    //         var trimValue=trim(uniqHobbys[i]);
    //         if(trimValue!==' '){
    //             oHobbyP.innerHTML+='<li>'+trimValue+'</li>';
    //         }
    //     }
    // }

    // /**第二阶段 */
    // var oHobby2=document.getElementById('hobby2');
    // var oFilter2=document.getElementById('filter2');
    // var oHobbyP2=document.getElementById('hobbyP2');
    // var oHobbyPInfo=document.getElementById('info');
    // oFilter2.onclick=function(){
    //     var arr=[];
    //     var hobbys=oHobby2.value.split(/\n|\s+|\,|\，|\、|\;|\；/);
    //     var uniqHobbys=uniqArray(hobbys);
    //     if(hobbys.length>10||uniqHobbys==""){
    //         oHobbyPInfo.style.display="block";
    //     }else{
    //         for(var i=0;i<uniqHobbys.length;i++){
    //         var trimValue=trim(uniqHobbys[i]);
    //         if(trimValue!==' '){
    //             oHobbyP2.innerHTML+='<li>'+trimValue+'</li>';
    //         }
    //         oHobbyPInfo.style.display="none";
    //         }
    //     }  
    // }
}