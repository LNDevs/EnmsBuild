"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("./user"));
var enigmaID_1 = require("./enigmaID");
var token_1 = __importDefault(require("./token"));
var Users = /** @class */ (function () {
    function Users(debug) {
        this.debug = false;
        this.UserTable = new Array();
        this.UserTokens = new token_1.default();
        this.type = 1;
        debug = debug;
        this.UserIDs = new enigmaID_1.EnigmaIDs(this.debug);
        // nothing to do here, just inits so that users can be created, deleted authed and other shit
        // db call would be initd here
    }
    Users.prototype.getUserByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err, err;
            return __generator(this, function (_a) {
                if (this.debug)
                    console.log("[DEBUG/Users/gubid] Getting user by id number of " + id.id);
                if (this.UserTable.some(function (u) { return u.userid === id; })) {
                    user = this.UserTable.find(function (u) { return u.userid === id; });
                    if (user === undefined) {
                        err = { error: 5, message: "User account does not exist or is not found!", type: 0 };
                        return [2 /*return*/, err];
                    }
                    return [2 /*return*/, user];
                }
                else {
                    if (this.debug)
                        console.log("[DEBUG/Users/gubid] User account does not exist or is not found!");
                    err = { error: 5, message: "User account does not exist or is not found!", type: 0 };
                    return [2 /*return*/, err];
                }
                return [2 /*return*/];
            });
        });
    };
    Users.prototype.getUserByName = function (legacyname) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err, err;
            return __generator(this, function (_a) {
                if (this.debug)
                    console.log("[DEBUG/Users/gubn] Finding user account by legacyname " + legacyname);
                if (this.UserTable.some(function (u) { return u.legacyname === legacyname; })) {
                    user = this.UserTable.find(function (u) { return u.legacyname === legacyname; });
                    if (user === undefined) {
                        err = { error: 5, message: "User account does not exist or is not found!", type: 0 };
                        return [2 /*return*/, err];
                    }
                    return [2 /*return*/, user];
                }
                else {
                    if (this.debug)
                        console.log("[DEBUG/Users/gubn] User account does not exist or is not found!");
                    err = { error: 5, message: "User account does not exist or is not found!", type: 0 };
                    return [2 /*return*/, err];
                }
                return [2 /*return*/];
            });
        });
    };
    Users.prototype.create = function (displayname, legacyname, password) {
        var UserID = this.UserIDs.ID();
        var UserToken = this.UserTokens.Token(UserID);
        var user = new user_1.default(displayname, legacyname, password, UserID, UserToken);
        if (this.UserTable.some(function (u) { return u.legacyname === user.legacyname; })) {
            if (this.debug)
                console.log("[DEBUG/Users/c] Useraccount " + legacyname + " already exists ");
            return false;
        }
        else if (!this.UserTable.some(function (u) { return u.legacyname === user.legacyname; })) {
            this.UserTable.push(user);
            return true;
        }
        return false;
    };
    Users.prototype.getByToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getUserByID({ id: token.userid })];
            });
        });
    };
    Users.prototype.getNewToken = function (userid) {
        if (typeof userid === "number")
            return this.UserTokens.Token({ id: userid });
        else
            return this.UserTokens.Token(userid);
    };
    return Users;
}());
exports.default = Users;
