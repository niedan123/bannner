var $banner = (function(){
  var $ban = $(''
    +'<div>'
      +'<div class="slider" id="slider">'
        +'<div class="slide"><img src="img/b5.png" alt=""></div>'
        +'<div class="slide"><img src="img/b1.png" alt=""></div>'
        +'<div class="slide"><img src="img/b2.png" alt=""></div>'
        +'<div class="slide"><img src="img/b3.png" alt=""></div>'
        +'<div class="slide"><img src="img/b4.png" alt=""></div>'
        +'<div class="slide"><img src="img/b5.png" alt=""></div>'
        +'<div class="slide"><img src="img/b1.png" alt=""></div>'
      +'</div>'
      +'<span class="left"><</span>'
      +'<span class="right">></span>'
      +'<ul class="nav" id="navs">'
        +'<li class="active">1</li>'
        +'<li>2</li>'
        +'<li>3</li>'
        +'<li>4</li>'
        +'<li>5</li>'
      +'</ul>'
    +'</div>'
  );
  var right = $ban.find('.right')[0],
      box   = $('#box')[0],
      slider= $ban.find('#slider')[0],
      nav   = $ban.find('.nav').children(),
      left  = $ban.find('.left')[0],
      index = 1,
      cfg   = {
        container:'#box'
      };
  var time;
  var timer = setInterval(next,3000);
  
  function show(conf) {
    $(cfg.container).append($ban);
    $.extend(cfg , conf);
  }  
  
  for(var i = 0 ; i < nav.length ; i++) {
    nav[i].index = i;
    nav[i].onclick = function() {
      index = this.index+1;
      animate(slider , { 
        left : index * - 1200
      });
      navChange();
    }
  }
  right.onclick = next;
  left.onclick=prev;
  function next(){
    index++;
    if(index>=6){
      index=1;
      animate(slider,{ left: -1200*6 } , ()=>{
        slider.style.left="-1200px"; 
      });
    } 
    else {
      animate(slider,{ left : -1200*index });
    }
    navChange();
  }
  function prev(){
    index--;
    if(index==0){
      index=5;
      animate(slider,{left:-1200*0},()=>{
        slider.style.left="-6000px";
      });
    }
    else {
      animate(slider,{left:-1200*index});
    }
    navChange();
  }

  box.onmouseover=function(){
    clearInterval(timer);
    animate(left,{opacity : 50})
    animate(right,{opacity : 50})
  }

  box.onmouseout=function(){
    animate(left,{opacity:0});
    animate(right,{opacity:0});
    timer=setInterval(next,3000);
  }
    
  function navChange(){
       
    for(var i=0;i < nav.length;i++){
      nav[i].className="";
    }
       
    if(index==6){
      nav[0].className='active';
    }
    else if(index==0){
      nav[4].className='active';
    }
    else{
      nav[index-1].className="active";
    }
  }
    
  function getStyle(obj,style){
      
    if(window.getComputedStyle(obj,null)){
      return window.getComputedStyle(obj,null)[style];
    }
    else{
      return obj.currentStyle[style]; 
    }
  }

  function animate(obj,json,callback){
    clearInterval(obj.timer);
    obj.timer=setInterval(
      function(){
        var isStop = true;  
        for(var attr in json) {
          if(attr == 'opacity') {
            var now = parseInt(getStyle(obj,attr)*100);
          }
          else  {
            var now=parseInt(getStyle(obj,attr));
          }

          var speed=(json[attr]-now)/30;
          speed=speed>0?Math.ceil(speed):Math.floor(speed);
          if(attr=='opacity'){
            obj.style[attr]=(now+speed)/100;
          }
          else{
            obj.style[attr]=now+speed+'px';
          }
          var current=now+speed;
          if(json[attr]!=current){
            isStop=false
          }
        }
        if(isStop){
          clearInterval(obj.timer);
          callback&&callback();
        }     
      },10);
    }
  return {show: show};

})();




