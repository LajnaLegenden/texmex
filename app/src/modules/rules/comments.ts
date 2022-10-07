export function run(file: string) {

    const lineEnd = file.includes("\r\n") ? "\r\n" : "\n"
    let lines = file.split(lineEnd)
    for (let lineIndex in lines) {
        let line = lines[lineIndex]
        if (line.includes("%")) {
            const commentIndex = line.indexOf("%");
            try {
                if (line[commentIndex + 1] !== " ") {
                    let chars = line.split("")
                    chars.splice(commentIndex + 1, 0, " ")
                    line = chars.join("")
                }
                if (commentIndex !== 0) {

                    if (line[commentIndex - 1] !== " ") {
                        let chars = line.split("")
                        chars.splice(commentIndex, 0, " ")
                        line = chars.join("")
                    }
                }


                if (line[commentIndex + 1] === " ") {
                    let count = 0
                    while (line[commentIndex + 1 + count].match(/\s/gim)) {
                        count++
                    }
                    if (count > 1) {
                        let chars = line.split("")
                        chars.splice(commentIndex + 1, count, " ")
                        line = chars.join("")
                    }

                }

            } catch (error) {

            }
            lines[lineIndex] = line
        }
    }
    return lines.join(lineEnd)
}