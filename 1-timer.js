import"./assets/styles-DD3qoKza.js";import{f as h,i as c}from"./assets/vendor-BbbuE1sJ.js";const o=document.querySelector("#start-btn"),a=document.querySelector("#datetime-picker");let i=null;o.disabled=!0;const p={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(s){i=s[0],i<=new Date?(o.disabled=!0,c.show({title:"Error",message:"Please choose a date in the future",color:"red",position:"topCenter"})):o.disabled=!1}};h("#datetime-picker",p);class f{constructor({onTick:t}){this.isActive=!1,this.onTick=t,this.intervalId=null}init(){const t={days:"00",hours:"00",minutes:"00",seconds:"00"};this.onTick(t)}stop(){clearInterval(this.intervalId),this.isActive=!1,a.disabled=!1;const t={days:"00",hours:"00",minutes:"00",seconds:"00"};this.onTick(t)}start(){if(this.isActive)return;this.isActive=!0,o.disabled=!0,a.disabled=!0;const t=i.getTime();this.intervalId=setInterval(()=>{const n=Date.now(),e=t-n;if(e<=0){this.stop(),c.show({title:"Completed",message:"Timer has ended",color:"green",position:"topCenter"});return}const r=this.convertMs(e);this.onTick(r)},1e3)}convertMs(t){const d=Math.floor(t/864e5).toString().padStart(2,"0"),u=Math.floor(t%864e5/36e5).toString().padStart(2,"0"),l=Math.floor(t%864e5%36e5/6e4).toString().padStart(2,"0"),m=Math.floor(t%864e5%36e5%6e4/1e3).toString().padStart(2,"0");return{days:d,hours:u,minutes:l,seconds:m}}}const y=new f({onTick:({days:s,hours:t,minutes:n,seconds:e})=>{document.querySelector("[data-days]").textContent=s,document.querySelector("[data-hours]").textContent=t,document.querySelector("[data-minutes]").textContent=n,document.querySelector("[data-seconds]").textContent=e}});o.addEventListener("click",()=>{y.start()});
//# sourceMappingURL=1-timer.js.map
