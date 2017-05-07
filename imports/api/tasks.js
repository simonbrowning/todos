Todos = new Mongo.Collection("todos");

Meteor.methods({
  addTodo: function(text){
    if(!Meteor.userId){
      throw new Meteor.Error("not-authorised.");
    }
    Todos.insert({
      text: text,
      createdAt: new Date(),
      userId: Meteor.userId(),
      username: Meteor.user().username
    })
  },
  deleteTodo: function(todoId){
    var todo = Todos.findOne(todoId);
    if(todo.userId !== Meteor.userId()){
      throw new Meteor.Error("not-authorised");
    }
    Todos.remove(todoId);
  },
  setChecked: function(todoId,setChecked){
    var todo = Todos.findOne(todoId);
    if(todo.userId !== Meteor.userId()){
      throw new Meteor.Error("not-authorised");
    }
      Todos.update(todoId,{
        $set:{
          checked: setChecked
        }
      });
  }
});
