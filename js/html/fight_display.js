fight_display = {};
fight_display.move = function (move) {
  console.log("Preparing move display");
  return ""+
  "<ul class='move'> "+
    "<li><span class='move-lefty'>◀</span> "+move.name+" <span class='move-righty'>▶</span></li>"+
    "<li class='move-stat'>attack:</li> "+
    "<v class='move-stat'>"+move.attack.crush+"♣ "+move.attack.cut+"♦ "+move.attack.blast+"♥ "+move.attack.stab+"♠"+"</v>"+
    "<li class='move-stat'>defense:</li>  "+
    "<n class='move-stat'>"+move.defense.crush+"♣ "+move.defense.cut+"♦ "+move.defense.blast+"♥ "+move.defense.stab+"♠ "+"</n>"+
    "<li class='move-instruction'>[enter]</li>"+
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
    "<h1 class='healthbar'>"+fighter.hitpointsString()+"</h1> "+
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
