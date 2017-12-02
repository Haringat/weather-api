export default {
    Station: {
        id: "Station",
        properties: {
            id: {
                type: "string",
                format: "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-{89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}",
                description: "Unique station identifier"
            },
            name: {
                type: "string",
                description: "Name of the category"
            }
        },
        required: ["id", "name"]
    }
};
