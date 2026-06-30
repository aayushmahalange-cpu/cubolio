let timer=document.querySelector(".main-timer");
let Ao5=document.querySelector("#ao5-display");
let Ao12=document.querySelector("#ao12-display");
let solves=document.querySelector("#solves");
let solve=0;
let start;
let elapsedTime;
let timerState="idle";
let inspectionTime=0;
let insprectionIntervalId;

let intervalId;
let sessionSolves=[];
function formatTime(rawMs){
    let min=Math.floor(rawMs/60000);
    let sec=Math.floor((rawMs/1000)%60);
    let centi=Math.floor((rawMs%1000)/10);
    let time=`${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(centi).padStart(2, "0")}`;
    return time;
}

const calculateAo5=()=>{
    if(sessionSolves.length<5){
        return "--";
    }
    let last5=sessionSolves.slice(-5);
    last5=last5.sort((a,b)=>{
        return a-b;
    });
    let trim=(last5.slice(1,4).reduce((a,b)=>a+b,0))/3;
    return  formatTime(trim);
}
const calculateAo12=()=>{
    if(sessionSolves.length<12){
        return "--";
    }
    let last12=sessionSolves.slice(-12);
    last12=last12.sort((a,b)=>{
        return a-b;
    });
    let trim=(last12.slice(1,11).reduce((a,b)=>a+b,0))/10;
    return  formatTime(trim);
}
document.addEventListener("keydown",function(event){
    event.preventDefault();
     if(timerState==="inspecting" && event.code==="Space"){
            timerState="ready";
            timer.style.color="hsl(142, 69%, 58%)";
     }
})
document.addEventListener("keyup",function(event){
        if(timerState==="idle" && event.code=="Space"){
            timerState="inspecting"
            timer.style.color="red";
            timer.innerText=inspectionTime;
           inspectionIntervalId= setInterval(function(){
                inspectionTime++;
                timer.innerText=inspectionTime;
                if(inspectionTime>=15){
                    timer.innerText='DNF';
                }
            },1000);
        }else if(timerState==="ready"&& event.code=="Space"){
            timerState="running";
            timer.style.color="white";
            clearInterval(inspectionIntervalId);
            inspectionTime=0;
            start=Date.now();
            intervalId= setInterval(function(){
                let curr=Date.now();
                elapsedTime=curr-start;
                timer.innerText=formatTime(elapsedTime);
            },10);
            
            console.log("timer start");
        }else if(timerState==="running" && event.code=="Space"){
            clearInterval(intervalId);
            timerState="idle";
            sessionSolves.push(elapsedTime);
            solve++;
            solves.innerText=solve;
            Ao5.innerText=calculateAo5();
            Ao12.innerText=calculateAo12();
            console.log(sessionSolves);
        }
   
});


