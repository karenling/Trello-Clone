TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST['cards/form'],

  events: {
    "submit form": "createCard"
  },

  render: function () {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    return this;
  },

  createCard: function (event) {
    var $form = $(event.currentTarget);
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    var card = new TrelloClone.Models.Card();
    console.log($form);
    card.save(attrs, {
      success: function() {
        this.collection.add(card);
        $form.find('#card-description').val("");
      }.bind(this),
      errors: function(models, response) {
        $('.card-errors').html(response.responseJSON[0]);
      }
    });

  }
});
