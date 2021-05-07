export const timeNow = (dateString) => {
    let d = new Date();
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    let hh = new Intl.DateTimeFormat('en', { hour: 'numeric', hour12: false }).format(d);
    let mm = parseInt(new Intl.DateTimeFormat('en', { minute: 'numeric' }).format(d));
    mm = mm > 9 ? mm : `0${mm}`
    let ss = parseInt(new Intl.DateTimeFormat('en', { second: 'numeric', hour12: false }).format(d));
    ss = ss > 9 ? ss : `0${ss}`
    return `${mo} ${da} ${ye} ${hh}:${mm}:${ss}`
}