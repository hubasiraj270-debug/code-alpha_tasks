const display=document.getElementById('display');
const expression=document.getElementById('expression');
const keys=document.querySelectorAll('.key');
let current='0',previous=null,operator=null,waiting=false;

function update(){display.textContent=current}
function fmt(n){if(!Number.isFinite(n))return'Error';return Number.isInteger(n)?String(n):String(parseFloat(n.toFixed(10)))}
function input(v){
 if(current==='Error')clear();
 if(waiting){current=v==='.'?'0.':v;waiting=false;return}
 if(v==='.'&&current.includes('.'))return;
 if(current==='0'&&v!=='.')current=v;else if(current.length<14)current+=v;
}
function calc(a,b,o){
 if(o==='+')return a+b;if(o==='−')return a-b;if(o==='×')return a*b;
 if(o==='÷')return b===0?NaN:a/b;return b;
}
function op(o){
 if(current==='Error')return;
 const n=parseFloat(current);
 if(operator&&waiting){operator=o;return}
 if(previous===null)previous=n;
 else if(operator){previous=calc(previous,n,operator);current=fmt(previous)}
 operator=o;waiting=true;expression.textContent=current+' '+o;
}
function equal(){
 if(operator===null||previous===null)return;
 const a=previous,b=parseFloat(current),r=calc(a,b,operator);
 expression.textContent=fmt(a)+' '+operator+' '+fmt(b);
 current=fmt(r);previous=null;operator=null;waiting=true;
}
function clear(){current='0';previous=null;operator=null;waiting=false;expression.textContent=''}
function back(){if(!waiting&&current!=='Error')current=current.length>1?current.slice(0,-1):'0'}
function percent(){if(current!=='Error')current=fmt(parseFloat(current)/100)}
function sign(){if(current!=='0'&&current!=='Error')current=current.startsWith('-')?current.slice(1):'-'+current}

keys.forEach(k=>k.addEventListener('click',()=>{
 const v=k.dataset.value,a=k.dataset.action;
 if(v!==undefined){if('0123456789.'.includes(v))input(v);else op(v)}
 if(a==='clear')clear();if(a==='backspace')back();if(a==='percent')percent();if(a==='sign')sign();if(a==='equals')equal();
 update();
}));
document.addEventListener('keydown',e=>{
 if(/^[0-9.]$/.test(e.key))input(e.key);
 else if(e.key==='+')op('+');else if(e.key==='-')op('−');else if(e.key==='*')op('×');
 else if(e.key==='/'){e.preventDefault();op('÷')}else if(e.key==='Enter'||e.key==='=')equal();
 else if(e.key==='Escape')clear();else if(e.key==='Backspace')back();else if(e.key==='%')percent();
 update();
});
