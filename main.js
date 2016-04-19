window.addEventListener('load', onWindowLoad, false);
//creates global variables
var imgElement;
var videoElement;


navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

function onWindowLoad(){
	//adds event listener
	var takePhoto = document.getElementById('takePhto');
	takePhoto.addEventListener('click', onTakePhto, false);
	
	
	
	//appends the video tag
	videoElement = document.createElement('video');
	document.body.appendChild(videoElement);
	
	if(navigator.getUserMedia){
		console.log(navigator.getUserMedia);
		navigator.getUserMedia({audio:false, video:true}, process, backup);
		
	}else{
		window.alert("Your browser does not support a webcam, download latest version of Google Chrome!");
	}

	
	videoElement = document.createElement('video');
	document.body.appendChild(videoElement);
	videoElement.setAttribute('autoplay', true);
	videoElement.setAttribute('width', '650');
	videoElement.setAttribute('height', '450');
	
	
}

//processes the webcam info
function process(webcam){
	
	videoElement.src = window.URL.createObjectURL(webcam);
	videoElement.setAttribute('autoplay', true);
	videoElement.setAttribute('width', '650');
	videoElement.setAttribute('height', '450');
	
	canvasApp();
	
	
	
}

function backup(webcam){
	window.alert("Something went wrong with your webcam! Make you have a working camera or that is not being used in another program!");
}

function canvasApp(){
	var theCanvas = document.createElement('canvas');
	document.body.appendChild(theCanvas);
	theCanvas.width = 650;
	theCanvas.height = 450;
	var context = theCanvas.getContext('2d');
	videoElement.setAttribute('style', 'display: none;');
	
	
	
	function drawScreen(){
		//clears canvas
		context.clearRect(0,0, theCanvas.width, theCanvas.height);
		
		context.drawImage(videoElement, 0, 0);
		
		
	}
	
	setInterval(drawScreen, 30);
	
	var takePhoto = document.getElementById('takePhoto');
	takePhoto.href = theCanvas.toDataURL('image/png');
	
	
}




