const video = document.getElementById("video");
const mice = document.getElementById("mick");
const camera = document.getElementById("camera");
const selectMick = document.getElementById("selectMick");
const selectCamera = document.getElementById("selectCam");

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
});

// for access the media device
const gotMedia = async (cameraId, mickId) => {
  console.log(cameraId);
  const initialConstrains = {
    video: true,
    audio: true,
  };

  const preferredConstrains = {
    audio: {
      deviceId: mickId,
    },
    video: {
      deviceId: cameraId,
    },
  };

  try {
    mediaStream = await window.navigator.mediaDevices.getUserMedia(
      cameraId ? preferredConstrains : initialConstrains
    );
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

// here we can find all of the media device who are connected on computer
const getDevise = async () => {
  const allDevice = await window.navigator.mediaDevices.enumerateDevices();

  allDevice.forEach((device) => {
    if (device.kind === "videoinput") {
      const option = document.createElement("option");
      option.textContent = device.label;
      option.value = device.deviceId;
      selectCamera.appendChild(option);
    }
    if (device.kind === "audioinput") {
      const option = document.createElement("option");
      option.textContent = device.label;
      option.value = device.deviceId;
      selectMick.appendChild(option);
    }
  });
};
getDevise();

// select a specific camera
selectCamera.addEventListener("input", (e) => {
  const deviceId = e.target.value;
  gotMedia(deviceId);
});

// select a specific mick
selectMick.addEventListener("input", (e) => {
  const deviceId = e.target.value;
  gotMedia(deviceId)
});
