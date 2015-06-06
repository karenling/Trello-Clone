TrelloClone.Views.Card = Backbone.View.extend({
  template: JST['cards/card_item'],
  className: "individual-card",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click .card-delete-button": "deleteCard"
  },

  render: function() {
    var card = this.model;
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  },

  deleteCard: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  }
});
