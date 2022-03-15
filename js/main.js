const title = document.querySelector('#visual h1');
const titleText = title.innerText;

const section = document.querySelectorAll('section');
const sectionOffset = [];
const num = document.querySelectorAll('#intro span');

const scrollBox = document.querySelector('.scroll dd');

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
console.log(sectionOffset[1]);


//window.scroll 값 넣기
window.addEventListener('scroll', e=>{
    const scrollValue = window.scrollY;
    scrollBox.innerHTML = scrollValue;
    let numValue = (scrollValue - sectionOffset[1]) * 0.2;
    const base = -200;

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
})

const charts = document.querySelectorAll('.chart');
charts.forEach((chart, idx)=>{
    const dataNum = chart.querySelector('span');
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
})