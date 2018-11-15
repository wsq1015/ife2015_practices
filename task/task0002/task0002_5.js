window.onload=function(){
    var box=document.getElementsByClassName('box')[0];
    var boxUl1=document.getElementById('boxUl1');
    var boxUl2=document.getElementById('boxUl2');
    var lis=document.getElementsByTagName('li');
    var i,index;
    var dX=dY=0;
    var bDrag=false;
    var that;
    var zInd=2;
    var timer=null;

    toPosition(box,'li');
    function toPosition(element,childEle){
        var eleArr=element.getElementsByTagName(childEle);
        var aPos=[];
        for ( i = 0; i < eleArr.length; i++) {
            aPos[i]={
                left:eleArr[i].offsetLeft,
                top:eleArr[i].offsetTop
            }; 
        }
        for (i = 0; i < eleArr.length; i++) {
            eleArr[i].style.left=aPos[i].left+'px';
            eleArr[i].style.top=aPos[i].top+'px';
            eleArr[i].style.position='absolute';
            eleArr[i].style.margin='0';
            eleArr[i].index=i;
        }
    }
//    function createLi(){
//        var li=document.createElement('li');
//        li.setAttribute('id','createLi');
//    }
delegateEvent(box,'li','mousedown',function(ev){
    var e=e||window.event;
    var oNear;
    var originalLeft;
    var originalTop;
    var oNearIndex;
    that=this;
    dX=e.clientX-this.offsetLeft;
    dY=e.clientY-this.offsetTop;
    zInd++;
    this.style.zIndex=zInd;
    this.style.backgroundColor='pink';
    that.className=' mousedown';
    that.style.opacity=0.5;
    originalLeft=this.offsetLeft;
    originalTop=this.offsetTop;
    // var createLi=document.createElement('li');
    // createLi.setAttribute('id','createLi');
    // createLi.style.left=that.offsetLeft+'px';
    // createLi.style.top=that.offsetTop+'px';
    // createLi.style.position='absolute';
    // that.parentNode.appendChild(createLi);
    // var createActivePar=createLi.parentNode;

    // var originalLeft=parseInt(createLi.style.left);
    // var originalTop=parseInt(createLi.style.top);
    
    document.onmousemove=function(e){
        var e=e||window.event;
        var iL=e.clientX-dX;
        var iT=e.clientY-dY;
        var maxL=box.clientWidth;
        var maxT=document.body.clientHeight||document.documentElement.clientHeight;
        iL=iL<0?0:iL;
        iT=iT<0?0:iT;
        iL=iL>=maxL-that.offsetWidth?maxL-that.offsetWidth:iL;
        iT=iT>=maxT-that.offsetHeight?maxT-that.offsetHeight:iT;
        that.style.left=iL+'px';
        that.style.top=iT+'px';

        for(i=0;i<lis.length;i++){
            lis[i].className='';
        }

        oNear=findNeast(that);
        if(oNear){
            oNear.className+='active';
        }
    }
    document.onmouseup=function(){
        document.onmousemove=null;
        document.onmouseup=null;
        if(oNear){
            oNearIndex=getIndex(oNear);
            if(that.parentNode!==oNear.parentNode){
                oNear.parentNode.insertBefore(that,oNear);
                console.log('插入成功');
                that.style.left=oNear.style.left;
                that.style.top=oNear.style.top;
                var oNearLi=oNear.parentNode.getElementsByTagName('li');
                var thatLLi=that.parentNode.getElementsByTagName('li');

                for(i=oNearIndex+1;i<oNearLi.length;i++){
                    oNearLi[i].style.left=that.style.left+'px';
                    oNearLi[i].style.top=that.offsetHeight+oNearLi[i].offsetTop+'px';
                }

                // for(var j=getIndex(that)+1;j<lis.length;j++){
                //     thatLLi[j].style.left=thatLLi[j-1].style.left+'px';
                //     thatLLi[j].style.top=that.offsetHeight+thatLLi[j-1].offsetTop+'px';
                // }
                for (var j = 0, thatLen = thatLLi.length; j < thatLen; j++) {
                    if (j === 0) {
                        thatLLi[0].style.left = that.parentNode.offsetLeft + 1 + "px";
                        thatLLi[0].style.top = that.parentNode.offsetTop + 1 + "px";
                    } else {
                        thatLLi[j].style.left=thatLLi[j-1].style.left+'px';
                        thatLLi[j].style.top=that.offsetHeight+thatLLi[j-1].offsetTop+'px';
                    }

                }

            }else{
                that.style.left=oNear.style.left;
                that.style.top=oNear.style.top;
                oNear.style.left=originalLeft+'px';
                oNear.style.top=originalTop+'px';
            }
        }else{
            if(that.parentNode===boxUl1){
                appChild(that,boxUl2);
            }else{
                appChild(that,boxUl1);
            }
        }
        // createLi.parentNode.removeChild(createLi);
        that.style.opacity=1;
    }

    function appChild(obj,parent){ 
        if(isButt(obj,parent)){
            var oLi=parent.getElementsByTagName('li');
            var len=oLi.length;
            console.log("不存在oNear");
            parent.appendChild(obj);
            if(len){
                obj.style.left=oLi[0].style.left;
                obj.style.top=oLi[len-1].offsetTop+oLi[0].offsetHeight+'px';
            }else{
                obj.style.left=parent.offsetLeft+1+'px';
                obj.style.top=parent.offsetTop+1+'px';
            }
            var thatLLi=that.parentNode.getElementsByTagName('li');
            console.log(thatLLi);
            // for(var j=getIndex(that)+1;j<lis.length;j++){
            //     thatLLi[j].style.left=thatLLi[j-1].style.left;
            //     thatLLi[j].style.top=that.offsetHeight+thatLLi[j-1].offsetTop+'px';
            // }
            for (var j = 0, thatLen = thatLLi.length; j < thatLen; j++) {
                if (j === 0) {
                    thatLLi[0].style.left = that.parentNode.offsetLeft + 1 + "px";
                    thatLLi[0].style.top = that.parentNode.offsetTop + 1 + "px";
                } else {
                    thatLLi[j].style.left=thatLLi[j-1].style.left+'px';
                    thatLLi[j].style.top=that.offsetHeight+thatLLi[j-1].offsetTop+'px';
                }

            }
        }else{
            console.log("不存在oNear，且不碰撞");
            startMove(obj,{left:originalLeft,top:originalTop},function(){
                 obj.style.left=originalLeft+'px';
                 obj.style.top=originalTop+'px';
            });
        }
        clearInterval(that.timer);
     }  
});
         
    

function getStyle(ele,attr){
    return parseFloat(ele.currentStyle?ele.currentStyle[attr]:getComputedStyle(obj,null)[attr]);
}
function startMove(element,json,func){
    clearInterval(element.timer);
    var flag=true;
    element.timer=setInterval(function(){
        for(var attr in json){
            var iCurrent=0;
            if(iCurrent==='opacity'){
                iCurrent=Math.round(parseFloat(getStyle(element,attr))*100);
            }else{
                iCurrent=parseInt(getStyle(element,attr));
            }
            var iSpeed=(json[attr]-iCurrent)/10;
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
            if(iCurrent!=json[attr]){
                flag=false;
                if(attr==='opacity'){
                    element.style.filter='alpha(opacity:'+(iCurrent+iSpeed)+')';
                    element.style.opacity=(iCurrent+iSpeed)/100;
                }else{
                    element.style[attr]=iCurrent+iSpeed+'px';
                }
            }{
                flag=true;
            }
            if(flag){
                clearInterval(element.timer);
                if(func){
                    func();
                }
            }
        }
    },30);
}

function delegateEvent(element,tag,eventName,listener){
    return addEvent(element,eventName,function(ev){
        var oEvent=ev||window.event;
        var target=oEvent.target||oEvent.srcElement;
        if(target.tagName.toLocaleLowerCase()===tag){
            listener.call(target,oEvent);
        }
    });
}

function addEvent(element,event,listener){
    if(element.addEventListener){
        element.addEventListener(event,listener,false);
    }else if(element.attachEvent){
        element.attachEvent('on'+event,listener);
    }else{
        element['on'+event]=listener;
    }
}
function getIndex(element){
    var aBrother=element.parentNode.children;
    for(i=0;i<aBrother.length;i++){
       if(aBrother[i]==element){
          return i;
      }
    }
}
function isButt(obj1,obj2){
    var l1 = obj1.offsetLeft;
        var r1 = obj1.offsetLeft + obj1.offsetWidth;
        var t1 = obj1.offsetTop;
        var b1 = obj1.offsetTop + obj1.offsetHeight;
        //对象2的相关值
        var l2 = obj2.offsetLeft;
        var r2 = obj2.offsetLeft + obj2.offsetWidth;
        var t2 = obj2.offsetTop;
        var b2 = obj2.offsetTop + obj2.offsetHeight;

        if (l1 > r2 || r1 < l2 || b1 < t2 || t1 > b2) {
            return false;
        } else {
            return true;
        }
}

function getDistance(obj1,obj2){
    var a = obj1.offsetLeft - obj2.offsetLeft;
    var b = obj1.offsetTop - obj2.offsetTop;
    return Math.sqrt(a * a + b * b);
}

function findNeast(obj){
//    var iMin=99999999;
//    var iMinIndex=-1;
//    for(i=0;i<lis.length;i++){
//        if(obj===lis[i]){
//            continue;
//        }
//        console.log(isButt(obj,lis[i]));
//        if(isButt(obj,lis[i])){
//            var dis=getDistance(obj,lis[i]);
//            if(iMin>dis){
//                iMin=dis;
//                iMinIndex=i;
//            }
//         //    console.log(i);
//         //    console.log(iMin);
//         //    console.log(obj);
//         //    console.log(lis[i]);
//         //    console.log(iMinIndex);
//         //    console.log(lis[iMinIndex]);
//            if(iMinIndex=-1){
//                return null;
//            }else{
//                return lis[iMinIndex];
//            }
//        }
//    }
//    console.log(iMinIndex);
//    return lis[iMinIndex];
    var filterLi = [];
	var aDistance = [];		
	for (i = 0; i < lis.length; i++) lis[i] != obj && (isButt(obj, lis[i]) && (aDistance.push(getDistance(obj, lis[i])), filterLi.push(lis[i])));	
        var minNum = Number.MAX_VALUE;
		var minLi = null;
		for (i = 0; i < aDistance.length; i++) aDistance[i] < minNum && (minNum = aDistance[i], minLi = filterLi[i]);	
	    return minLi;
    }   
}
