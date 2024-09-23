export async function getSingleBlog(id:string) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/blog/${id}`)
        const data = await res.json()
        if(data?.isOk){
            return data?.data
        }
        return {}
    } catch (error) {
        return {}
    }
}