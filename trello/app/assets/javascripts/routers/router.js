TrelloClone.Routers.Boards = Backbone.Router.extend({

  routes: {
    "": "index"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.boards = new TrelloClone.Collections.Boards();
  },

  index: function() {
    this.boards.fetch();

    var boardIndexView = new TrelloClone.Views.BoardsIndex({
      collection: this.boards
    });
    this.$rootEl.html(boardIndexView.render().$el);
  }
});
