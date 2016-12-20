//
function m() {
    var m_s = "";
    for (var i = 0; i < arguments.length; i++) {
        m_s += arguments[i] + "\n";
    }
    alert(m_s);
}
//
function $removeAllChild(parentElement) {
    while (parentElement.hasChildNodes()) parentElement.removeChild(parentElement.lastChild);
}
