TrelloClone.Views.BoardsIndexItem = Backbone.View.extend({

  template: JST['boards/list_item'],
  className: "individual-board",

  initialize: function(options) {
  },

  render: function() {
    var board = this.model;
    var content = this.template({ board: board });
    this.$el.html(content);
    return this;
  }

});
