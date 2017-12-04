import Unit from "./Unit";

export default class Capability {

    public constructor(
        public i18nNames: Array<string> = [],
        public id: string,
        public name: string,
        public unit: Unit
    ) {
    }

}
