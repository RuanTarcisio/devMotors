export async function getDataHome(){
  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects/67ff1a83b4bd3d30c206872a?read_key=${process.env.READ_KEY}&depth=1&props=slug,title,metadata`, {next: {revalidate: 120}})

    if(!res.ok){
      throw new Error("Failed to fetch data")
    }

    return res.json();

  }catch(err){
    throw new Error("Failed to fetch data")
  }
}


export async function getSubMenu() {
  try{
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects?pretty=true&query=%7B%22type%22:%22pages%22%7D&limit=10&skip=0&read_key=${process.env.READ_KEY}&depth=1&props=slug,title`, {next: {revalidate: 120}})

       if(!res.ok){
        throw new Error("Failed to fetch data")
      }
  
      return res.json();

  }catch(err){
    throw new Error("Failed to fetch data")
  }
}


///objects?pretty=true&query=%7B%22type%22:%22pages%22%7D&limit=10&skip=0&read_key=N1MlGCxwaALPTsOB0J4fYegiOUMbeLVQBZrtNyi1hQU0Ms5QhZ&depth=1&props=slug,title,