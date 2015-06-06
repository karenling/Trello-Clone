TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({

  template: JST['boards/index'],

  initialize: function(options) {

    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, 'add', this.addBoardItemView);
    this.collection.each(this.addBoardItemView.bind(this));
    this.addBoardFormView();
  },


  addBoardItemView: function(board) {
    var subview = new TrelloClone.Views.BoardsIndexItem({ model: board });
    this.addSubview('.board-items', subview);
  },

  addBoardFormView: function() {
    var subview = new TrelloClone.Views.BoardForm({ collection: this.collection});
    this.addSubview('.board-form', subview);
  },



  render: function() {

    var boardCollection = this.collection;
    var content = this.template({ boards: boardCollection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
