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

var imageFile;

var loadFile = function (event) {
  var image = document.getElementById('uploadedImg');
  imageFile = event.target.files[0];
  image.src = URL.createObjectURL(imageFile);
};

async function convert() {

  resultImg1.src = uploadedImg.src;

  const formData = new FormData();
  var image = document.getElementById('uploadedImg');

  formData.append('imageFile', imageFile);

  fetch(serverSide + '/style_transfer', {
      method: 'POST',
      mode: "no-cors",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.path)
    })
    .catch(error => {
      console.error('Error:', response);
    });

  resultImg2.src = uploadedImg.src;
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