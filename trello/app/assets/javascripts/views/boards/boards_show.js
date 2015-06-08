TrelloClone.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST['boards/boards_show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model.lists(), "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addListItemView);
    this.model.lists().each(this.addListItemView.bind(this));
  },

  events: {
    'click .board-delete-button': "deleteBoard",
    'click .list-form-closed': "listFormOpen",
    'click .close-list-form': 'listFormClose',
    'update-sort': "updateSort"
  },


  updateSort: function(event, model, position) {
    // model.set('ord', position);
    // model.save();




    this.model.lists().remove(model); // remove the moved model from the collection
    this.model.lists().each(function (model, index) { // iterate through the changed collection
        if (index >= position) { // if we find a model in the changed collection that has an index greater than the ul index. this way we don't update anything that isn't changed.
          model.set('ord', index + 1); // we will update his ord to be one more than before
          model.save();
        }
    });

    model.set('ord', position); // now we can set the moved model's position
    model.save();
    this.model.lists().add(model, { silent: true }); // add it back to the collection
    // this.model.lists().sort();


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
      //  this.model.lists().add(model, { silent: true });
      //  this.model.lists().sort();
    // keep1!


    //  this.model.lists().fetch();

    //  // to update ordinals on server:
    //  var ids = this.model.lists().pluck('id');
    //  $('#post-data').html('post ids to server: ' + ids.join(', '));
    //
    // debugger
    //  this.render();
   },

  listFormOpen: function (event) {
    $('.list-form-opened').show();
    $('.list-form-closed').hide();
  },

  listFormClose: function (event) {
    $('.list-form-opened').hide();
    $('.list-form-closed').show();
  },

  deleteBoard: function (event) {

    event.preventDefault();
    var deleteView = new TrelloClone.Views.DeleteModal({ model: this.model });
    $('body').append(deleteView.render().$el);
    return this;
  },


  addListItemView: function(list) {

    var subview = new TrelloClone.Views.BoardListItem({ collection: this.model.lists(), model: list });
    this.addSubview('.board-list-items', subview);
  },

  render: function() {
    // this.model.lists().comparator = "ord";
    var content = this.template({
      board: this.model
    });

    this.$el.html(content);
    this.attachSubviews();

    var newListView = new TrelloClone.Views.NewList({ model: this.model });

    $('.list-form-opened').html(newListView.render().$el);
    $('.list-form-closed').html("Add a list...");
    this.listFormClose();
    // this.listFormOpen();

    return this;
  }
});
