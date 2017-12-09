export default function serializeJSON(object: object) {
    return JSON.stringify({
        data: object
    });
}
