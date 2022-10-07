//function to add new line after each sentance
export function run(file: string, nrOfNewLines: string) {

    const lineEnd = file.includes("\r\n") ? "\r\n" : "\n"
    let lines = file.split(lineEnd)
    let newFile = []
    console.log("hejhej")
    const words = ["\\begin", "\\section", "\\subsection", "\\subsubsection", "\\paragraph", "\\subparagraph", "\\chapter", "\\part"]
    //remove all empty lines
    lines = lines.filter(l => { return l.trim() !== "" })
    for (let lineIndex in lines) {
        let line = lines[parseInt(lineIndex)]
        for (let word of words) {
            if (line.includes(word)) {
                for (let i = 0; i < getNrOfNewLines(nrOfNewLines); i++) {
                    newFile.push("")
                }
            }
        }
        newFile.push(line)
    }
    return newFile.join(lineEnd)
}

//function to get the number of new lines from a string
function getNrOfNewLines(line: string) {
    switch (line) {
        case "1":
            return 1
        case "2":
            return 2
        case "3":
            return 3
        default:
            return 0
    }
}