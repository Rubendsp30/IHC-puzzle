//import TweenMax from '/gsap'

var num_players = 4;
var play_mode = 1; //0=jig  /  1=block
var dificulty = document.querySelector('input:checked').value; //0= easy /1=normal /2=hard
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
$('#front').on('click', function (e) {
  document.getElementById("front").style.display = "none";
  TweenMax.staggerFrom(".btn2", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  TweenMax.staggerFrom(".definition", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  TweenMax.staggerFrom(".back", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("numb_players").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click back button para ecra inicial
$('#back_players').on('click', function (e) {
  document.getElementById("numb_players").style.display = "none";
  document.getElementById("front").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click setting no ecra players
$('#definition_players').on('click', function (e) {
  document.getElementById("numb_players").style.display = "none";
  TweenMax.staggerFrom(".back_def", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("def1").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click back setting para ecra players
$('#back_def').on('click', function (e) {
  document.getElementById("def1").style.display = "none";
  TweenMax.staggerFrom(".btn2", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  TweenMax.staggerFrom(".definition", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("numb_players").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});


//Click escoha 2 jogadores
$('#2players').on('click', function (e) {
  document.getElementById("numb_players").style.display = "none";
  TweenMax.staggerFrom(".btn3", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("play_modes").style.display = "flex";
  num_players = 2
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click escoha 4 jogadores
$('#4players').on('click', function (e) {
  document.getElementById("numb_players").style.display = "none";
  TweenMax.staggerFrom(".btn3", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("play_modes").style.display = "flex";
  num_players = 4
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click back button para players
$('#back_modes').on('click', function (e) {
  document.getElementById("play_modes").style.display = "none";
  TweenMax.staggerFrom(".btn2", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("numb_players").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
  });

//Click setting no ecra modes
  $('#definition_modes').on('click', function (e) {
  document.getElementById("play_modes").style.display = "none";
  TweenMax.staggerFrom(".back_def2", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("def2").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click back setting para ecra modes
  $('#back_def2').on('click', function (e) {
  document.getElementById("def2").style.display = "none";
  TweenMax.staggerFrom(".btn3", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  TweenMax.staggerFrom(".definition", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("play_modes").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click para ecra dificuldade
  $('#difficulty').on('click', function (e) {
  document.getElementById("play_modes").style.display = "none";
  TweenMax.staggerFrom("label", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("cont").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click back dificuldade para ecra modes
  $('#back_difficulty').on('click', function (e) {
  document.getElementById("cont").style.display = "none";
  TweenMax.staggerFrom(".btn3", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  TweenMax.staggerFrom(".definition", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("play_modes").style.display = "flex";
  dificulty = document.querySelector('input:checked').value;
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click escolha jigsaw puzzle
  $('#puzzle1').on('click', function (e) {
  document.getElementById("play_modes").style.display = "none";
  TweenMax.staggerFrom(".puzzle", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("select_puzzle").style.display = "flex";
  play_mode = 0;
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click escolha block puzzle
$('#puzzle2').on('click', function (e) {
  document.getElementById("play_modes").style.display = "none";
  TweenMax.staggerFrom(".puzzle", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("select_puzzle").style.display = "flex";
  play_mode = 1;
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

//Click back select para ecra modes
$('#back_select').on('click', function (e) {
  document.getElementById("select_puzzle").style.display = "none";
  TweenMax.staggerFrom(".btn3", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  TweenMax.staggerFrom(".definition", 2, {scale:0.5, opacity:0, delay:0.1, ease:Elastic.easeOut, force3D:true}, 0.2);
  document.getElementById("play_modes").style.display = "flex";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});


 //Escolhas de puzzle
$('#puzzle_select_1').on('click', function (e) {
  puzzle_choice = 1;
 // module.exports = {puzzle_choice};
 // export puzzle_choice;
  sessionStorage.setItem("puzzle_choice", puzzle_choice);
  window.location.href = "index.html";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

$('#puzzle_select_2').on('click', function (e) {
  puzzle_choice = 2;
  //export puzzle_choice;
  sessionStorage.setItem("puzzle_choice", puzzle_choice);
  window.location.href = "index.html";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

$('#puzzle_select_3').on('click', function (e) {
  puzzle_choice = 3;
 // export puzzle_choice;
  sessionStorage.setItem("puzzle_choice", puzzle_choice);
  window.location.href = "index.html";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

$('#puzzle_select_4').on('click', function (e) {
  puzzle_choice = 4;
 // export puzzle_choice;
  sessionStorage.setItem("puzzle_choice", puzzle_choice);
  window.location.href = "index.html";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

$('#puzzle_select_5').on('click', function (e) {
  puzzle_choice = 5;
 // export puzzle_choice;
  sessionStorage.setItem("puzzle_choice", puzzle_choice);
  window.location.href = "index.html";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});

$('#puzzle_select_6').on('click', function (e) {
  puzzle_choice = 6;
 // export puzzle_choice;
  sessionStorage.setItem("puzzle_choice", puzzle_choice);
    window.location.href = "index.html";
  console.log("Jogadores: "+num_players+"  Modo: " +play_mode+ "  Dificuldade: "+dificulty + "  puzzle: " +puzzle_choice)
});