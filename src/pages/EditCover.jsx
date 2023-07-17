import '../css/edit.css'
import { useLocation } from "react-router";
import axios from "../axios"
import * as api from "../Api"
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import slugify from 'slugify'


export default function EditPost() {
  const [title, setTitle] = useState("")
  const [file, setFile] = useState(null)
  const date = Date.now();
  const location = useLocation();
  const path = location.pathname.split("/")[4];
  const [cover, setCover] = useState({});

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery(['cover', path], () => api.getCover(path), {
    onSuccess: (data) => {
      setCover(data[0]);
      setTitle(data[0].title)
    }
  })
  if (isLoading) {
    return ""
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedCover = {
      title,
    };
    if (file) {
      const data = new FormData();
      const filename = date + file.name;
      data.append("name", filename);
      data.append("file", file);
      data.append("cloud_name", "dmluqp41s");
      data.append("upload_preset", "g7k415ao");
      data.append("public_id", filename);
      updatedCover.photo = filename
      await axios.post("https://api.cloudinary.com/v1_1/dmluqp41s/image/upload", data).then((response) => console.log(response));
    }
    try {
      await axios.put("/api/covers/" + cover._id, updatedCover)
      queryClient.clear()
      window.location.replace("/portfolio");
    } catch (err) {
    }
  }
  return (
    <div className="adminpage">
      <div className="admin-content">
        {file && (
          <img
            className='writeImage'
            src={URL.createObjectURL(file)}
            alt='' />
        )}
        <form className="writeForm" onSubmit={handleUpdate}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput"></label>
            <h3>Image:</h3>
            <input
              type="file"
              id="fileInput"
              onChange={e => setFile(e.target.files[0])} />
          </div>
          <div className="writeFormGroup">
            <h3>Title:</h3>
            <input
              type="text"
              placeholder="Title"
              className='writeInput titlewriteinput'
              autoFocus={true}
              value={title}
              onChange={e => setTitle(e.target.value)} />
          </div>
          <button className="btn btn-big" type='submit'><h3>Update</h3></button>
        </form>
      </div>
    </div>
  )
}
