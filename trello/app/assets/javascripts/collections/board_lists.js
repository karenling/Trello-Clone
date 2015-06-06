TrelloClone.Collections.BoardLists = Backbone.Collection.extend({
  model: TrelloClone.Models.BoardList,
  url: '/api/lists',

  getOrFetch: function(id) {
    var collection = this;

    var list = collection.get(id);

    if (list) {
      list.fetch();
    }
    else {
      list = new TelloClone.Models.BoardList({id: id});
      list.fetch({
        success: function () {
          collection.add(list);
        }
      });
    }

    return list;
  }
});
