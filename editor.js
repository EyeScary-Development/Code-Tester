var editor="placeholder";

document.addEventListener("DOMContentLoaded", function(){
    editor = ace.edit("editor");
    var theme=getCookie("theme");
    changelang();
    themechange(theme);
})

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function themechange(string){
    console.log("setting cookie...");
    setCookie("theme", string, 365);
    console.log("success!");
    console.log("changing css..");
    document.getElementById("theme").href = string + ".css";
    console.log("success! Changing ace instance theme")
    editor.setTheme("ace/theme/" + string);
    console.log("success!");
}

function changelang(){
    var usin=prompt("what language would you like to use?");
    editor.session.setMode("ace/mode/" + usin); 
}