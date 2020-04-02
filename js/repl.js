export class REPL {
    static cursor = `<span style="color: #cccccc">$</span>`;

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

    static commandMapFromArray(commands) {
        let map = {};
        for (let command of commands) {
            map[command.keyword] = command;
        }

        return map;
    }

    handleCommand() {
        let input = this.terminal.value;
        let components = input.split(" ");
        let command = components[0];
        let commandOutput;
        if (input.indexOf(">") != -1 && input.indexOf("<") != -1) {
            commandOutput = "<p>Nothing gets sent to the server so you can XSS yourself all you want 😉</p>";
        } else if (command in this.commands) {
            commandOutput = this.commands[command].execute(components.slice(1,))
        } else if (command === "") {
            commandOutput = "<p></p>";
        } else {
            commandOutput = `<p>Your command: "${command}" was not recognized. Try help to get started</p>`;
        }

        // create the new item and add it to the scroll area
        let newItemGroup = document.createElement("div")
        newItemGroup.className = "item-group";
        newItemGroup.innerHTML = `<p>${REPL.cursor} ${input}</p>${commandOutput}`;
        this.scrollArea.insertBefore(newItemGroup, this.terminal.parentNode);

        // reset terminal and scroll to the bottom of the page
        this.terminal.value = "";
        window.scrollTo(0, document.body.scrollHeight);
    }
}

export class Command {
    constructor(keyword, opts, handler) {
        this.keyword = keyword;
        this.opts = opts;
        this.executor = handler;
    }

    execute(args) {
        this.executor(this.opts, args)
    }
}