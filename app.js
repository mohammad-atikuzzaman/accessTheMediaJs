const video = document.getElementById("video");
const mice = document.getElementById("mick");
const camera = document.getElementById("camera");
const selectMick = document.getElementById("selectMick");
const selectCamera = document.getElementById("selectCam");
const shareScreenBtn = document.getElementById("shareScreen");

let mediaStream;

// toggle sounds
let mute = false;
mice.addEventListener("click", (e) => {
  if (mute) {
    mute = false;
    mice.textContent = "Mute";
    mice.style.backgroundColor = "tomato"
    mediaStream.getAudioTracks().forEach((track) => {
      track.enabled = true;
    });
  } else {
    mute = true;
    mice.textContent = "Unmute";
    mice.style.backgroundColor = "green"
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
    camera.style.backgroundColor = "green"
    cam = false;
    mediaStream.getVideoTracks().forEach((track) => {
      track.enabled = false;
    });
  } else {
    camera.textContent = "Turn Off Camera";
    camera.style.backgroundColor = "tomato"
    cam = true;
    mediaStream.getVideoTracks().forEach((track) => {
      track.enabled = true;
    });
  }
});

// for access the media device
let cameraId;
let mickId;
const gotMedia = async (cam, mic) => {
  if (cam) {
    cameraId = cam;
  }
  if (mic) {
    mickId = mic;
  }

  const preferredConstrains = {
    audio: mickId ? { deviceId: mickId } : true,
    video: cameraId ? { deviceId: cameraId } : true,
  };

  // console.log(preferredConstrains)

  try {
    mediaStream = await window.navigator.mediaDevices.getUserMedia(
      preferredConstrains
    );
    displayMedia();
    getAllCamera();
    getAllMick();
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

const getScreenMedia=async()=>{
  try {
    mediaStream = await window.navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true
    })
  } catch (error) {
    console.log(error)
  }
  displayMedia()
}

shareScreenBtn.addEventListener("click", getScreenMedia)

// here we can find all of the camera device who are connected on computer
const getAllCamera = async () => {
  const currentCamera = await mediaStream.getVideoTracks()[0];
  const allDevice = await window.navigator.mediaDevices.enumerateDevices();

  selectCamera.innerHTML = "";

  allDevice.forEach((device) => {
    if (device.kind === "videoinput") {
      const option = document.createElement("option");
      option.textContent = device.label;
      option.value = device.deviceId;
      option.selected = device.label === currentCamera.label;
      selectCamera.appendChild(option);
    }
  });
};

// here we can find all of the mick device who are connected on computer
const getAllMick = async () => {
  const currentMick = await mediaStream.getAudioTracks()[0];
  const allDevice = await window.navigator.mediaDevices.enumerateDevices();

  selectMick.innerHTML = "";

  allDevice.forEach((device) => {
    if (device.kind === "audioinput") {
      const option = document.createElement("option");
      option.textContent = device.label;
      option.value = device.deviceId;
      option.selected = device.label === currentMick.label;
      selectMick.appendChild(option);
    }
  });
};

// select a specific camera
selectCamera.addEventListener("input", (e) => {
  const deviceId = e.target.value;
  gotMedia(deviceId);
});

// select a specific mick
selectMick.addEventListener("input", (e) => {
  const deviceId = e.target.value;
  gotMedia(false, deviceId);
});
