var editor = "placeholder";

document.addEventListener("DOMContentLoaded", function () {
  initialise(getCookie("theme"));
  changelang();
  openTab("null", Tab1)
});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function themechange(string) {
  console.log("setting theme cookie...");
  setCookie("theme", string, 365);
  console.log("success!");
  if (
    confirm(
      "Editor will be restarted, are you ok with that? (make sure you save your work)",
    )
  ) {
    editor = "";
    initialise(string);
  } else {
    alert("Next time you reload CSCode, your changes will be applied");
  }
}

function changelang() {
  var usin = prompt("what language would you like to use?");
  editor.session.setMode("ace/mode/" + usin);
}

function initialise(string) {
  console.log("starting Ace..");
  editor = ace.edit("editor");
  console.log("ace now: "+editor);
  console.log("changing css..");
  document.getElementById("theme").href = string + ".css";
  console.log("success! Changing ace instance theme");
  editor.setTheme("ace/theme/" + string);
  console.log("success!");
}

function openTab(tabName) {
  const tabs = document.getElementsByClassName('tab');
  for (let tab of tabs) {
    tab.style.display = 'block';
  }
  document.getElementById(tabName).style.display = 'none';
    
}
