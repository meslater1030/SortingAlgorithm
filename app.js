      function shuffle(m) {
        // swap last card with a random card from left
        var $m,
          rand = Math.floor(Math.random() * m),
          $rand;

        $('li').removeClass('swapping');

        $mth = $('.card:eq(' + m + ')')
          .addClass('swapping')
          .fadeIn();
        $rand = $('.card:eq(' + rand + ')')
          .addClass('swapping')
          .fadeIn();

        $mth.before($rand);
        $('.card:eq(' + rand + ')').before($mth);

        if (m > 0) {
          setTimeout(shuffle, 200, m - 1);
        } else {
          $('li').removeClass('swapping');
        };
      }

      $('button').on('click', function() {
        shuffle($(".card").length - 1);
      });

      function Deck() {
        this.suits = ['H', 'C', 'D', 'S'];
        this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
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
          return '<li class="card">' + this.rank + '-' + this.suit + '</li>';
        }
      }

      var deck = new Deck();