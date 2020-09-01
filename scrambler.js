class TextScramble{constructor(e){this.el=e,this.chars="!<>-_\\/[]{}()—=+*^?#______LHP",this.update=this.update.bind(this)}setText(e){const t=this.el.innerText,s=Math.max(t.length,e.length),r=new Promise(e=>this.resolve=e);this.queue=[];for(let r=0;r<s;r++){const s=t[r]||"",h=e[r]||"",a=Math.floor(40*Math.random()),n=a+Math.floor(40*Math.random());this.queue.push({from:s,to:h,start:a,end:n})}return cancelAnimationFrame(this.frameRequest),this.frame=0,this.update(),r}update(){let e="",t=0;for(let s=0,r=this.queue.length;s<r;s++){let{from:r,to:h,start:a,end:n,char:H}=this.queue[s];this.frame>=n?(t++,e+=h):this.frame>=a?((!H||Math.random()<.15)&&(H=this.randomChar(),this.queue[s].char=H),e+=`<span class="dud">${H}</span>`):e+=r}this.el.innerHTML=e,t===this.queue.length?this.resolve():(this.frameRequest=requestAnimationFrame(this.update),this.frame++)}randomChar(){return this.chars[Math.floor(Math.random()*this.chars.length)]}}const phrases=["WASHCYCLE WORMHOLE","WASHCYCLE WORMHOLE","WASHCYCLE WORMHOLE","WASHCYCLE WORMHOLE","WASHCYCLE WORMHOLE","WATCHING CLOSELY?","WASHCYCLE WORMHOLE","WASHCYCLE WORMHOLE","WASHCYCLE WORMHOLE","STILL WITH ME?","WASHCYCLE WORMHOLE","WASHCYCLE WORMHOLE","WASHCYCLE WORMHOLE","WASHCYCLE WORMHOLE","THE","THE LEFT","THE LEFT HAND","THE LEFT HAND PATH","DEBUT ALBUM","COMING SOON","WASHCYCLE WORMHOLE","WASHCYCLE WORMHOLE","WASHCYCLE WORMHOLE","WASHCYCLE WORMHOLE"],el=document.querySelector(".scramble"),fx=new TextScramble(el);let counter=0;const next=()=>{fx.setText(phrases[counter]).then(()=>{setTimeout(next,800)}),counter=(counter+1)%phrases.length};next();

window.onload = function(){
    var url = 'wormhole128.mp3';
    window.AudioContext = window.AudioContext||window.webkitAudioContext; //fix up prefixing
    var context = new AudioContext(); //context
    var source = context.createBufferSource(); //source node
    source.connect(context.destination); //connect source to speakers so we can hear it
    var request = new XMLHttpRequest();
    request.open('GET', url, true); 
    request.responseType = 'arraybuffer'; //the  response is an array of bits
    request.onload = function() {
        context.decodeAudioData(request.response, function(response) {
            source.buffer = response;
            source.start(0); //play audio immediately
            source.loop = true;
        }, function () { console.error('The request failed.'); } );
    }
    request.send();
}