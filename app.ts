/// <reference path="jquery.d.ts" />
/// <reference path="firebase.d.ts" />

window.onload = () => {
    start();
};

function id(name: string): HTMLElement {
    return document.getElementById(name);
}

function start() {
    var firebase = new Firebase("https://flickering-fire-4850.firebaseIO.com/");
    var input = <HTMLInputElement> id('input');
    var submit = <HTMLInputElement> id('submit');
    var info = <HTMLParagraphElement> id('info');
    var taskBox = <HTMLUListElement> id('taskBox');

    // fetch existing tasks
    var tasks = getTasks(firebase);

    submit.onclick = () => {
        
    };

    

    // add new task

    // remove task

    // edit task

}

function getTasks(firebase: Firebase) {

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



