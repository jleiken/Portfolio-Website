import * as util from "./util.js";
import * as repl from "./repl.js";

const commands = [
    new repl.Command("resume", [],
        "Outputs a link to my resume",
        (opts, args) => `<p>Here's my <a href="https://drive.google.com/file/d/1Tq5pmC2qCVdoS1GEJAXiZDRt0Q_1u29O/view?usp=sharing" target="_blank">resume</a>.</p>`),
    new repl.Command("work", ["current", "microsoft-intern", "amazon", "brown-cs"],
        "Outputs the places I've worked - all if no option is provided",
        (opts, args) => util.outputFromOptsAndArgs(opts, "work-", args)),
    new repl.Command("projects", ["rr", "taskr", "equisat", "wikispeedia", "this-site"],
        "Outputs the projects I've worked on - all if no option is provided",
        (opts, args) => util.outputFromOptsAndArgs(opts, "project-", args)),
    new repl.Command("classes", [],
        "Outputs the list of relevant classes I've taken",
        (opts, args) => document.getElementById("classes-table").outerHTML),
    new repl.Command("contact", ["email", "github", "linkedin"],
        "Outputs my contact information - all if no option is provided",
        (opts, args) => util.outputFromOptsAndArgs(opts, "contact-", args)),
    new repl.Command("static", [],
        "Converts the site to its static form (no terminal)",
        toStaticSite),
    new repl.Command("clear", [],
        "Clears any pre-existing output, giving you a new blank page",
        clearScrollArea),
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
