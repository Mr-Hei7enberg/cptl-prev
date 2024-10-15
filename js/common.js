// AOS animation
AOS.init({
    offset: 150,
    duration: 300,
    delay: 200,
    easing: 'ease-out',
    once: true
});

// Nprogress for DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
    NProgress.set(0.4);
});

window.addEventListener("load", function (e) {
    NProgress.done();
});

// Initialize modal
const modal_contact_me = new bootstrap.Modal('#modal_contact_me');

// Initialize toast
const toast = document.getElementById('toast');

function toastConstructor(toast, params) {
    toast.innerHTML = '';
    toast.classList = '';
    if (params.text === undefined) {
        params.text = '';
    } else {
        const body = document.createElement('div');
        if (params.type === 'success') {
            toast.classList = "toast bg-success text-light";
            body.classList = ('toast-body');
            body.innerText = params.text;
        }
        else if (params.type === 'error') {
            toast.classList = "toast bg-danger text-light";
            body.classList = ('toast-body');
            body.innerText = params.text;
        }
        else {
            toast.classList = "toast bg-primary text-light";
            body.classList = ('toast-body');
            body.innerText = params.text;
        }
        toast.appendChild(body);
    }
};

// Mask for telephone input
const inputsTel = document.querySelectorAll('input[type="tel"]');
const inputMask = new Inputmask('+38(999)999-99-99');
inputMask.mask(inputsTel);

// Validate callback form
const validatorCallback = new JustValidate('#callback-form', {
    validateBeforeSubmitting: true,

    errorLabelStyle: {
        marginTop: '0.3rem',
        color: '#b81111',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        whiteSpace: 'nowrap'
    }

});
validatorCallback
    .addField('#input-tel', [
        {
            rule: 'required',
            errorMessage: "Поле обов\'язкове"
        },
        {
            rule: 'customRegexp',
            value: /^\+38\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
            errorMessage: 'Має бути 10 цифр'
        }
    ])
    .addField('#input-name', [
        {
            rule: 'required',
            errorMessage: "Поле обов\'язкове"
        },
        {
            rule: 'customRegexp',
            value: /^[А-Яа-яёЁЇїІіЄєҐґ\s]+$/,
            // value: /^[А-Яа-яёЁЇїІіЄєҐґ]+\s?[А-Яа-яёЁЇїІіЄєҐґ]+$/,
            errorMessage: 'Букви нашого алфавіту'
        }
    ])
    .onSuccess(async (e) => {
        document.querySelector('#spinner').classList.remove('d-none');
        document.querySelector('#spinner').classList.add('d-flex');
        const formData = new FormData(e.target);
        const response = await fetch('send-c.php', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const result = await response.json();
            toastConstructor(toast, { type: 'success', text: result.message }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            modal_contact_me.hide(); // Hide modal
            e.target.reset(); // Reset form
            document.querySelector('#spinner').classList.remove('d-flex');
            document.querySelector('#spinner').classList.add('d-none');
        } else {
            toastConstructor(toast, { type: 'error', text: 'Помилка' }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            document.querySelector('#spinner').classList.remove('d-flex');
            document.querySelector('#spinner').classList.add('d-none');
        }
    });

const nav = document.querySelector('.nav');
const burger = document.querySelector('.burger');

// Burger menu =======================================

document.querySelector('.burger').addEventListener('click', (e) => {
    burger.classList.toggle('active');
    nav.classList.toggle('active')
    document.body.classList.toggle('no-scroll');
});

// Callback button menu =======================================
let btnc = document.querySelector('.multibutton');

document.querySelector('.multibutton__button').addEventListener('click', (e) => {
    btnc.classList.toggle('active');
});


