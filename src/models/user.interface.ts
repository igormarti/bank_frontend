export default interface User {
    id?:number;
    name:string;
    email:string;
    password?:string;
    email_verified_at?:boolean|null;
    created_at?:Date;
    updated_at?:Date;
    useraccount?: Account;
}

export interface UserStore {
    name:string;
    email:string;
    password:string;
}
