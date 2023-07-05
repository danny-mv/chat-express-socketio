import getSession from "./getSession";
export interface User {
    id: string;
    name: string;
    email: string;
}
const getUsers = async ():Promise<User[]> => {
    const session = await getSession();

    if(!session?.user?.email){
        return [];
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/list`, {
                    method: "GET",
                    headers: {
                    authorization: `Bearer ${session.user.accessToken}`,
                    }
                    })
                    if(!response.ok){
                        return []
                    }
        const jsonResponse = await response.json()
        const data = jsonResponse.data as User[];
        return data;
    } catch (error: any) {
        console.log(error);
        return [];
    }
}

export default getUsers;