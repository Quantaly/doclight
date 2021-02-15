// https://stackoverflow.com/a/31976060
const disallowedCharacters = /[<>:"/\\|?*]/g;

function sanitizeFilename(name: string): string {
    return name.replaceAll(disallowedCharacters, '_');
}

export default sanitizeFilename;