import "../css/admin.css"
import { useEffect, useState } from "react"
import Toggle from '../components/Toggle'
import { Link } from 'react-router-dom'
import * as api from "../Api"
import axios from "../axios"
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function AdminPortfolio() {
  const PF = "https://res.cloudinary.com/dmluqp41s/image/upload/"
  const queryClient = useQueryClient()

  const coversQuery = () => ({
    queryKey: ['covers'],
    queryFn: api.getCovers,
  })
  const { data: covers, isLoading, isError } = useQuery(coversQuery())

  const handleDelete = async (cover) => {
    try {
      await axios.delete("/api/covers/" + cover._id)
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
        <Link to="/admin/portfolio/add" className="btn btn-big">Add Cover</Link>
      </div>
      <div className="content">
        <h2 className="page-title">Manage Portfolio</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Caption</th>
              <th colSpan="3">Action</th>
            </tr>
          </thead>
          <tbody>
            {covers.map((p, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><img className='table-image' alt='' src={PF + p.photo+".png"}/></td>
                <td><Link to={`/post/${p._id}`}>{p.title}</Link></td>
                <td><Link className='edit' to={`/admin/portfolio/edit/${p._id}`}>Edit</Link></td>
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
