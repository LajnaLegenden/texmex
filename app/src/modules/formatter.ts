import { Rule } from "../App";
import { run as formatComments } from './rules/comments'


export class Formatter {
    private rules: Rule[];


    constructor(rules: Rule[]) {
        this.rules = []
        this.setRules(rules)

    }


    public setRules(rules: Rule[]) {
        this.rules = rules;
    }

    public formatAll(file: string) {
        console.log("[Formatter] Starting formatting")
        file = formatComments(file)
        return file
    }

}