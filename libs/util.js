export const copyText = (text) => {
    var data = [new ClipboardItem({ "text/plain": new Blob([text], { type: "text/plain" }) })];
    navigator.clipboard.write(data).then(function () {
        console.log("Copied to clipboard successfully!");
    }, function () {
        console.error("Unable to write to clipboard. :-(");
    });
}