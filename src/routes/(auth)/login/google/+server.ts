import { google, scopes } from "$lib/server/auth/oauth";
import { generateState } from "arctic";
import { generateId } from "lucia";
import { redirect } from "@sveltejs/kit";
import { dev } from "$app/environment";

export const GET = async ({ cookies }) => {
    const state = generateState();
    const codeVerifier = generateId(32);
    console.log(state);
    console.log("----------------------");
    console.log(codeVerifier);

    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes,
    });

    url.searchParams.set("access_type", "offline");
    cookies.set("google_oauth_state", state, {
        path: "/",
        secure: !dev,
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
    });

    cookies.set("google_oauth_code_verifier", codeVerifier, {
        path: "/",
        secure: !dev,
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
    });

    redirect(302, url.toString());
};
