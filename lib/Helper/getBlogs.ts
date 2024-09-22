
export async function getBlogs(){
  const res = await fetch(`${process.env.BASE_URL}/blog`,{
    next:{
        tags:["blogs"]
    }
  })
  const data = await res.json()
  if(data?.isOk){
    return data?.data
  }
  else{
    return []
  }
}