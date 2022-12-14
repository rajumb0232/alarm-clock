const selectMenu = document.querySelectorAll("select");
const time = document.querySelector(".time");
const alarmBtm = document.querySelector("button");
const content = document.querySelector(".content")

let alarmTime, isAlarmSet=false;
ringtone = new Audio("/digital clock/ringtone/AUD-20221014-WA0003.mp3");

for(let i =12;i>0;i--){
    i=i<10?"0"+i:i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i =59;i>=0;i--){
    i=i<10?"0"+i:i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i =2;i>0;i--){
    let ampm = i == 1?"AM":"PM"
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

setInterval(() =>{
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();

    ampm ="AM";

    if(h>=12){
        h=h-12;
        ampm="PM";
    }

    // if hour is 0 then set its value to 12
    h=h==0?h=12:h;

    // adding 0 if the hour,min and sec values are in units
    h=h<10?"0"+h:h;
    m=m<10?"0"+m:m;
    s=s<10?"0"+s:s;
   
    // console.log(`${h} : ${m} : ${s} ${ampm}`)
    
    time.textContent = `${h} : ${m} : ${s} ${ampm}`;

    if(alarmTime == `${h}:${m} ${ampm}`){
        console.log("Alarm Ringing...");
        ringtone.play();
        ringtone.loop= true;
        alarmBtm.addEventListener("click", ()=>{
        window.location.reload();});
    }

},1000);

alarmBtm.addEventListener("click", ()=>{
    if(isAlarmSet){
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        alarmBtm.textContent="Set Alarm";
        return isAlarmSet=false;
    }
   
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    console.log(time);
    if(time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM")){
        return alert("incorrect time format!")
    }
    alarmTime = time;
    content.classList.add("disable");
    alarmBtm.textContent="Clear Alarm";
    isAlarmSet=true;
    
})