let intervalId = null;
const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]')
}

refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);

noActiveBtn(refs.stopBtn);

function noActiveBtn(link) {
    link.disabled = true;
}

function isActiveBtn(link) {
    link.disabled = false;
}

function onClickStart(e) {
    changesBackgroundBody();
    intervalId = setInterval(changesBackgroundBody, 1000);
    noActiveBtn(e.target);
    isActiveBtn(refs.stopBtn);
}

function onClickStop(e) {
    clearInterval(intervalId);
    noActiveBtn(e.target);
    isActiveBtn(refs.startBtn);
}

function changesBackgroundBody() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export { isActiveBtn, noActiveBtn };