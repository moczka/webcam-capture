window.addEventListener('load', onWindowLoad, false);

function onWindowLoad(){
	
	var takePhoto = $('#takePhoto');
	takePhoto.addEventListener('click', onTakePhoto, false);
	var cameraSwitch = $('#cameraSwitch');
	cameraSwitch.addEventListener('click', onCameraSwitch, false);
	var recordButton = $('#recordVideo');
	recordButton.addEventListener('click', onRecordButton, false);
	var myWebcam = new Webcam(false, true);
	var videoElement;
	videoElement = myWebcam.begin();
	videoElement.setAttribute('id', 'cameraVideo');
	
	$('#camera').appendChild(videoElement);
	var theCanvas = document.createElement('canvas');
	var context = theCanvas.getContext('2d');
	theCanvas.width = 640;
	theCanvas.height = 480;
	
	function onTakePhoto(e){
		var target = e.target;
		context.drawImage(videoElement, 0, 0);
		target.href = theCanvas.toDataURL('image/jpeg');
		
	}
	function onCameraSwitch(e){
		var target = e.target;
	
		if(myWebcam.running){
			myWebcam.stop();
			target.value = "ON";
			target.setAttribute('style', 'background-color: rgba(0, 150, 0, 0.5);');
		}else if(!myWebcam.running){
			videoElement = myWebcam.begin();
			target.value = "OFF";
			target.setAttribute('style', 'background-color: rgba(150, 0, 0, 0.5);');
		}
	}
	function onRecordButton(e){
	  var target = e.target;
	  if(target.value == "RECORD" && myWebcam.running){
	    //record video
	    target.value = "RECORDING";
	    target.setAttribute('style','background-color: rgba(150,0,0, 0.5);');
	  }else if(target.value == "RECORDING"){
	    target.setAttribute('style','background-color: rgba(0,0,150, 0.5);');
	    target.value = "RECORD";
    	}
	}
}
function Webcam(audioB, videoB){
	audioB = (audioB === undefined)? true: audioB;
	videoB = (videoB === undefined)? true: videoB;
	var video = document.createElement('video');
	var mediaStream;
	navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;
	this.support = navigator.getUserMedia;
	this.running = false;
	var self = this;
	this.begin = function(){
		if(navigator.getUserMedia){
			navigator.getUserMedia({audio:audioB, video:videoB}, successCall, failCall);
		}else{
			video = document.createElement('p');
			video.innerHTML = "Your browser does not support webcam capture, download the latest version of Google Chrome";
		}
		function successCall(stream){
		  mediaStream = stream;
			video.autoplay = true;
			video.src = window.URL.createObjectURL(stream);
			self.running = mediaStream.active;
			self.cameraName = mediaStream.getTracks()[0].label;
		}
		function failCall(stream){
		  mediaStream = stream;
			video = document.createElement('p');
			self.running = false;
			video.innerHTML = "Something went wrong with your camera or it is currently in use.";
		}
		return video;
	};
	this.stopVideo = function(){
	    if(mediaStream.getVideoTracks()[0].enabled){
	      mediaStream.getVideoTracks()[0].stop();
	    }
	};
	this.stopAudio = function(){
	    if(mediaStream.getVideoTracks()[0].enabled){
	      mediaStream.getAudioTracks()[0].stop();
	    }
	};
	this.cameraName = "Camera is not running" ;
	this.stop = function(){
		if(self.running){
			self.running = false;
	    for(var i=0; i<mediaStream.getTracks().length; i++){
				mediaStream.getTracks()[i].stop();
			}	
		}
	};
}
function $(selector){
	return document.querySelector(selector);
}

