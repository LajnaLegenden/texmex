import { Rule } from "../App";
import { run as formatComments } from './rules/comments'


export class Formatter {
    private rules: Rule[];


    constructor(rules: Rule[], private testing = false) {
        this.rules = []
        this.setRules(rules)

    }


    public setRules(rules: Rule[]) {
        this.rules = rules;
    }

    public formatAll(file: string) {
        this.log("Starting formatting")
        if (this.getSetting("Format Comments").value)
            file = formatComments(file)
        else
            this.log("Skipping comments due to settings")
        return file
    }

    private log(message: string) {
        if (this.testing) return
        console.log("[Formatter]", message)
    }

    private getSetting(label: string) {
        return this.rules.filter(r =>
            r.label === label
        )[0]
    }

}