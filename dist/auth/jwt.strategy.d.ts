declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        cd: any;
        idlogin: any;
        roles: any;
    }>;
}
export {};
