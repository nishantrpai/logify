export const copyText = (text) => {
    var data = [new ClipboardItem({ "text/plain": new Blob([text], { type: "text/plain" }) })];
    navigator.clipboard.write(data).then(function () {
        console.log("Copied to clipboard successfully!");
    }, function () {
        console.error("Unable to write to clipboard. :-(");
    });
}

export const getDataEntry = (type, text) => {
    if (type == 'Markdown') {
        let value = text.split(',')
        return value.join('\t\t\t| ')
    }
    if (type == 'CSV') {
        return text;
    }
}