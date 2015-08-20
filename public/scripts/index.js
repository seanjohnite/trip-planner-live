// planses


// add things to lower panel with add button


// log out the hotel name when + button clicked


function makeListItem (name, index) {
  return $('<div class="itinerary-item"><span class="title">' + name + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>').data('index', index);
}

var dayArr = [{Hotels: [], Restaurants: [], Activities: []}], day = 0;

console.log('hey our project is bitching')

$(document).ready(function() {
  $('#item-selector').on('click', 'button', function () {
    var selection = $(this).prev().children('option').filter(':selected').text();
    var type = $(this).parent().find('h4').text();
    var choice = items[type].filter(function (hotel) {
      return selection === hotel.name;
    })[0];
    console.log(location);
    var listItem = makeListItem(selection, dayArr[day][type].length);
    if(!choice.marker) {
      choice.marker = [];
    }
    var marker;
    switch(type) {
      case 'Hotels':
        $('#hotel-list').append(listItem);
        marker = drawLocation(choice.place[0].location, icons.hotel);
        break;
      case 'Restaurants':
        $('#restaurant-list').append(listItem);
        marker = drawLocation(choice.place[0].location, icons.restaurant);
        break;
      case 'Activities':
        $('#activity-list').append(listItem);
        marker = drawLocation(choice.place[0].location, icons.activity);
        break;
    }
    choice.marker.push(marker);
    dayArr[day][type].push(choice);
  });

  $('#itinerary-panel').on('click', 'button', function () {
    $(this).parent().remove();
  });
});


// remove things from lower panel with x button

// add locations with icons to map and rezoom

// switch between days

// add and remove days with buttons
