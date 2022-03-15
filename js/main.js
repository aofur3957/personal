const title = document.querySelector('#visual h1');
const titleText = title.innerText;
const section = document.querySelectorAll('section');
let sectionOffset = [];
const num = document.querySelectorAll('#intro span');
const labtopLeft = document.querySelector('.floatLeftImg')
const labtopRight = document.querySelector('.floatRightImg')
const standard = document.querySelector('.standard');
const react = document.querySelector('.react');
const scrollBox = document.querySelector('.scroll dd');

let enableScroll = true;

// title 및 subtitle 애니메이션 
let titleSplit = titleText.split('').join('</span><span>');
titleSplit = `<span>${titleSplit}</span>`
title.innerHTML = titleSplit;

let tl = gsap.timeline();
tl.from('#visual h1 span', {
    opacity: 0,
    y: 200,
    duration: 1.2,
    stagger: 0.2,
    ease: "back.inOut(1.7)"
});

tl.from('#visual p', {
    opacity: 0,
    y: 150,
    duration: 1
})

//section offsetTop 배열 생성
section.forEach((el, idx)=>{
    sectionOffset.push(el.offsetTop);
})
console.log(sectionOffset);

//window.scroll 값 넣기
window.addEventListener('scroll', e=>{
    const scrollValue = window.scrollY;
    scrollBox.innerHTML = scrollValue;
    const base = -200;
    let numValue = (scrollValue - sectionOffset[1]) * 0.2;
    let LabtopVal = (scrollValue - (sectionOffset[2] - 500)) * 0.2;

    if(scrollValue >= sectionOffset[1]+base){
        const tl = gsap.timeline();
        tl.to('.des1 h2', {
            y: 0,
            opacity: 1,
            duration: 0.6
        })
        tl.to('.des1 p', {
            y: 0,
            opacity: 1,
            duration: 0.6
        })
        tl.to('.des2 h2', {
            y: 0,
            opacity: 1,
            duration: 0.6
        })
        tl.to('.des2 p', {
            y: 0,
            opacity: 1,
            duration: 0.6
        })

        for(let el of num){
            el.style.transform = `translateY(${numValue}px)`
        }
    }

    if(scrollValue >= sectionOffset[2] + base){
        const tl = gsap.timeline();
        tl.to('#work .tit h2', {
            y: 0,
            opacity: 1,
            duration: 1
        })
        tl.to('#work .tit p', {
            y: 0,
            opacity: 1,
            duration: 1
        })
    }

    if(scrollValue >= sectionOffset[2] - 500){
        labtopLeft.style.transform = `translateY(${-LabtopVal}px)`

        labtopRight.style.transform = `translateY(${LabtopVal}px)`
    }

    if(scrollValue >= standard.offsetTop - 300){
        gsap.to('#work .standard .pic', {
            y: 0,
            opacity: 1,
            duration: 1
        })
        gsap.to('#work .standard .des', {
            x: 0,
            opacity: 1,
            duration: 1
        })
    }

    if(scrollValue >= react.offsetTop - 300){
        gsap.to('#work .react .pic', {
            y: 0,
            opacity: 1,
            duration: 1
        })
        gsap.to('#work .react .des', {
            x: 0,
            opacity: 1,
            duration: 1
        })
    }


    if(scrollValue >= sectionOffset[3]){
        if(enableScroll === true){
            const charts = document.querySelectorAll('.chart');
            charts.forEach((chart)=>{
                const dataNum = chart.querySelector('span');
                const circle = chart.querySelector('circle');
                let init = 0;
                const dataNumVal = dataNum.getAttribute('data-num');
                const time = 1000 / dataNumVal;
    
                const numIncrease = setInterval(()=>{
                    ++init
                    dataNum.innerText = `${init}%`;
    
                    if(init >= dataNumVal){
                        clearInterval(numIncrease);
                    }
                },time)
    
                circle.style.strokeDashoffset = `${691 - (691 / 100 * dataNumVal )}px`
            })

            enableScroll = false;
        }
    }
})

const skill = document.querySelector('#skill');
console.log(skill.getBoundingClientRect());

