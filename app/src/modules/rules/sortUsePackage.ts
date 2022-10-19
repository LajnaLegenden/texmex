
const packageNameRegex = /\\usepackage(\s*)\{(\S+)\}(.*)/;
export function run(file: string) {

    const lineEnd = file.includes("\r\n") ? "\r\n" : "\n"
    let lines = file.split(lineEnd)
    let usePackageIndex = [];
    for (let lineIndex in lines) {
        let line = lines[lineIndex]
        if (line.match(packageNameRegex)) {
            let packageName = line.match(packageNameRegex) || ["", "", ""]
            usePackageIndex.push({ lineIndex, matches: packageName, line, package: packageName[2] })
            //check if there is a space before the package name
            if (packageName[1]) {
                usePackageIndex[usePackageIndex.length - 1].line = `\\usepackage{${packageName[2]}}${packageName[3] ? packageName[3] : ""}`
            }
        }
    }
    let deleteCount = 0;
    for (let match of usePackageIndex) {
        lines.splice(parseInt(match.lineIndex) - deleteCount, 1)
        deleteCount++;
    }
    usePackageIndex.sort((x, y) => (x.package > y.package ? -1 : 1))
    for (let match of usePackageIndex) {
        lines.splice(1, 0, match.line)
    }
    return lines.join(lineEnd)
}