import"./assets/modulepreload-polyfill-ec808ebb.js";const o=document.querySelector(".form"),t=o.querySelector('input[name="delay"]'),i=o.querySelector('input[value="fulfilled"]'),a=o.querySelector('input[value="rejected"]');o.addEventListener("submit",r=>{r.preventDefault();const l=i.checked,s=t.value;new Promise((e,n)=>{setTimeout(()=>{l?e(`✅ Fulfilled promise in ${s} ms`):n(`❌ Rejected promise in ${s}ms`)},t.value)}).then(e=>{iziToast.show({message:e,messageColor:"white",backgroundColor:"rgb(99, 162, 99)",position:"topRight"})}).catch(e=>{iziToast.show({message:e,messageColor:"white",backgroundColor:"rgb(255, 132, 132)",position:"topRight"})}),t.value="",a.checked=!1,i.checked=!1});
//# sourceMappingURL=commonHelpers2.js.map