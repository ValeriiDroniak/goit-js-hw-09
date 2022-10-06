import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const inputsRef = formRef.querySelectorAll('input');

inputsRef[0].value = 500;
inputsRef[1].value = 300;
inputsRef[2].value = 8;

Notify.init({
  useIcon: false,
  position: 'center-top',
});

formRef.addEventListener('submit', onStartCreate)

function onStartCreate(event) {
  event.preventDefault();

  const data = {}
  const formData = new FormData(event.currentTarget);

  formData.forEach((value, name) => data[name] = Number(value));

  const { delay, step, amount } = data;
  let counterDelay = delay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, counterDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    counterDelay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });
}