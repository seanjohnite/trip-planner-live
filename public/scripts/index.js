// planses


// add things to lower panel with add button


// log out the hotel name when + button clicked

// <!-- <div class="itinerary-item">
//   <span class="title">Bouley</span>
//   <button class="btn btn-xs btn-danger remove btn-circle">x</button>
// </div>


$(document).ready(function() {
  $('#item-selector').on('click', 'button', function () {
    var selection = $(this).prev().children('option').filter(':selected').text();
    var type = $(this).parent().find('h4').text();
    // var type1 = $(this).prev().prev().text();
    switch(type) {
      case 'Hotels':
    }
  });
});


// remove things from lower panel with x button

// add locations with icons to map and rezoom

// switch between days

// add and remove days with buttons
