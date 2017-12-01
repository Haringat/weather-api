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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http_1 = require("http");
var routes_1 = require("../routes");
var logger_1 = require("./logger");
var default_1 = /** @class */ (function () {
    function default_1() {
        this.app = express();
        this.app.use(logger_1.expressMiddleWare);
        this.app.use("/v1", routes_1.default);
    }
    default_1.prototype.setupSwagger = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    default_1.prototype.bootstrap = function (host, port) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.server = http_1.createServer(_this.app).listen(port, host, resolve);
                    })];
            });
        });
    };
    default_1.prototype.debootstrap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.server.close(resolve);
                    })];
            });
        });
    };
    return default_1;
}());
exports.default = default_1;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb3JlL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQW1DO0FBQ25DLDZCQUEwQztBQUMxQyxvQ0FBK0I7QUFDL0IsbUNBQTZDO0FBRTdDO0lBS0k7UUFFSSxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBRXJCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLDBCQUFpQixDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGdCQUFNLENBQUMsQ0FBQztJQUVoQyxDQUFDO0lBRVksZ0NBQVksR0FBekI7OztnQkFDSSxzQkFBTzs7O0tBQ1Y7SUFFWSw2QkFBUyxHQUF0QixVQUF1QixJQUFZLEVBQUUsSUFBWTs7OztnQkFFN0Msc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO3dCQUN2QixLQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFZLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNyRSxDQUFDLENBQUMsRUFBQzs7O0tBRU47SUFFWSwrQkFBVyxHQUF4Qjs7OztnQkFFSSxzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87d0JBQ3ZCLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMvQixDQUFDLENBQUMsRUFBQzs7O0tBRU47SUFFTCxnQkFBQztBQUFELENBbENBLEFBa0NDLElBQUEiLCJmaWxlIjoibGliL2NvcmUvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQge2NyZWF0ZVNlcnZlciwgU2VydmVyfSBmcm9tIFwiaHR0cFwiO1xyXG5pbXBvcnQgcm91dGVyIGZyb20gXCIuLi9yb3V0ZXNcIjtcclxuaW1wb3J0IHsgZXhwcmVzc01pZGRsZVdhcmUgfSBmcm9tIFwiLi9sb2dnZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcclxuXHJcbiAgICBwdWJsaWMgYXBwOiBleHByZXNzLkV4cHJlc3M7XHJcbiAgICBwcml2YXRlIHNlcnZlcjogU2VydmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICB0aGlzLmFwcCA9IGV4cHJlc3MoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcHAudXNlKGV4cHJlc3NNaWRkbGVXYXJlKTtcclxuICAgICAgICB0aGlzLmFwcC51c2UoXCIvdjFcIiwgcm91dGVyKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNldHVwU3dhZ2dlcigpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGJvb3RzdHJhcChob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcikge1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSBjcmVhdGVTZXJ2ZXIodGhpcy5hcHApLmxpc3Rlbihwb3J0LCBob3N0LCByZXNvbHZlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGRlYm9vdHN0cmFwKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIuY2xvc2UocmVzb2x2ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=
