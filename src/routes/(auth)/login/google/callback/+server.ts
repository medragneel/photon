import { lucia } from "$lib/server/auth/lucia";
import { google } from "$lib/server/auth/oauth";
import { createNewUser, getUserByEmail } from "$lib/server/db/models/users";
import { error } from "@sveltejs/kit";
import { OAuth2RequestError, type GoogleRefreshedTokens } from "arctic";
import { exists } from "drizzle-orm";
import { generateId } from "lucia";

export const GET = async ({ url, cookies }) => {
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const savedState = cookies.get("google_oauth_state");
    const savedCodeVerifier = cookies.get("google_oauth_code_verifier");

    if (
        !code ||
        !state ||
        !savedState ||
        !savedCodeVerifier ||
        state !== savedState
    ) {
        console.error("Invalid state or code");

        return new Response(null, {
            status: 400,
            statusText: "Bad Request",
        });
    }
    const userId = generateId(15);

    try {
        const tokens = await google.validateAuthorizationCode(
            code,
            savedCodeVerifier,
        );
        let googleRefereshToken: GoogleRefreshedTokens | undefined = undefined;

        if (tokens.refreshToken) {
            googleRefereshToken = await google.refreshAccessToken(
                tokens.refreshToken,
            );
        }
        const googleUserResponse = await fetch(
            "https://openidconnect.googleapis.com/v1/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            },
        );

        const googleUser = await googleUserResponse.json();
        console.log(googleUser.email);
        const [existingUser] = await getUserByEmail(googleUser.email);

        if (existingUser) {
            console.log(existingUser);
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes,
            });
        } else {
            await createNewUser({
                id: userId,
                email: googleUser.email,
                username: googleUser.name,
                password: `google-${googleUser.sub}`,
            });
            const session = await lucia.createSession(userId, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            console.log(session);
            console.log("-------------- ");
            console.log(sessionCookie);
            console.log("-------------- ");
            cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes,
            });
        }

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
            },
        });
    } catch (error) {
        console.error("Error exchanging code for token", error);

        if (error instanceof OAuth2RequestError) {
            return new Response(null, {
                status: 400,
                statusText: "Bad Request",
            });
        }

        return new Response(null, {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
};
