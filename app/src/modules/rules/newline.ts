//function to add new line after each sentance
export function run(file: string, char: string) {

    const lineEnd = file.includes("\r\n") ? "\r\n" : "\n"
    let lines = file.split(lineEnd)
    let newFile = []
    for (let lineIndex in lines) {
        let line = lines[parseInt(lineIndex)]
        if (line.includes("%") && !line.includes("\\")) { newFile.push(line); continue }
        let sentances = line.split(char + " ")
        sentances = sentances.map(s => s.trim())
        //dont add empty lines

        if (sentances.length == 1 && sentances[0]) { newFile.push(sentances[0]); continue }
        if (sentances.length > 1) {
            sentances = sentances.filter(s => s).map(s => { return (s + char) })
            //fix last line in sentance
            let lastSentance = sentances[sentances.length - 1]
            if (lastSentance[lastSentance.length - 1] == char && lastSentance[lastSentance.length - 2] == char) {
                sentances[sentances.length - 1] = lastSentance.substring(0, lastSentance.length - 1)
            }
            //push all sentances to new file
            for (let sentanceIndex in sentances) {
                newFile.push(sentances[parseInt(sentanceIndex)])
            }
        } else {
            newFile.push(line)
        }

    }
    return newFile.join(lineEnd)
}