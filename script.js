document.addEventListener("DOMContentLoaded", function () {
  initialise(getCookie("theme"));
  changelang();
  document.getElementById("defaultOpen").click();
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
  if(confirm("editor will restart and any unsaved progress possibly lost, continue?")){
      document.getElementById("defaultOpen").click();
      initialise(string);
  } else{
    alert("next time you reload CSCode, the changes will apply");
  }
}

function changelang() {
  var usin = prompt("what language would you like to use?");
  editor.session.setMode("ace/mode/" + usin);
}

function initialise(string) {
  var editor=ace.edit("editor")
  console.log("ace is: "+editor);
  console.log("changing css..");
  document.getElementById("theme").href = string + ".css";
  console.log("success! Changing ace instance theme");
  window.editor.setTheme("ace/theme/" + string);
  console.log("success!");
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();
