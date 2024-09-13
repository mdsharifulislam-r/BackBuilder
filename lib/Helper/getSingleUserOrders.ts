"use server"
export async function getSingleUserOrders(id:string) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/order/${id}`,{
            next:{
                tags:["singleOrder"]
            }
        })
        const data = await res.json()
        if(!data) return []
        return data?.data
    } catch (error) {
        return []
    }
    
}