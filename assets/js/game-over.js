var num_players = sessionStorage.getItem("num_players");
var play_mode = sessionStorage.getItem("play_mode");

document.getElementById("menu").addEventListener('click', function (e) {
    window.location.href = "menu.html";
});


document.getElementById("again").addEventListener('click', function (e) {
    if(num_players==2){
      if (play_mode==1) {
        window.location.href = "index-2p.html";
      }
      else{
        window.location.href = "index-2p-jig.html";
      }
    }
    else{
      if (play_mode==1) {
        window.location.href = "index.html";
      }
      else{
        window.location.href = "index-jig.html";
      }
    }
});

var gameOverSound;


window.onload = function () {


    gameOverSound = new sound("assets/game-over.mp3");
    gameOverSound.play();
}

    function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
} 