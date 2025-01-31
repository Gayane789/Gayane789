
import UI from "./utils.js";
import { api } from './apis/api.js';
import { Storage } from "./utils/storage.js";
 
const storage = new Storage('https://simple-blog-api-red.vercel.app/api/posts');
 
function createForm() {
  const container = UI.createElement("div", { class: "container-root" }, [
    UI.createElement("header", { class: "header" }, [
      UI.createElement("a", { href: "./home.html" }, "Home"),
      UI.createElement("a", { href: "./index.html" }, "Log In"),
      UI.createElement("a", { href: "./registration.html" }, "Sign Up"),
    ]),
    UI.createElement("form", { class: "form-wrapper" }, [
      UI.createElement("div", { class: "create-form-container" }, [
        UI.createElement("input", { type: "text", id: "postTitle", name: "postTitle",  placeholder: "Enter post title",}),
        UI.createElement("textarea", {id: "postStory", name: "postStory", placeholder: "Enter your story here", rows: "5", cols:"50",
        }),
       
        UI.createElement("input", { id:"post-img", style:"width:100px",}, []),
        UI.createElement("input", {id: "file-upload",type: "file",
        }) ,
        
        UI.createElement("div", { class: "" }, [
          UI.createElement("button", { id: "create-new-post" }, "New Post"),
        ]),
      ]),
    ]),
  ]);

  
  UI.render(container, document.body);

  const createPostForm = document.getElementById("create-new-post");
  createPostForm.addEventListener("click", createPostHandler);
};
createForm();

let oldPost = null;

function initApplicants() {
  createForm();

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);

  if (searchParams.has("id")) {
    const postId = searchParams.get("id");

    api.post.getPostById(postId).then(post => {
      oldPost = post;
      document.getElementById("post-img").src = post.img ? post.img : "";
      document.getElementById("postTitle").value = post.title;
      document.getElementById("postStory").value = post.story;
      document.getElementById("postImage").value = post.img ? post.img : "";   
    }).catch(() => {
      //window.location.assign("home.html");
    })
  }

};

initApplicants();


async function createPostHandler(event) {
  event.preventDefault();

   
  const title = document.getElementById("postTitle").value.trim();
  const story = document.getElementById("postStory").value.trim();
  const fileUpload = document.getElementById("file-upload");


 let imgUrl = null;

 if (fileUpload.files.length) {
    const uploadedFile = await api.fileUpload.upload(fileUpload.files[0]);
    imgUrl = uploadedFile.url;

 }
  
  if (!title || !story) {
    alert("Please fill in all fields.");
    return;
  }

  const user = Storage.getItem("user");
   
  const newPost = {
    title,
    story,
    authorName: user.username, 
    img: imgUrl || oldPost.imgUrl,
    userId: user.id
  };

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const id = searchParams.get("id");

  try {
    if (id) {
      const updatedPost = await api.post.update(id, newPost);
      console.log("Updated Post:", updatedPost);
      window.location.assign("home.html");
    } else {
      const createdPost = await api.post.create(newPost);
      console.log("Created Post:", createdPost);
      window.location.assign("home.html");
    }
  } catch (error) {
    console.error("Error", error);
    alert(" Please try again.");
  }
  
};
 