let socket = io.connect("http://localhost:4000");
var videoChatLobbyDiv = document.getElementById("video-chat-lobby");
var videoChatRoomDiv = document.getElementById("video-chat-room");
var chatControlPanel = document.getElementById("chat-control-panel");

let roomNameBox = document.getElementById("roomName");
let joinButton = document.getElementById("join-button");
let userVideo = document.getElementById("user-video");
let peerVideo = document.getElementById("peer-video");

let muteButton = document.getElementById("mute-button");
let cameraButton = document.getElementById("camera-button");
let leaveRoomButton = document.getElementById("leave-room-button");
let roomInput = document.getElementById("roomName");

// variables
let roomName = "";
let rtcPeerConnection;
let creator = false;
let muteFlag = false;
let cameraFlag = false;
let userStream;
let constraints = {
  audio: true,
  video: { width: 400, height: 500 },
};

//on click functions
//join button
joinButton.addEventListener("click", () => {
  console.log(roomInput.value);
  if (roomInput.value == "") {
    alert("Please enter a room name!!!");
    return;
  }
  roomName = roomInput.value;
  socket.emit("join", roomName);
  //access user media
  // navigator.getUserMedia(
  //   constraints,
  //   (stream) => {
  //     userVideo.srcObject = stream;
  //     userVideo.onloadedmetadata = (e) => {
  //       userVideo.play();
  //     };
  //   },
  //   (err) => {
  //     console.error(`The following error occurred: ${err.name}`);
  //   }
  // );
});

// server emit handling
socket.on("created", () => {
  console.log("On Created");
  creator = true;
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((mediaStream) => {
      userStream = mediaStream;
      videoChatLobbyDiv.style = "display:none";
      chatControlPanel.style = "display:flex;";
      userVideo.srcObject = mediaStream;
      userVideo.onloadedmetadata = () => {
        userVideo.play();
      };
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
    });
});
socket.on("joined", () => {
  console.log("On Joined");
  creator = false;
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((mediaStream) => {
      userStream = mediaStream;
      videoChatLobbyDiv.style = "display:none";
      chatControlPanel.style = "display:flex;";
      userVideo.srcObject = mediaStream;
      userVideo.onloadedmetadata = () => {
        userVideo.play();
      };
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
    });
});
socket.on("full", () => {
  alert("Room is full, you can't join this room!!");
});
socket.on("ready", () => {});
socket.on("offer", () => {});
socket.on("answer", () => {});
socket.on("leave", () => {});
