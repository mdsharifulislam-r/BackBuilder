"use server"
export async function getSingleBook(id:string){
try {
    const res = await fetch(`${process.env.BASE_URL}/book/${id}`,{
        next:{
            tags:["singleBook"]
        }
    })
    const data = await res.json()


    
    if(!data.isOk){
        return {}
    }
    return data.data
} catch (error) {
    console.log(error);
    return {}
}
}