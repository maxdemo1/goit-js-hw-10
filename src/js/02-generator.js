const form = document.querySelector('.form');
const delay = form.querySelector('input[name="delay"]');
const fulfilledRadio = form.querySelector('input[value="fulfilled"]');
const rejectedRadio = form.querySelector('input[value="rejected"]');

form.addEventListener('submit', event => {
  event.preventDefault();
  const nowState = fulfilledRadio.checked;
  const nowDelay = delay.value;
  const promise = new Promise((fulfilled, reject) => {
    setTimeout(() => {
      if (nowState) {
        fulfilled(`✅ Fulfilled promise in ${nowDelay} ms`);
      } else {
        reject(`❌ Rejected promise in ${nowDelay}ms`);
      }
    }, delay.value);
  });

  promise
    .then(fulfilled => {
      iziToast.show({
        message: fulfilled,
        messageColor: 'white',
        backgroundColor: 'rgb(99, 162, 99)',
        position: 'topRight',
      });
    })
    .catch(reject => {
      iziToast.show({
        message: reject,
        messageColor: 'white',
        backgroundColor: 'rgb(255, 132, 132)',
        position: 'topRight',
      });
    });

  delay.value = '';
  rejectedRadio.checked = false;
  fulfilledRadio.checked = false;
});
