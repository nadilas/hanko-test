import { env } from '../env/client.mjs';
import { Hanko, UnauthorizedError, User } from "@teamhanko/hanko-frontend-sdk"
import { useRouter } from 'next/router.js';
import { useState, useEffect } from 'react';

const api = env.NEXT_PUBLIC_HANKO_API;
const hanko = new Hanko(api)

export const useCurrentUser = () => {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState<User | null>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        hanko.user.getCurrent().then(
            user => {
                setCurrentUser(user)
                setIsLoading(false)
            }
        ).catch(e => {
            if (e instanceof UnauthorizedError) {
                // Display an error or prompt the user to login again. After a successful call to `hanko.webauthn.login()`,
                // `hanko.password.login()` or `hanko.passcode.finalize()` a JWT will be issued and `hanko.user.getCurrent()`
                // would succeed.
                router.push('/login')
            }
        })

    }, [])

    return {currentUser, isLoading}
}