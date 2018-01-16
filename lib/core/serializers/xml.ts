declare global {

    /* tslint:disable-next-line:interface-name */
    interface Object {
        toXML(): string;
    }

    /* tslint:disable-next-line:interface-name */
    interface Array<T> {
        toXML(): string;
    }
}

export function toSnakeCase(camelCaseName) {
    return camelCaseName.replace(/[A-Z]/g, (capitalCaseLetter) => `-${capitalCaseLetter.toLowerCase()}`)
        .replace(/^-/, "").toLowerCase();
}

Object.prototype.toXML = function() {
    const primitiveProperties: {[key: string]: any} = {};
    const childNodes: Array<string> = [];
    Object.getOwnPropertyNames(this).forEach((propertyName) => {
        const descriptor = Object.getOwnPropertyDescriptor(this, propertyName);
        if (descriptor.enumerable) {
            if (typeof descriptor.value === "object") {
                const xml = descriptor.value.toXML();
                if (!xml.startsWith("<")) {
                    primitiveProperties[propertyName] = xml;
                } else {
                    childNodes.push(xml);
                }
            } else {
                primitiveProperties[propertyName] = descriptor.value.toXML();
            }
        }
    });
    return `<${
        toSnakeCase(this.constructor.name)
    } ${
        Object.entries(primitiveProperties).map(
            ([key, value]) => `${toSnakeCase(key)}="${value.toString()}"`
        ).join(" ")
    }>${
        childNodes.join()
    }</${
        toSnakeCase(this.constructor.name)
    }>`;
};

Array.prototype.toXML = function() {
    return this.map((entry) => {
        if (typeof entry === "object") {
            return entry.toXML();
        } else {
            return `<${toSnakeCase(typeof entry)}>${entry}</${toSnakeCase(typeof entry)}>`;
        }
    }).join("");
};

export default function serializeXML(root) {
    let rootXml: string;
    if (typeof root === "object") {
        rootXml = root.toXML();
    } else {
        rootXml = `<${toSnakeCase(typeof root)}>${root}</${toSnakeCase(typeof root)}>`;
    }
    // language=XML
    return `<?xml version="1.0" standalone="yes" ?>
<data>${rootXml}</data>`;
}
