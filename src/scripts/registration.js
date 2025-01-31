
import UI from "./utils.js";
import { api } from './apis/api.js';

const handelSubmit = async (event) => {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const username = document.getElementById('userName').value.trim();

    const user = {
        firstName,
        lastName,
        email, 
        password,
        username
    };

    console.log(user);

    try {
        const result = await api.auth.register(user);
        console.log(result);

        if (result.id) {
            window.location.assign("index.html");
        } else {
            alert("Something went wrong. Please check your data.");
        }
    } catch (error) {
        console.error("Registration failed:", error);
        alert("An error occurred during registration. Please try again.");
    }
};

function createRegistrationLayout(UI) {
  const container = UI.createElement("div", { class: "container-root" }, [
    UI.createElement("header", { class: "header" }, [
      UI.createElement("a", { href: "./index.html", class: "login-link" }, "Log In"),
      UI.createElement("a", { href: "./home.html", class: "home-link" }, "Home"),
      UI.createElement("a", { href: "./newPost.html", class: "home-link" }, "New Post"),
    ]),

    UI.createElement("div", { class: "form-wrapper" }, [
      UI.createElement("div", { class: "registration-container" }, [
        UI.createElement("form", { class: "registration-form" }, [
          UI.createElement("input", { placeholder: "Last Name", id: 'lastName', type: "text", class: "input-field", }),
          UI.createElement("input", { placeholder: "First Name", id: 'firstName', type: "text", class: "input-field", }),
          UI.createElement("input", { placeholder: "Email", id: 'email', type: "email", class: "input-field", }),
          UI.createElement("input", { placeholder: "UserName", id: 'userName', type: "text", class: "input-field", }),
          UI.createElement("input", { placeholder: "Password", id: 'password', type: "password", class: "input-field", }),

          UI.createElement("select", { class: "select-box", required: true }, [
            UI.createElement("option", { value: "", disabled: true, selected: true }, "City"),
            UI.createElement("option", { value: "Yerevan" }, "Yerevan"),
            UI.createElement("option", { value: "Gyumri" }, "Gyumri"),
            UI.createElement("option", { value: "Dilijan" }, "Dilijan"),
          ]),

          UI.createElement("div", { class: "gender" }, [
            UI.createElement("input", { type: "radio", id: "radioMale", name: "gender", required: true }),
            UI.createElement("label", { for: "radioMale" }, "Male"),
            UI.createElement("input", { type: "radio", id: "radioFemale", name: "gender" }),
            UI.createElement("label", { for: "radioFemale" }, "Female"),
          ]),
          UI.createElement("input", {type: "file",id: "file-input", class: "file-input",placeholder: "choose file", },"Choose File" ),
          UI.createElement("div", { class: "send" }, [
            UI.createElement("input", { type: "checkbox", id: "send-email" }, ""),
            UI.createElement("label", { for: "send-email" }, "Send me Email"),
            UI.createElement("button", { type: "submit", id: 'submit' }, "Submit"),
          ]),
        ]),
      ]),
    ]),
  ]);

  UI.render(container, document.body);


  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', handelSubmit);
}

createRegistrationLayout(UI);
