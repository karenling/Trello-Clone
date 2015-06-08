TrelloClone.Views.BoardListItem = Backbone.CompositeView.extend({
  template: JST['lists/list_item'],
  className: 'list-item',

  initialize: function() {

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.hideForm);
    this.listenTo(this.model.cards(), "add", this.addCardView);
    this.model.cards().comparator = "ord";
    this.model.cards().each(this.addCardView.bind(this));
    this.addCardForm(this.model);
  },

  events: {
    "click .delete": "deleteList",
    "click .show-button": "showForm",
    "click .hide-button": "hideForm",
    "drop": "drop"
  },

  drop: function(event, index) {
     this.$el.trigger('update-sort', [this.model, index]);
 },

  hideForm: function() {
    this.$el.find('#card-description').attr("placeholder", "");
    this.$el.find('.hide-button').hide();
    this.$el.find('.card-form').hide();
    this.$el.find('.show-button').show();
  },

  showForm: function() {
    this.$el.find('.show-button').hide();
    this.$el.find('.card-form').show();
    this.$el.find('.hide-button').show();
  },

  addCardForm: function(list) {
    var subview = new TrelloClone.Views.CardForm({ model: list, collection: this.model.cards() });
    this.addSubview('.card-form', subview);
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
