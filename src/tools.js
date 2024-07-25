export  const fetcher = (...args) => fetch(...args).then((res) => res.json())



export function datetimeFormat(zoneDateTime) {
    // 2024-07-12T17:35:00.098Z to 2024-07-12 17:35:00
    const date = new Date(zoneDateTime)
    return date.toLocaleString()
}

export function datetimeFormatToMMDDYYYY(zoneDateTime) {
    // 2024-07-12T17:35:00.098Z to  July 12, 2024
    const date = new Date(zoneDateTime)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function addTimeStrings(timeArray) {
    function parseTime(timeStr) {
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }

    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const totalSeconds = timeArray.reduce((acc, time) => acc + parseTime(time), 0);
    return formatTime(totalSeconds);
}

export function fromUrlToImageName(url) {
    // https://youtu.be/lGOXdcV-mBU
    // https://img.youtube.com/vi/xxxxxxx/hqdefault.jpg
    const videoId = url.split("/").pop();
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}


export function getYouTubeID(url) {
    // https://youtu.be/lGOXdcV-mBU
    const videoId = url.replace("https://youtu.be/", "")
    return videoId;
}


export function getYoutubeEmbedUrl(url) {
    // https://youtu.be/lGOXdcV-mBU
    const videoId =  getYouTubeID(url);
    return `https://www.youtube.com/embed/${videoId}`;
}

export function areAllValuesTrue(map) {
    return Array.from(map.values()).every(value => value === true);
}

function dateObjectToDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() 返回的月份从0开始，所以需要加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    //const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function getMaxAndMinDate(dateStrings) {
    const dateStamps = dateStrings.map(dateString => new Date(dateString).getTime());
    const maxDateStamp = Math.max(...dateStamps);
    const minDateStamp = Math.min(...dateStamps);
    const maxDate = new Date(maxDateStamp);
    const minDate = new Date(minDateStamp);
    return {
        maxDate: dateObjectToDateString(maxDate),
        minDate: dateObjectToDateString(minDate)
    }
}