import getSession from "./getSession";
export interface User {
    id: string;
    name: string;
    email: string;
}
const getUsers = async ():Promise<User[]> => {
    const session = await getSession();
    console.log(session);

    if(!session?.user?.email){
        console.log("error");
        return [];
    }
    try {
        const response = await fetch("http://localhost:8000/list", {
                    method: "GET",
                    headers: {
                    authorization: `Bearer ${session.user.accessToken}`,
                    }
                    })
                    if(!response.ok){
                        return []
                    }
        const jsonResponse = await response.json()
        console.log(jsonResponse);
        const data = jsonResponse.data as User[];
        console.log(data);
        return data;
    } catch (error: any) {
        console.log(error);
        return [];
    }
}

export default getUsers;