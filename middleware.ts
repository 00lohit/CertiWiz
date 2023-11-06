import { withAuth } from "next-auth/middleware"

// middleware is applied to all routes, use conditionals to select

export default withAuth(
    function middleware(req) {
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                let url = req.nextUrl.pathname
                console.log(req.cookies);

                // if ()

                //     if (
                //         req.nextUrl.pathname.startsWith('/protected') &&
                //         token === null
                //     ) {
                //         return false
                //     }
                return true
            }
        }
    }
)