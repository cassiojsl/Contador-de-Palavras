var tempoLimite = $("#tempo").text();
var campo = $(".campo-digitacao");
var btn = $('#restart');
var placar = $('#placar').text();
var segundos = $('#segundos');
var audio = $('audio')[0];


btn.addClass("inativo")
btn.addClass("disabled");


function caltempo(){
  campo.one('input',function(){
    var t = setInterval(function(){
      tempoLimite--;
      $("#tempo").text(tempoLimite);
      if(tempoLimite <= 3){
        segundos.css({"color":"#ff4242","text-transform":"uppercase"});
        segundos.addClass("animated infinite flash");
        audio.play();
      };
      if(tempoLimite <1){
        segundos.removeClass("animated infinite flash");
        campo.attr('disabled',true);
        btn.removeClass("disabled");
        btn.removeClass("inativo");
        btn.addClass("ativo");
        btn.addClass("animated infinite heartBeat delay-1s");
        campo.toggleClass("campo-desativado");
        clearInterval(t);
        let contador = $("#conta-palavras").text();
        $('#palavras').text(contador);
        pontuacao(contador);
        audio.pause();
        inserirPlacar();
        campo.removeClass('borda-vermelha');
      }

    },1000);
  });
}
caltempo();

campo.on("input",function(){
  var caracteres = campo.val();
  var palavras = caracteres.split(/\S+/).length-1;
  var letras = campo.val().split(" ");
  var numLetras = 0;
  for(var i=0;i<letras.length;i++){
    numLetras=numLetras+letras[i].length;
  }
  $("#conta-caracter").text(numLetras);
  $("#conta-palavras").text(palavras);
});


function restart(){
  $("#conta-caracter").text("0");
  $("#conta-palavras").text("0");
  $('#palavras').text("0");
  $('#tempo').text("10");
  $('#segundos').removeAttr('style');
  tempoLimite = 10;
  campo.attr('disabled',false);
  caltempo();
  campo.toggleClass("campo-desativado");
  btn.addClass("disabled");
  btn.addClass("inativo");
  btn.removeClass("ativo");
  btn.removeClass("animated infinite heartBeat delay-1s");
  campo.val("");
}


btn.on('click',restart);



function pontuacao(contador){
  if(contador > placar){
    $('#placar').text(contador);
  }
}

var frase = $('.frase').text();
campo.on('input',function(){
  var digitado = campo.val();
  var comparavel = frase.substring(0,digitado.length);
  if(digitado == comparavel){
    campo.addClass('borda-verde');
    campo.removeClass('borda-vermelha');
  }else{
    campo.addClass('borda-vermelha');
    campo.removeClass('borda-verde');
  }

});

$(document).ready(function() {
  slide();

  setInterval(function() {
    slide();
  }, 10000);
});


function slide() {
  $(".campo-digitacao").css({
    'background-position': 0 + ($(".campo-digitacao").width()-320) + 'px 0px'
  });

  setTimeout(function() {
    $(".campo-digitacao").css({
      'background-position': '0 0'
    });
  }, 5000);
}
