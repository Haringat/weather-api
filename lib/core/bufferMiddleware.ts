import {
    NextFunction,
    Request,
    Response
} from "express";
import * as stream from "stream";
import * as parseXML from "xml-parser";

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

export function bodyBuffer() {
    return (request: Request, response: Response, next: NextFunction) => {
        if (request.headers["content-length"]) {
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
            typeof request.headers["content-type"] === "string" &&
            (request.headers["content-type"] as string).toLowerCase() === "application/json"
        ) {
            request.body = JSON.parse(request.body.toString()).data;
        }
        next(null);
    };
}

export function xmlParser() {
    return (request: Request, response: Response, next: NextFunction) => {
        if (
            typeof request.headers["content-type"] === "string" &&
            (
                (request.headers["content-type"] as string).toLowerCase() === "text/xml" ||
                (request.headers["content-type"] as string).toLowerCase() === "application/xml"
            )
        ) {
            request.body = parseXMLNode(parseXML(request.body.toString()).root).data;
        }
        next(null);
    };
}

function parseXMLNode(node: parseXML.Node) {
    const result: {
        [key: string]: any
    } = {
        ...node.attributes
    };
    node.children.forEach((childNode) => {
        result[childNode.name] = parseXMLNode(childNode);
    });
    return result;
}
