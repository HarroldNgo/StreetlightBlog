import axios from 'axios';

const api = axios.create({
    //baseURL: 'https://api-dot-streetlight-378404.uk.r.appspot.com'
    baseURL: 'https://streetlight-api.onrender.com'
    //baseURL: 'http://localhost:5000'
})
//COVERS/PORTFOLIO
export const getCovers = async () => await api.get('/api/covers').then(res => res.data)

export const getCover = async (id) => {
    const  { data } = await api.get(`/api/covers?id=${id}`)
    return data
}


//POSTS
export const getPosts = async () => await api.get('/api/posts').then(res => res.data)

export const getPostsFeatured = async () => await api.get('/api/posts?frontpage=true').then(res => res.data)

export const getPost = async (id) => {
    const  { data } = await api.get(`/api/posts?id=${id}`)
    return data
}
export const getPostByTitleSlug = async (titleslug) => {
    const  { data } = await api.get(`/api/posts?slug=${titleslug}`)
    return data
}

export const updatePost = (id, ...updatedPost) =>  api.put(`/api/posts/${id}`, updatedPost).then((res) => res.data)

export const getPostCat = async (cat) => await api.get(`/api/posts?cat=${cat}`).then((res) => res.data)