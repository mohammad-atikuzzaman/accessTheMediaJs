const video = document.getElementById("video");
const mice = document.getElementById("mick");
const camera = document.getElementById("camera");

let mediaStream;

// toggle sounds
let mute = false;
mice.addEventListener("click", (e) => {
  if (mute) {
    mute = false;
    mice.textContent = "Mute";
    mediaStream.getAudioTracks().forEach((track) => {
      track.enabled = true;
    });
  } else {
    mute = true;
    mice.textContent = "Unmute";
    mediaStream.getAudioTracks().forEach((track) => {
      track.enabled = false;
    });
  }
});

// toggle camera
let cam = true;
camera.addEventListener("click", (e) => {
  if (cam) {
    camera.textContent = "Turn On Camera";
    cam = false;
    mediaStream.getVideoTracks().forEach((track) => {
      track.enabled = false;
    });
  } else {
    camera.textContent = "Turn Off Camera";
    cam = true;
    mediaStream.getVideoTracks().forEach((track) => {
      track.enabled = true;
    });
  }

  console.log(cam);
});

// for access the media device
const gotMedia = async () => {
  try {
    mediaStream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // console.log(mediaStream);
    displayMedia();
  } catch (error) {
    console.log(error);
  }
};

gotMedia();

const displayMedia = async () => {
  video.srcObject = mediaStream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
};
