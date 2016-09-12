// Do nothing. Might be useful to see how other bots perform without interruption. o_O

(function() {
    var bot =         {name: 'doNothing',   icon:'bot', cb: function() { return [] }};
    setTimeout(function registerArmy() {
        window.registerArmy({
            name: bot.name,
            icon: bot.icon,
            cb: bot.cb
        });
    }, 2000);

})();
