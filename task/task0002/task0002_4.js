window.onload=function(){
    var testdate=["abase","abash","abate","abduction","abhor","abominable","abscond","abstain","baby","babysiter","belt","birthday","bench","brave","你好"];
    var text=document.getElementById('text');
    var searchButton=document.getElementById('searchButton');
    var oUl=document.getElementsByClassName('date')[0];

    // inputChange(text.value);
    clickLi();
    
    text.oninput=handleValue(text.value);
    text.addEventListener('focus',function(e){
        if(text.value===''){
            oUl.innerHTML='';
        }else{
            keydownLi();
        }
    })
    function inputChange(inputValue){
        if(text.addEventListener){
            text.addEventListener('input',OnInput,false);
        }else if(text.attachEvent){
            text.attachEvent('OnPropChanged',OnPropChanged);
        };
        function OnInput(event){
            var inputValue=event.target.value;
            handleValue(inputValue);
        }
        function OnPropChanged(event){
            if(event.propertyName.toLowerCase()==='value'){
                var inputValue=event.srcElement.value;
                handleValue(inputValue);
            }
        }
    }

    function handleValue(value){
        var isString='';
        var reg=new RegExp('^'+value,'i');
        if(value===''){
            oUl.style.display='none';
        }else{
            // ajax(testdate,{
            //     onsuccess:prompt
            // });
            oUl.style.display='block';
            result=testdate.filter(function(item){
                valueMatch=item.match(reg);
                return valueMatch;
            });
            var liText='';
            for(var i=0;i<result.length;i++){
                liText+='<li><span>'+valueMatch[0]+'</span>'+result[i].substr(valueMatch[0].length)+'</li>';
            }
            oUl.innerHTML=liText;
        }
        
        function prompt(data){
            var promptArr=eval(data);
            var liElement='';
            for(var i=0,len=promptArr.length;i<len;i++){
                var valueMatch=promptArr[i].match(reg);
                if(valueMatch){
                    liElement+='<li><span>'+valueMatch[0]+'</span>'+promptArr[i].substr(valueMatch[0].length)+'</li>';
                }
            }
            oUl.innerHTML=liElement;
            oUl.style.display='block';
        }
    }

    function clickLi(){
        delegateEvent(oUl,'li','mouseover',function(){
            removeClass();
            addClass(this,'active');
        });
        delegateEvent(oUl,'li','mouseout',function(){
            removeClass(this,'active');
        });
        delegateEvent(oUl,'li','click',function(){
            text.value=deleteSpan(this.innerHTML);
            oUl.style.display='none';
        })
    }

    function keydownLi(){
        addEvent(text,'keydown',function(ev){
            var heightLi=$('.active');
            var oEvent=ev||window.event;
            if(oEvent.keyCode===38){
                if(heightLi){
                    var previousLi=heightLi.previousElementSibling;
                    if(previousLi){
                        removeClass();
                        addClass(previousLi,'active');
                    }
                }else{
                    addClass($('div li'),'avtive');
                }
            }
            if(oEvent.keyCode===40){
                if(heightLi){
                    var nextLi=heightLi.nextElementSibling;
                    if(nextLi){
                        removeClass();
                        addClass(nextLi,'active');
                    }
                }else{
                    addClass($('div li'),'avtive');
                }
            }
            if(oEvent.keyCode===13){
                text.value=deleteSpan(heightLi.innerHTML);
                oUl.style.display='none';
            }
        })
    }

    function deleteSpan(stringHtml){ 
        var reg=/^<span>(\w+)<\/span>(\w+)/;
        var stringArr=stringHtml.match(reg);
        if(stringArr){
            return stringArr[1]+stringArr[2];
        }else{
            return '';
        }
    }

    function removeClass(){
        var oLi=oUl.getElementsByTagName('li');
        for(var i=0,len=oLi.length;i<len;i++){
            oLi[i].className='';
        }
    }

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
}

   