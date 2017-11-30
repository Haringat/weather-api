import { Application } from "express";

export function listen(app: Application, hostname: string, port: number) {
    return new Promise((resolve) => app.listen(port, hostname, resolve));
}
