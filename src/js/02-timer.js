import СountdownTimer from "./countdown-timer";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "../css/countdown-timer.css";

let selectedTime = null;

const INFO_MESSAGE = 'Please choose a date in the future';
const refs = {
    selectedDate: document.querySelector('#datetime-picker'),
    startTimerBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedTime = Date.parse(selectedDates[0]);

        if (Date.now() < selectedTime) {
            refs.startTimerBtn.disabled = false;
        } else {
            refs.startTimerBtn.disabled = true;
            Notify.failure(INFO_MESSAGE);
        }
    },
};
const timer = new СountdownTimer({ onTick: updateTimerFace });

flatpickr('#datetime-picker', options);

refs.startTimerBtn.disabled = true;
refs.startTimerBtn.addEventListener('click', onStartTimer);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateTimerFace(time) {
    Object.entries(time).forEach(([name, value]) => {
        refs[name].textContent = addLeadingZero(value)
    });
}

function onStartTimer() {
    refs.startTimerBtn.disabled = true;
    refs.selectedDate.disabled = true;

    timer.start(selectedTime);
}