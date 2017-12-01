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
var ava_1 = require("ava");
var superTest = require("supertest");
var app_1 = require("../core/app");
ava_1.default.beforeEach(function (t) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.context.app = new app_1.default();
                return [4 /*yield*/, t.context.app.bootstrap()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("catches all methods for non-existing endpoints", function (t) {
    t.plan(52);
    var endpoints = ["/foobar", "/foo/bar/baz"];
    var methods = [
        "get",
        "post",
        "put",
        "head",
        "delete",
        "options",
        "trace",
        "copy",
        "lock",
        "mkcol",
        "move",
        "purge",
        "propfind",
        "proppatch",
        "unlock",
        "report",
        "mkactivity",
        "checkout",
        "merge",
        "m-search",
        "notify",
        "subscribe",
        "unsubscribe",
        "patch",
        "search",
        "connect"
    ];
    return Promise.all(endpoints.map(function (endpoint) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(methods.map(function (method) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, superTest(t.context.app.server)[method](endpoint)
                                        .expect(404)
                                        .then(function (data) { return t.pass; }, function () { return t.fail("method \"" + method + "\" on endpoint " + endpoint + " failed"); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }));
});
ava_1.default.afterEach.always(function (t) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, t.context.app.debootstrap()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9yb3V0ZXMvZmFsbGJhY2sudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkF3REE7O0FBeERBLDJCQUF1QjtBQUd2QixxQ0FBdUM7QUFFdkMsbUNBQThCO0FBRTlCLGFBQUksQ0FBQyxVQUFVLENBQUMsVUFBTyxDQUFDOzs7O2dCQUNwQixDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLGFBQUcsRUFBRSxDQUFDO2dCQUMxQixxQkFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7Z0JBQS9CLFNBQStCLENBQUM7Ozs7S0FDbkMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLGdEQUFnRCxFQUFFLFVBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsSUFBTSxTQUFTLEdBQUcsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDOUMsSUFBTSxPQUFPLEdBQUc7UUFDWixLQUFLO1FBQ0wsTUFBTTtRQUNOLEtBQUs7UUFDTCxNQUFNO1FBQ04sUUFBUTtRQUNSLFNBQVM7UUFDVCxPQUFPO1FBQ1AsTUFBTTtRQUNOLE1BQU07UUFDTixPQUFPO1FBQ1AsTUFBTTtRQUNOLE9BQU87UUFDUCxVQUFVO1FBQ1YsV0FBVztRQUNYLFFBQVE7UUFDUixRQUFRO1FBQ1IsWUFBWTtRQUNaLFVBQVU7UUFDVixPQUFPO1FBQ1AsVUFBVTtRQUNWLFFBQVE7UUFDUixXQUFXO1FBQ1gsYUFBYTtRQUNiLE9BQU87UUFDUCxRQUFRO1FBQ1IsU0FBUztLQUNaLENBQUM7SUFDRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQU8sUUFBUTs7Ozt3QkFDNUMscUJBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQU8sTUFBTTs7O3dDQUN2QyxxQkFBTSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQ2hDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQzt5Q0FDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQzt5Q0FDWCxJQUFJLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sRUFBRSxjQUFNLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFXLE1BQU0sdUJBQWlCLFFBQVEsWUFBUyxDQUFDLEVBQTNELENBQTJELENBQUMsRUFBQTs7b0NBSDlGLFNBRzhGLENBQUM7Ozs7eUJBQ2xHLENBQUMsQ0FBQyxFQUFBOztvQkFMSCxTQUtHLENBQUM7Ozs7U0FDUCxDQUFDLENBQUMsQ0FBQztBQUNSLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBTyxDQUFDOzs7b0JBQzFCLHFCQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFBOztnQkFBakMsU0FBaUMsQ0FBQzs7OztLQUNyQyxDQUFDLENBQUMiLCJmaWxlIjoibGliL3JvdXRlcy9mYWxsYmFjay50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRlc3QgZnJvbSBcImF2YVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVTZXJ2ZXIgfSBmcm9tIFwiaHR0cFwiO1xyXG5pbXBvcnQge30gZnJvbSBcIm1ldGhvZHNcIjtcclxuaW1wb3J0ICogYXMgc3VwZXJUZXN0IGZyb20gXCJzdXBlcnRlc3RcIjtcclxuaW1wb3J0IHsgVGVzdCB9IGZyb20gXCJzdXBlcnRlc3RcIjtcclxuaW1wb3J0IEFwcCBmcm9tIFwiLi4vY29yZS9hcHBcIjtcclxuXHJcbnRlc3QuYmVmb3JlRWFjaChhc3luYyAodCkgPT4ge1xyXG4gICAgdC5jb250ZXh0LmFwcCA9IG5ldyBBcHAoKTtcclxuICAgIGF3YWl0IHQuY29udGV4dC5hcHAuYm9vdHN0cmFwKCk7XHJcbn0pO1xyXG5cclxudGVzdChcImNhdGNoZXMgYWxsIG1ldGhvZHMgZm9yIG5vbi1leGlzdGluZyBlbmRwb2ludHNcIiwgKHQpID0+IHtcclxuICAgIHQucGxhbig1Mik7XHJcbiAgICBjb25zdCBlbmRwb2ludHMgPSBbXCIvZm9vYmFyXCIsIFwiL2Zvby9iYXIvYmF6XCJdO1xyXG4gICAgY29uc3QgbWV0aG9kcyA9IFtcclxuICAgICAgICBcImdldFwiLFxyXG4gICAgICAgIFwicG9zdFwiLFxyXG4gICAgICAgIFwicHV0XCIsXHJcbiAgICAgICAgXCJoZWFkXCIsXHJcbiAgICAgICAgXCJkZWxldGVcIixcclxuICAgICAgICBcIm9wdGlvbnNcIixcclxuICAgICAgICBcInRyYWNlXCIsXHJcbiAgICAgICAgXCJjb3B5XCIsXHJcbiAgICAgICAgXCJsb2NrXCIsXHJcbiAgICAgICAgXCJta2NvbFwiLFxyXG4gICAgICAgIFwibW92ZVwiLFxyXG4gICAgICAgIFwicHVyZ2VcIixcclxuICAgICAgICBcInByb3BmaW5kXCIsXHJcbiAgICAgICAgXCJwcm9wcGF0Y2hcIixcclxuICAgICAgICBcInVubG9ja1wiLFxyXG4gICAgICAgIFwicmVwb3J0XCIsXHJcbiAgICAgICAgXCJta2FjdGl2aXR5XCIsXHJcbiAgICAgICAgXCJjaGVja291dFwiLFxyXG4gICAgICAgIFwibWVyZ2VcIixcclxuICAgICAgICBcIm0tc2VhcmNoXCIsXHJcbiAgICAgICAgXCJub3RpZnlcIixcclxuICAgICAgICBcInN1YnNjcmliZVwiLFxyXG4gICAgICAgIFwidW5zdWJzY3JpYmVcIixcclxuICAgICAgICBcInBhdGNoXCIsXHJcbiAgICAgICAgXCJzZWFyY2hcIixcclxuICAgICAgICBcImNvbm5lY3RcIlxyXG4gICAgXTtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChlbmRwb2ludHMubWFwKGFzeW5jIChlbmRwb2ludCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKG1ldGhvZHMubWFwKGFzeW5jIChtZXRob2QpID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgc3VwZXJUZXN0KHQuY29udGV4dC5hcHAuc2VydmVyKVxyXG4gICAgICAgICAgICAgICAgW21ldGhvZF0oZW5kcG9pbnQpXHJcbiAgICAgICAgICAgICAgICAuZXhwZWN0KDQwNClcclxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB0LnBhc3MsICgpID0+IHQuZmFpbChgbWV0aG9kIFwiJHttZXRob2R9XCIgb24gZW5kcG9pbnQgJHtlbmRwb2ludH0gZmFpbGVkYCkpO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH0pKTtcclxufSk7XHJcblxyXG50ZXN0LmFmdGVyRWFjaC5hbHdheXMoYXN5bmMgKHQpID0+IHtcclxuICAgIGF3YWl0IHQuY29udGV4dC5hcHAuZGVib290c3RyYXAoKTtcclxufSk7XHJcbiJdfQ==
