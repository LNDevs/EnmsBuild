"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tokens = /** @class */ (function () {
    // 64 characters
    // id:random string 47 chars long total of 64 characters
    // 1234567891012131:AabCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXx / example
    function Tokens() {
        this.Tokens = Array();
        // nothing happens here!
    }
    Tokens.prototype.Token = function (id) {
        var _this = this;
        if (id === undefined)
            console.log("it is fucked! enigmaid is undefined");
        var token = { userid: id.id, token: "", constructed: "", timeSet: Date.now() };
        if (this.Tokens.some(function (t) { return t.userid === id.id; })) {
            // ignore this bit, it looks like complete shit and i hope i find a way around it at some point
            this.Tokens.find(function (t) { return t.userid === id.id; }, function (element) {
                if (element == undefined) {
                    return token = _this.Token(id);
                }
                else {
                    token = element;
                }
            });
        }
        else if (!(this.Tokens.some(function (t) { return t.userid === id.id; }))) {
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_".split("");
            for (var i = 0; i + 1 < 31; i++) {
                token.token += characters[Math.floor(Math.random() * characters.length)];
            }
            token.constructed = token.userid + ":" + token.token; // userid:rndstr
        }
        return token;
    };
    return Tokens;
}());
exports.default = Tokens;
