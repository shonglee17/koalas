console.log( 'js' );

$( document ).ready( function(){
  renderKoalas();
  // Establish Click Listeners
  $('#addButton').on('click', addKoala )
  // load existing koalas on page load
  

}); // end doc ready

function addKoala() {
  console.log( 'in addButton on click' );
  let name = $('#nameIn').val();
  let age = $('#ageIn').val();
  let gender = $('#genderIn').val();
  let ready_for_transfer = $('#readyForTransferIn').val();
  let notes = $('#notesIn').val();

  let koalaToSend = {
    name: name,
    age: age,
    gender: gender,
    ready_for_transfer: ready_for_transfer,
    notes: notes,
  };
  console.log(koalaToSend);
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: koalaToSend
  }).then ((response) => {
    console.log(response);
    renderKoalas();
  }).catch((error) => {
    console.log('something happened in post', error);
  })
}




function renderKoalas(){
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then((res)=>{
    $('#viewKoalas').empty()
    for (let koalas of res){
      console.log(koalas);
      $('#viewKoalas').append(`
      <tr>
      <td>${koalas.name}</td>
      <td>${koalas.age}</td>
      <td>${koalas.gender}</td>
      <td>${koalas.ready_for_transfer}</td>
      <td>${koalas.notes}</td>
      </tr>
      `)
    }

  }).catch((error)=>{
    console.log('it broke /GET from client', error);
  })
  // ajax call to server to get koalas
  
} // end getKoalas

// function saveKoala( newKoala ){
//   console.log( 'in saveKoala', newKoala );
//   // ajax call to server to get koalas
 
// }

