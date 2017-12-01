export function listen(app, hostname, port) {
    return new Promise((resolve) => app.listen(port, hostname, resolve));
}
