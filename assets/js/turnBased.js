//Objects containing the various characters, stored as an array

var planeswalkers =
[Jace = {
  value: "Jace",
   name: "Jace the Mind Sculptor",
   picture: "assets/images/Jace.png",
   health: 170,
   dmgBase: 10,
   dmgRange: 15,
   charges: 3,
   selected: false,
   dodgePert: .15,
   lvlUp: 7
 },
Koth = {
  value: "Koth",
   name: "Koth of the Hammer",
   picture: "assets/images/Koth.jpg",
  health: 200,
  dmgBase: 15,
  dmgRange: 10,
  charges: 3,
  selected: false,
  dodgePert: .05,
  lvlUp: 5
},
Chandra = {
  value: "Chandra",
  name: "Chandra Burning",
  picture: "assets/images/Chandra.jpg",
  health: 120,
  dmgBase: 10,
  dmgRange: 10,
  charges: 3,
  selected: false,
  dodgePert: .25,
  lvlUp: 9,
},
Vraska = {
  value: "Vraska",
  name: "Vraska the Gorgon",
  picture: "assets/images/Vraska.jpg",
  health: 140,
  dmgBase: 12,
  dmgRange: 12,
  charges: 3,
  selected: false,
  dodgePert: .15,
  lvlUp: 9
}
];

//holds the Object of the hero that has been selected
var hero = null;
var currentEnemy = null;
numenemies = 3;

//Click function for character selection
var selectHero = function() {
    $(".pw-select").click( function(event) {
      if (!hero) {
        //finds the object of the selected hero and updates the DOM with their information
        for ( i = 0; i < planeswalkers.length; i++) {
          if ($(event.target).attr("value") === planeswalkers[i].value) {
            hero = planeswalkers[i];

            $("#hero-img").attr("src", hero.picture);
            updateDOM("#hero-name", hero.name); //??? Not updating
            updateDOM("#hero-health", hero.health);
            updateDOM("#hero-base-dmg", hero.dmgBase);
            updateDOM("#hero-charges", hero.charges);
            updateDOM("#hero-special-desc", hero.specialDesc);
          }
        }

       //DOM Manipulation to remove the hero from selection, then change the select button to fight
        removeCard(event);
        $(".pw-select").addClass("btn-danger pw-fight");
        $(".pw-select").removeClass("btn-primary pw-select");
        $(".pw-fight").text("Fight");

      //
      $("#combat-section").animate({opacity: 1}, 400, "linear");

      //begins listening for a click a select enemy
      selectEnemy();
      }
      return
    });
  return
}

//Click function for character selection
var selectEnemy = function() {
  $("#selection-section").animate({opacity: 1}, 50, "linear", function() {
    $(this).removeClass("hidden");
  });
 $(".pw-fight").click( function(event) {
    if (!currentEnemy) {
      //remove the character card that was cliked
      removeCard(event);

      //Loop through the planeswalkers and grab the enemy selected
      for ( i = 0; i < planeswalkers.length; i++) {
        if ($(event.target).attr("value") === planeswalkers[i].value) {
          currentEnemy = planeswalkers[i];
          numenemies -= 1;
          $("#enemy-img").attr("src", currentEnemy.picture);
          updateDOM("#enemy-name", currentEnemy.name);
          updateDOM("#enemy-health", currentEnemy.health);
          updateDOM("#enemy-base-dmg", currentEnemy.dmgBase);
        }
      }
      $("#selection-section").animate({opacity: 0}, 400, "linear", function() {
        $(this).addClass("hidden");
      });
    }
  });
};

//Function to have one player attack another
var attack = function(attacker, target) {

    if (Math.random() > target.dodgePert) {
     var damage = attacker.dmgBase + (Math.floor(Math.random() * 20) + 1);
       target.health -= damage
      $("<p class=\"alert alert-danger\">" + attacker.value + " attaked " + target.value + " for "+ damage + " damage.</p>" ).appendTo("#alert-section")
    }
    else {
        var missed = $("<p class=\"alert alert-warning\"> " + attacker.value + " missed!</p>")
        console.log(missed)
        missed.appendTo("#alert-section")
    }
};
//function to conduct a round of combat, including dom updates
var combatRound = function() {
  $("#alert-section").empty();

  attack(hero, currentEnemy);

  console.log(hero.health);
  if (!isFightOver()) {
    attack(currentEnemy, hero);
  };
  updateDOM("#enemy-health", currentEnemy.health)
  updateDOM("#hero-health", hero.health);
  updateDOM("#hero-base-dmg", hero.dmgBase);

  hero.dmgBase += hero.lvlUp;
  isFightOver();
};

$("#hero-Attack").click( function() {
  combatRound();
})

//function to check if the fight is over.
isFightOver = function() {
  if (currentEnemy.health <= 0) {
    currentEnemy = false;
    selectEnemy();
    if (numenemies === 0) {
      console.log("you Win")
    }
    return true;
  }
  else if ( hero.health <= 0) {
    alert("You Lose...")
    if(confirm("Want to play again?")) {
      reset();
    }
    return true
  }
  return false;
}

var reset = function() {
  planeswalkers =
  [Jace = {
    value: "Jace",
     name: "Jace the Mind Sculptor",
     picture: "assets/images/Jace.png",
     health: 170,
     dmgBase: 10,
     dmgRange: 15,
     charges: 3,
     selected: false,
     dodgePert: .15,
     lvlUp: 7
   },
  Koth = {
    value: "Koth",
     name: "Koth of the Hammer",
     picture: "assets/images/Koth.jpg",
    health: 200,
    dmgBase: 15,
    dmgRange: 10,
    charges: 3,
    selected: false,
    dodgePert: .05,
    lvlUp: 5
  },
  Chandra = {
    value: "Chandra",
    name: "Chandra Burning",
    picture: "assets/images/Chandra.jpg",
    health: 120,
    dmgBase: 10,
    dmgRange: 10,
    charges: 3,
    selected: false,
    dodgePert: .25,
    lvlUp: 9,
  },
  Vraska = {
    value: "Vraska",
    name: "Vraska the Gorgon",
    picture: "assets/images/Vraska.jpg",
    health: 140,
    dmgBase: 12,
    dmgRange: 12,
    charges: 3,
    selected: false,
    dodgePert: .15,
    lvlUp: 9
  }
  ];
  var hero = null;
  var currentEnemy = null;
  numenemies = 3;
  $("#alert-section").empty();
  $(".pl-walker-card").animate({opacity: 1}, 50, "linear",
     function() {
      $('.pl-walker-card').removeClass("hidden"); });
  $("#selection-section").animate({opacity: 1}, 50, "linear", function() {
    $(this).removeClass("hidden")
  });

  $("#enemy-img").attr("src","assets/images/Vraska.jpg");
}

//function to update a particular DOM element with variable text
function updateDOM(ele, v) {
  $(ele).text(v);
}

//function to hide a character card when a button is clicked, should be placed inside a click event
function removeCard(event){
  card = event.target.parentNode.parentNode.parentNode
  $(card).animate({opacity: 0}, 50, "linear",
     function() {
      $(card).addClass("hidden"); });
};

selectHero();
