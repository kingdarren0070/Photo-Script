export function base64StringToFile (base64, name) {
    var arr = base64.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
}

export function downloadFile (base64, name) {
    let element = document.createElement('a');
    element.setAttribute('href', base64);
    element.setAttribute('download', name);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export function getFileExtension (base64) {
    return base64.substring('data:image/'.length, base64.indexOf(';base64'))
}