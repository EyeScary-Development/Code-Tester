let editor = "";
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
  if (confirm("change theme to " + string + "?")) {
    document.getElementById("defaultOpen").click();
    initialise(string);
  } else {
    alert("next time you reload CSCode, the changes will apply");
  }
}

function changelang() {
  var usin = prompt("what language would you like to use?");
  editor.session.setMode("ace/mode/" + usin);
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

function dl(){
  const data = editor.getValue();
  const blob = new Blob([data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  downloadURI(url, prompt("save the file as? [include extension]"));
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
document.getElementById("defaultOpen").click();
