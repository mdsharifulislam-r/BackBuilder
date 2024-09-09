export async function getBooks(){
    try {
        const res = await fetch(`${process.env.BASE_URL}/book`,{
            next:{
                tags:["allbooks"]
            }
        })
        const data =await res.json()
        if(!data.isOk){
            return []
        }
        return data.data
    } catch (error) {
        console.log(error)
        return []        
    }
}