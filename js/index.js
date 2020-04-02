import * as repl from "./repl.js";

document.addEventListener("DOMContentLoaded", function () {
    // focus cursor on terminal
    let terminal = document.getElementById("terminal");
    terminal.focus();

    // set up REPL
    let myRepl = new repl.REPL(terminal, document.getElementById("content"));
    const commands = [

    ];
    myRepl.start(repl.REPL.commandMapFromArray(commands));
});
