"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let AuthorizationInterceptor = class AuthorizationInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];
        if (!authorizationHeader) {
            throw new common_1.BadRequestException('Authorization header is missing');
        }
        return next
            .handle()
            .pipe((0, operators_1.tap)(() => console.log('Authorization header is present:', context)));
    }
};
exports.AuthorizationInterceptor = AuthorizationInterceptor;
exports.AuthorizationInterceptor = AuthorizationInterceptor = __decorate([
    (0, common_1.Injectable)()
], AuthorizationInterceptor);
//# sourceMappingURL=authorization.interceptor.js.map