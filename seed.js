require("async-tools");
const http = require("http");
const url = require("url");
const stream = require("stream");
const stationsSeed = require("./seed/stations_16");
const capabilitiesSeed = require("./seed/capabilities");

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
    parse
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
            req.write(body);
        }
        req.end()
    })
}

const httpAgent = new Agent({
    maxSockets: 10
});

const serverUrl = parse(argv[2]);

if (!serverUrl) {
    console.error(`no api url given.`);
    exit(-1);
}

function addStation(station) {
    const payload = Buffer.from(JSON.stringify({
        data: station
    }));
    return requestAsync({
        ...serverUrl,
        path: "/v1/stations",
        pathname: "/v1/stations",
        method: "POST",
        agent: httpAgent,
        headers: {
            "Accept": "Application/JSON",
            "Content-Type": "Application/JSON",
            "Content-Length": payload.length
        }
    }, payload);
}
function addCapability(capability) {
    const payload = Buffer.from(JSON.stringify({
        data: capability
    }));
    return requestAsync({
        ...serverUrl,
        pathname: "/v1/capabilities",
        path: "/v1/capabilities",
        method: "POST",
        agent: httpAgent,
        headers: {
            "Accept": "Application/JSON",
            "Content-Type": "Application/JSON",
            "Content-Length": payload.length
        }
    }, payload);
}
function linkCapability(stationId, capabilityId) {
    const payload = Buffer.from(JSON.stringify({
        data: {
            capabilityId
        }
    }));
    return requestAsync({
        ...serverUrl,
        pathname: `/stations/${stationId}/capabilities`,
        path: `/stations/${stationId}/capabilities`,
        method: "POST",
        agent: httpAgent,
        headers: {
            "Accept": "Application/JSON",
            "Content-Type": "Application/JSON",
            "Content-Length": payload.length
        }
    }, payload);
}

(async () => {

    const capabilityStubs = await capabilities.mapAsync(async (capability) => {
        const responseBody = await addCapability(capability);
        return JSON.parse(responseBody.toString());
    });
    await stations.forEachAsync(async (station) => {
        const responseBody = await addStation(station);
        const stationStub = JSON.parse(responseBody.toString());
        await capabilityStubs.forEachAsync(async (capabilityStub) => {
            await linkCapability(stationStub.data.id, capabilityStub.data.id);
        });
    });

})().catch((e) => {
    console.error(e.stack);
    exit(-1);
});

