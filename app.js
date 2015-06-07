/// <reference path="jquery.d.ts" />
/// <reference path="firebase.d.ts" />
window.onload = function () {
    start();
};
function id(name) {
    return document.getElementById(name);
}
function start() {
    var firebase = new Firebase("https://flickering-fire-4850.firebaseIO.com/");
    var input = id('input');
    var submit = id('submit');
    var info = id('info');
    var taskBox = id('taskBox');
    // fetch existing tasks
    var tasks = getTasks(firebase);
    submit.onclick = function () {
    };
    // add new task
    // remove task
    // edit task
}
function getTasks(firebase) {
    // push creates new timestamp-based, unique ID
    var postRef = firebase.child('posts');
    postRef.push().set({
        autor: 'Yanko Aleksandrov',
    });
    postRef.push().set({
        autor: 'Elon',
        title: 'I will go to Mars !'
    });
    return null;
}
function getNames() {
}
//# sourceMappingURL=app.js.map