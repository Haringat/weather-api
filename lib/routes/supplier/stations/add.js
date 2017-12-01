"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var swagger = require("swagger-node-express");
var action = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: implement
        response.status(200).end();
        return [2 /*return*/];
    });
}); };
exports.default = {
    spec: {
        description: "Adds a new station",
        path: "/stations/",
        notes: "Returns a pet based on ID",
        summary: "adds a stations",
        method: "POST",
        parameters: [],
        type: "Station",
        errorResponses: [swagger.errors.invalid("station")],
        nickname: "addStations"
    },
    action: action
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9yb3V0ZXMvc3VwcGxpZXIvc3RhdGlvbnMvYWRkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQXdCQTs7QUFyQkEsOENBQWdEO0FBRWhELElBQU0sTUFBTSxHQUFHLFVBQU8sT0FBZ0IsRUFBRSxRQUFrQjs7UUFDdEQsa0JBQWtCO1FBQ2xCLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7OztLQUM5QixDQUFDO0FBRUYsa0JBQWU7SUFDWCxJQUFJLEVBQUU7UUFDRixXQUFXLEVBQUcsb0JBQW9CO1FBQ2xDLElBQUksRUFBRyxZQUFZO1FBQ25CLEtBQUssRUFBRywyQkFBMkI7UUFDbkMsT0FBTyxFQUFHLGlCQUFpQjtRQUMzQixNQUFNLEVBQUUsTUFBTTtRQUNkLFVBQVUsRUFBRyxFQUFFO1FBQ2YsSUFBSSxFQUFHLFNBQVM7UUFDaEIsY0FBYyxFQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsUUFBUSxFQUFHLGFBQWE7S0FDM0I7SUFDRCxNQUFNLFFBQUE7Q0FDVCxDQUFDIiwiZmlsZSI6ImxpYi9yb3V0ZXMvc3VwcGxpZXIvc3RhdGlvbnMvYWRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIFJlcXVlc3QsIFJlc3BvbnNlXHJcbn0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0ICogYXMgc3dhZ2dlciBmcm9tIFwic3dhZ2dlci1ub2RlLWV4cHJlc3NcIjtcclxuXHJcbmNvbnN0IGFjdGlvbiA9IGFzeW5jIChyZXF1ZXN0OiBSZXF1ZXN0LCByZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuICAgIC8vIFRPRE86IGltcGxlbWVudFxyXG4gICAgcmVzcG9uc2Uuc3RhdHVzKDIwMCkuZW5kKCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBzcGVjOiB7XHJcbiAgICAgICAgZGVzY3JpcHRpb24gOiBcIkFkZHMgYSBuZXcgc3RhdGlvblwiLFxyXG4gICAgICAgIHBhdGggOiBcIi9zdGF0aW9ucy9cIixcclxuICAgICAgICBub3RlcyA6IFwiUmV0dXJucyBhIHBldCBiYXNlZCBvbiBJRFwiLFxyXG4gICAgICAgIHN1bW1hcnkgOiBcImFkZHMgYSBzdGF0aW9uc1wiLFxyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgcGFyYW1ldGVycyA6IFtdLFxyXG4gICAgICAgIHR5cGUgOiBcIlN0YXRpb25cIixcclxuICAgICAgICBlcnJvclJlc3BvbnNlcyA6IFtzd2FnZ2VyLmVycm9ycy5pbnZhbGlkKFwic3RhdGlvblwiKV0sXHJcbiAgICAgICAgbmlja25hbWUgOiBcImFkZFN0YXRpb25zXCJcclxuICAgIH0sXHJcbiAgICBhY3Rpb25cclxufTtcclxuIl19
