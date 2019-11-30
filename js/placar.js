
function inserirPlacar(){
  var tbody = $('.placar').find('tbody');
  var numPalavras = $('#conta-palavras').text();
  var user = 'Você';
  var linha = novaLinha(user,numPalavras);
  tbody.append(linha);
  tbody.find('.botao-remover').click(removeLinha);


}

function novaLinha(user,numPalavras){
  var linha = $('<tr>');
  var usuario = $('<td>').text(user);
  var contPalavras = $('<td>').text(numPalavras);
  var apagar = $('<td>');
  var link = $('<a>').addClass('botao-remover').attr('href','#');
  var icone = $('<i>').addClass('small').addClass('material-icons').text('delete');
  link.append(icone);
  apagar.append(link);
  linha.append(usuario);
  linha.append(contPalavras);
  linha.append(apagar);

  return linha;
}


function removeLinha(event){
  event.preventDefault();
  $(this).parent().parent().remove();
}
