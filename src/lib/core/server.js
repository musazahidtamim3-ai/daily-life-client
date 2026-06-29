const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://daily-life-server.vercel.app"

export const serverFetch = async (path) => {
     const res = await fetch(`${baseUrl}${path}`)
     return res.json()
}

export const serverMutation = async (path, data) => {
     const res = await fetch(`${baseUrl}${path}`, {
          method:'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     })
     return res.json()

}