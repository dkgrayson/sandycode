const tabs = document.querySelectorAll(".tab");
const codeInputs = document.querySelectorAll(".code");
const preview = document.getElementById("preview");
const error = document.getElementById("error");
const saveButton = document.getElementById("save");
const loadButton = document.getElementById("load");

let activeTabIndex = 0;

let combinedCode = '';

function runCode() {
  error.style.display = "none";
  preview.contentWindow.document.open();
  preview.contentWindow.document.write(combinedCode);
  preview.contentWindow.document.close();

 
}

function updateCode() {
  const htmlCode = codeInputs[0].value;
  const cssCode = codeInputs[1].value;
  const jsCode = codeInputs[2].value;

  combinedCode = `
  <html>
    <head>
      <style>${cssCode}</style>
    </head>
    <body>
      ${htmlCode}
      <script type="text/javascript" "unsafe-inline">${jsCode}</script>
    </body>
  </html>
  `;
}


function saveCode() {
  localStorage.setItem(`code-${activeTabIndex}`, codeInputs[activeTabIndex].value);
  alert("Code saved!");
}

function loadCode() {
  if (localStorage.getItem(`code-${activeTabIndex}`)) {
    codeInputs[activeTabIndex].value = localStorage.getItem(`code-${activeTabIndex}`);
    updateCode();
    runCode();
    alert("Code loaded!");
  } else {
    alert("No saved code found!");
  }
}

function setActiveTab(index) {
  tabs[activeTabIndex].classList.remove("active");
  codeInputs[activeTabIndex].classList.remove("active");
  activeTabIndex = index;
  tabs[activeTabIndex].classList.add("active");
  codeInputs[activeTabIndex].classList.add("active");
  codeInputs[activeTabIndex].focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    setActiveTab(index);
    updateCode();
    runCode();
  });
});

codeInputs.forEach((codeInput) => {
  codeInput.addEventListener("input", () => {
    updateCode();
    runCode();
  });
});

saveButton.addEventListener("click", () => {
  saveCode();
});

loadButton.addEventListener("click", () => {
  loadCode();
});

preview.contentWindow.addEventListener("error", (event) => {
  error.innerText = event.message;
  error.style.display = "block";
});

setActiveTab(0);
runCode();
