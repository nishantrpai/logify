export const copyText = (text) => {
    var data = [new ClipboardItem({ "text/plain": new Blob([text], { type: "text/plain" }) })];
    navigator.clipboard.write(data).then(function () {
        console.log("Copied to clipboard successfully!");
    }, function () {
        console.error("Unable to write to clipboard. :-(");
    });
}

export const getDataEntry = (type, text) => {
    let value = text.split(',')
    if (value[1] == "") {
        return value[0];
    }

    if (type == 'Markdown') {
        return `| ${value.join('\t\t\t| ')}`
    }
    if (type == 'CSV') {
        return text;
    }
}