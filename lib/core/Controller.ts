import {
    Request, Response
} from "express";

const methodMap = {
    getAll: "get",
    getSingle: "get",
    add: "post",
    replace: "put",
    modify: "patch",
    remove: "delete"
};

const resourceEndpoints = [
    "getSingle",
    "replace",
    "modify",
    "remove"
];

const actionEndpoints = [
    "getAll",
    "add"
];

export type methodName =
    // GET on /foo
    "getAll" |
    // GET on /foo/fooId
    "getSingle" |
    // POST on /foo
    "add" |
    // PUT on /foo/fooId
    "replace" |
    // PATCH on /foo/fooId
    "modify" |
    // DELETE on /foo/fooId
    "remove";

export function getHttpMethodName(method: methodName) {
    return methodMap[method];
}

export function getPath(basePath: string, modelName: string, method: methodName) {
    switch (method) {
        case "remove":
        case "getSingle":
        case "replace":
        case "modify":
            return `${basePath}/:${modelName}Id`;
        case "getAll":
        case "add":
            return `${basePath}`;
    }
}

export interface IController {
    getSingle?(request: Request, response?: Response): Promise<any>;
    getAll?(request: Request, response?: Response): Promise<any>;
    add?(request: Request, response?: Response): Promise<any>;
    replace?(request: Request, response?: Response): Promise<any>;
    modify?(request: Request, response?: Response): Promise<any>;
    remove?(request: Request, response?: Response): Promise<any>;
    options?(request: Request, response?: Response): Promise<any>;
    head?(request: Request, response?: Response): Promise<any>;
}

export default abstract class Controller implements IController {

    public supportedHttpMethods: Array<methodName>;
    public path: string;

    public async options(request: Request, response: Response) {
        response.status(200);
        if (request.url.slice(1).split("/").length % 2 !== 0) {
            // odd number of path segments -> we are on an action endpoint
            response.setHeader(
                "Access-Control-Allow-Methods",
                this.supportedHttpMethods.filter(
                    (method) => actionEndpoints.includes(method)
                ).map(
                    getHttpMethodName
                ).join(
                    ", "
                )
            );
        } else {
            // even number of path segments -> we are on a resource endpoint
            response.setHeader(
                "Access-Control-Allow-Methods",
                this.supportedHttpMethods.filter(
                    (method) => resourceEndpoints.includes(method)
                ).map(
                    getHttpMethodName
                ).join(
                    ", "
                )
            );
        }
        response.end();
    }

}
