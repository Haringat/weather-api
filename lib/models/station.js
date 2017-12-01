"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Station: {
        id: "Station",
        required: ["id", "name"],
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
        }
    }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvc3RhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ1gsT0FBTyxFQUFFO1FBQ0wsRUFBRSxFQUFFLFNBQVM7UUFDYixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1FBQ3hCLFVBQVUsRUFBRTtZQUNSLEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsMEZBQTBGO2dCQUNsRyxXQUFXLEVBQUUsMkJBQTJCO2FBQzNDO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxzQkFBc0I7YUFDdEM7U0FDSjtLQUNKO0NBQ0osQ0FBQyIsImZpbGUiOiJsaWIvbW9kZWxzL3N0YXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBTdGF0aW9uOiB7XHJcbiAgICAgICAgaWQ6IFwiU3RhdGlvblwiLFxyXG4gICAgICAgIHJlcXVpcmVkOiBbXCJpZFwiLCBcIm5hbWVcIl0sXHJcbiAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICBpZDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogXCJbMC05YS1mQS1GXXs4fS1bMC05YS1mQS1GXXs0fS1bMS01XVswLTlhLWZBLUZdezN9LXs4OWFiQUJdWzAtOWEtZkEtRl17M30tWzAtOWEtZkEtRl17MTJ9XCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVbmlxdWUgc3RhdGlvbiBpZGVudGlmaWVyXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5hbWUgb2YgdGhlIGNhdGVnb3J5XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuIl19
