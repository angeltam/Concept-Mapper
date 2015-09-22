var GraphView = Backbone.View.extend({

  className: 'graph',

  template: _.template('<p>It is currently <%= weather %><%= unit %> in <%= city %>.</p>'),

  // listen for user generated events on the page
  events: {
    'click': 'clickAction'  // on click, run the clickAction
  },

  initialize: function() {

    // Re-render when model changes
    this.listenTo(this.model, 'change', this.render);
    // First time render
    this.render();

  },

  render: function() {

    // D3 logic go here

    // Populate the template with data
    var entry = this.template({
      weather: this.model.get('weather'),
      unit: this.model.get('unit'),
      city: this.model.get('city')
    });

    // Append to DOM
    this.$el.html(entry);

  },

  // toggles the unit of the temp in this model
  clickAction: function() {

    this.model.toggleUnit();

  }

});
