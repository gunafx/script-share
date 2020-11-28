console.stdlog = console.log.bind(console);
console.log = function(){
    console.stdlog.apply(console, arguments);

    var data = [], values = Array.from(arguments);
    values.forEach(function(v){
      switch(typeof v) {
        case "object":
          data.push(JSON.stringify(v));
          break;
        case "undefined":
          data.push("undefined");
          break;
        case "function":
          data.push(""+v);
          break;
        default:
          data.push(v);
          break;
      }
    });
    window.parent.postMessage({ message: "logged", value: data}, "*");

}