import {
    GOOGLE_CLIENT,
    GOOGLE_KEY,
    GOOGLE_OAUTH_REDIRECT_URI,
} from "$env/static/private";

import { Google } from "arctic";
const scopes = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
];

const google = new Google(GOOGLE_CLIENT, GOOGLE_KEY, GOOGLE_OAUTH_REDIRECT_URI);

export { scopes, google };
