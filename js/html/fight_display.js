fight_display = {};
fight_display.move = function (move) {
  console.log("Preparing move display");
  return ""+
  "<ul class='move'> "+
    "<li>◀  "+move.name+"  ▶</li>"+
    "<li>attack</li> "+
    "<li>"+move.attack.crush+"♣ "+move.attack.cut+"♦ "+move.attack.blast+"♥ "+move.attack.stab+"♠"+"</li>"+
    "<li>defense</li>  "+
    "<li>"+move.defense.crush+"♣ "+move.defense.cut+"♦ "+move.defense.blast+"♥ "+move.defense.stab+"♠ "+
    "<div class='right-arrow'></div>  "+
  "</ul> "+
"  "+
  "<style media='screen'>  "+
    ".move { "+
      "position: relative; "+
      "right: 41px; "+
      "text-align: center; "+
      "width: 100%;  "+
    "} "+
  "</style>  "+
"  ";
};
fight_display.fighter = function (fighter, move) {
  console.log("Preparing fighter display:");
  console.log("  fighter:");
  console.log(fighter);
  console.log("  move:");
  console.log(move);
  return "  "+
"  "+
  "<section class='display'> "+
    "<h1>"+fighter.name+"</h1> "+
    "<h1>"+fighter.hitpointsString()+"</h1> "+
    "<span>"+fight_display.move(move)+"</span> "+
  "</section>  "+
"  "+
  "<style media='screen'>  "+
    ".display {  "+
      "h1, span {  "+
        "margin: auto; "+
        "text-align: center; "+
        "width: 100% "+
      "} "+
    "} "+
  "</style>  "+
"";
};

module.exports = fight_display;
