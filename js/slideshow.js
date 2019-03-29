var slideIndex = 0;
showSlides();

function plusSlides(n) {
  changeSlide(slideIndex += n);
}

function currentSlide(n) {
  changeSlide(slideIndex = n-1);
}

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    if (slideIndex-1==0||slideIndex-1==2||slideIndex-1==6||slideIndex-1==11) {
      setTimeout(showSlides, 3000); // Change image every 2 seconds
    }
    else {
      setTimeout(showSlides, 2500); // Change image every 2 seconds
    }
}

function changeSlide(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";

}
