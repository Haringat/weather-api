"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./core/app");
var logger_1 = require("./core/logger");
function default_1() {
    return new app_1.default().bootstrap("127.0.0.1", 8080).then(function () {
        logger_1.default["info"]("server running");
    });
}
exports.default = default_1;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9ib290c3RyYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBNkI7QUFDN0Isd0NBQW9DO0FBRXBDO0lBRUksTUFBTSxDQUFDLElBQUksYUFBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDL0MsZ0JBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQztBQU5ELDRCQU1DIiwiZmlsZSI6ImxpYi9ib290c3RyYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBwIGZyb20gXCIuL2NvcmUvYXBwXCI7XHJcbmltcG9ydCBjb25zb2xlIGZyb20gXCIuL2NvcmUvbG9nZ2VyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IEFwcCgpLmJvb3RzdHJhcChcIjEyNy4wLjAuMVwiLCA4MDgwKS50aGVuKCgpID0+IHtcclxuICAgICAgICBjb25zb2xlW2BpbmZvYF0oXCJzZXJ2ZXIgcnVubmluZ1wiKTtcclxuICAgIH0pO1xyXG5cclxufVxyXG4iXX0=
