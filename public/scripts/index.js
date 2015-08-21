// planses


// add things to lower panel with add button


// log out the hotel name when + button clicked


function makeListItem (name, index) {
  return $('<div class="itinerary-item"><span class="title">' + name + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>').data('index', index);
}

var dayArr = [{Hotels: [], Restaurants: [], Activities: []}], day = 0;


$(document).ready(function() {
  var $dayClone = $('#itinerary-panel > *').clone();

  $('#item-selector').on('click', 'button', function () {
    var selection = $(this).prev().children('option').filter(':selected').text();
    var type = $(this).parent().find('h4').text();
    var choice = items[type].filter(function (hotel) {
      return selection === hotel.name;
    })[0];
    var listItem = makeListItem(selection, dayArr[day][type].length);
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
    dayArr[day][type].push({data: choice, marker: marker});
  });

  $('#itinerary-panel').on('click', 'button', function () {


    var parentUl = $(this).parent().parent();
    var type = parentUl.prev().text().slice(3).trim();
    var index = Number($(this).parent().data('index'));
    var marker = dayArr[day][type][index].marker;



    // remove marker from map
    marker.setMap(null);

    $(this).parent().remove();
    // remove thing from particular array in dayArr
    console.log("deleting", dayArr[day][type].splice(index, 1));


    parentUl.children().each(function (index, item) {
      console.log(index);
      $(item).data('index', index);
    });

  });

  $('.plus-button').on('click', function() {
    //DOM things
      //update the current-day class
    dayArr[day].$jQNode = $('#itinerary-panel > *').detach();
    day++;
    $('.current-day').removeClass('current-day');
    var nextDay = $('<button class="btn btn-circle day-btn current-day">'+ (day + 1) + '</button>');
      //prepend next day to DOM
    $(this).before(nextDay);
      //updated the day-title
    $('#day-title').find('span').text('Day ' + (day + 1));
      //note for day-switching: detach is the way to go
    // $('#itinerary-panel').append($dayClone);
    //Server things
      // add new day object
    dayArr.push({Hotels: [], Restaurants: [], Activities: []});
      // store old Dom elements (again detach is helpful)

  });
  // functionality for day plus button

  // functionality for day switch button

  // day remove button

  // day switch buttons

  // map zooming functionality



});




// switch between days

// add and remove days with buttons
