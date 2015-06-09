// Created by Yanko Aleksandrov
// DoIt is a lightweight to do list application working inside the facebook canvas.
// the app is built entirely on [Firebase](https://firebase.com).

/// <reference path="jquery.d.ts" />
/// <reference path="firebase.d.ts" />

var firebase = new Firebase("https://flickering-fire-4850.firebaseIO.com/");


window.onload = () => {
    start();
};

function id(name: string): HTMLElement {
    return document.getElementById(name);
}

function start() {

    var input = <HTMLInputElement> id('input');
    var addBtn = <HTMLInputElement> id('addBtn');
    var info = <HTMLParagraphElement> id('info');
    var taskBox = <HTMLDivElement> id('taskBox');

    // fetch existing tasks
    getTasks();

    // events
    addBtn.onclick = () => {
        addTask(input.value);
        input.value = null;
    };

    // remove task
    removeTask();

    // edit task
    editTask();
}

function getTasks() {
    
    firebase.child('tasks').on('value', function (data) {
        var listItemCount: number = $('#taskBox ul').children('li').length;
        var tasks: Object = data.val();
        for (var key in tasks) {
            if (tasks.hasOwnProperty(key)) {
                var obj = tasks[key];
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {

                        if (listItemCount > 0) {
                            listItemCount--;
                            //console.log("has some items");
                        }
                        else  fillTaskBox(obj[prop]);
                    }
                }
            }
        }
    });
}
function addTask(text: string) {
    if (text == '' || text == null) return;
    var postRef = firebase.child('tasks');
    postRef.push().set({
        text: text,
    }, function (error) {
            if (error) {
                console.log('Data could not be saved.' + error);
            } else {
                console.log('Data saved successfully.');
                //getTasks();
            }
        });
}
function removeTask() {
}
function editTask() {
}
function fillTaskBox(text: string) {
    var taskConstructor = '<li>' + text + '<a class="checkDone" href= "" > <i class="fa fa-share" > </i></a></li>';
    $('#taskBox ul').append(taskConstructor);
}
