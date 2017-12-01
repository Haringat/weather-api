// respond with 404 if no route matches
export default function (request, response) {
    response.status(404).end();
}
