

$(document).ready(function() {
  var 
  consoleAdded = false,
  previewModes = {
    mobile: "480x800",
    tablet: "768x1024",
    desktop: "full"
  },

  // switch the preview mode for responsive
  changePreviewMode = function(e) {
    var selectedMode = $(e.currentTarget).data('preview-mode'),
        selectedSize = (previewModes[selectedMode]).split("x"),
        selectedWidth = selectedSize[0] == "full" ? "100%" : selectedSize[0]+"px",
        selectedHeight = selectedSize[1] ? selectedSize[1]+"px" : "calc(100vh - 60px)";

    $("[data-preview-size]").html(previewModes[selectedMode]);
    $("#preview-frame-container").width(selectedWidth);
    $("#preview-frame-container").height(selectedHeight);
    $("[data-preview-mode]").removeClass("active");
    $(e.currentTarget).addClass("active");
  },

  // run html, css & js code in preview mode
  runCode = function(e) {
    var iframe = document.getElementById('preview-frame'),
        html_data = html_editor.getValue(),
        html_body_content = html_data.match(/(?<=<body>)(.*)(?=<\/body>)/s),
        html_head_content = html_data.match(/(?<=<head>)(.*)(?=<\/head>)/s),
        css_data = css_editor.getValue(),
        js_data = js_editor.getValue();

    var doc = document.implementation.createHTMLDocument();

    doc.body.innerHTML = html_body_content && html_body_content[0];
    doc.head.innerHTML = html_head_content && html_head_content[0];
    doc.head.appendChild($("<style>"+css_data+"</style>")[0]);

    var destDocument = iframe.contentDocument,
        srcNode = doc.documentElement,
        newNode = destDocument.importNode(srcNode, true);

    destDocument.replaceChild(newNode, destDocument.documentElement);

    if (!consoleAdded) {
      $(destDocument.body).append("<script src='/javascripts/child-console.js'></script>")
    }
    $(destDocument.body).append("<script>"+js_data+"</script>")

    console.log(destDocument);
    consoleAdded = true;
  },

  closeConsole = function() {
    $('.console-container__wrap').addClass("hidden");
  },
  toggleConsole = function() {
    $('.console-container__wrap').toggleClass("console-container--minimized");
  },

  openConsoleWindow = function() {
    $('.console-container__wrap').removeClass("console-container--minimized");
    $('.console-container__wrap').removeClass("hidden");
  };


  $("[data-console-toggle]").on("click", toggleConsole);
  $("[data-console-close]").on("click", closeConsole);
  $("[data-preview-run]").on("click", runCode);
  $("[data-preview-mode]").on("click", changePreviewMode);

  window.addEventListener("message", function(event) {
    var values = event.data.value;
    if(values.length > 0) {
      openConsoleWindow();
      $('.console__content').append("<li>"+values.join(", ")+"</li>");
    }
  });
});