"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sweetalert2_1 = require("sweetalert2");
var Dashboard;
(function (Dashboard) {
    /**
     * Say Hello
     * @param name name
     */
    function sayHello(name) {
        sweetalert2_1.default.fire("Hello " + name + "!");
    }
    Dashboard.sayHello = sayHello;
})(Dashboard = exports.Dashboard || (exports.Dashboard = {}));
exports.default = Dashboard;
window.Dashboard = Dashboard || {};
