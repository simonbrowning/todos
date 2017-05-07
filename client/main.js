import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../imports/api/tasks.js';


Meteor.subscribe("todos");
//Template helpers
Template.main.helpers({
  todos: function(){
    return Todos.find({}, {sort: {createdAt: -1}});
  }
});

//Template events
Template.main.events({
    "submit .new-todo": function(event){
      var text = event.target.text.value;

      Meteor.call('addTodo',text);

      //Clear the form
      event.target.text.value = "";
      return false;
    },
    "click .toggle-checked" : function(){
        Meteor.call('setChecked',this._id, !this.checked);
    },
    "click .delete-todo": function(){
        if(confirm("Are you sure?")){
          Meteor.call('deleteTodo',this._id);
        }
    }
});
Accounts.ui.config({"passwordSignupFields": "USERNAME_ONLY"});
