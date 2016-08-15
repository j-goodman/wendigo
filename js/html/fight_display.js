fight_display = {};
fight_display.move = function (move) {
  return "  \
  <ul class='move'> \
    <div class='left-arrow'>◀</div> \
    <li>"+move.name+"</li>  \
    <br>  \
    <li>attack</li> \
    <br>  \
    <li>"+move.attack.crush+"♣</li> \
    <li>"+move.attack.cut+"♦</li> \
    <li>"+move.attack.blast+"♥</li> \
    <li>"+move.attack.stab+"♠</li>  \
    <br>  \
    <li>defense</li>  \
    <br>  \
    <li>"+move.defense.crush+"♣</li>  \
    <li>"+move.defense.cut+"♦</li>  \
    <li>"+move.defense.blast+"♥</li>  \
    <li>"+move.defense.stab+"♠</li> \
    <div class='right-arrow'>▶</div>  \
  </ul> \
  \
  <style media='screen'>  \
    .move { \
      li {  \
        text-align: center; \
        white-space: nowrap;  \
        width: 100%;  \
      } \
      \
      .left-arrow { \
        float: left;  \
      } \
      \
      .right-arrow {  \
        float: right; \
      } \
    } \
  </style>  \
  \
  ";
};
fight_display.fighter = function (fighter, move) {
  return "  \
  \
  <section class='display'> \
    <h1>"+fighter.name+"</h1> \
    <span>"+fight_display.move(move)+"</span> \
  </section>  \
  \
  <style media='screen'>  \
    .display {  \
      h1, span {  \
        text-align: center; \
        width: 100% \
      } \
    } \
  </style>  \
  \
  ";
};

module.exports = fighter_display.html;
