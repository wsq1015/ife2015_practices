window.onload=function(){
    var oTime=document.getElementById('timeInput');
    var oTimeButton=document.getElementById('timeButton');
    var oTimeDisplay=document.getElementById('timeDisplay');
    var timer;
        
    oTimeButton.onclick=function(){
        timer=setInterval(clock,1000);
    }
    function clock(){
        var s=oTime.value;
        var regexp=new RegExp(/(\d{4})-(\d{2})-(\d{2})/,"gi");
        if(regexp.test(s)){
            var reg=new RegExp("\\-","gi");
            var result=s.replace(reg,"/");
            var oTimeValue=new Date(result);
            var endTime=oTimeValue.getTime();
            var nowTime=Date.now();
            var time=(endTime-nowTime)/1000;
            var endyear=oTimeValue.getFullYear();
            var endmonth=oTimeValue.getMonth()+1;
            var endday=oTimeValue.getDate();
            var day=parseInt(time/86400);
            var hours=parseInt(time%86400/3600);
            var minutes=parseInt((time%3600)/60);
            var seconds=parseInt(time%60);
            if(time<=0){
                oTimeDisplay.innerHTML='';
                clearInterval(timer);
            }else{
                oTimeDisplay.innerHTML='距离'+endyear+'年'+endmonth+'月'+endday+'日还有'+day+'天'+hours+'小时'+minutes+'分'+seconds+'秒';
            }
        }else{
            clearInterval(timer);
            alert('输入格式有误!');
        }  
    }
}