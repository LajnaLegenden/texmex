import { Rule } from "../App";
import { run as formatComments } from './rules/comments'
import { run as usepackage } from './rules/sortUsePackage'
import { run as indentaion } from './rules/indentation'
import { run as newLineSentance } from './rules/newline'
import { run as newlineBeforeSection } from './rules/newlineBeforeSection'
import { EventEmitter } from "events";


export class Formatter extends EventEmitter {
    private rules: Rule[];


    constructor(rules: Rule[], private testing = false) {
        super()
        this.rules = []
        this.setRules(rules)

    }


    public setRules(rules: Rule[]) {
        this.rules = rules;
    }

    public formatAll(file: string) {
        let nrOfReads = 0
        const t0 = performance.now();
        this.log("Starting formatting")
        //Comments
        if (this.getSetting("Format Comments").value) {
            file = formatComments(file)
            nrOfReads++;
        }

        else
            this.log("Skipping comments due to settings")
        // Sort usepackage
        if (this.getSetting("Sort usepackage alphabetically").value) {
            file = usepackage(file)
            nrOfReads++;
        }
        else
            this.log("Skipping usepackage due to settings")
        // New line
        if (this.getSetting("NewLines after sentance").value) {
            file = newLineSentance(file, ".")
            file = newLineSentance(file, "?")
            file = newLineSentance(file, "!")
            nrOfReads += 3
        }
        else
            this.log("Skipping new line before sentance due to settings")
        //New line before section
        if (this.getSetting("NewLines before section, chapter, subsection, etc.").value) {
            //@ts-ignore
            this.log("Formattion newline before section with settings: " + this.getSetting("NewLines before section, chapter, subsection, etc.").options[this.getSetting("NewLines before section, chapter, subsection, etc.").value as number])
            nrOfReads++;
            //@ts-ignore
            file = newlineBeforeSection(file, this.getSetting("NewLines before section, chapter, subsection, etc.").options[this.getSetting("NewLines before section, chapter, subsection, etc.").value as number])
        }
        else
            this.log("Skipping newline before section due to settings")
        //Indentaion
        if (this.getSetting("Indentations").value) {
            nrOfReads++;
            //@ts-ignore
            this.log("Formattion Indentation with settings: " + this.getSetting("Indentations").options[this.getSetting("Indentations").value as number])
            //@ts-ignore
            file = indentaion(file, this.getSetting("Indentations").options[this.getSetting("Indentations").value as number])
        }
        else
            this.log("Skipping indentaion due to settings")
        const t1 = performance.now();
        this.emit("time", t1 - t0)
        this.emit("nrOfLines", file.split("\n").length * nrOfReads)
        this.log(`Formatter took ${t1 - t0} milliseconds.`);
        return file
    }

    private log(message: string) {
        if (this.testing) return
        console.log("%c[Formatter]", "color:green", message)
    }

    private getSetting(label: string) {
        return this.rules.filter(r => r.label === label)[0]
    }

}