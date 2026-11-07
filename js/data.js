// =====================================================================
//  CUSTOMIZE HERE — saara text aur photos isi file se aate hain.
//  {name} = birthday wale dost ka naam, {from} = aapka naam.
//  Ye dono har jagah apne aap replace ho jaate hain.
// =====================================================================

window.SITE = {
  name: "Your Friend",   // 👈 birthday person ka naam
  from: "Your Name",     // 👈 aapka naam

  revealNote: "(poore dil se 💖)",

  // Photos: assets/images/ (full size) + assets/thumbs/ (small, ~640px)
  // w/h = thumb ka size (optional, layout jump se bachata hai)
  photos: [
    { file: "photo-01.jpg", w: 480, h: 640, caption: "Entry aisi jaise poori duniya ka spotlight inhi pe ho 💃", alt: "Sample photo 1" },
    { file: "photo-02.jpg", w: 640, h: 427, caption: "Trip pe sabse zyada photos inhi ki aati hain 📸", alt: "Sample photo 2", funny: true },
    { file: "photo-03.jpg", w: 480, h: 640, caption: "Phool kaan pe, attitude aasmaan pe 🌸", alt: "Sample photo 3" },
    { file: "photo-04.jpg", w: 480, h: 640, caption: "Hawa bhi pooch rahi hai — aaj kahan ghoomne chalna hai? 🌊", alt: "Sample photo 4" },
    { file: "photo-05.jpg", w: 640, h: 480, caption: "Throwback! Jab drama abhi loading tha 😄", alt: "Sample photo 5" },
    { file: "photo-06.jpg", w: 480, h: 640, caption: "Simple look, par vibe full premium ✨", alt: "Sample photo 6" },
    { file: "photo-07.jpg", w: 480, h: 640, caption: "Khaana dekh ke jo smile aati hai, wo priceless hai 🍕😂", alt: "Sample photo 7", funny: true },
    { file: "photo-08.jpg", w: 640, h: 427, caption: "Ek chair, ek view, zero tension 🌅", alt: "Sample photo 8" },
    { file: "photo-09.jpg", w: 480, h: 640, caption: "Sofa pe aise baithe hain jaise company ke CEO hon 😎", alt: "Sample photo 9" },
    { file: "photo-10.jpg", w: 480, h: 640, caption: "Selfie mode: ON · Smile mode: FULL 📸", alt: "Sample photo 10" }
  ],

  awards: [
    { icon: "🧳", title: "Professional Ghumakkad", desc: "Ghar pe baithna? Impossible. Roz kahin na kahin jaana hi hai." },
    { icon: "⚡", title: "Bore Hone ki Speed — World Champion", desc: "5 minute mein bore ho jaana koi inse seekhe." },
    { icon: "🎭", title: "Certified Drama Queen", desc: "Full drama package — wo bhi bilkul free mein." },
    { icon: "🍕", title: "Certified Foodie", desc: "Diet kal se. Har roz. Pichhle 5 saal se." },
    { icon: "📱", title: "Late Reply Champion", desc: "Message dekh liya, reply 3 ghante baad. Classic." },
    { icon: "🤳", title: "Selfie Expert", desc: "Ek photo ke liye 47 attempts — aur phir bhi “achhi nahi aayi”." },
    { icon: "🤝", title: "Best Friend (Unofficial, par Obviously)", desc: "Kuch log bina koshish ke din special bana dete hain. 💖" }
  ],

  // Shuru ka "Nahi" button: har click pe agla message, aakhri ke baad button gayab
  nahiMessages: [
    "Jhooth! Humare paas photos ka saboot hai 😂",
    "Galat button. Phir se try karo 😏",
    "Ye button sirf decoration ke liye hai 😌",
    "Haan wala button dikh raha hai na? Wahi dabao 👉",
    "Itna drama? Bilkul {name} jaisa 🎭",
    "System: Face match 100%. Aap {name} hi ho ✅",
    "Kitni baar dabaoge? Main bhi yahin hoon 😎",
    "Nahi bolne se birthday cancel nahi hoga 🎂",
    "Itni ziddi? Wah, kya talent hai 👏",
    "Ok ok… ek baar aur try karo. Phir bhi nahi hoga 😂",
    "Is button ki battery khatam hone wali hai 🔋",
    "Bore nahi ho rahe? Aaj toh record tod diya 😜",
    "Ye button aaj chhutti pe hai 🏖️",
    "Error 404: “Nahi” not found 🤖",
    "{from} ne bola tha tum ye zaroor karoge 🙈",
    "Abhi bhi nahi? Wah, ziddi champion 🏆",
    "Ye button thak gaya hai, thoda rehem karo 🥺",
    "Last warning… (nahi, abhi aur chances hain 😏)",
    "Button: “Please mujhe chhod do” 😭",
    "Theek hai, ab main jaa raha hoon… 🚶",
    "Bas 2 aur click, phir ye button gayab 👀",
    "Aakhri click! Soch lo… 😬",
    "Bye bye “Nahi” 👋 Ab sirf “Haan” bacha hai 😂"
  ],

  // Screen 2: Birthday verification
  verify: [
    {
      q: "Kya aap hi {name} ho? 👀",
      options: [
        { t: "Haan, main hi hoon", ok: true, r: "Identity confirmed ✅ Chehra bhi match, attitude bhi match." },
        { t: "Nahi", ok: false, r: "" } // "Nahi" ke messages upar nahiMessages mein hain
      ]
    },
    {
      q: "Kya aap maante ho ki aap ek saal aur bade ho gaye? 🎂",
      options: [
        { t: "Bilkul nahi 🙅", ok: false, r: "Sorry, age verification failed. Phir se try karo 😜" },
        { t: "Haan… theek hai 😒", ok: true, r: "Shabaash! Sach maan lena hi sabse bada gift hai 😄" }
      ]
    },
    {
      q: "Aage bahut saari cuteness aane wali hai. Handle kar loge?",
      options: [
        { t: "Haan, ready hoon 😎", ok: true, r: "Theek hai… par baad mein mat kehna warning nahi di thi 💖" },
        { t: "Pata nahi 🙈", ok: true, r: "Koi baat nahi, hum dheere-dheere dikhayenge 😌" }
      ]
    }
  ],

  // Screen 6: Dosti ka test (apne sawaal-jawab yahan daalo)
  quiz: [
    {
      q: "Hum dono pehli baar kahan mile the? 🤔",
      options: ["School", "College", "Office", "Yaad nahi 😅"],
      answer: 0,
      right: "Sahi jawab! Wahan se shuru hui ye kahani 💫",
      wrong: "Galat! Itni jaldi bhool gaye? 😏"
    },
    {
      q: "{name} ka sabse favourite kaam kya hai?",
      options: ["Ghar pe baithna", "Ghoomna", "Sona", "Padhai karna"],
      answer: 1,
      right: "Obviously! Ghoomna = {name} ki life 🧳",
      wrong: "Hahaha, {name} aur ye? Kabhi nahi 😂"
    },
    {
      q: "Hum dono mein se sabse late reply kaun karta hai? 📱",
      options: ["{from}", "{name}", "Dono", "Koi nahi 😇"],
      answer: 1,
      right: "Ding ding ding! 🔔 Sach kabhi chhupta nahi 😂",
      wrong: "Nice try 😏 Chat history khol ke dekh lo!"
    },
    {
      q: "Is dosti ka sabse best part kya hai?",
      options: ["Masti", "Lambi baatein", "Ek-dusre ko pareshan karna", "Sab kuch 💖"],
      answer: 3,
      right: "Bilkul sahi! Ek cheez chunna possible hi nahi 💖",
      wrong: "Ye bhi hai… par isse bhi better option hai 😉"
    }
  ],

  secretMessages: [
    "Bola tha na mat dabao! 😂 Itni curiosity… bilkul {name} jaisi.",
    "Phir se? 🙈 Theek hai, ek secret: tum photos mein sach mein bahut achhe lagte ho.",
    "Bas! Ab aur koi secret nahi hai. Aage badho 😤",
    "…achha theek hai, aakhri: tum bahut special ho. Ab sach mein jao 💖"
  ],

  // Final letter — HTML allowed (<p>, <br>, <strong>, <em>)
  letter: `
    <p>Dear {name},</p>
    <p>Socha is baar sirf ek “Happy Birthday” message nahi bhejunga — kuch aisa banaunga jo sirf tumhare liye ho. To ye lo, ek poori chhoti si duniya, sirf tumhare liye. 🎁</p>
    <p>Itne saalon mein bahut kuch badla, par tumhari masti, tumhara drama aur tumhari hansi bilkul wahi ki wahi hai. 😄</p>
    <p>Kuch log bina koshish ke ordinary din ko special bana dete hain — tum unmein se ho. Thank you, hamesha saath rehne ke liye.</p>
    <p>Hamesha aise hi ghoomte raho, hanste raho, aur khush raho. ✨</p>
    <p>May this year bring you new places to explore, peaceful days, and a hundred reasons to smile.</p>
    <p class="letter-big">Happy Birthday, {name}! 🎂💖</p>
    <p class="letter-sign">— {from}</p>
    <p class="letter-ps">P.S. Ye website sirf tumhare liye bani hai. Kisi ko mat dikhana… ya dikha do, tumhari marzi 😂</p>
  `,

  lastSecret: "Saal badalte rahenge, par ye dosti hamesha aisi hi rahegi. 🤝💖"
};
