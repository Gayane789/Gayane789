import {posts} from "./data.js";
import {Storage} from "../utils/storage.js";
 
export let postsArray = Storage.getItem('posts') || posts;
    try{
     postsArray = Storage.getItem('posts') || [];
    
   }catch(error){
       console.log(error); 
   };

   if (!Storage.getItem('posts')) {
     Storage.setItem('posts', postsArray);
   }; 