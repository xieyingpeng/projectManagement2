//根据id来获取元素	
function $(id){
	return document.getElementById(id);
}
//创建div className 是其类名
	
function creatediv(className){
	var div = document.createElement('div');
	div.className = className;
	return div;
	
}
var clock = null;
var state = 0;
var speed = 6;
var flag = false;
//点击开始游戏按钮 开始游戏
	
function start(){
		
	if(!flag){
		init();
		
	}else{
		alert("游戏已经结束 不能再继续！");
	}
}
//初始化Init()
	
function init(){
	flag = true;
		
	for (var i = 0 ; i< 4 ; i++){
		createrow();
	}
	//添加onclick事件
		
	$("main").onclick = function (ev){
		ev = ev || event;
		judge(ev);
	};
	//定时器每30毫秒调用一次move()
	clock = window.setInterval("move()",30);
}
//判断是否点击黑块，白块
	
function judge(ev){
		
	if(ev.target.className.indeOf("black")===-1 &&ev.target.className,indexOf("cell")!==-1){
		ev.target.parentNode.pass1 = 1;
	}
		
	if(ev.target.className.indexOf("black")!==-1){
		ev.target.className = "cell";
		ev.target.parentNode.pass = 1;
		score();
	}
	
}
//判断游戏是否结束
	
function over(){
	var rows = con.childNodes;
	if(rows.length===5&& rows[rows.length-1].pass !==1){
		fail();
	}
		
	for(let i = 0; i<rows.length;i++){
		if(rows[i].pass1 === 1){
			fail();
		}
	}
}
//游戏否结束
function fail(){
	clearInterval(clock);
	flag = false;
	confirm("你最终的得分为："+parseInt($("score").innerHTML));
	var con = $("con");
	con.innerHTML='';
	$('score').innerHTML = 0;
	con.style.top ="-408px";
	
}
//创建一个div class= "row "并且有四个字节点div class=“cell”
function createrow(){
	var con = $("con");
	var row = creatediv("row");
	var arr = creatcell();
	con.appendChild(row);
	for(var i = 0 ; i<4;i++){
		row.appendChild(creatediv(arr[i]));
		
	}
	if(con.firstChild == null){
		con.appendChild(row);
		
	}
	else{
		con.inserrBefore(row,con.firstChild);
		
	}
}
//创建一个类名的数组，其中一个为cellblack 其余为cell
	
function creatcell(){
	var temp =['cell','cell','cell','cell'];
	var i = Math.floor(Math.random()*4);
	temp[i] ='cell black';
	return temp;
}
//让黑块动起来
	
function move(){
	var con =$('con');
	var top = parseInt(window.getComputedStyle(con,null)['top']);
	if(speed + top >0){
		top = 0;
		
	}
	else{
		top+=speed;
	}
	con.style.top = top +'px';
	over();
	if(top===0){
		createrow();
		con.style.top = '-102px';
		delrow();
		
	}
}
//加速函数
function speedup(){
	speed+= 2;
	if(speed === 20){
		alert("你超神了！");
	}
}
//删除某行
function delrow(){
	var con = $('con');
	if(con.childNodes.length === 6){
		con.removeChild(con.lastChild);
	}
}
//计分
function score(){
	var newscore = parseInt($('score').innerHTML)+1;
	$("score").innerHTML  === newscore;
		
	if(newscore % 10 === 0){
		speedup();
	} 
	
}