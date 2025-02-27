let audioUrl = ""
let audio = null
let isPlaying = false
const targetDate = new Date('2025-03-01T12:00:00');

function updateCountdown() {
    const now = new Date();
    const timeDiff = targetDate - now;

    if (timeDiff <= 0) {
        document.getElementById('days-top').textContent = '0';
        document.getElementById('days-bottom').textContent = '0';
        document.getElementById('hours-top').textContent = '0';
        document.getElementById('hours-bottom').textContent = '0';
        document.getElementById('minutes-top').textContent = '0';
        document.getElementById('minutes-bottom').textContent = '0';
        document.getElementById('seconds-top').textContent = '0';
        document.getElementById('seconds-bottom').textContent = '0';
        document.querySelector("#startButton").textContent = "准备好了，我们开始吧！";
        document.querySelector(".countdown").style.display = "none"
        return;
    }
    document.querySelector("#startButton").textContent = "时间还没到,耐心等待哦"
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let days = Math.floor(timeDiff / oneDay);
    let hours = Math.floor((timeDiff % oneDay) / oneHour);
    let minutes = Math.floor((timeDiff % oneHour) / oneMinute);
    let seconds = Math.floor((timeDiff % oneMinute) / 1000);

    updateDigit('days', days);
    updateDigit('hours', hours);
    updateDigit('minutes', minutes);
    updateDigit('seconds', seconds);
}

function updateDigit(type, value) {
    const topDigit = document.getElementById(`${type}-top`);
    const bottomDigit = document.getElementById(`${type}-bottom`);

    const currentTop = parseInt(topDigit.textContent);
    const currentBottom = parseInt(bottomDigit.textContent);

    const newTop = Math.floor(value / 10);
    const newBottom = value % 10;

    if (newTop!== currentTop) {
        topDigit.textContent = newTop;
        topDigit.classList.add('flip');
        setTimeout(() => {
            topDigit.classList.remove('flip');
        }, 500);
    }

    if (newBottom!== currentBottom) {
        bottomDigit.textContent = newBottom;
        bottomDigit.classList.add('flip');
        setTimeout(() => {
            bottomDigit.classList.remove('flip');
        }, 500);
    }
}

// 初始加载时更新倒计时
updateCountdown();

// 每秒更新倒计时
setInterval(updateCountdown, 1000);


// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      dataArr = Object.keys(data)
      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData])
          } else if (customData === "fonts") {
            data[customData].forEach(font => {
              const link = document.createElement('link')
              link.rel = 'stylesheet'
              link.href = font.path
              document.head.appendChild(link)
              //设置body字体
              document.body.style.fontFamily = font.name
            })
          } else if (customData === "music") {
            audioUrl = data[customData]
            audio = new Audio(audioUrl)
            audio.preload = "auto"
          } else {
            document.querySelector(`[data-node-name*="${customData}"]`).innerText = data[customData]
          }
        }

        // Check if the iteration is over
        // Run amimation if so
        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          document.querySelector("#startButton").addEventListener("click", () => {
            const now=new Date();
            const timeDiff = targetDate - now;
            console.log(targetDate);
            console.log(timeDiff);
            if(timeDiff<=0){
                // 开始移动 
              move();
              document.querySelector(".startSign").style.display = "none"
              animationTimeline()
            }

          }
          )
          // animationTimeline()
        }
      })
    })
}

// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0]
  const hbd = document.getElementsByClassName("wish-hbd")[0]

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  }

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  }

  const tl = new TimelineMax()

  tl
    .to(".container", 0.1, {
      visibility: "visible"
    })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10
      // scale: 0.7
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible"
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "#8FE3B6"
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
      },
      "+=0.5"
    )
    .to(
      ".idea-5 .smiley",
      0.7,
      {
        rotation: 90,
        x: 8
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      },
      0.2,
      "+=1"
    )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400
      },
      {
        opacity: 1,
        y: -1000
      },
      0.2
    )
    .from(
      ".lydia-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg"
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90
      },
      "+=1"
    )

  // tl.seek("currentStep");
  // tl.timeScale(2);

  // Restart Animation on click
  const replyBtn = document.getElementById("replay")
  replyBtn.addEventListener("click", () => {
    tl.restart()

  })
}

// Run fetch and animation in sequence
fetchData()

const playPauseButton = document.getElementById('playPauseButton')

document.getElementById('startButton').addEventListener('click', () => {
  

  if (audio) {
    togglePlay(true)
  }
})

playPauseButton.addEventListener('click', () => {
  if (audio) {
    togglePlay(!isPlaying)
  }
})

function togglePlay(play) {
  if (!audio) return
  
  isPlaying = play
  play ? audio.play() : audio.pause()
  playPauseButton.classList.toggle('playing', play)
}
//获取图片元素 
const animalImg = document.getElementById('animal-img'); 
// 获取进度条元素 
const progressBar = document.getElementById('progress-bar'); 
// 获取容器元素 
const container = document.getElementById('animal-container'); 
// 容器宽度 
const containerWidth = container.offsetWidth; 
// 图片宽度
 const imgWidth = animalImg.offsetWidth; 
 // 每次移动的像素 
 const step = 0.5; 
 // 已移动的距离 
 let distance = 0; 
 // 移动函数 
 function move() 
 { 
    if (distance < containerWidth - imgWidth) 
    { // 增加已移动距离 
    distance += step; 
    // 更新图片位置 
    animalImg.style.left = distance + 'px'; 
    // 计算进度百分比
     const progress = (distance / (containerWidth - imgWidth)) * 100; 
     // 更新进度条宽度 
     progressBar.style.width = progress + '%'; requestAnimationFrame(move); 
    } 
} 
   