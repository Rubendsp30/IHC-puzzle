//import TweenMax from '/gsap'

var num_players = 4;
var play_mode = 1; //0=jig  /  1=block
var dificulty = 1; //0= easy /1=normal /2=hard
var puzzle_choice = 1;

console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)

const menu1 = document.querySelector(".menu1");

//document.getElementById("front").style.display = "none";
document.getElementById("numb_players").style.display = "none";
document.getElementById("play_modes").style.display = "none";
document.getElementById("select_puzzle").style.display = "none";
document.getElementById("cont").style.display = "none";
document.getElementById("def1").style.display = "none";
document.getElementById("def2").style.display = "none";

//Click ecra inicial
document.getElementById("front").addEventListener('click', function (e) {
  document.getElementById("front").style.display = "none";
  TweenMax.staggerFrom(".btn2", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  TweenMax.staggerFrom(".definition", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  TweenMax.staggerFrom(".back", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("numb_players").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click back button para ecra inicial
document.getElementById("back_players").addEventListener('click', function (e) {
  document.getElementById("numb_players").style.display = "none";
  document.getElementById("front").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click setting no ecra players
document.getElementById("definition_players").addEventListener('click', function (e) {
  document.getElementById("numb_players").style.display = "none";
  TweenMax.staggerFrom(".back_def", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("def1").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click back setting para ecra players
  document.getElementById("back_def").addEventListener('click', function (e) {
  document.getElementById("def1").style.display = "none";
  TweenMax.staggerFrom(".btn2", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  TweenMax.staggerFrom(".definition", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("numb_players").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click escoha 2 jogadores
  document.getElementById("2players").addEventListener('click', function (e) {
  document.getElementById("numb_players").style.display = "none";
  TweenMax.staggerFrom(".btn3", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("play_modes").style.display = "flex";
  num_players = 2
  sessionStorage.setItem("num_players", num_players);
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click escoha 4 jogadores
    document.getElementById("4players").addEventListener('click', function (e) {
  document.getElementById("numb_players").style.display = "none";
  TweenMax.staggerFrom(".btn3", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("play_modes").style.display = "flex";
  num_players = 4
  sessionStorage.setItem("num_players", num_players);
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click back button para players
   document.getElementById("back_modes").addEventListener('click', function (e) {
  document.getElementById("play_modes").style.display = "none";
  TweenMax.staggerFrom(".btn2", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("numb_players").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
  });

   //Click setting no ecra modes
     document.getElementById("definition_modes").addEventListener('click', function (e) {
  document.getElementById("play_modes").style.display = "none";
  TweenMax.staggerFrom(".back_def2", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("def2").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

     //Click back setting para ecra modes
    document.getElementById("back_def2").addEventListener('click', function (e) {
  document.getElementById("def2").style.display = "none";
  TweenMax.staggerFrom(".btn3", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  TweenMax.staggerFrom(".definition", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("play_modes").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

    //Click para ecra dificuldade
    document.getElementById("difficulty").addEventListener('click', function (e) {
  document.getElementById("play_modes").style.display = "none";
  TweenMax.staggerFrom("label", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("cont").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click back dificuldade para ecra modes
    document.getElementById("back_difficulty").addEventListener('click', function (e) {
  document.getElementById("cont").style.display = "none";
  TweenMax.staggerFrom(".btn3", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  TweenMax.staggerFrom(".definition", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("play_modes").style.display = "flex";
  dificulty = document.querySelector('input:checked').value;
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click escolha jigsaw puzzle
    document.getElementById("puzzle1").addEventListener('click', function (e) {
  document.getElementById("play_modes").style.display = "none";
  TweenMax.staggerFrom(".puzzle", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("select_puzzle").style.display = "flex";
  play_mode = 0;
  sessionStorage.setItem("play_mode", play_mode);
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

    //Click escolha block puzzle
  document.getElementById("puzzle2").addEventListener('click', function (e) {
  document.getElementById("play_modes").style.display = "none";
  TweenMax.staggerFrom(".puzzle", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("select_puzzle").style.display = "flex";
  play_mode = 1;
  sessionStorage.setItem("play_mode", play_mode);
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click back select para ecra modes
    document.getElementById("back_select").addEventListener('click', function (e) {
  document.getElementById("select_puzzle").style.display = "none";
  TweenMax.staggerFrom(".btn3", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  TweenMax.staggerFrom(".definition", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("play_modes").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});



  document.getElementById("puzzle_select_1").addEventListener('click', function (e) {
  puzzle_choice = 1;
  sessionStorage.setItem("puzzle_choice", puzzle_choice);
  goToGame()
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

  document.getElementById("puzzle_select_2").addEventListener('click', function (e) {
  puzzle_choice = 2;
  sessionStorage.setItem("puzzle_choice", puzzle_choice);
  goToGame()
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

  document.getElementById("puzzle_select_3").addEventListener('click', function (e) {
  puzzle_choice = 3;
  sessionStorage.setItem("puzzle_choice", puzzle_choice);
  goToGame()
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

  document.getElementById("puzzle_select_4").addEventListener('click', function (e) {
  puzzle_choice = 4;
  sessionStorage.setItem("puzzle_choice", puzzle_choice);
  goToGame()
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

  document.getElementById("puzzle_select_5").addEventListener('click', function (e) {
  puzzle_choice = 5;
  sessionStorage.setItem("puzzle_choice", puzzle_choice);
  goToGame()
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

  document.getElementById("puzzle_select_6").addEventListener('click', function (e) {
  puzzle_choice = 6;
  sessionStorage.setItem("puzzle_choice", puzzle_choice);
  goToGame();
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});


  function goToGame() {
    if(num_players==2){
      window.location.href = "index-2p.html";
    }
    else{
      if (play_mode==1) {
        window.location.href = "index.html";
      }
      else{
        window.location.href = "index-jig.html";
      }
    }
}