Todos = new Meteor.Collection("todos");

if (Meteor.isClient) {
  Template.heading.remaining_items = function() {
    return Todos.find({complete: false}).count();
  };

  Template.items.items = function() {
    return Todos.find({});
  };

  Template.item.events({
    'change input' : function(e) {
      Todos.update(this, {$set: {complete: e.target.checked}});
    }
  });

  Template.input.events({
    'keydown input' : function(e) {
      if (e.which == 13 && e.target.value.length) {
        Todos.insert({content: e.target.value, complete: false });
        e.target.value = '';
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
