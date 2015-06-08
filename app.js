// Created by Yanko Aleksandrov
// DoIt is a lightweight to do list application working inside the facebook canvas.
// the app is built entirely on [Firebase](https://firebase.com).
/// <reference path="jquery.d.ts" />
/// <reference path="firebase.d.ts" />
var firebase = new Firebase("https://flickering-fire-4850.firebaseIO.com/");
window.onload = function () {
    start();
};
function id(name) {
    return document.getElementById(name);
}
function start() {
    var input = id('input');
    var addBtn = id('addBtn');
    var info = id('info');
    var taskBox = id('taskBox');
    // fetch existing tasks
    //getTasks();
    // events
    addBtn.onclick = function () {
        addTask(input.value);
    };
    // remove task
    removeTask();
    // edit task
    editTask();
}
function getTasks() {
    firebase.child('tasks').on('value', function (data) {
        var tasks = data.val();
        for (var key in tasks) {
            if (tasks.hasOwnProperty(key)) {
                var obj = tasks[key];
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        fillTaskBox(obj[prop]);
                    }
                }
            }
        }
    });
}
function addTask(text) {
    var postRef = firebase.child('tasks');
    postRef.push().set({
        text: text,
    }, function (error) {
        if (error) {
            console.log('Data could not be saved.' + error);
        }
        else {
            console.log('Data saved successfully.');
            getTasks();
        }
    });
}
function removeTask() {
}
function editTask() {
}
function fillTaskBox(text) {
    $('#taskBox').append(text + '<br>');
}
//# sourceMappingURL=app.js.map