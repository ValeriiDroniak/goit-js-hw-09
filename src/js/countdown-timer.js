export default class СountdownTimer {
    constructor({ onTick }) {
        this.intervalId = null,
            this.isActive = false,
            this.onTick = onTick
    }

    start(selectedTime) {
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;
            const time = this.convertMs(deltaTime);

            if (currentTime < selectedTime) {
                this.onTick(time);
            } else { this.stop() }
        }, 1000)
    }

    stop() {
        clearInterval(this.intervalId);
    }

    convertMs(ms) {
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
}