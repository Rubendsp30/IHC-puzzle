var num_players = sessionStorage.getItem("num_players");

document.getElementById("menu").addEventListener('click', function (e) {
    window.location.href = "menu.html";
});


document.getElementById("again").addEventListener('click', function (e) {
    if(num_players=2){
        window.location.href = "index-2p.html";
    }
    else{
        window.location.href = "index.html";
    }
});

var gameOverSound;


window.onload = function () {


    gameOverSound = new sound("assets/victory.mp3");
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