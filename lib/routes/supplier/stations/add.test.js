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
var app_1 = require("../../../core/app");
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
ava_1.default("adds a new station", function (t) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(1);
                return [4 /*yield*/, superTest(t.context.app.server)
                        .post("/v1/supplier/stations/")
                        .expect(200)
                        .then(function (data) { return t.pass(); }, t.fail)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9yb3V0ZXMvc3VwcGxpZXIvc3RhdGlvbnMvYWRkLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBb0JBOztBQXBCQSwyQkFBdUI7QUFDdkIscUNBQXVDO0FBQ3ZDLHlDQUFvQztBQUVwQyxhQUFJLENBQUMsVUFBVSxDQUFDLFVBQU8sQ0FBQzs7OztnQkFDcEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxhQUFHLEVBQUUsQ0FBQztnQkFDMUIscUJBQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUE7O2dCQUEvQixTQUErQixDQUFDOzs7O0tBQ25DLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxvQkFBb0IsRUFBRSxVQUFPLENBQUM7Ozs7Z0JBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1YscUJBQU0sU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQzt5QkFDaEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDO3lCQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDO3lCQUNYLElBQUksQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBUixDQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFBOztnQkFIckMsU0FHcUMsQ0FBQzs7OztLQUN6QyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFPLENBQUM7OztvQkFDMUIscUJBQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUE7O2dCQUFqQyxTQUFpQyxDQUFDOzs7O0tBQ3JDLENBQUMsQ0FBQyIsImZpbGUiOiJsaWIvcm91dGVzL3N1cHBsaWVyL3N0YXRpb25zL2FkZC50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRlc3QgZnJvbSBcImF2YVwiO1xyXG5pbXBvcnQgKiBhcyBzdXBlclRlc3QgZnJvbSBcInN1cGVydGVzdFwiO1xyXG5pbXBvcnQgQXBwIGZyb20gXCIuLi8uLi8uLi9jb3JlL2FwcFwiO1xyXG5cclxudGVzdC5iZWZvcmVFYWNoKGFzeW5jICh0KSA9PiB7XHJcbiAgICB0LmNvbnRleHQuYXBwID0gbmV3IEFwcCgpO1xyXG4gICAgYXdhaXQgdC5jb250ZXh0LmFwcC5ib290c3RyYXAoKTtcclxufSk7XHJcblxyXG50ZXN0KFwiYWRkcyBhIG5ldyBzdGF0aW9uXCIsIGFzeW5jICh0KSA9PiB7XHJcbiAgICB0LnBsYW4oMSk7XHJcbiAgICBhd2FpdCBzdXBlclRlc3QodC5jb250ZXh0LmFwcC5zZXJ2ZXIpXHJcbiAgICAgICAgLnBvc3QoXCIvdjEvc3VwcGxpZXIvc3RhdGlvbnMvXCIpXHJcbiAgICAgICAgLmV4cGVjdCgyMDApXHJcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHQucGFzcygpLCB0LmZhaWwpO1xyXG59KTtcclxuXHJcbnRlc3QuYWZ0ZXJFYWNoLmFsd2F5cyhhc3luYyAodCkgPT4ge1xyXG4gICAgYXdhaXQgdC5jb250ZXh0LmFwcC5kZWJvb3RzdHJhcCgpO1xyXG59KTtcclxuIl19
