TrelloClone.Models.BoardList = Backbone.Model.extend({
  urlRoot: '/api/lists',

  parse: function(response) {
    if (response.cards) {
      this.cards().set(response.cards);
      delete response.cards;
    }
    return response;
  },


  cards: function(list) {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([], { list: list });
    }
    return this._cards;
  }

});
