import UI from "./utils.js";
import { api } from "./apis/api.js";
import { isUserLogin } from "./utils/is-user-login.js";
import { Storage } from "./utils/storage.js";

const bloggers = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    avatar: "https://www.w3schools.com/howto/img_avatar2.png",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    avatar: "https://www.w3schools.com/w3images/avatar2.png",
  },
  {
    id: 3,
    firstName: "Monica",
    lastName: "Brown",
    avatar: "https://www.w3schools.com/w3images/avatar6.png",
  },
];

const state = {
  posts: [],
};

function getRandomAvatar(gender) {
  const avatars = [
    "https://www.w3schools.com/howto/img_avatar.png",
    "https://www.w3schools.com/w3images/avatar2.png",
    "https://www.w3schools.com/w3images/avatar5.png",
    "https://www.w3schools.com/w3images/avatar6.png",
    "https://www.w3schools.com/howto/img_avatar2.png",
  ];

  const randomIndex = Math.floor(Math.random() * avatars.length);

  return avatars[randomIndex];
}

const createNewPost = () => {
  window.location.assign("newPost.html");
};

const createHomeLayout = function () {
  const createNewPostButton = UI.createElement(
    "button",
    { class: "panel-create-post" },
    "Create New Post"
  );
  createNewPostButton.addEventListener("click", createNewPost);

  function createHomeHeader() {
    const token = Storage.getItem("token");
    const isUserLogin = !!token;
    const loginButton = UI.createElement(
      "a",
      { href: "index.html" },
      isUserLogin ? "Log Out" : "Log In"
    );
    loginButton.addEventListener("click", () => {
      if (isUserLogin) {
        Storage.clear();
      }
      window.location.assign("index.html");
    });
    return UI.createElement(
      "header",
      {
        class: "header",
      },
      [
        loginButton,
        UI.createElement("a", { href: "registration.html" }, "Sign Up"),
        UI.createElement("a", { href: "newPost.html" }, "Create Blog"),
      ]
    );
  }

  const container = UI.createElement("div", { class: "container-root" }, [
    createHomeHeader(),
    UI.createElement("main", { class: "main-section" }, [
      createSidebar(bloggers),
      UI.createElement("div", { class: "section" }, [
        UI.createElement("section", { class: "panel" }, createNewPostButton),
        createSection(),
        createFooter(),
      ]),
    ]),
  ]);

  UI.render(container, document.querySelector("body"));
};

function createFooter() {
  return UI.createElement("section", { class: "footer" }, "Footer");
}

const handleDelete = (id) => {
  api.post.delete(id).then(() => {
    state.posts = state.posts.filter((post) => post.id !== id);

    document.querySelector(".container-root").remove();

    createHomeLayout();
  });
};

const handleEdit = (id) => {
  const queryParams = new URLSearchParams({
    id: id,
  });

  window.location.href = `newPost.html?${queryParams.toString()}`;
};

function createSection() {
  const elements = state.posts.map((post) => {
    const user = Storage.getItem("user");
    const isOwner = post.userId === user.id;

    const deleteButton = UI.createElement(
      "button",
      { class: "delete-card-button", style: isOwner ? "" : "display:none", style:"" },
      "Delete"
    );

    deleteButton.addEventListener("click", () => {
      handleDelete(post.id);
    });

    const editButton = UI.createElement(
      "button",
      { class: "edit-card-button", style: isOwner ? "" : "display:none" , style:""},
      "Edit"
    );

    editButton.addEventListener("click", () => {
      handleEdit(post.id);
    });

    return UI.createElement(
      "div",
      {
        class: "card",
      },
      [
        UI.createElement("div", { class: "card-body" }, [
          UI.createElement("p", { class: "card-header" }, post.title),
          UI.createElement("div", { class: "card-content" }, [
            UI.createElement("img", {src: post.img, class: "card-img-top", alt: "Post Image", }),
            UI.createElement("p", { class: "card-text" }, post.story),
          ]),
          deleteButton,
          editButton,
        ]),
      ]
    );
  });

  const section = UI.createElement("section", { class: "box" }, elements);

  return section;
}

function createSidebar() {
  api.user.getUser().then((bloggers) => {
    bloggers.forEach((user) => {
      const element = UI.createElement("div", { class: "card " }, [
        UI.createElement("img", {
          src: user.avatar || getRandomAvatar(),
          class: "avatar",
          alt: "Avatar",
        }),
        UI.createElement(
          "p",
          { class: "sidebar-text" },
          `${user.firstName} ${user.lastName}`
        ),
      ]);
      document.querySelector("#bloggers").appendChild(element);
    });
  });

  return UI.createElement(
    "sidebar",
    { id: "bloggers", class: "sidebar overflow-auto" },
    []
  );
}

const initApplicants = () => {
  try {
    if (!isUserLogin()) {
      window.location.assign("index.html");
      return;
    }

    api.post.getPosts().then((data) => {
      state.posts = data;
      createHomeLayout();
    });
  } catch (error) {
    state.posts = [];
  }
};

