import { Command } from "./repl.js";

const cursor = `<span style="color: #cccccc">$</span>`;
const Colors = Object.freeze({
    "base": "#CCCCCC",
    "red": "#ff6188",
    "orange": "#fc9867",
    "yellow": "#ffd866",
    "green": "#a9dc76",
    "blue": "#78dce8",
    "purple": "#ab9df2",
});

export function commandMapFromArray(commands) {
    let map = {};
    for (let command of commands) {
        map[command.keyword] = command;
    }

    return map;
}

function highlight(contents, color) {
    return `<span style="color: ${color};">${contents}</span>`;
}

function optsToHelpStr(opts) {
    if (opts.length === 0) {
        return "";
    }

    let output = ` <`
    for (let opt of opts) {
        if (opt != "") {
            output += `${highlight(opt, Colors.yellow)}|`;
        }
    }
    return output.slice(0,-1) + `>`;
}

export function helpFromCommandMap(commandMap) {
    // general message
    let output = `<p>Welcome to my website! This site emulates a terminal, so if you just want the information without figuring out how to use it, click <a onclick="toStaticSite(true)" href="javascript:void(0);">here</a>. If you'd like the full interactive experience, you can use the following commands:</p>`;
    // placeholder for this command's output
    const helpHelpStr = "Outputs this help message again";
    commandMap["help"] = new Command("help", [], helpHelpStr, () => { });

    // generate a help message based on each command
    for (let [keyword, command] of Object.entries(commandMap)) {
        output += `<p>${highlight(keyword, Colors.green)}${optsToHelpStr(command.opts)}: ${command.helpStr}</p>`;
    }

    // return a command that will produce all this when called
    return new Command("help", [], helpHelpStr, (args) => { return output; })
}

export function outputFromOptsAndArgs(opts, optOuts, args) {
    // check if we should print all
    if (args.length === 0) {
        return optOuts.join("");
    }

    // iterate through and see what to print
    let output = "";
    for (let i = 0; i < opts.length; i++) {
        if (args.indexOf(opts[i]) != -1) {
            output += optOuts[i];
        }
    }

    // error if options were invalid
    if (output === "") {
        output = `<p>Your options '${args}' were not recognized</p>`;
    }
    return output;
}

export { cursor, Colors, highlight };