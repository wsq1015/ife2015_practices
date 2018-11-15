window.onload=function(){
    var loopBox=document.getElementById('loopBox');
    var imgUl=document.getElementById('img');
    var imgLis=imgUl.getElementsByTagName('li');
    var imgs=imgUl.getElementsByTagName('img');
    var numberUl=document.getElementsByClassName('numberUl')[0];
    var numbers=numberUl.getElementsByTagName('li');
    var index=0;
    var timer=play=null;
    var autoplay=true;

    // function insertAfter(newElement,targetElement){
    //     var parent=targetElement.parentNode;
    //     if(parent.lastChild==targetElement){
    //         parent.appendChild(newElement);
    //     }else{
    //         parent.insertBefore(newElement,targetElement.nextSibling);
    //     }
    // }
    // function addNumber(){
    //     var numberUl=document.createElement('ul');
    //     for(var i=0;i<imgLis.length;i++){
    //         var number=document.createElement('li');
    //         number.innerHTML=i+1;
    //         number.className="number";
    //         numberUl.appendChild(number);
    //     }
    //     numberUl.className='numberUl';
    //     insertAfter(numberUl,loopBox);
    // }
    // addNumber();

    for(var i=0;i<numbers.length;i++){
        numbers[i].index=i;
        numbers[i].onmouseover=function(){
           show(this.index);
        }
        numbers[i].onmouseout=function(){
            numbers[this.index].className='';
        }
    }
    loopBox.onmouseover=function(){
        clearInterval(autoplay);
    }
    loopBox.onmouseout=function(){
        autoPlay();
    }
    function show(a){
        var alpha=0;
        clearInterval(timer);
        for(var j=0;j<imgLis.length;j++){
            imgLis[j].className='';
            numbers[j].className='';
            imgs[j].style.opacity=0;
            imgs[j].style.filter='alpha(opacity=0)';
        }
        numbers[a].className='now';
        imgLis[a].className='current';
        timer=setInterval(function(){
            alpha+=2;
            alpha>100&&(alpha==100);
            imgs[a].style.opacity=alpha/100;
            imgs[a].style.filter='alpha(opacity='+alpha+')';
            alpha==100&&clearInterval(timer);
        },20);
    }

    function autoPlay(){
        play=setInterval(function(){
            autoplay?index++:index--;
            index>=imgs.length&&(index=imgs.length-2,autoplay=false);
            index<=0&&(index=0,autoplay=true);
            show(index);
        },2000);
    }
    autoPlay();

}