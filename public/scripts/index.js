// planses


// add things to lower panel with add button


// log out the hotel name when + button clicked


function makeListItem (name, index) {
  return $('<div class="itinerary-item"><span class="title">' + name + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
  // .data('index', index);
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
    var index = Number($(this).parent().index());
    // .data('index'));
    var marker = dayArr[day][type][index].marker;



    // remove marker from map
    marker.setMap(null);

    $(this).parent().remove();
    // remove thing from particular array in dayArr
    console.log("deleting", dayArr[day][type].splice(index, 1));


    // parentUl.children().each(function (index, item) {
    //   console.log(index);
    //   $(item).data('index', index);
    // });

  });

  $('.plus-button').on('click', function() {
    //DOM things
      //update the current-day class
    
    var currentDay = day;
    var nextDay = dayArr.length;

    dayArr.push({Hotels: [], Restaurants: [], Activities: []});

    switchDay(currentDay, nextDay, $dayClone.clone(), true);

    day = nextDay;
    // day = dayArr.length;
    // $('.current-day').removeClass('current-day'); //here
    var nextDayButton = $('<button class="btn btn-circle day-btn current-day">'+ (Number(day) + 1) + '</button>');
      //prepend next day to DOM
    $(this).before(nextDayButton);
      //updated the day-title
    // $('#day-title').find('span').text('Day ' + (day + 1));
      //note for day-switching: detach is the way to go
    // $('#itinerary-panel').append($dayClone.clone());
    //Server things
      // add new day object
      // store old Dom elements (again detach is helpful)
  });

  $('.day-buttons').on('click', 'button', function() {
    if($(this).hasClass('current-day') || $(this).hasClass('plus-button')) return;
    // dayArr[day].$jQNode = $('#itinerary-panel > *').detach();
    var currentDay = day;
    var newDay = $(this).index();

    switchDay(currentDay, newDay, dayArr[newDay].$jQNode, true);

    day = newDay;
    // $('#itinerary-panel').append(dayArr[index].$jQNode);
    // day = index;
    // $('#day-title').find('span').text('Day ' + (day + 1));
    // $('.current-day').removeClass('current-day');
    $(this).addClass('current-day');
  });

  $('#day-title > .remove').on('click', function () {
    // remove day from internal day array
    
    // remove last day from day button panel
    var removedButtonNumber = dayArr.length - 1;
    $($('.day-buttons > *')[removedButtonNumber])
    .remove();

    var newDay, changeDom;
    var oldDay = day;
    if (day === dayArr.length - 1) {
      changeDom = true;
      newDay = day - 1;
      var buttonToAddClass = $('.day-buttons > *').length - 2;
      $($('.day-buttons > *')[buttonToAddClass]).addClass('current-day');
      switchDay(oldDay, newDay, dayArr[newDay].$jQNode, changeDom);
      day = newDay;
    } else {
      changeDom = false;
      newDay = day + 1;
      switchDay(oldDay, newDay, dayArr[newDay].$jQNode, changeDom);
      // $($('.day-buttons > *')[day]).addClass('current-day');
    }

    // switch day to day at current index after splicing out

    console.log('old', oldDay, 'new', newDay);
    

    dayArr.splice(day, 1);

    

  });


  function switchDay(oldDay, newDay, newNode, changeDom) {
    console.log(dayArr);

    dayArr[oldDay].$jQNode = $('#itinerary-panel > *').detach();
    adjMarkers(dayArr[oldDay], null);
    if (changeDom) {
      $($('.day-buttons > *')[oldDay]).removeClass('current-day');
      $('#day-title').find('span').text('Day ' + (Number(newDay) + 1));
    }
    $('#itinerary-panel').append(newNode);
    adjMarkers(dayArr[newDay], googleMap);
  }

  function adjMarkers(currDay, map) {
    if(!currDay) return;
    Object.keys(currDay).forEach(function(element) {
      if (element === '$jQNode') return;
      currDay[element].forEach(function(object) {
        object.marker.setMap(map);
      });
    });
  }

  // functionality for day plus button

  // functionality for day switch button

  // day remove button

  // day switch buttons

  // map zooming functionality



});




// switch between days

// add and remove days with buttons
