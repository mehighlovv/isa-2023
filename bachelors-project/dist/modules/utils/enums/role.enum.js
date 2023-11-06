"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const graphql_1 = require("@nestjs/graphql");
var Role;
(function (Role) {
    Role["TRANSFUSION_CENTER_ADMINISTRATOR"] = "Transfusion Center Administrator";
    Role["REGISTERED_USER"] = "Registered User";
    Role["STAFF"] = "Staff";
    Role["SYSTEM_ADMINISTRATOR"] = "System Administrator";
})(Role || (exports.Role = Role = {}));
(0, graphql_1.registerEnumType)(Role, {
    name: 'Role'
});
//# sourceMappingURL=role.enum.js.map