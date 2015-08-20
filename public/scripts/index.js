// planses


// add things to lower panel with add button


// log out the hotel name when + button clicked


function makeListItem (name) {
  return $('<div class="itinerary-item"><span class="title">' + name + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
}


$(document).ready(function() {
  $('#item-selector').on('click', 'button', function () {
    var selection = $(this).prev().children('option').filter(':selected').text();
    var type = $(this).parent().find('h4').text();
    var location = items[type].filter(function (hotel) {
      return selection === hotel.name;
    })[0].place[0].location;
    console.log(location);
    var listItem = makeListItem(selection);
    debugger;
    switch(type) {
      case 'Hotels': 
        $('#hotel-list').append(listItem); 
        drawLocation(location, icons.hotel);
        break;
      case 'Restaurants': 
        $('#restaurant-list').append(listItem);
        drawLocation(location, icons.restaurant); 
        break;
      case 'Activities': 
        $('#activity-list').append(listItem); 
        drawLocation(location, icons.activity);
        break;
    }
  });

  $('#itinerary-panel').on('click', 'button', function () {
    $(this).parent().remove();
  });
});


// remove things from lower panel with x button

// add locations with icons to map and rezoom

// switch between days

// add and remove days with buttons
