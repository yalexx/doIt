var firebase = new Firebase("https://flickering-fire-4850.firebaseIO.com/");
firebase.authWithOAuthPopup("facebook", function (error, authData) {
    if (error) {
        console.log("Login Failed!", error);
    }
    else {
        console.log("Authenticated successfully with payload:", authData);
    }
});
window.onload = function () {
    start();
};
function start() {
    var input = id('input');
    var addBtn = id('addBtn');
    var info = id('info');
    var taskBox = id('taskBox');
    getTasks();
    addBtn.onclick = function () {
        addTask(input.value);
        input.value = null;
        return;
    };
    $(window).keypress(function (e) {
        if (e.keyCode == 0 || e.keyCode == 13) {
            addTask(input.value);
            input.value = null;
        }
    });
    editTask();
}
function getTasks() {
    firebase.child('tasks').on('value', function (data) {
        var listItemCount = $('#taskBox ul').children('li').length;
        var tasks = data.val();
        for (var key in tasks) {
            if (tasks.hasOwnProperty(key)) {
                var obj = tasks[key];
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        if (listItemCount > 0)
                            listItemCount--;
                        else
                            fillTaskBox(obj[prop], key);
                    }
                }
            }
        }
    });
}
function addTask(text) {
    if (text == '' || text == null)
        return;
    var postRef = firebase.child('tasks');
    postRef.push().set({
        text: text,
    }, function (error) {
        if (error) {
            console.log('Data could not be saved.' + error);
        }
        else {
            console.log('Data saved successfully.');
        }
    });
}
function fillTaskBox(text, id) {
    var taskConstructor = '<li class="task">' + text + '<a id="' + id + '" onclick="event.preventDefault(); removeTask(this)" class="checkDone" href= "#" > <i class="fa fa-share" > </i></a></li>';
    $('#taskBox ul').append(taskConstructor);
}
function removeTask(link) {
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
function id(name) {
    return document.getElementById(name);
}
