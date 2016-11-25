//
function m() {
    var m_s = "";
    for (var i = 0; i < arguments.length; i++) {
        m_s += arguments[i] + "\n";
    }
    alert(m_s);
}
//
function $(selector, element = null) {
    if (!element) element = document;
    return element.querySelector(selector);
}
//
function $$(selector, element = null) {
    if (!element) element = document;
    return [].slice.call(element.querySelectorAll(selector));
}
//
function $removeAllChild(parentElement) {
    while (parentElement.hasChildNodes()) parentElement.removeChild(parentElement.lastChild);
}
