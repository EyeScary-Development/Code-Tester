let editor = "";
document.addEventListener("DOMContentLoaded", function () {
  initialise(getCookie("theme"));
  changelang();
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
  if (confirm("change theme to " + string + "?")) {
    hideSettings()
    initialise(string);
  } else {
    alert("next time you reload CSCode, the changes will apply");
  }
}

function changelang() {
  var usin = prompt("what language would you like to use?");
  editor.session.setMode("ace/mode/" + usin.toLowerCase());
}

function tabchanger(){
  var usin = parseInt(prompt("change tab size to:"))
  if (usin){
      editor.session.setOptions({ tabSize: usin, useSoftTabs: true });
      setCookie("tabsize", usin, 365);
  }
  console.log(getCookie("tabsize"))
}

function fontchange(){
  var font = prompt("what font do you want to use? (monospace fonts available by default in CSS only)").toLowerCase();
  var size = prompt("What font size do you want?") + "pt";
  setCookie("ffamily", font, 365);
  setCookie("fsize", size, 365);
  if (confirm("change font to " + font + "?")) {
    hideSettings();
    initialise(getCookie("theme"));
  } else {
    alert("next time you reload CSCode, the changes will apply");
  }
}

function linewraptoggle(){
  if (getCookie("linewrapping")=="false" || getCookie("linewrapping")==""){
    editor.session.setUseWrapMode(true);
    setCookie("linewrapping", "true", 365);
  } else if (getCookie("linewrapping")=="true") {
    editor.session.setUseWrapMode(false);
    setCookie("linewrapping", "false", 365);
  }
  console.log(getCookie("linewrapping"))
}

function initialise(string) {
  editor = ace.edit("editor");
  if (string == "" || string == "default"){
    console.log("changing css..");
    document.getElementById("theme").href = "default.css";
    console.log("success! Changing ace instance theme");
    editor.setTheme("ace/theme/textmate");
    console.log("success!");
  } else{
    console.log("changing css..");
    document.getElementById("theme").href = string + ".css";
    console.log("success! Changing ace instance theme");
    editor.setTheme("ace/theme/" + string);
    console.log("success!");
  }
  if (getCookie("linewrapping")=="false"||getCookie("linewrapping")==""){
    editor.session.setUseWrapMode(false);
  } else if (getCookie("linewrapping")=="true") {
    editor.session.setUseWrapMode(true);
  }
  console.log(getCookie("linewrapping"));
  editor.session.setOptions({ tabSize: getCookie("tabsize"), useSoftTabs: true });
  console.log(getCookie("tabsize"));
  if (getCookie("ffamily") != "" && getCookie("fsize") != ""){
    editor.setOptions({ fontFamily: getCookie("ffamily"), fontSize: getCookie("fsize") });
  }
}



function dl(){
  const data = editor.getValue();
  const blob = new Blob([data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  downloadURI(url, prompt("save the file as? [include extension]"));
}

function hideSettings(){
  document.getElementById("settings").style.display = "none";
  document.getElementById("codeeditor").style.display = "block";
}

function showSettings(){
  document.getElementById("settings").style.display = "block";
  document.getElementById("codeeditor").style.display = "none";
}

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name; // <- name instead of 'name'
  link.href = uri;
  link.click();
  link.remove();
}

function up(){
  console.log("upSave requested");
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result;
      console.log(content);
      editor.setValue(content);
    }
  }

  try {
      input.click();
      console.log("load success!");
  } catch(error) {
      console.log("error: " + error);
  }

}

function savetocookie(){
  var usin = prompt("write to save No. (any number)")
  if (getCookie(usin) == "") {
    localStorage.setItem(usin, editor.getValue());
  } else if (getCookie(usin)!="" && confirm("overwrite save?")) {
    localStorage.setItem(usin, editor.getValue());
  }
}

function loadsave(){
  usin = prompt("load save No. (any existing save number)")
  if(confirm("correct save?: " + localStorage.getItem(usin))){
    editor.setValue(localStorage.getItem(usin));
  } else {
    console.log("loadsave cancelled successfully")
  }
}