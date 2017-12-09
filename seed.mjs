import "async-tools";
import http from "http";
import url from "url";
import util from "util";
import stream from "stream";

const {
    Url
} = url;
const {
    argv,
    exit
} = process;
const {
    request,
    Agent
} = http;
const {
    promisify
} = util;

function requestAsync(obj, body) {

    class BufferingWritable extends Writable {
        constructor(callback) {
            super({
                highWaterMark: 65536,
                decodeStrings: true
            });
            this._chunks = [];
            this._callback = callback;
        }

        _write(chunk, encoding, callback) {
            let error = null;
            try {
                this._chunks.push(chunk);
            } catch (e) {
                error = e;
            }
            callback(error);
        }

        _writev(chunks, callback) {
            let error = null;
            try {
                this._chunks.push(...chunks);
            } catch (e) {
                error = e;
            }
            callback(error);
        }

        _final(callback) {
            let error = null;
            try {
                this._callback(Buffer.concat(this._chunks));
            } catch (e) {
                error = e;
            }
            callback(error);
        }
    }

    return new Promise((resolve, reject) => {
        const req = request(obj);
        req.on("response", (response) => {
            response.pipe(new BufferingWritable(resolve)).on("error", reject);
        });
        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end()
    })
}

const httpAgent = new Agent({
    maxSockets: 10
});

const serverUrl = argv[1];

if (!serverUrl) {
    console.error(`no api url given.`);
    exit(-1);
}

const stations = module.require("./seed/stations.json");
const capabilities = module.require("./seed/capabilities.json");

(async () => {

    const addStation = (station) => requestAsync({
        ...new Url(serverUrl),
        path: "/stations",
        method: "POST",
        agent: httpAgent,
        headers: {
            "Accept": "Application/JSON",
            "Content-Type": "Application/JSON"
        }
    }, station);
    const addCapability = (capability) => requestAsync({
        ...new Url(serverUrl),
        path: "/capabilities",
        method: "POST",
        agent: httpAgent,
        headers: {
            "Accept": "Application/JSON",
            "Content-Type": "Application/JSON"
        }
    }, capability);
    const getCapability = (capabilityName) => requestAsync({
        ...new Url(serverUrl),
        path: `/capability/${capabilityName}`,
        method: "GET",
        agent: httpAgent,
        headers: {
            "Accept": "Application/JSON"
        }
    });
    const getStation = (capabilityName) => requestAsync({
        ...new Url(serverUrl),
        path: `/capability/${capabilityName}`,
        method: "GET",
        agent: httpAgent,
        headers: {
            "Accept": "Application/JSON"
        }
    });
    const linkCapability = (stationId, capabilityId) => requestAsync({
        ...new Url(serverUrl),
        path: `/stations/${stationId}/capabilities/${capabilityId}`,
        method: "POST",
        agent: httpAgent
    });
    const stations = await stations.forEachAsync(addStation);
    await capabilities.forEachAsync(async (capability) => {
        const backendCapability = await addCapability(capability);

    });

})().catch((e) => {
    console.error(e.stack);
    exit(-1);
});

