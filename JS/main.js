import { header } from "../JS/header.js";
import { gallery } from "../JS/gallery.js";
import { button } from "../JS/button.js";


//Nedan är tillfälligt 

document.querySelector('a[href="../Sidor/About.html#Contact"]').addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.setItem('scrollToContact', 'true'); // Spara att vi ska scrolla efter sidbyte
    window.location.href = "../Sidor/About.html#Contact"; // Navigera till About.html
  });