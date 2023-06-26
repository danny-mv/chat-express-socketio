import getSession from "./getSession";
interface User {
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
        const response = await fetch("http://localhost:8000/list", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(session.user.email),
                    })
        const {data} = await response.json()
        console.log(data);
        return data;
    } catch (error: any) {
        return []
    }
}

export default getUsers;