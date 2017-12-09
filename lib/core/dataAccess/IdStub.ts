import {
    toSnakeCase
} from "../serializers/xml";

export default class IdStub {

    constructor(private _entityName: string, public id: string, public name?: string) {
    }

    public toXML() {
        const properties = [{
            name: "id",
            value: this.id
        }];
        if (this.name !== undefined) {
            properties.push({
                name: "name",
                value: this.name
            });
        }
        return `<${this._entityName} ${
            properties.map(
                (property) => `${
                    toSnakeCase(property.name)
                }="${
                    property.value
                }"`
            ).join(" ")
        }/>`;
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name
        };
    }

}
