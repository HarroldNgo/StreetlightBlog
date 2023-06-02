import "../css/admin.css"
import { useEffect, useState } from "react"
import Toggle from '../components/Toggle'
import { Link } from 'react-router-dom'
import * as api from "../Api"
import axios from "../axios"
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function Admin() {
  const PF = "https://res.cloudinary.com/dmluqp41s/image/upload/"
  const queryClient = useQueryClient()

  const postsQuery = () => ({
    queryKey: ['postF'],
    queryFn: api.getPosts,
  })
  const { data: posts, isLoading, isError } = useQuery(postsQuery())

  const handleDelete = async (post) => {
    try {
      await axios.delete("/api/posts/" + post._id)
      queryClient.clear()
      window.location.reload();
    } catch (err) {console.log("del error")}
  }

  if (isLoading) {
    return ''
  }
  if (isError) {
    return ''
  }

  return (
    <div className="adminpage">
      <div className="button-group">
        <Link to="/admin/add" className="btn btn-big">Add Post</Link>
      </div>
      <div className="content">
        <h2 className="page-title">Manage Posts</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Coming Soon</th>
              <th colSpan="3">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><img className='table-image' alt='' src={PF + p.photo+".png"}/></td>
                <td><Link to={`/post/${p._id}`}>{p.title}</Link></td>
                <td>{p.categories}</td>
                <td><label className='toggle'>
                <Toggle checked={p.frontpage} onChange={()=>{}}/>
                </label></td>
                <td><label className='toggle'>
                <Toggle checked={p.comingsoon} onChange={()=>{}}/>
                </label></td>
                <td><Link className='edit' to={`/admin/edit/${p._id}`}>Edit</Link></td>
                <td><button className="delete" onClick={async () => {
                  handleDelete(p)
                }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
