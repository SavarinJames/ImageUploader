const left = document.querySelector(".left");
const right = document.querySelector(".right");
const container = document.querySelector(".container");

const serverSide = 'http://127.0.0.1:8000';

var resultImg1 = document.getElementById('result-img-1');
var resultImg2 = document.getElementById('result-img-2');
var resultImg3 = document.getElementById('result-img-3');
var resultImg4 = document.getElementById('result-img-4');
var uploadedImg = document.getElementById('uploadedImg');

left.addEventListener("mouseenter", () => {
  container.classList.add("hover-left");
});

left.addEventListener("mouseleave", () => {
  container.classList.remove("hover-left");
});

right.addEventListener("mouseenter", () => {
  container.classList.add("hover-right");
});

right.addEventListener("mouseleave", () => {
  container.classList.remove("hover-right");
});

var loadFile = function (event) {
  var image = document.getElementById('uploadedImg');
  image.src = URL.createObjectURL(event.target.files[0]);
};

async function convert() {
  
  const formData = new FormData();
  var image = document.getElementById('uploadedImg');

  formData.append('image', image);

  fetch(serverSide + '/', {
      method: 'GET',
      // body: formData
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    console.log('Success:', result);
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

resultImg1.onclick = function () {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

resultImg2.onclick = function () {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

resultImg3.onclick = function () {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

resultImg4.onclick = function () {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// Get the <span> element that downloads the image
var spanDownload = document.getElementsByClassName("download")[0];

// When the user clicks on <span> (down-arrow), download the image
spanDownload.onclick = function () {
  var anchor = document.createElement('a');
  anchor.setAttribute('href', modalImg.src);
  anchor.setAttribute('download', 'converted');
  document.body.appendChild(anchor);
  anchor.click();
  anchor.parentNode.removeChild(anchor);
}