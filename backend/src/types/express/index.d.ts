import type { UserDocument } from "../../models/User";

type SafeUser = Pick<UserDocument, "name" | "email">;

declare global {
    namespace Express {
        interface Request {
            user?: SafeUser;
        }
    }
}