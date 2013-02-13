// our miniMongo collection
Todos = new Meteor.Collection("todos");

// client operations
if (Meteor.isClient) {
  // the count of remaining items (unchecked)
  Template.heading.remaining_items = function() {
    return Todos.find({complete: false}).count();
  };

  // all items
  Template.items.items = function() {
    return Todos.find({});
  };

  // when we check the checkbox...
  Template.item.events({
    'change input' : function(e) {
      // update `this`, the current `item`, set complete to the state of the checkbox
      Todos.update(this, {$set: {complete: e.target.checked}});
    }
  });

  Template.input.events({
    // hitting a key in our input box...
    'keydown input' : function(e) {
      // if we hit enter and there are contents in the text box...
      if (e.which == 13 && e.target.value.length) {
        // insert a new todo item! set it to incomplete
        Todos.insert({content: e.target.value, complete: false });
        // clear out the input box
        e.target.value = '';
      }
    }
  });
}

// server operations (we don't use any here)
// we *could* load some stuff here
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
