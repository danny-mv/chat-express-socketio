import { withAuth } from 'next-auth/middleware';


export default withAuth({
    pages: {
        signIn: "/"
    },
    callbacks: {
        authorized: ({ token }) => !!token,
    },
})

export const config = {
    matcher: [
        "/users/:path*",
        "/conversations/:path*"
    ]
};