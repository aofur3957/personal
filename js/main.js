gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', e=>{
const title = document.querySelector('#visual h1');
const section = document.querySelectorAll('section');
let sectionOffset = [];
const project1 = document.querySelector('.project1');
const project2 = document.querySelector('.project2');
const project3 = document.querySelector('.project3');
const circleText = document.querySelector('#contact .circle p');
const scrollBox = document.querySelector('.scroll dd');

let enableScroll = true;
let enableScroll2 = true;

// text seperate 
function TextSplit(element){
    let text = element.innerText;
    text = text.split('').join('</span><span>');
    text = `<span>${text}</span>`;
    element.innerHTML = text;
}

TextSplit(title);
TextSplit(circleText);

const visualTl = gsap.timeline();
visualTl.to('#visual h1 span', {
    opacity: 1,
    y: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "back.inOut(1.7)",
})
.to('#visual p', {
    opacity: 1,
    y: 0,
    duration: 1.5
}, '+=0.5');

const introTl = gsap.timeline();
introTl.to('.des_area1', {
    opacity: 1,
    y: -50,
    scrollTrigger: {
        trigger: '.des_area1',
        start: 'top 90%',
        end: 'center 40%',
        scrub: '1',
    } 
})
.to('.des_area2', {
    opacity: 1,
    y: -50,
    scrollTrigger: {
        trigger: '.des_area2',
        start: 'top 75%',
        end: 'center 40%',
        scrub: '0.1'
    } 
})
.to('.des_area1 span', {
    y: 150,
    scrollTrigger: {
        trigger: '.des_area1',
        start: 'top, center',
        scrub: true
    }
})
.to('.des_area2 span', {
    y: 150,
    scrollTrigger: {
        trigger: '.des_area2',
        start: 'top center',
        scrub: true
    }
});

const workParallax = gsap.timeline();
        workParallax.to('.floatLeftImg', {
            yPercent: -50,
            scrollTrigger: {
                trigger: '#work',
                start: 'top 40%',
                scrub: true
            }
        }).to('.floatRightImg', {
            yPercent: 50,
            scrollTrigger: {
                trigger: '#work',
                start: 'top 40%',
                scrub: true
            }
        })

//section offsetTop 배열 생성
section.forEach((el, idx)=>{
    sectionOffset.push(el.offsetTop);
})
//window.scroll 값 넣기
window.addEventListener('scroll', e=>{
    const scrollValue = window.scrollY;
    scrollBox.innerHTML = scrollValue;

    if(scrollValue >= sectionOffset[2] - 300){
        if(enableScroll2){
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
                animation: anim
            })
            enableScroll2 = false;
        }
    }

    if(scrollValue >= project1.offsetTop - 300){
        gsap.to('#work .project1 .pic', {
            y: 0,
            opacity: 1,
            duration: 1
        })
        gsap.to('#work .project1 .des', {
            x: 0,
            opacity: 1,
            duration: 1
        })
    }

    if(scrollValue >= project2.offsetTop - 300){
        gsap.to('#work .project2 .pic', {
            y: 0,
            opacity: 1,
            duration: 1
        })
        gsap.to('#work .project2 .des', {
            x: 0,
            opacity: 1,
            duration: 1
        })
    }

    if(scrollValue >= project3.offsetTop - 300){
        gsap.to('#work .project3 .pic', {
            y: 0,
            opacity: 1,
            duration: 1
        })
        gsap.to('#work .project3 .des', {
            x: 0,
            opacity: 1,
            duration: 1
        })
    }

    if(scrollValue >= sectionOffset[3]){
        if(enableScroll === true){
            const charts = document.querySelectorAll('.chart');
            charts.forEach(chart=>{
                const dataNum = chart.querySelector('span');
                const circle = chart.querySelector('circle');
                let init = 0;
                const dataNumVal = dataNum.getAttribute('data-num');
                const interval = 1000 / dataNumVal;
    
                const numIncrease = setInterval(()=>{
                    ++init
                    dataNum.innerText = `${init}%`;
    
                    if(init >= dataNumVal){
                        clearInterval(numIncrease);
                    }
                }, interval)
                
                circle.style.strokeDashoffset = `${628 - (628 / 100 * dataNumVal )}px`
            })
            enableScroll = false;
        }
    }
})

function createCircle(){
    const words = document.querySelectorAll('#contact span');
    const length = words.length;
    [...words].forEach((word, idx) => {
        const deg = (360 / length) * idx;
        if(window.matchMedia('(min-width: 1601px)').matches){
            word.style.transform = `rotate(${deg}deg) translate(-50%, -800%)`;
        }else if(window.matchMedia('(max-width: 1600px)').matches){
            word.style.transform = `rotate(${deg}deg) translate(-50%, -650%)`;
        }
    })
}
createCircle();
window.addEventListener('resize', createCircle);

const circleParallax =  gsap.timeline({
    scrollTrigger: {
        trigger: '#contact',
        scrub: true,
        pin: true,
        start: 'top top',
        end: '+=100%',
    }
});

circleParallax.to('#contact .circle p', {
    rotation: 360,
}).to('#contact', {
    background: '#333'
})


})


