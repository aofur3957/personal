gsap.registerPlugin(ScrollTrigger);
const title = document.querySelector('#visual h1');
const project1 = document.querySelector('.project1');
const project2 = document.querySelector('.project2');
const project3 = document.querySelector('.project3');
const circleText = document.querySelector('#contact .circle p');
const scrollBox = document.querySelector('.scroll dd');
let enable = true;

initial();
listenEvent();

// 초기화
function initial(){
    textSplit(title);
    textSplit(circleText);
    showContact();
    showVisual();
    createIntroScrub();
    createWorkScrub()
    showWork();
    onCharts();
    createCircle();
    createContactScrub();
}

// 이벤트
function listenEvent(){
    //window.scroll 값 넣기
    window.addEventListener('scroll', e=>{
        const scrollValue = window.scrollY;
        scrollBox.innerHTML = scrollValue;
    });
    window.addEventListener('resize', createCircle);
}

// 텍스트 나누기 
function textSplit(element){
    let text = element.innerText;
    text = text.split('').join('</span><span>');
    text = `<span>${text}</span>`;
    element.innerHTML = text;
}

// contact섹션 디스플레이
function showContact(){
    const contactTl = gsap.timeline();
    contactTl.to('#contact', {
        opacity: 1,
        duration: 0.1
    })
}

// visual섹션 디스플레이
function showVisual(){
    const visualTl = gsap.timeline();
    visualTl.to('#visual h1', {
        opacity: 1,
        duration: 0.1
    }).to('#visual h1 span', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "back.inOut(1.7)",
    }).to('#visual p', {
        opacity: 1,
        y: 0,
        duration: 1.5
    }, '+=0.5');
}


// intro섹션 scrub 적용
function createIntroScrub(){
    gsap.to('.des_area1',{
        opacity: 1,
        y: -50,
        scrollTrigger: {
            trigger: '.des_area1',
            start: 'top 90%',
            end: 'center 40%',
            scrub: 0.5,
        }
    });
    gsap.to('.des_area2', {
        opacity: 1,
        y: -50,
        scrollTrigger: {
            trigger: '.des_area2',
            start: 'top 75%',
            end: 'center 40%',
            scrub: 0.5
        } 
    })
    gsap.to('.des_area1 span', {
        y: 150,
        scrollTrigger: {
            trigger: '.des_area1',
            start: 'top center',
            scrub: 0.5,
        }
    })
    gsap.to('.des_area2 span', {
        y: 150,
        scrollTrigger: {
            trigger: '.des_area2',
            start: 'top center',
            scrub: 0.5
        }
    }); 
}

// work섹션 이미지 scrub 적용
function createWorkScrub(){
    const workTl = gsap.timeline();
    workTl.to('.floatRightImg', {
        y: -400,
        scrollTrigger: {
            trigger: '#work',
            start: 'top 40%',
            scrub: 2,
            endTrigger: '#work tit',
            end: 'bottom top',
        }
    }).to('.floatLeftImg', {
        y: 400,
        scrollTrigger: {
            trigger: '#work',
            start: 'top 40%',
            scrub: 2,
            endTrigger: '#work tit',
            end: 'bottom top'
        }
    })
}

// work섹션 디스플레이
function showWork(){
    // 제목 및 텍스트 애니메이션
    const workTl = gsap.timeline();
    const anim = workTl.to('#work .tit h2', {
        y: 0,
        opacity: 1,
        duration: 1.2
    })
    .to('#work .tit p', {
        y: 0,
        opacity: 1,
        duration: 1.2
    }, '+=0.5');

    ScrollTrigger.create({
        trigger: '#work',
        animation: anim,
        start: "top 30%",
    })

    // 프로젝트1 애니메이션
    const project1Tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.project1',
            start: 'top 30%'
        }
    });
    project1Tl.add('start')
    .to('#work .project1 .pic', {
        y: 0,
        opacity: 1,
        duration: 1,
    })
    .to('#work .project1 .des', {
        x: 0,
        opacity: 1,
        duration: 1
    }, 'start')

    // 프로젝트2 애니메이션
    const project2Tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.project2',
            start: 'top 30%'
        }
    });
    project2Tl.add('start')
    .to('#work .project2 .pic', {
        y: 0,
        opacity: 1,
        duration: 1,
    })
    .to('#work .project2 .des', {
        x: 0,
        opacity: 1,
        duration: 1
    }, 'start')

    // 프로젝트3 애니메이션
    const project3Tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.project3',
            start: 'top 30%'
        }
    });
    project3Tl.add('start')
    .to('#work .project3 .pic', {
        y: 0,
        opacity: 1,
        duration: 1,
    })
    .to('#work .project3 .des', {
        x: 0,
        opacity: 1,
        duration: 1
    }, 'start')
}

// 차트 애니메이션
function onCharts(){
    ScrollTrigger.create({
        trigger: '.charts',
        start: 'top 20%',
        onEnter: () => {
            if(enable){
                const charts = document.querySelectorAll('.chart');
                charts.forEach(chart=>{
                    const dataNum = chart.querySelector('span');
                    const circle = chart.querySelector('circle');
                    let init = 0;
                    const dataNumVal = dataNum.getAttribute('data-num');
                    const interval = 1000 / dataNumVal; // 1초동안 dataNum만큼 반복

                    const numIncrease = setInterval(()=>{
                        ++init
                        dataNum.innerText = `${init}%`;

                        if(init >= dataNumVal){
                            clearInterval(numIncrease);
                        }
                    }, interval)

                    circle.style.strokeDashoffset = `${628 - (628 / 100 * dataNumVal )}px`
                })
                enable = false;
            }
        }
    })
}

// 글자 원형으로 회전
function createCircle(){
    const words = document.querySelectorAll('#contact span');
    const length = words.length;
    [...words].forEach((word, idx) => {
        const deg = (360 / length) * idx;
        if(window.matchMedia('(min-width: 1601px)').matches){
            word.style.transform = `rotate(${deg}deg) translate(0, -800%)`;
        }else if(window.matchMedia('(max-width: 1600px)').matches){
            word.style.transform = `rotate(${deg}deg) translate(0, -650%)`;
        }
    })
}

// contact섹션 scrub 및 pin 적용
function createContactScrub(){
    const contactTl =  gsap.timeline({
        scrollTrigger: {
            trigger: '#contact',
            scrub: true,
            pin: true,
            start: 'top top',
            end: '+=100%',
        }
    });
    
    contactTl.to('#contact .circle p', {
        rotation: 360,
    }).to('#contact', {
        background: '#333',
    })
}






