import UI from "./utils.js";
import { api } from './apis/api.js';
import { Storage } from './utils/storage.js';



const handleLogin = async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  const credentials = { email, password };

  try {
    const result = await api.auth.login(credentials);

    if (result.accessToken && result.user) {
      Storage.setItem('token', result.accessToken);
      Storage.setItem('user', result.user);
      window.location.assign("home.html");  
    } else {
      alert('Something went wrong');
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed. Please try again.');
  }
};

  function createLoginLayout() {
  const container = UI.createElement('div', { class: 'container-root' }, [
   
    UI.createElement('header', { class: 'header' }, [
      UI.createElement('a', { href: './home.html' }, 'Home'),
      UI.createElement('a', { href: './registration.html' }, 'Sign up')]),
      
    UI.createElement('div', { class: 'form-wrapper' }, [
      UI.createElement('div', { class: 'login-container' }, [
        UI.createElement('form', null, [
          UI.createElement('input', {placeholder: 'Email', type: 'email', id: 'email', class: 'input-field' }),
          UI.createElement('input', { placeholder: 'Password',type: 'password', id: 'password', class: 'input-field' }),
          UI.createElement('button',{ type: 'submit', class: 'submit-button' }, 'Login')
        ])
      ])
    ])
  ]);

  UI.render(container, document.body);

  const form = container.querySelector('form');
  form.addEventListener('submit', handleLogin);
}

createLoginLayout();