initApplicants();

// setInterval(() => {
//   if (document.querySelector("div.section")) {
//     document
//       .querySelector("div.section")
//       .removeChild(document.querySelector("section.footer"));
//   }
//   UI.render(createFooter(), document.querySelector("div.section"));
// }, 1000);

// /////////////////////////////////////

// function createHomeLayout() {

//     const container = UI.createElement("div", { class: "container-root" }, [
//       UI.createElement("header", { class: "header" }, [
//         UI.createElement("a", { href: "./index.html" }, "LogIn"),
//         UI.createElement("a", { href: "./registration.html" }, "Sign Up"),
//       ]),

//       UI.createElement("main", { class: "main-section" }, [
//         UI.createElement("nav", { class: "sidebar" }, [
//           UI.createElement("div", { class: "blogger" }, [
//             UI.createElement( "img", {src: "https://www.w3schools.com/howto/img_avatar2.png", class: "img_avatar", alt: "ImgAvatar" }, null),
//             UI.createElement("a", { href: "#" }, "Alice Johnson")]),

//           UI.createElement("div", { class: "blogger" }, [
//             UI.createElement( "img", { src: "https://www.w3schools.com/w3images/avatar2.png", class: "img_avatar", alt: "ImgAvatar" }, null),
//             UI.createElement("a", { href: "#" }, "Bob  Smith") ]),

//           UI.createElement("div", { class: "blogger" }, [
//             UI.createElement( "img", {src: "https://www.w3schools.com/w3images/avatar6.png", class: "img_avatar", alt: "ImgAvatar" },null),
//             UI.createElement("a", { href: "#" }, "Monica  Brown")]),
//           ]),
//           UI.createElement("div", { class: "sections" }, [
//             UI.createElement("section", { class: "box" }, [
//               UI.createElement("div", {class: "authorName"}, [
//                   UI.createElement("h2", {}, "Lewis Carroll"),
//                   UI.createElement("h2", {}, "The Adventures of Alice in Wonderland"),
//               ]),
//              UI.createElement("div", {class: "description"}, [
//               UI.createElement("p", {class: "story"}, "Alice was beginning to get very tired of sitting by her sister on the bank and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations."),
//               UI.createElement( "img", { src: "https://ik.imagekit.io/panmac/tr:f-auto,w-740,pr-true//bcd02f72-b50c-0179-8b4b-5e44f5340bd4/84f9dc39-0868-4cec-aeaa-2356387f37ce/Alice%E2%80%99s%20Adventures%20in%20Wonderland%20-%20Header.png", class: "img_story", alt:"Imgstory" })
//           ])
//           ]),

//           UI.createElement("section", { class: "box" }, [
//               UI.createElement("div", {class: "authorName"}, [
//                   UI.createElement("h2", {}, "J.R.R. Tolkien"),
//                   UI.createElement("h2", {}, "The Lord of the Rings: The Fellowship of the Ring"),
//               ]),
//              UI.createElement("div", {class: "description"}, [
//               UI.createElement("p", {class: "story"}, "One ring to rule them all, one ring to find them, one ring to bring them all and in the darkness bind them, in the Land of Mordor where the Shadows lie."),
//               UI.createElement( "img", { src: "https://img.hulu.com/user/v3/artwork/3c4e0a9f-c6f2-44f4-a703-a18c6be2a937?base_image_bucket_name=image_manager&base_image=243fcf14-8e45-4441-96a8-be510660958a&size=600x338&format=webp", class: "img_story", alt:"Imgstory" })
//           ])
//           ]),

//           UI.createElement("section", { class: "box" }, [
//               UI.createElement("div", {class: "authorName"}, [
//                   UI.createElement("h2", {}, "Jane Austen"),
//                   UI.createElement("h2", {}, "Pride and Prejudice"),
//               ]),
//              UI.createElement("div", {class: "description"}, [
//               UI.createElement("p", {class: "story"}, "It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife."),
//               UI.createElement( "img", { src: "https://wellsvillesun.com/wp-content/uploads/2024/01/pride-and-prejudice-book-summary.jpg.webp", class: "img_story", alt:"Imgstory" })
//           ])
//           ]),

//             UI.createElement("footer", { class: "footer" }, "footer"),

//         ]),
//       ]),
//     ]);

//     UI.render(container, document.querySelector("body"));
//     UI.render(createNewPostButton, document.querySelector("body"));
//   }
//   createHomeLayout();

// function createFooter() {
//     return UI.createElement("footer", { class: "footer" }, [
//         UI.createElement("p", {}, `Current Date: ${new Date().toLocaleString()}`)
//     ]);
// }

// setInterval(() => {
//     if (document.querySelector("div.section")) {
//         document
//             .querySelector("div.section")
//             .removeChild(document.querySelector("footer.footer"));
//     }
//     UI.render(createFooter(), document.querySelector("div.section"));
// }, 1000);
