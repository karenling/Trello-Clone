TrelloClone.Views.BoardsIndex = Backbone.View.extend({

  template: JST['boards/index'],

  initialize: function(options) {

    this.listenTo(this.collection, "sync", this.render)
  },

  render: function() {

    var boardCollection = this.collection;
    var content = this.template({ boards: boardCollection });
    this.$el.html(content);
    return this;
  }
});
