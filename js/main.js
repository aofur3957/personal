const title = document.querySelector('#visual h1');
const titleText = title.innerText;

const scroll = window.scrollY;
const section = document.querySelectorAll('section');


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
