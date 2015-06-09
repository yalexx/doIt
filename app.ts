// Created by Yanko Aleksandrov
// DoIt is a lightweight to do list application working inside the facebook canvas.
// the app is built entirely on [Firebase](https://firebase.com).

/// <reference path="jquery.d.ts" />
/// <reference path="firebase.d.ts" />

// ToDO fire remove task event when task removed from the db
// Add facebook login integration
// Add facebook photos
// Cleanup the code

var firebase = new Firebase("https://flickering-fire-4850.firebaseIO.com/");

// prompt login
/*
firebase.authWithOAuthPopup("facebook", function (error, authData) {
    if (error) {
        console.log("Login Failed!", error);
    } else {
        console.log("Authenticated successfully with payload:", authData);
    }
});
*/

window.onload = () => {
    start();
};

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
        return;
    };
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
                        if (listItemCount > 0) listItemCount--;
                        else fillTaskBox(obj[prop], key);
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
function fillTaskBox(text: string, id: string) {
    var taskConstructor = '<li class="task">' + text + '<a id="' + id + '" onclick="event.preventDefault(); removeTask(this)" class="checkDone" href= "#" > <i class="fa fa-share" > </i></a></li>';
    $('#taskBox ul').append(taskConstructor);
}
function removeTask(link: HTMLLinkElement) {
    var id = $(link)[0].id;
    firebase.child('tasks').child(id).set(null);
    var listElement = $(link).parent();
    listElement.slideUp(200);
    setTimeout(function () {
        listElement.fadeOut(200, function () {
            listElement.remove();
        });
    }, 200);
}
function editTask() {
}

// utils
function id(name: string): HTMLElement {
    return document.getElementById(name);
}