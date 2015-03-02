var cardValue = 0;
//This is Brook's code for a shuffle function
function shuffle(m) {
  // swap last card with a random card from left
  var rand = Math.floor(Math.random() * m);

  $('li').removeClass('swapping');
  $mth = $('.card:eq(' + m + ')').addClass('swapping').fadeIn();
  $rand = $('.card:eq(' + rand + ')').addClass('swapping').fadeIn();
  $mth.before($rand);
  $('.card:eq(' + rand + ')').before($mth);

  if (m > 0) {
    setTimeout(shuffle, 50, m - 1);
  } else {
    $('li').removeClass('swapping');
  };
}
//Shuffle the cards when the shuffle button is pushed
$('#shuffleButton').on('click', function() {
  shuffle($(".card").length - 1);
});
//This is my code to sort the cards when the sort button is pushed
$('#sortButton').on('click', function(){
  var
  m = $('.card').length,
  aPosition = 0,
  bPosition = aPosition+1,
  shuffled = 0,
  $aValue = parseInt($('.card:eq(' + aPosition + ')').data('value')),
  $bValue = parseInt($('.card:eq(' + bPosition + ')').data('value')),
  //Make the card yellow so you know the machine is looking at it
  addSwapping = function() {
    $('li').removeClass('swapping');
      $('.card:eq(' + aPosition + ')').addClass('swapping');
      $('.card:eq('+ bPosition + ')').delay(200).addClass('swapping');
    };
//slow down the comparisons so the user can see them happen.  This code runs every
//50 milliseconds.  Idea from http://stackoverflow.com/questions/6682703/trying-to-delay-pause-slow-a-while-loop-in-jquery
  setInterval( function() {
    //run this code if the deck isn't shuffled yet
    if(aPosition < m) {
        //This runs an insertion sort
        if($aValue > $bValue) {
          addSwapping();
          $('.card:eq(' + bPosition +')').insertBefore($('.card:eq(' + aPosition + ')'));
          aPosition = shuffled;
          bPosition = aPosition + 1;
          $aValue = parseInt($('.card:eq(' + aPosition + ')').data('value')),
          $bValue = parseInt($('.card:eq(' + bPosition + ')').data('value'));
        } else if ( ($aValue < $bValue) && (bPosition < m) ) {
          addSwapping();
          bPosition += 1;
          $bValue = parseInt($('.card:eq(' + bPosition + ')').data('value'));
        } else {
          addSwapping();
          aPosition += 1;
          bPosition = aPosition + 1;
          shuffled += 1;
          $aValue = parseInt($('.card:eq(' + aPosition + ')').data('value')),
          $bValue = parseInt($('.card:eq(' + bPosition + ')').data('value'));
        };
    }
  },50);
});
//This is Brook's code for creating the deck.  I added a value to every card so it
//could be sorted
function Deck() {
  this.suits = ['H', 'S', 'C', 'D'];
  this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J' , 'Q', 'K'];
  var theDeck = this;

  $.each(this.suits, function(index, suit) {
    $.each(theDeck.ranks, function(index, rank) {
      var card = new Card(suit, rank);
      $('#deck').append(card.toHTML());
    });
  });
}

function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
  this.toHTML = function() {
    return '<li class="card" data-value="'+cardValue+'">' + this.rank + '-' + this.suit + '</li>';
  }
  cardValue += 1;
}

var deck = new Deck();
