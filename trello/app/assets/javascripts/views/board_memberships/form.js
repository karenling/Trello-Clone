TrelloClone.Views.BoardMembershipsForm = Backbone.View.extend({
  template: JST['board_memberships/form'],

  events: {
    "click .submit-board-member": "addBoardMember"
  },

  addBoardMember: function(event) {
    event.preventDefault();
    var attrs = this.$el.find('form').serializeJSON();
    var boardMembership = new TrelloClone.Models.BoardMembership();
    boardMembership.save(attrs);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
