window.onload=function(){
    var i;
    var index=0;
    var defaultli;
    var spanValue;
    var aValue;
    var j;
    var item=0;
    var seq=0;
    var m=0;
    var n=0;
    var newRight;
    var content=document.getElementsByClassName('content')[0];
/**left板块 */
var taskListLis=document.getElementsByClassName('taskListLi');
var leftButton=document.getElementsByClassName('leftButton');
var addClass=document.getElementById('addClass');
var taskList=document.getElementById('taskList');
var taskListUls=taskList.getElementsByTagName('ul');
var files=[];
var filesA=[];
var filesLis=[];
/**设置默认分类的defaultli为true,获取每一个任务存在filesA中 */
for (i = 0; i < taskListUls.length; i++) {
    taskListLis[i].defaultli=true;
    files[i]=taskListLis[i].getElementsByClassName('files')[0];
    filesLis[i]=files[i].getElementsByTagName('li');
}
for(i=0;i<files.length;i++){
    filesA[i]=files[i].getElementsByTagName('a');
}
/**给左边板块的子任务加上序号，使其与中间板块的详细子任务div对应 */
for(i=0;i<filesA.length;i++){
    for(j=0;j<filesA[i].length;j++){
        filesLis[i][j].item=m;
        m++;
    }
}
/**点击任务，显示被选中,中间栏显示相应的任务信息 */
for(i=0;i<filesA.length;i++){
    for(j=0;j<filesA[i].length;j++){
        filesLis[i][j].onclick=(function(i,j){
            return function(){
                clearSelected();
                filesLis[i][j].className=' selected';
                clearShow();
                middleContent[filesLis[i][j].item].className+=' show';
                middleContentUls=middleContent[filesLis[i][j].item].getElementsByTagName('ul');
            }
        })(i,j);
    }       
}
/**使所有子任务信息都显示 */
function clearFinish(objUl){
    for(i=0;i<objUl.length;i++){
        objUl[i].className='';
    }
}
/**设置所有未完成完成都没有选中 */
function clearButtonShow(){
    all.className='';
    unfinish.className='';
    finish.className='';
}
/**将所有任务都设置成未选中 */
function clearShow(){
    for(i=0;i<middleContent.length;i++){
        middleContent[i].className='middleContent';
    }
}
/**将所有li都设置成未选中 */
function clearSelected(){
    for (i = 0; i < taskListUls.length; i++) {
        files[i]=taskListLis[i].getElementsByClassName('files')[0];
        filesLis[i]=files[i].getElementsByTagName('li');
        for(j=0;j<filesLis[i].length;j++){
            filesLis[i][j].className='';
        }
        
    }
}
/**中间详细任务板块 */
var middleContent=document.getElementsByClassName('middleContent');
var middleContentUls=[];
var childrenLi=[];
var ps=[];
var uls=[];
var psI=0;
var psValue=[];
var ulValue=[];
var ulLis=[];
var dataArray=[];
var dateA=[];
var values;
var d=new Date();
var middle=document.getElementsByClassName('middle')[0];
var middleP=middle.getElementsByTagName('p');
var middleli=middle.getElementsByTagName('li');
var all=document.getElementById('all');
var unfinish=document.getElementById('unfinish');
var finish=document.getElementById('finish');
var right=document.getElementsByClassName('right');
/**给中间板块的子任务加上序号，使其与右边板块的详细子任务div对应 */
function addSeq(){
  
   psI=0;
   for(i=0;i<middleContent.length;i++){
            childrenLi[i]=middleContent[i].getElementsByTagName('li');
            ps[i]=middleContent[i].getElementsByTagName('p');
            uls[i]=middleContent[i].getElementsByTagName('ul');
            for(j=0;j<ps[i].length;j++){
              ulValue[psI]=uls[i][j];
              ulLis[psI]=ulValue[psI].getElementsByTagName('li');
              psValue[psI]=ps[i][j].innerHTML;
              psI++;   
            }          
    }
    console.log(ulLis);
    // dataSort();
    // console.log(psValue.length);
    for(i=0;i<right.length;i++){
     right[i].item=i;
    }   
}
addSeq();

/**排序函数 */
function dataSort(){
  for(i=0;i<psValue.length;i++){
    var dataArr=psValue[i].split('-');
    dataArray.push(d.setFullYear(dataArr[0],dataArr[1]-1,dataArr[2]));
  }
  dataArray.sort();
  for(i=0;i<dataArray.length;i++){
    d.setTime(dataArray[i]);
    dateA[i]=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    //  console.log(dateA[i]);
  }
  for(i=0;i<dateA.length;i++){
    middleP[i].innerHTML=dateA[i];
  }
  addSeq();
}
dataSort();

/**数据本地存储，以时间为key，任务为value */
function dataStorage(key,value){
  for(i=0;i<psValue.length;i++){
    var keys=key||psValue[i];
    if(value){
      values=value;
      localStorage.setItem(keys,values);
    }else{
      for(j=0;j<ulLis[i].length;j++){
       values=ulLis[i][j].innerHTML;
       localStorage.setItem(keys+' date'+j,values);
      }
    }
    
  }
}
dataStorage();
/**中间子任务点击 */
function middleClick(){
    addSeq();
    for(i=0;i<childrenLi.length;i++){
        for(j=0;j<childrenLi[i].length;j++){
            childrenLi[i][j].seq=n;
            n++;
            childrenLi[i][j].onclick=(function(i,j){
                return function(){
                    middleLiUnselected();
                    rightUnshow();
                    childrenLi[i][j].className=' selected';
                    right[childrenLi[i][j].seq].className+=' show';
                }
            })(i,j);
        }  
    }
}
middleClick()
/**中间栏的li均不被选中 */
function middleLiUnselected(){
    for(i=0;i<childrenLi.length;i++){
        for(j=0;j<childrenLi[i].length;j++){
          childrenLi[i][j].className='';
        }  
    }
}
function rightUnshow(){
    for(i=0;i<right.length;i++){
        right[i].className='right';
    }
}

/**切换任务栏，所有任务，未完成任务，已完成任务 */
function toggleTask(){
    middleContentUls=middleContent[findShow()].getElementsByTagName('ul');
    all.onclick=function(){
        clearButtonShow();
        clearFinish(middleContentUls);
        all.className=' selected';
    }
    unfinish.onclick=function(){
        clearButtonShow();
        clearFinish(middleContentUls);
        unfinish.className=' selected';
        for(i=0;i<middleContentUls.length;){
            middleContentUls[i].className='finish';
            i=i+2;
        }
    }
    finish.onclick=function(){
        clearButtonShow();
        clearFinish(middleContentUls);
        finish.className=' selected';
        for(i=1;i<middleContentUls.length;){
            middleContentUls[i].className='finish';
            i=i+2;
        }
    }
}
toggleTask();
/**筛选出带show的div */
function findShow(){
    var showName=[];
    var flag=false;
    var reg=new RegExp(/(\S*\s*)show/);
    for(i=0;i<middleContent.length;i++){
        showName[i]=middleContent[i].className;
        flag=reg.test(showName[i]);
        if(flag===true){
            return i; 
        }
    }
}
/**编辑任务板块 */
var addDiv=document.getElementById('addDiv');
var addDelete=document.getElementById('addDelete');
var addConfirm=document.getElementById('addConfirm');
var editTextArea=document.getElementsByClassName('editTextArea');
var daytest=document.getElementsByClassName('daytest');
var titletest=document.getElementsByClassName('titletest');
var addCancel=document.getElementById('addCancel');
/**新增任务 */
var middleAdd=document.getElementsByClassName('middleAdd')[0];
var middleAddA=middleAdd.getElementsByTagName('a')[0];
var edit=document.getElementsByClassName('edit')[0];
var editCofirm=document.getElementById('editCofirm');
var cancel=document.getElementById('cancel');
/**点击新增任务按钮，右边出现任务编辑模块 */
middleAddA.onclick=function(){
    addDiv.style.display='block';
}
editCofirm.onclick=function(){
    var titlevalue=titletest.value;
    var dayvalue=daytest.value;
    var textareavalue=editTextArea.value;

}
cancel.onclick=function(){
    titletest[0].value='';
    daytest[0].value='';
    editTextArea[0].value='';
}
addCancel.onclick=function(){
    titletest[1].value='';
    daytest[1].value='';
    editTextArea[1].value='';
}
/**关闭add窗口 */
addDelete.onclick=function(){
    addDiv.style.display='none';
}
/**增加子任务 */
addConfirm.onclick=function(){
    if((titletest[1].value!='')&&(daytest[1].value!='')&&(editTextArea[1].value!='')){
        var itemShow=findShow();
        var ul=document.createElement('ul');
        var p=document.createElement('p');
        var li=document.createElement('li');
        p.className='time';
        p.innerHTML=daytest[1].value;
        li.innerHTML=titletest[1].value;
        ul.appendChild(p);
        ul.appendChild(li);
        middleContent[itemShow].appendChild(ul);
        addSeq();
        dataStorage(p.innerHTML,li.innerHTML);
        newRight=createRight(titletest[1].value,daytest[1].value,editTextArea[1].value);
        content.appendChild(newRight);
    }
}
function createRight(title,day,contents){
    var rightDv=document.createElement('div');
    var rightHeadDv=document.createElement('div');
    var rightTitleDv=document.createElement('div');
    var rightTimeDv=document.createElement('div');
    var rightContentDv=document.createElement('div');
    var h3Title=document.createElement('h3');
    var spanDate=document.createElement('span');
    var inputDate=document.createElement('input');
    var textareaCon=document.createElement('textarea');
    rightDv.className='right';
    rightHeadDv.className='rightHead';
    rightTitleDv.className='rightTitle';
    rightTimeDv.className='rightTime';
    rightContentDv.className='rightContent';
    inputDate.id='rightTimeday';
    textareaCon.id='rightTextarea';
    textareaCon.cols='30';
    textareaCon.rows='10';
    textareaCon.setAttribute('disabled','true');
    h3Title.innerHTML=title;
    spanDate.innerHTML='任务日期:';
    inputDate.value=day;
    textareaCon.value=contents;
    rightTitleDv.appendChild(h3Title);
    rightTimeDv.appendChild(spanDate);
    rightTimeDv.appendChild(inputDate);
    rightContentDv.appendChild(textareaCon);
    rightHeadDv.appendChild(rightTitleDv);
    rightDv.appendChild(rightHeadDv);
    rightDv.appendChild(rightTimeDv);
    rightDv.appendChild(rightContentDv);
    return rightDv;
}
/**右边板块，编辑未完成任务 */
var editTask=document.getElementById('editTask');
var finished=document.getElementById('finished');
var rightTime=document.getElementsByClassName('rightTime')[0];
var rightTimeP=rightTime.getElementsByClassName('p')[0];
var rightContent=document.getElementsByClassName('rightContent')[0];
var rightTextarea=document.getElementById('rightTextarea');
var rightTimeday=document.getElementById('rightTimeday');
/**编辑任务按钮,确认完成任务按钮 */
editTask.onclick=function(){
    rightTextarea.removeAttribute('disabled');
    rightTimeday.removeAttribute('disabled');
    rightTimeday.onblur=function(){
        dayTest(rightTimeday);
    }
    rightTextarea.onblur=function(){
        textAreaTest(rightTextarea);
    }
    finished.onclick=function(){
        var isfinish=confirm('是否确认完成任务?');
        if(isfinish===true){
            rightTextarea.innerHTML=rightTextarea.innerHTML;
            rightTimeday.value=rightTimeday.value;
            rightTextarea.setAttribute('disabled','true');
            rightTimeday.setAttribute('disabled','true');
        }
    }
}
/**增加分类 */
addClasses();
function addClasses(){
    addClass.onclick=function(){
        var classes=prompt('新添加的分类名字','task');
        if(classes!=''&&classes!=''){
            add(classes);
        }
    }
}
/**删除分类 */
displayDelete();
function displayDelete(){
    for(i=0;i<taskListLis.length;i++){
        taskListLis[i].onmouseover=(function(i){
            deleteClass(taskListLis[i],i);
            return function(){
                leftButton[i].style.display='block';
            }
        })(i);
        taskListLis[i].onmouseout=(function(i){
            return function(){
                leftButton[i].style.display='none';
            }
        })(i);
    }
}
function deleteClass(obj,i){
    leftButton[i].onclick=function(){
        if(obj.defaultli==false){
            var message=confirm('确认删除该分类吗？');
            if(message==true){
                taskList.removeChild(taskListLis[i]);
            }
        }else{
            alert('不能删除默认分类!');
        }
    } 
}
/**内容输入框检测 */
function textAreaTest(obj){
    var value=obj.value;
    if(value.length>10){
        obj.value=value.substr(0,100);
        alert('请输入不超过100个字');
    }
}
/**日期输入框检测 */
function dayTest(obj){
    var value=obj.value;
    var reg=new RegExp(/^\d{4}-\d{2}-\d{2}$/);
    if(!reg.test(value)){
        alert('请输入yyyy-mm-dd的日期格式');
        obj.value='';
    }else{
        var day=value.split('-');
        if(day[1]<1||day[1]>12){
            alert('输入月份错误');
        }
        if(day[2]<1||day[2]>31){
            alert('输入日期错误');
        }
        if(day[1]==2){
            if(day[2]>29){
                alert('2月不大于30天');
            }
        }
        if((day[1]==4)||(day[1]==6)||(day[1]==9)||(day[1]==11)){
            if(day[2]>30){
                alert(day[1]+'月不大于31天');
            }
        }
    }
}
/**添加分类到列表中 */
function add(name){
    var addli=document.createElement('li');
    var addimg=document.createElement('img');
    var addbutton=document.createElement('button');
    var addA=document.createElement('a');
    var addSpan=document.createElement('span');
    var reg=/\((.+?)\)/g;
    spanValue=(name.match(reg))[0];
    aValue=name.replace(spanValue,'');
    addA.innerHTML=aValue;
    addSpan.innerHTML=spanValue;
    addli.className='taskListLi';
    addli.defaultli=false;
    addimg.className='fold';
    addimg.src='img/fold.jpg';
    addbutton.className='leftButton';
    addA.appendChild(addSpan);
    addli.appendChild(addimg);
    addli.appendChild(addA);
    addli.appendChild(addbutton);
    taskList.appendChild(addli);
    displayDelete();
}
/**本地loacalstorage存储数据 */
// function saveInfor(key,value){
//     localStorage.setItem(key,JSON.stringify(value));
// }
// saveInfor('2015-04-28',['to-do 1','to-do 2'])
// daytest[0].onblur=function(){
//     saveInfor();
// }
// localStorage.clear();
}