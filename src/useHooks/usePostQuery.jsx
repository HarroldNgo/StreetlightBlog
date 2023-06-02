import React, { useEffect } from 'react'

export default function usePostQuery({ posts }) {
    if(posts){
        const queries = posts.map((post) => ({
            queryKey: ['postsF', post._id],
            queryFn: () => api.getPost(post._id),
          }))
          useQueries(queries)
    }
}
