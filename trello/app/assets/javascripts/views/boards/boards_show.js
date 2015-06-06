TrelloClone.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST['boards/boards_show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addListItemView);
    this.model.lists().each(this.addListItemView.bind(this));
    this.addListFormView(this.model);
  },

  addListFormView: function(board) {
    var subview = new TrelloClone.Views.NewList({ model: board });
    this.addSubview('.board-list-form', subview);
  },

  addListItemView: function(list) {
    var subview = new TrelloClone.Views.BoardListItem({ model: list });
    this.addSubview('.board-list-items', subview);
  },

  render: function() {
    this.model.lists().comparator = "ord";
    var content = this.template({
      board: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
