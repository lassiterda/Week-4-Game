//Objects containing the various characters, stored as an array

var planeswalkers =
[Jace = {
  value: "Jace",
   name: "Jace the Mind Sculptor",
   picture: "assets/images/Jace.png",
   health: 150,
   dmgBase: 10,
   dmgRange: [10, 18],
   charges: 3,
   selected: false,
   dodgePert: .15,
   specialDesc: "Spend 3 charges to confuse your opponent, causing them to attack another Planeswalker on their next 2 turns.",
   special: function(){}
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
  dodgePert: .05
},
Chandra = {
  value: "Chandra",
  name: "Chandra Burning",
  picture: "assets/images/Chandra.jpg",
  health: 120,
  dmgBase: 10,
  dmgRange: 25,
  charges: 3,
  selected: false,
  dodgePert: .25
},
Vraska = {
  value: "Vraska",
  name: "Vraska the Gorgon",
  picture: "assets/images/Vraska.jpg",
  health: 140,
  dmgBase: 12,
  dmgRange: 20,
  charges: 3,
  selected: false,
  dodgePert: .15
}
];

//holds the Object of the hero that has been selected
var hero = null;
var currentEnemy = null;

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
 $(".pw-fight").click( function(event) {
    if (!currentEnemy) {
      //remove the character card that was cliked
      removeCard(event);

      //Loop through the planeswalkers and grab the enemy selected
      for ( i = 0; i < planeswalkers.length; i++) {
        if ($(event.target).attr("value") === planeswalkers[i].value) {
          currentEnemy = planeswalkers[i];
          $("#enemy-img").attr("src", currentEnemy.picture);
          updateDOM("#enemy-name", currentEnemy.name); //??? Not updating
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

//Function to
var attack = function(attacker, ) {

};





//function to update a particular DOM element with variable text
function updateDOM(ele, v) {
  $(ele).text(v);
}

//function to hide a character card when a button is clicked, should be placed inside a click event
function removeCard(event){
  card = event.target.parentNode.parentNode.parentNode
  $(card).animate({opacity: 0}, 400, "linear",
     function() {
      $(card).addClass("hidden"); });
};

selectHero();
