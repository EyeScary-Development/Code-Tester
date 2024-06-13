let code=localStorage.getItem("torun")
document.getElementById("forrunning").innerHTML=code.replace(/console\.log/g, 'document.getElementById("console-emulator").innerHTML += "<br> > " + ');
