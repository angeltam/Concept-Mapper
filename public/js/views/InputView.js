var InputView = Backbone.View.extend({

  el: '#inputForm',

  events: {
    'keydown': 'keyAction',
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.resetInput();
    return this;
  },

  keyAction: function(e) {

    var isEnterKey = (e.which === 13);

    if(isEnterKey) {
      var concept1 = $('#concept1').val();
      var concept2 = $('#concept2').val();
      var rel = $('#relationship').val();
      this.model.addToGraph(concept1, concept2, rel);
      this.resetInput();
    }

  },

  resetInput: function() {
    this.clearInput();
  },

  clearInput: function() {
    this.$el.children("input").val('');
  }
});
