
Todos = new Mongo.Collection('todos');


if (Meteor.isClient) {
  
  Template.body.helpers({
    todos: function () {
    	if (Session.get("hide")) {
    		
    		return Todos.find({checked : {$ne: true}});
    	}
    	else {
    	    return Todos.find();
             }
    },

    hideFinished : function () {

    	console.log (Session.get("hide"));
    }

  });

  Template.body.events({
  	'submit .new-todo': function (event) {
  		
  		var title = event.target.title.value;
  		Todos.insert({
          
          title: title,
          createdAt: new Date()

  		});
  		
  	},
  	'change .hide-finished' : function (event) {

  		Session.set("hide",event.target.checked);
  	}


  });

  Template.toDo.events({
  	'click .check' : function () {

  		Todos.update(this._id, {$set : {checked : !this.checked}});

  	},

  	'click .btn-sm': function () {
  		
  		Todos.remove(this._id);
  	}

  	
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
