var html_editor = new CodeMirror.fromTextArea(document.getElementById("html-editor"),{
  value: "<!DOCTYPE html>\n<html>\n\t<head>\n\t</head>\n\n\t<body>\n\t</body>\n</html>",
  mode:  "htmlmixed",
  htmlMode: true,
  theme: "material-ocean",
  lineNumbers: true,
  lineWrapping: true,
  tags: {
    style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
            [null, null, "css"]],
    custom: [[null, null, "customMode"]]
  }
});

var css_editor = new CodeMirror.fromTextArea(document.getElementById("css-editor"),{
  value: "body {\n\n}",
  mode:  "css",
  theme: "material-ocean",
  lineNumbers: true,
  lineWrapping: true,
  tags: {
    style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
            [null, null, "css"]],
    custom: [[null, null, "customMode"]]
  }
});

var js_editor = new CodeMirror.fromTextArea(document.getElementById("js-editor"),{
  value: "function main() {\n\n}",
  mode:  "javascript",
  theme: "material-ocean",
  lineNumbers: true,
  lineWrapping: true
});