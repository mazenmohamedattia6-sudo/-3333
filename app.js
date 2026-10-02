// ── GIFTS DATA ──
const GIFTS = [
  // هدايا الحب
  {
    icon:'🌹', title:'وردة من قلبي',
    msg:'الوردة دي مش بس وردة.\nدي كل مشاعري فيكِ يا ملك.\nكل يوم بحبك أكتر من اللي قبله.',
    color:'#c96b8a'
  },
  {
    icon:'💌', title:'رسالة مكتوبة',
    msg:'يا ملك…\nإنتِ مصدر أماني ومصدر طمأنتي.\nوجودك في حياتي هو أجمل حاجة حصلتلي.',
    color:'#4a6eb0'
  },
  {
    icon:'🤍', title:'حضن دافي',
    msg:'بعتلك حضن وهمي يوصلك دلوقتي.\nأدفأ حضن بتلاقيه في أي وقت تحتاجيه.\nأنا هنا يا ملك. 🤍',
    color:'#8a4ab0'
  },
  // هدايا المستقبل
  {
    icon:'🏠', title:'بيتنا',
    msg:'بيت فيه ضحكتك وصوتك وريحتك.\nأنا وإنتِ وليلى ويزن.\nبحلم بيه كل يوم يا ملك.',
    color:'#b04a4a'
  },
  {
    icon:'✈️', title:'سفرة حلوة',
    msg:'عايز أسافر معاكِ لأي مكان.\nحتى لو مكان قريب.\nالمهم إنك إنتِ جنبي يا قطتي.',
    color:'#2a7a4a'
  },
  {
    icon:'👶', title:'ليلى ويزن',
    msg:'أحلى حلم عندي…\nليلى بتيجي في حضنك وبتقولك "واحشتيني يا ماما"\nوأنا شايل يزن وبشوفك.\nيا ربي يا ملوكتي. 💗',
    color:'#c9a84c'
  },
  // هدايا اللحظة
  {
    icon:'☕', title:'هوتشكليت',
    msg:'عايز أعمل ليكِ الهوتشكليت.\nونقف في البلكونة ونتكلم ونضحك.\nده أحلى وقت ممكن أقضيه معاكِ.',
    color:'#8a5a2a'
  },
  {
    icon:'🌙', title:'ليلة معاكِ',
    msg:'كل ليلة بشوف القمر وبفكر فيكِ.\nعشان القمر بيشبهك.\nبس إنتِ أجمل منه بمراحل يا ملك.',
    color:'#2a4a8a'
  },
  {
    icon:'😊', title:'ضحكتك',
    msg:'ضحكتك يا ملك…\nهي أحسن صوت بسمعه في يومي.\nوأول ما بتضحكي بقول:\n"بسم الله ماشاء الله إيه الحلاوة دي يا ربي." 💗',
    color:'#6a4ab0'
  },
];

// ── BG ──
const bgC=document.getElementById('bg-canvas'),bgX=bgC.getContext('2d');
function resizeBg(){bgC.width=innerWidth;bgC.height=innerHeight;}
resizeBg();window.addEventListener('resize',resizeBg);
const pts=Array.from({length:50},()=>({x:Math.random(),y:Math.random(),r:Math.random()*.7+.15,vx:(Math.random()-.5)*.1,vy:(Math.random()-.5)*.1,a:Math.random(),da:(Math.random()-.5)*.005,c:Math.random()>.5?'201,168,76':'201,107,138'}));
function drawBg(){const W=bgC.width,H=bgC.height;bgX.clearRect(0,0,W,H);pts.forEach(p=>{p.x+=p.vx/W;p.y+=p.vy/H;p.a+=p.da;if(p.a<.05||p.a>.82)p.da*=-1;if(p.x<0)p.x=1;if(p.x>1)p.x=0;if(p.y<0)p.y=1;if(p.y>1)p.y=0;const px=p.x*W,py=p.y*H,g=bgX.createRadialGradient(px,py,0,px,py,p.r*6);g.addColorStop(0,`rgba(${p.c},${p.a})`);g.addColorStop(1,`rgba(${p.c},0)`);bgX.beginPath();bgX.arc(px,py,p.r*6,0,Math.PI*2);bgX.fillStyle=g;bgX.fill();});requestAnimationFrame(drawBg);}
drawBg();

// ── STATE ──
let openedCount = 0;
const countEl = document.getElementById('opened-count');

// ── GIFT CLICK ──
document.querySelectorAll('.gift-box').forEach(box=>{
  box.addEventListener('click', ()=>{
    const idx = parseInt(box.dataset.idx);
    const gift = GIFTS[idx];
    if(!box.classList.contains('opened')){
      box.classList.add('opened');
      openedCount++;
      countEl.textContent = openedCount;
    }
    showPopup(gift);
  });
});

// ── POPUP ──
const overlay    = document.getElementById('unwrap-overlay');
const iconEl     = document.getElementById('unwrap-icon');
const titleEl    = document.getElementById('unwrap-title');
const msgEl      = document.getElementById('unwrap-msg');
const closeBtn   = document.getElementById('unwrap-close');

function showPopup(gift){
  iconEl.textContent  = gift.icon;
  titleEl.textContent = gift.title;
  msgEl.textContent   = gift.msg;
  overlay.hidden = false;
  overlay.style.animation = 'fadeIn .4s ease forwards';
  spawnFloats([gift.icon,'💗','✨','🎁'],12);
}

closeBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', e=>{ if(e.target===overlay) closePopup(); });

const fadeOutStyle=document.createElement('style');
fadeOutStyle.textContent='@keyframes fadeOut{from{opacity:1;}to{opacity:0;}}';
document.head.appendChild(fadeOutStyle);

function closePopup(){
  overlay.style.animation='fadeOut .3s ease forwards';
  setTimeout(()=>{ overlay.hidden=true; overlay.style.animation=''; },320);
}

// ── FLOATS ──
function spawnFloats(syms,count){
  for(let i=0;i<count;i++){
    setTimeout(()=>{
      const h=document.createElement('div');h.className='float-p';
      h.textContent=syms[Math.floor(Math.random()*syms.length)];
      h.style.cssText+=`left:${10+Math.random()*80}vw;font-size:${.85+Math.random()*1.1}rem;animation-duration:${2.2+Math.random()*2}s;`;
      document.body.appendChild(h);setTimeout(()=>h.remove(),5000);
    },i*140);
  }
}

// welcome floats
setTimeout(()=>spawnFloats(['🎁','✨','💗'],8), 500);
