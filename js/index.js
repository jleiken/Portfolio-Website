import * as util from "./util.js";
import * as repl from "./repl.js";

const commands = [
    new repl.Command("resume", [], "Outputs a link to my resume", (opts, args) => { 
        return `<p>Here's my <a href="https://drive.google.com/file/d/1Tq5pmC2qCVdoS1GEJAXiZDRt0Q_1u29O/view?usp=sharing" target="_blank">resume</a>.</p>`;
    }),
    new repl.Command("contact", ["email", "github", "linkedin"], "Outputs my contact information - all if no option is provided", (opts, args) => {
        const optOuts = [
            document.getElementById("contact-email").outerHTML,
            document.getElementById("contact-github").outerHTML,
            document.getElementById("contact-linkedin").outerHTML,
        ];
        return util.outputFromOptsAndArgs(opts, optOuts, args);
    }),

    new repl.Command("static", [], "Converts the site to its static form (no terminal)", toStaticSite),
    new repl.Command("clear", [], "Clears any pre-existing output, giving you a new blank page", clearScrollArea),
];

document.addEventListener("DOMContentLoaded", function () {
    // focus cursor on terminal
    let terminal = document.getElementById("terminal");
    terminal.focus();

    // set up REPL
    let myRepl = new repl.REPL(terminal, document.getElementById("content"));
    const commandMap = util.commandMapFromArray(commands);
    commandMap["help"] = util.helpFromCommandMap(commandMap)
    myRepl.start(commandMap);
});

const onresize = () => {
    if (window.innerWidth <= 1000) {
        toStaticSite(true);
    } else {
        toStaticSite(false);
    }
};
window.onload = onresize;
window.onresize = onresize;
