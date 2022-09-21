export function run(file: string) {
    let lines = file.split("\n")
    for (let lineIndex in lines) {
        let line = lines[lineIndex]
        if (line.includes("%")) {
            const commentIndex = line.indexOf("%");
            try {
                if (line[commentIndex + 1] != " ") {
                    console.log(line, commentIndex)
                    let chars = line.split("")
                    chars.splice(commentIndex + 1, 0, " ")
                    line = chars.join("")
                }

            } catch (error) {

            }
            lines[lineIndex] = line
        }
    }
    return lines.join("\n")
}