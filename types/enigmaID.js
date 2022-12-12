"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnigmaIDs = void 0;
var EnigmaIDs = /** @class */ (function () {
    function EnigmaIDs(debug) {
        this.IDs = Array();
        this.debug = false;
        debug = debug;
        // nothing happens here!
    }
    EnigmaIDs.prototype.ID = function () {
        console.log("[DEBUG/EnigmaID/14] Creating enigmaid");
        var id = { id: Math.floor(Math.random() * 1000000000000000) }; // 16 spaces!
        while ((this.IDs.some(function (value, index) { return value.id === id.id; }))) {
            console.log("[DEBUG/EnigmaID] Creating new id value");
            id = { id: Math.floor(Math.random() * 1000000000000000) };
            if (!(this.IDs.some(function (value, index) { return value.id === id.id; }))) {
                this.IDs.push(id);
                return id;
            }
        }
        return id;
    };
    return EnigmaIDs;
}());
exports.EnigmaIDs = EnigmaIDs;
