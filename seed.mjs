import "async-tools";
import http from "http";
import url from "url";
import stream from "stream";
import stationsSeed from "./seed/stations";
import capabilitiesSeed from "./seed/capabilities";

const {
    Writable
} = stream;
const {
    stations
} = stationsSeed;
const {
    capabilities
} = capabilitiesSeed;

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

function addStation(station) {
    requestAsync({
        ...new Url(serverUrl),
        path: "/v1/stations",
        method: "POST",
        agent: httpAgent,
        headers: {
            "Accept": "Application/JSON",
            "Content-Type": "Application/JSON"
        }
    }, {
        data: station
    });
}
function addCapability(capability) {
    requestAsync({
        ...new Url(serverUrl),
        path: "/v1/capabilities",
        method: "POST",
        agent: httpAgent,
        headers: {
            "Accept": "Application/JSON",
            "Content-Type": "Application/JSON"
        }
    }, {
        data: capability
    });
}
function linkCapability(stationId, capabilityId) {
    return requestAsync({
        ...new Url(serverUrl),
        path: `/stations/${stationId}/capabilities`,
        method: "POST",
        agent: httpAgent
    }, {
        data: {
            capabilityId
        }
    });
}

(async () => {

    const capabilityStubs = await capabilities.mapAsync(async (capability) => {
        return await addCapability(capability);
    });
    await stations.forEachAsync(async (station) => {
        const stationStub = await addStation(station);
        await capabilityStubs.forEachAsync(async (capabilityStub) => {
            await linkCapability(stationStub.data.id, capabilityStub.data.id);
        });
        await linkCapability(st)
    });

})().catch((e) => {
    console.error(e.stack);
    exit(-1);
});

