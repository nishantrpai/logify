export const copyText = (text,cb) => {
    navigator.clipboard.writeText(text).then(function () {
        console.log("Copied to clipboard successfully!");
        cb(true);
    }, function () {
        console.error("Unable to write to clipboard. :-(");
        cb(false);
    });
}

export const getDataEntry = (type, text) => {
    let value = text.split(',')
    if (value[1] == "") {
        return value[0];
    }

    if (type == 'Markdown') {
        return `| ${value.join('\t\t\t| ')} |`
    }
    if (type == 'CSV') {
        return text;
    }
}