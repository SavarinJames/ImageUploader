const left = document.querySelector(".left");
const right = document.querySelector(".right");
const container = document.querySelector(".container");

const serverSide = 'http://127.0.0.1:5000';

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

	var formdata = new FormData();
	formdata.append("file", imageFile);
	var requestOptions = {
		method: 'POST',
		body: formdata,
		redirect: 'follow'
	};

	await fetch("http://127.0.0.1:5000/origin/udnie", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));

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