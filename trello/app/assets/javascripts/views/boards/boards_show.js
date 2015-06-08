TrelloClone.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST['boards/boards_show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addListItemView);
    this.model.lists().each(this.addListItemView.bind(this));
    this.addListFormView(this.model);
  },

  events: {
    'update-sort': "updateSort"
  },

  updateSort: function(event, model, position) {
    // model.set('ord', position);
    // model.save();


    /// keep these
      //  this.model.lists().remove(model);


      //  this.model.lists().each(function (model, index) {
      //      var ordinal = index;
      //      if (index >= position) {
      //          ordinal += 1;
      //      }
      //      model.set('ord', ordinal);
      //      model.save();
      //  });
       //
      //  model.set('ord', position);
      //  model.save();
      //  this.model.lists().add(model);
    // keep1!


      //  this.model.lists().fetch();

      //  // to update ordinals on server:
      //  var ids = this.model.lists().pluck('id');
      //  $('#post-data').html('post ids to server: ' + ids.join(', '));
       //
      //  this.render();
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
