import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { noActiveBtn, isActiveBtn } from "./01-color-switcher";

const refs = {
    input: document.querySelector('#datetime-picker'),
    startTimerBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
const { startTimerBtn, days, hours, minutes, seconds } = refs;

noActiveBtn(startTimerBtn);
// startTimerBtn.disabled = true;
console.log(noActiveBtn);
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectTime = Date.now();
        if (selectTime < Date.parse(selectedDates[0])) {
            isActiveBtn(startTimerBtn);
            // startTimerBtn.disabled = false;
        } else {
            noActiveBtn(startTimerBtn);
            // startTimerBtn.disabled = true;
        }
    },
};
const alert = 'Please choose a date in the future';

flatpickr('#datetime-picker', options);
startTimerBtn.addEventListener('click', () => {
    timer.start();
});

// days.textContent = '';
// hours.textContent = '';
// minutes.textContent = '';
// seconds.textContent = '';

const timer = {
    start() {
        const startTime = Date.parse(refs.input.value);

        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            const timeComponents = convertMs(deltaTime);
            console.log('timeComponents', timeComponents);

        }, 1000)
    }
}


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

// const myOptions = {
//     enableTime: true,
//     dateFormat: "Y-m-d H:i",
//     // minDate: "today",
//     enableTime: true,
//     time_24hr: true
// }