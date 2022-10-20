export function run(file: string, delimiter: string): string {

    const lineEnd = file.includes("\r\n") ? "\r\n" : "\n"
    let lines = file.split(lineEnd)
    let level = 0;

    for (let lineIndex in lines) {
        let line = lines[lineIndex]
        // Check if line contains a begin or end statement
        if (line.includes("%")) continue
        if (shouldGoIn(line))
            lines[lineIndex] = getDelimiter(level++, delimiter) + line.trimStart()
        else if (shouldGoOut(line))
            lines[lineIndex] = getDelimiter(--level, delimiter) + line.trimStart()
        else
            lines[lineIndex] = getDelimiter(level, delimiter) + line.trimStart()

    }
    return lines.join(lineEnd)


}

function shouldGoIn(line: string) {
    return line.includes("\\begin") && !line.includes("document")
}
function shouldGoOut(line: string) {
    return line.includes("\\end")
}

function getDelimiter(level: number, delimiter: string) {
    if (level === 0) return ""
    let char = "";
    switch (delimiter) {
        case "Tabs":
            char = "\t"
            break;
        case "2 spaces":
            char = "  "
            break;
        case "4 spaces":
            char = "    "
            break;
        default:
            char = ""
            break;
    }
    let out = ""
    for (let i = 0; i < level; i++) {
        out += char
    }
    return out
}