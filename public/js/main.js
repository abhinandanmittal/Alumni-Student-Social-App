$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/articles/'+id,
      success: function(response){
        alert('Deleting Article');
        window.location.href='/users/Dashboard';
      },
      error: function(err){
        console.log(err);
      }
    });
  });

$('.delete-event').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/events/'+id,
      success: function(response){
        alert('Deleting events');
        window.location.href='/users/Dashboard';
      },
      error: function(err){
        console.log(err);
      }
    });
  });

});
