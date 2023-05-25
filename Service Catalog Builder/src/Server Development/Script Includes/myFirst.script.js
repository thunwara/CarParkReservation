var myFirst = Class.create();
myFirst.prototype = {
    initialize: function() {
    },

    testLog: function(){
        ga.info("It worked.");
        // test
    },

    type: 'myFirst'
};