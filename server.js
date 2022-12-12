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
var express_session_1 = require("express-session");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = require("body-parser");
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./types/users"));
var user_1 = __importDefault(require("./types/user"));
var express_session_2 = __importDefault(require("express-session"));
require("cors");
var port = 80;
var debug = true;
var app = (0, express_1.default)();
var Usermgr = new users_1.default(debug);
// USE //
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, express_session_2.default)({
    secret: "RQ1UZd6Oo415Z3ThMdHCgvnQI8UzQivqiNisKTZxCuO6zQvhoYh0Ct+60Sl68eiKR0p0Qac1N1g",
    name: "Enigma-Sessiontoken",
    saveUninitialized: true,
    store: new express_session_1.MemoryStore({}),
    resave: false,
    cookie: { secure: false }
}));
// v0 api endpoints //
app.post("/api/v0/accounts/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Eval, Evaluation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("[" + req.url + "] POST /api/v0/accounts/login");
                if (!(req.body.legacyname && req.body.password)) return [3 /*break*/, 5];
                return [4 /*yield*/, Usermgr.getUserByName(req.body.legacyname)];
            case 1:
                Eval = _a.sent();
                // works up to here?
                if (Eval === undefined) {
                    console.log("[" + req.url + "] POST /: could not get user by name " + req.body.legacyname);
                    res.send("{error: 5, failPoint: 1}");
                    return [2 /*return*/];
                }
                if ((!(Eval instanceof user_1.default)) && debug)
                    console.log("ERR@ Ln45 | User is definately not defined, val is {error, message, type}");
                if (!(Eval instanceof user_1.default)) return [3 /*break*/, 3];
                return [4 /*yield*/, Eval.authenticate(req.body.password, Usermgr.getNewToken(Eval.userid))];
            case 2:
                Evaluation = _a.sent();
                console.log("ERR@ Ln49 | ", Evaluation);
                if (Evaluation.type !== 0) {
                    res.send(Evaluation.toString());
                    if (debug)
                        console.log("ERR@ Ln52 | Eval typeof error");
                    return [2 /*return*/];
                }
                else if (Evaluation instanceof user_1.default) {
                    if (debug)
                        console.log(Evaluation.toString());
                    res.cookie("Enigma-Sessiontoken", Evaluation.token, { expires: new Date(Date.now() + (48 * (60 * (60 * 1000)))) }); // sets token for 48h
                    console.log("[" + req.url + "] POST /api/v0/accounts/login & session is " + req.session.token);
                    res.json({ message: "Logged in!" });
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 3:
                res.json({ error: 5, failPoint: 2, message: 'User is not found!' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                res.json({ error: 1, message: 'Error, no data specified, this route requires data to be specified!' });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post("/api/v0/accounts/post", function (req, res) {
    // takes {legacyname, password}
    console.log("[" + req.url + "] POST /api/v0/accounts/post & session is " + req.session);
    if (!(req.body.legacyname.toString().length > 0 && req.body.password.toString().length > 0)) {
        res.send("{error: 1, message: 'Error, no data specified, this route requires data to be specified!'}");
    }
    else {
        var response = Usermgr.create(req.body.legacyname, req.body.legacyname, req.body.password);
        if (response) {
            res.json({ validity: true, message: 'Success creating this account, ending request!' });
        }
        else if (!(response)) {
            // account not created, ln exists already!
            res.json({ validity: false, message: 'An account with that legacy name already exists!' });
        }
    }
});
app.post("/api/v0/accounts/fetch", function (req, res) {
    // fetches information about a user, excludes personal information!
    //var response: any;
    //if (req.body.userid) response = Usermgr.getUserByID(req.body.userid);
    //else response = Usermgr.getUserByName(req.body.legacyname);
    //return response;
    // TODO: FIX THIS SHIT IMMEDIATELY (AFTER I DO OTHER THINGS SO NOT REALLY IMMEDIATELY, DO NOT LET THIS PUSH TO PROD AS ITS MEGA INSECURE);
    res.send("{message: 'endpoint disabled'}");
});
app.listen(port, function () {
    console.log("====================\nListening on port " + port + "\n====================");
});
