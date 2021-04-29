"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const auth_controller_1 = require("./domain/controller/auth.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const driver_controller_1 = require("./domain/controller/driver.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const owner_controller_1 = require("./domain/controller/owner.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const terminal_master_controller_1 = require("./domain/controller/terminal-master.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const terminal_controller_1 = require("./domain/controller/terminal.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const vehicle_controller_1 = require("./domain/controller/vehicle.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "IApiResponse": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "data": { "dataType": "any" },
            "count": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IErrorResponse": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "details": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICredentials": {
        "dataType": "refObject",
        "properties": {
            "username": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUser": {
        "dataType": "refObject",
        "properties": {
            "username": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "first_name": { "dataType": "string", "required": true },
            "last_name": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "user_group": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["admin"] }, { "dataType": "enum", "enums": ["municipal-assembly"] }, { "dataType": "enum", "enums": ["police"] }, { "dataType": "enum", "enums": ["user"] }] },
            "role": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["admin"] }, { "dataType": "enum", "enums": ["mediator"] }, { "dataType": "enum", "enums": ["commenter"] }] },
            "created_by": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDriver": {
        "dataType": "refObject",
        "properties": {
            "first_name": { "dataType": "string", "required": true },
            "last_name": { "dataType": "string", "required": true },
            "other_names": { "dataType": "string", "required": true },
            "dob": { "dataType": "string", "required": true },
            "gender": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["male"] }, { "dataType": "enum", "enums": ["female"] }] },
            "license": { "dataType": "nestedObjectLiteral", "nestedProperties": { "class": { "dataType": "string", "required": true }, "number": { "dataType": "string", "required": true } }, "required": true },
            "contact": { "dataType": "nestedObjectLiteral", "nestedProperties": { "email": { "dataType": "string", "required": true }, "phone_number": { "dataType": "string", "required": true } }, "required": true },
            "address": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ghana_post": { "dataType": "string", "required": true }, "postal_address": { "dataType": "string", "required": true }, "residential_address": { "dataType": "string", "required": true } }, "required": true },
            "identification": { "dataType": "nestedObjectLiteral", "nestedProperties": { "number": { "dataType": "string", "required": true }, "id_type": { "dataType": "string", "required": true } }, "required": true },
            "tin": { "dataType": "string", "required": true },
            "created_by": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOwner": {
        "dataType": "refObject",
        "properties": {
            "first_name": { "dataType": "string", "required": true },
            "last_name": { "dataType": "string", "required": true },
            "other_names": { "dataType": "string", "required": true },
            "dob": { "dataType": "string", "required": true },
            "gender": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["male"] }, { "dataType": "enum", "enums": ["female"] }] },
            "contact": { "dataType": "nestedObjectLiteral", "nestedProperties": { "email": { "dataType": "string", "required": true }, "phone_number": { "dataType": "string", "required": true } }, "required": true },
            "address": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ghana_post": { "dataType": "string", "required": true }, "postal_address": { "dataType": "string", "required": true }, "residential_address": { "dataType": "string", "required": true } }, "required": true },
            "identification": { "dataType": "nestedObjectLiteral", "nestedProperties": { "number": { "dataType": "string", "required": true }, "id_type": { "dataType": "string", "required": true } }, "required": true },
            "tin": { "dataType": "string", "required": true },
            "created_by": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminalMaster": {
        "dataType": "refObject",
        "properties": {
            "first_name": { "dataType": "string", "required": true },
            "last_name": { "dataType": "string", "required": true },
            "other_names": { "dataType": "string", "required": true },
            "dob": { "dataType": "string", "required": true },
            "gender": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["male"] }, { "dataType": "enum", "enums": ["female"] }] },
            "contact": { "dataType": "nestedObjectLiteral", "nestedProperties": { "email": { "dataType": "string", "required": true }, "phone_number": { "dataType": "string", "required": true } }, "required": true },
            "address": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ghana_post": { "dataType": "string", "required": true }, "postal_address": { "dataType": "string", "required": true }, "residential_address": { "dataType": "string", "required": true } }, "required": true },
            "identification": { "dataType": "nestedObjectLiteral", "nestedProperties": { "number": { "dataType": "string", "required": true }, "id_type": { "dataType": "string", "required": true } }, "required": true },
            "tin": { "dataType": "string", "required": true },
            "created_by": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITerminal": {
        "dataType": "refObject",
        "properties": {
            "terminal_name": { "dataType": "string", "required": true },
            "contact": { "dataType": "nestedObjectLiteral", "nestedProperties": { "email": { "dataType": "string", "required": true }, "phone_number": { "dataType": "string", "required": true } }, "required": true },
            "address": { "dataType": "nestedObjectLiteral", "nestedProperties": { "ghana_post": { "dataType": "string", "required": true }, "postal_address": { "dataType": "string", "required": true }, "physical_address": { "dataType": "string", "required": true } }, "required": true },
            "municipal_assembly": { "dataType": "string" },
            "terminal_master": { "dataType": "string" },
            "created_by": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVehicle": {
        "dataType": "refObject",
        "properties": {
            "make": { "dataType": "string", "required": true },
            "model": { "dataType": "string", "required": true },
            "chasis_number": { "dataType": "string", "required": true },
            "plate_number": { "dataType": "string", "required": true },
            "registration_date": { "dataType": "string", "required": true },
            "municipal_assembly": { "dataType": "string" },
            "terminal": { "dataType": "string" },
            "owner": { "dataType": "string" },
            "driver": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.get('/api/auth/all', function AuthController_getAll(request, response, next) {
        const args = {
            limit: { "in": "query", "name": "limit", "dataType": "double" },
            notFoundResponse: { "in": "res", "name": "404", "required": true, "ref": "IErrorResponse" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new auth_controller_1.AuthController();
        const promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/auth/login', function AuthController_loginUser(request, response, next) {
        const args = {
            credentials: { "in": "body", "name": "credentials", "required": true, "ref": "ICredentials" },
            notAuthorized: { "in": "res", "name": "401", "required": true, "ref": "IErrorResponse" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new auth_controller_1.AuthController();
        const promise = controller.loginUser.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/auth/create', function AuthController_createUser(request, response, next) {
        const args = {
            user: { "in": "body", "name": "user", "required": true, "ref": "IUser" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new auth_controller_1.AuthController();
        const promise = controller.createUser.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/driver/all', function DriverController_getAll(request, response, next) {
        const args = {
            limit: { "in": "query", "name": "limit", "dataType": "double" },
            notFoundResponse: { "in": "res", "name": "404", "required": true, "ref": "IErrorResponse" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new driver_controller_1.DriverController();
        const promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/driver/create', function DriverController_create(request, response, next) {
        const args = {
            driver: { "in": "body", "name": "driver", "required": true, "ref": "IDriver" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new driver_controller_1.DriverController();
        const promise = controller.create.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/owner/all', function OwnerController_getAll(request, response, next) {
        const args = {
            limit: { "in": "query", "name": "limit", "dataType": "double" },
            notFoundResponse: { "in": "res", "name": "404", "required": true, "ref": "IErrorResponse" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new owner_controller_1.OwnerController();
        const promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/owner/create', function OwnerController_create(request, response, next) {
        const args = {
            owner: { "in": "body", "name": "owner", "required": true, "ref": "IOwner" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new owner_controller_1.OwnerController();
        const promise = controller.create.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/terminalMaster/all', function TerminalMasterController_getAll(request, response, next) {
        const args = {
            limit: { "in": "query", "name": "limit", "dataType": "double" },
            notFoundResponse: { "in": "res", "name": "404", "required": true, "ref": "IErrorResponse" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new terminal_master_controller_1.TerminalMasterController();
        const promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/terminalMaster/create', function TerminalMasterController_create(request, response, next) {
        const args = {
            terminalMaster: { "in": "body", "name": "terminalMaster", "required": true, "ref": "ITerminalMaster" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new terminal_master_controller_1.TerminalMasterController();
        const promise = controller.create.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/terminal/all', function TerminalController_getAll(request, response, next) {
        const args = {
            limit: { "in": "query", "name": "limit", "dataType": "double" },
            notFoundResponse: { "in": "res", "name": "404", "required": true, "ref": "IErrorResponse" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new terminal_controller_1.TerminalController();
        const promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/terminal/create', function TerminalController_create(request, response, next) {
        const args = {
            terminal: { "in": "body", "name": "terminal", "required": true, "ref": "ITerminal" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new terminal_controller_1.TerminalController();
        const promise = controller.create.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/vehicle/all', function VehicleController_getAll(request, response, next) {
        const args = {
            limit: { "in": "query", "name": "limit", "dataType": "double" },
            notFoundResponse: { "in": "res", "name": "404", "required": true, "ref": "IErrorResponse" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new vehicle_controller_1.VehicleController();
        const promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/api/vehicle/create', function VehicleController_create(request, response, next) {
        const args = {
            newVehicle: { "in": "body", "name": "newVehicle", "required": true, "ref": "IVehicle" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new vehicle_controller_1.VehicleController();
        const promise = controller.create.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/vehicle/findByNumberPlate/:numberPlate', function VehicleController_getByNumberPlate(request, response, next) {
        const args = {
            numberPlate: { "in": "path", "name": "numberPlate", "required": true, "dataType": "string" },
            notFoundResponse: { "in": "res", "name": "404", "required": true, "ref": "IErrorResponse" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new vehicle_controller_1.VehicleController();
        const promise = controller.getByNumberPlate.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/vehicle/findById/:vehicleId', function VehicleController_findVehicleById(request, response, next) {
        const args = {
            vehicleId: { "in": "path", "name": "vehicleId", "required": true, "dataType": "string" },
            notFoundResponse: { "in": "res", "name": "404", "required": true, "ref": "IErrorResponse" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new vehicle_controller_1.VehicleController();
        const promise = controller.findVehicleById.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode = successStatus;
            let headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function returnHandler(response, statusCode, data, headers = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        }
        else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function getValidatedArgs(args, request, response) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map