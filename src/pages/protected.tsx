import { useCurrentUser } from "../utils/use-user";

const Page = () => {
    const {currentUser, isLoading} = useCurrentUser()

    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div>
        This page is protected
        <pre>
            {JSON.stringify(currentUser, null, "  ")}
        </pre>
    </div>
    )
}

export default Page