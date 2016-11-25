//Load
var taskIDcounter = 0;
var mainElement = $('.task-form');
var inputField = $('.head-text-box');
//
loadFromlocalStorage('tasks');
inputField.focus();
//
function loadFromlocalStorage(storName) {
    var taskAll = JSON.parse(localStorage.getItem(storName))
    for (var i in taskAll) {
        addTask(taskAll[i].task, taskAll[i].completed);
    }
    taskCounter();
}
//Add task
function addTask(value, completed = false, onTop = false) {
    if (!value) return;
    value = value.trim();
    var idCbx = "id-cbx-" + taskIDcounter;
    taskIDcounter += 1;
    var chkON = (completed) ? 'checked' : '';
    var divtmp = `
<input class="task-cbx" id="${idCbx}" type="checkbox" ${chkON} name="name-cbx" value="value-cbx">
<label class="task-cbx-lbl" for="${idCbx}"></label>
<div class="task-edit-box" contenteditable="true">
<span>${value}</span></div>
<button class="task-edit-close-btn" type="button" name="button">&#215;</button>
`;
    var div = document.createElement("div");
    div.classList.add('task-box');
    div.classList.add('cf');
    div.innerHTML = divtmp;
    if (onTop) {
        mainElement.insertBefore(div, mainElement.firstChild);
    } else {
        mainElement.appendChild(div);
    }
    //-----add event f-ns
    $('.task-cbx', div).onchange = function(e) {
            taskCounter();
        }
        //
    $('.task-edit-box', div).onkeydown = function(e) {
            if (e.keyCode === 13) {
                this.blur();
                return false;
            }
        }
        //
    $('.task-edit-close-btn', div).onclick = function(e) {
        e && e.preventDefault();
        this.parentElement.remove();
        taskCounter();
    }
}
//Add task - end
//
function taskCounter() {
    var count = $$('.task-cbx', mainElement).length
    var activeCount = $$('.task-cbx', mainElement).filter(function(value) {
        return value.checked === false
    }).length;
    $('.foot-count-text').textContent = activeCount + " items left";
    if (count === 0) {
        $('.foot-box').style.display = 'none';
        $('.head-btn-box').classList.add('head-btn-box-hiden');
        activeBtn($('#select-btn-all'));
        inputField.focus();
    } else {
        $('.foot-box').style.display = 'block';
        $('.head-btn-box').classList.remove('head-btn-box-hiden');
    }
    return activeCount;
}
//
//HEADER
//input new task
inputField.onkeydown = function(e) {
        if (e.keyCode === 13) {
            var value = inputField.textContent.trim();
            if (value != '') {
                addTask(value);
                taskCounter();
                inputField.textContent = '';
            }
            return false;
        }
    }
//Check all
$('.head-btn-down').onclick = function(e) {
        e && e.preventDefault();
        var chkAll = $$('.task-cbx', mainElement)
        var allCompleted = !taskCounter();
        for (var i in chkAll) chkAll[i].checked = !allCompleted;
        taskCounter();
    }
    //
    //FOOTER
    //Sort-btn-all
$('#select-btn-all').onclick = function(e) {
        e && e.preventDefault();
        activeBtn(this);
        var tasks = $$('.task-box', mainElement);
        for (var i in tasks) tasks[i].style.display = 'block';
    }
    //Sort-btn-active
$('#select-btn-active').onclick = function(e) {
        e && e.preventDefault();
        activeBtn(this);
        var tasks = $$('.task-box', mainElement);
        for (var i in tasks) {
            if (!!$('.task-cbx', tasks[i]).checked) {
                tasks[i].style.display = 'none';
            } else {
                tasks[i].style.display = 'block';
            }
        }
    }
    //Sort-btn-completed
$('#select-btn-completed').onclick = function(e) {
        e && e.preventDefault();
        activeBtn(this);
        var tasks = $$('.task-box', mainElement);
        for (var i in tasks) {
            if (!$('.task-cbx', tasks[i]).checked) {
                tasks[i].style.display = 'none';
            } else {
                tasks[i].style.display = 'block';
            }
        }
    }
    //
function activeBtn(btn) {
    var btns = $$('.foot-select-btn');
    for (var i in btns) btns[i].classList.remove('hover');
    btn.classList.add('hover');
}
//Clear-btn
$('#foot-clear-btn').onclick = function(e) {
        e && e.preventDefault();
        var tasks = $$('.task-box', mainElement);
        for (var i in tasks)
            if (!!$('.task-cbx', tasks[i]).checked) tasks[i].remove();
        setTimeout(function() {taskCounter()}, 0);
    }
//
//Close
window.onbeforeunload = function(e) {
    e && e.preventDefault();
    saveTolocalStorage('tasks');
}
//Save
function saveTolocalStorage(storName) {
    var taskAll = [];
    var tasks = $$('.task-box', mainElement);
    for (var i in tasks) {
        var tmp = {};
        tmp.task = $('.task-edit-box', tasks[i]).textContent.trim();
        tmp.completed = $('.task-cbx', tasks[i]).checked;
        taskAll.push(tmp);
    }
    localStorage.setItem(storName, JSON.stringify(taskAll));
}
