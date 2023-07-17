import '../css/edit.css'
import Toggle from '../components/Toggle'
import DropDown from '../components/DropDown'
import { useLocation } from "react-router";
import axios from "../axios"
import * as api from "../Api"
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import slugify from 'slugify'


export default function EditPost() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [metadesc, setMetaDesc] = useState("")
  const [videolink, setVideo] = useState("")
  const [body, setBody] = useState("")
  const [file, setFile] = useState(null)
  const [frontpage, setFrontPage] = useState(false);
  const [categories, setCategories] = useState("")
  const date = Date.now();
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [post, setPost] = useState({});
  const [comingsoon, setComingSoon] = useState(false);

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery(['post', path], () => api.getPostByTitleSlug(path), {
    onSuccess: (data) => {
      setPost(data[0]);
      setTitle(data[0].title)
      setMetaDesc(data[0].metadesc)
      setDesc(data[0].desc)
      setVideo(data[0].videolink)
      setBody(data[0].body)
      setFrontPage(data[0].frontpage)
      setCategories(data[0].categories)
      setComingSoon(data[0].comingsoon)
    }
  })
  if (isLoading) {
    return ""
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedPost = {
      title,
      metadesc,
      desc,
      body,
      frontpage,
      comingsoon,
      categories,
      videolink,
    };
    if (file) {
      const data = new FormData();
      const filename = date + file.name;
      data.append("name", filename);
      data.append("file", file);
      data.append("cloud_name", "dmluqp41s");
      data.append("upload_preset", "g7k415ao");
      data.append("public_id", filename);
      updatedPost.photo = filename
      await axios.post("https://api.cloudinary.com/v1_1/dmluqp41s/image/upload", data).then((response) => console.log(response));
    }
    try {
      await axios.put("/api/posts/" + post._id, updatedPost)
      queryClient.clear()
      window.location.replace("/post/" + slugify(updatedPost.title, {remove: /[*+~.,;()'"!:@]/g, lower: true}));
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
          <div className="writeFormGroup">
            <h3>Image Caption:</h3>
            <textarea
              placeholder='Write stuffs'
              type='text'
              className='writeInput captionwriteinput'
              defaultValue={data[0].desc}
              onChange={e => setDesc(e.target.value)}></textarea>
          </div>
          <div className="writeFormGroup">
            <h3>Embedded Video Link:</h3>
            <input
              type="text"
              placeholder="VideoLink"
              className='writeInput titlewriteinput'
              autoFocus={true}
              value={videolink}
              onChange={(e => setVideo(e.target.value))} />
          </div>
          <div className="writeFormGroup">
            <h3>Body:</h3>
            <textarea
              placeholder='Write stuffs'
              type='text'
              className='writeInput writeText'
              defaultValue={post.body}
              onChange={e => setBody(e.target.value)}></textarea>
          </div>
          <div className="writeFormGroup">
            <h3>Meta Description:</h3>
            <textarea
              placeholder='Write stuffs'
              type='text'
              className='writeInput captionwriteinput'
              defaultValue={data[0].metadesc}
              onChange={e => setMetaDesc(e.target.value)}></textarea>
          </div>
          <div className="writeFormGroup">
            <h3>Category:</h3>
            <DropDown selected={categories} setSelected={setCategories} />
          </div>
          <div className="writeFormGroup">
            <h3>Featured:</h3>
            <label className='toggle'>
              <input type="checkbox" checked={frontpage} onChange={() => setFrontPage(!frontpage)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="writeFormGroup">
            <h3>Coming Soon:</h3>
            <label className='toggle'>
              <input type="checkbox" checked={comingsoon} onChange={()=>setComingSoon(!comingsoon)} />
              <span className="slider"></span>
            </label>
          </div>
          <button className="btn btn-big" type='submit'><h3>Update</h3></button>
        </form>
      </div>
    </div>
  )
}
