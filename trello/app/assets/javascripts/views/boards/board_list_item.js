TrelloClone.Views.BoardListItem = Backbone.CompositeView.extend({
  template: JST['lists/list_item'],
  className: 'list-item',

  initialize: function() {

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCardView);
    this.model.cards().comparator = "ord";
    this.model.cards().each(this.addCardView.bind(this));
  },

  events: {
    "click .delete": "deleteList"
  },

  addCardView: function(card) {

    var subview = new TrelloClone.Views.Card({ model: card});
    this.addSubview('.cards', subview);
  },

  render: function() {

    var content = this.template({ listItem: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },


  deleteList: function(event) {
    this.model.destroy();
    this.remove();
  }

});
