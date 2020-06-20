import { cursor } from "./util.js";

export class REPL {
    constructor(terminal, scrollArea) {
        this.terminal = terminal;
        this.scrollArea = scrollArea;
    }

    start(commands) {
        this.commands = commands;

        this.terminal.addEventListener("keypress", (e) => {
            if (e.keyCode === 13) {
                this.handleCommand();
            }
        });
    }

    handleCommand() {
        let input = this.terminal.value;
        let components = input.split(" ");
        let command = components[0];
        let commandOutput;
        if (input.indexOf(">") != -1 && input.indexOf("<") != -1) {
            commandOutput = "<p>Nothing gets sent to the server so you can XSS yourself all you want 😉</p>";
        } else if (command in this.commands) {
            let args = components.slice(1,);
            args = args.filter(arg => arg !== "");
            commandOutput = this.commands[command].execute(args);
        } else if (command === "") {
            commandOutput = "<p></p>";
        } else {
            commandOutput = `<p>Your command: "${command}" was not recognized. Try <span class="command">help</span> to get started</p>`;
        }

        // create the new item and add it to the scroll area
        if (commandOutput) {
            let newItemGroup = document.createElement("div")
            newItemGroup.className = "item-group";
            newItemGroup.innerHTML = `<p>${cursor} ${input}</p>${commandOutput}`;
            this.scrollArea.insertBefore(newItemGroup, this.terminal.parentNode);
        }

        // reset terminal and scroll to the bottom of the page
        this.terminal.value = "";
        if (!this.terminal.parentElement.hidden) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
}

export class Command {
    constructor(keyword, opts, helpStr, handler) {
        this.keyword = keyword;
        this.opts = opts;
        this.helpStr = helpStr;
        this.executor = handler;
    }

    execute(args) {
        return this.executor(this.opts, args)
    }
}