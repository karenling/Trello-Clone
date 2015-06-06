TrelloClone.Views.Card = Backbone.View.extend({
  template: JST['cards/card_item'],
  className: "individual-card",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "mouseover": "showDelete",
    "mouseout": "hideDelete",
    "click .card-delete-button": "deleteCard"
  },

  render: function() {
    var card = this.model;
    var content = this.template({ card: this.model });
    this.$el.html(content);
    this.$el.find('.card-delete-button').hide();
    return this;
  },

  showDelete: function(event) {
    this.$el.find('.card-delete-button').show();
  },

  hideDelete: function(event) {
    this.$el.find('.card-delete-button').hide();
  },
  deleteCard: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  }
});
