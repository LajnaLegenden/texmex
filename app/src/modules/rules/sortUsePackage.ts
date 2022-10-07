
const packageNameRegex = /\\usepackage(\s?)\{(\S+)\}/;
export function run(file: string) {

    const lineEnd = file.includes("\r\n") ? "\r\n" : "\n"
    let lines = file.split(lineEnd)
    let usePackageIndex = [];
    for (let lineIndex in lines) {
        let line = lines[lineIndex]
        if (line.match(packageNameRegex)) {
            let packageName = line.match(packageNameRegex) || ["", "", ""]
            usePackageIndex.push({ lineIndex, matches: packageName, line, package: packageName[2], hasSpace: packageName[1] !== null })
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