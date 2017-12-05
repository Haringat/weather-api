import Capability from "./Capability";

export default class Station {

    constructor(
        public id: string, public name: string, public latitude: number, public longitude: number,
        public altitude: number, public capabilities: Array<Capability>, public externalIds: {
            [serviceId: string]: string;
        }
    ) {
    }

}
