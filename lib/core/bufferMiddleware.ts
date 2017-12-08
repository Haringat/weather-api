import {
    NextFunction,
    Request,
    Response
} from "express";
import * as stream from "stream";

const {
    Writable
} = stream;

class BufferingStream extends Writable {

    private _chunks: Array<Buffer> = [];

    constructor(private _onEnd: (result: Buffer) => void) {
        super();
    }

    public _write(chunk: Buffer, encoding: string, cb: (error: Error | null) => void) {
        this._chunks.push(chunk);
        cb(null);
    }

    public _final(cb: (error: Error | null) => void) {
        this._onEnd(Buffer.concat(this._chunks));
        cb(null);
    }

}

function parseXML(body: string) {
    const match = body.match(xmlHeader);
    if (match !== null) {
        const bodyJSON = {};

    } else {
        throw new Error("Body is not xml");
    }
}

export default function bufferMiddleware() {
    return (request: Request, response: Response, next: NextFunction) => {
        if (request.headers["Content-Length"]) {
            request.pipe(new BufferingStream((body) => {
                request.body = body;
                next(null);
            }));
        } else {
            next(null);
        }
    };
}

export function jsonParser() {
    return (request: Request, response: Response, next: NextFunction) => {
        if (
            typeof request.headers["Content-Type"] === "string" &&
            (request.headers["Content-Type"] as string).toLowerCase() === "application/json"
        ) {
            request.body = JSON.parse(request.body.toString());
        }
        next(null);
    };
}

export function xmlParser() {
    return (request: Request, response: Response, next: NextFunction) => {
        if (
            typeof request.headers["Content-Type"] === "string" &&
            (
                (request.headers["Content-Type"] as string).toLowerCase() === "text/xml" ||
                (request.headers["Content-Type"] as string).toLowerCase() === "application/xml"
            )
        ) {
            request.body = parseXML(request.body.toString());
        }
        next(null);
    };
}
