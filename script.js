let editor = "";
let lastset = "none";
let lang="";
document.addEventListener("DOMContentLoaded", function () {
  initialise(getCookie("theme"));
  var lang = getQueryVariable("lang");
  if (lang != "no"){
    editor.session.setMode("ace/mode/" + lang.toLowerCase());
  } else {
    changelang();
  }
});

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  return "no";
}

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
  if (confirm("change theme?")) {
    hideSettings()
    initialise(string);
  } else {
    alert("next time you reload CSCode, the changes will apply");
  }
}

function changelang() {
  lang = prompt("what language would you like to use?");
  editor.session.setMode("ace/mode/" + lang.toLowerCase());
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
  var font = prompt("what font do you want to use? (monospace fonts available by default in CSS only)");
  var size = prompt("What font size do you want?") + "pt";
  var weight = prompt("what font weight do you want? (100-900)");
  setCookie("ffamily", font, 365);
  setCookie("fsize", size, 365);
  setCookie("fweight", weight, 365);
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
  if (getCookie("ffamily") != "" && getCookie("fsize") != "" && getCookie("fweight") != ""){
    editor.setOptions({ fontFamily: getCookie("ffamily"), fontSize: getCookie("fsize")});
    document.getElementById('editor').style.fontWeight = getCookie("fweight");
  }
  editor.setOptions({
  maxLines: 'auto',
  minLines: 'auto',
  autoScrollEditorIntoView: true
  });
}

function dropdown(){
    if (lastset == "block"){
        document.getElementById("dropdown-content").style.display="none"
        lastset = "none"
    } else {
        document.getElementById("dropdown-content").style.display="block"
        lastset = "block"
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
  var usin = prompt("write to save name:")
  if (localStorage.getItem(usin) == null) {
    localStorage.setItem(usin, editor.getValue());
    if (localStorage.getItem("itemlist")==null){
      localStorage.setItem("itemlist", "- " + usin + "\n")
    } else {
      let ls=localStorage.getItem("itemlist")
      localStorage.setItem("itemlist", ls + "- " + usin + "\n")
    }
  } else if (confirm("overwrite save?")) {
    localStorage.setItem(usin, editor.getValue());
  }
}

function loadsave(){
  if (localStorage.getItem("itemlist")!=null){
    usin = prompt("Here is a list of all of your saves, choose one: \n \n" + localStorage.getItem("itemlist"))
  } else {
    alert("Sorry, you don't have any saves yet, if this is due to a bug in an update, we apologise")
  }
  if(confirm("correct save?: \n \n" + localStorage.getItem(usin))){
    editor.setValue(localStorage.getItem(usin));
  } else {
    console.log("loadsave cancelled successfully")
  }
}

function showpreview(lang){
  if (document.getElementById("preview").style.display === "none"){
  document.getElementById("preview").style.display="block";
  document.getElementById("codeeditor").style.display = "none";
  document.getElementById("previewframe").src=lang;

  } else {
    document.getElementById("preview").style.display="none";
    document.getElementById("codeeditor").style.display="block"
  }
}

function findandrep(){
  editor.find(prompt("what do you want to replace"), {
    backwards: true,
    wrap: false,
    caseSensitive: false,
    wholeWord: false,
    regExp: false
  });
  editor.replaceAll(prompt("what do you want to refactor these all to?"));
}

function find(){
  var range = editor.find(prompt("What do you want to find?"), {
    backwards: true,
    wrap: false,
    caseSensitive: false,
    wholeWord: false,
    regExp: false
});
};

document.addEventListener('keydown', function(event) {
  if ((event.ctrlKey || event.altKey) && event.key === 'c' || event.key === 'v' || event.key === 'x') {
    event.preventDefault();
  }
  else if (event.ctrlKey && event.key === '.') {
    findandrep()
  } else if (event.ctrlKey && event.code === 'Space'){
    find()
  } else if (event.ctrlKey && event.key === 's'){
    dl()
  } else if (event.ctrlKey && event.key === 'i'){
    up()
  } else if (event.altKey && event.key === ','){
    showSettings()
  } else if (event.altKey && event.key === 's'){
    savetocookie()
  } else if (event.altKey && event.key === 'i'){
    loadsave()
  } else if (event.ctrlKey && event.key === 'r'){
    localStorage.setItem("torun", editor.getValue())
    showpreview(lang+".html")
  } 
});

function tester(){
  if (lang.toLowerCase()=="javascript"){
    localStorage.setItem("torun", editor.getValue())
    showpreview("js.html")
  } else if (lang.toLowerCase()=="css"){
    localStorage.setItem("torun", editor.getValue())
    showpreview("css.html")
  } else if (lang.toLowerCase()=="html"){
    localStorage.setItem("torun", editor.getValue())
    showpreview("html.html")
  }
}
