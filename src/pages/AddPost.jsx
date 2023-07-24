import '../css/add.css'
import Toggle from '../components/Toggle'
import DropDown from '../components/DropDown'
import { useRef, useState } from 'react'
import axios from '../axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function AddPost() {
    const [title, setTitle] = useState("")
    const [metadesc, setMetaDesc] = useState("")
    const [desc, setDesc] = useState("")
    const [videolink, setVideoLink] = useState("")
    const [body, setBody] = useState("")
    const [file, setFile] = useState(null)
    const [frontpage, setFrontPage] = useState(false);
    const [comingsoon, setComingSoon] = useState(false);
    const [categories, setCategories] = useState("")
    const date = Date.now();
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();

    const queryClient = useQueryClient()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
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
            data.append("upload_preset","g7k415ao");
            data.append("public_id",filename);
            newPost.photo = filename;
            await axios.post("https://api.cloudinary.com/v1_1/dmluqp41s/image/upload", data).then((response)=>console.log(response));
        }
        try {
            const res = await axios.post("/api/posts", newPost);
            queryClient.clear()
            window.location.replace("/post/" + res.data.slug);

        } catch (err) {
            setErrMsg("failed to make post (use unique title)");
            console.log(err.response.data)
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
                <form className="writeForm" onSubmit={handleSubmit}>
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
                            onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="writeFormGroup">
                        <h3>Image Caption:</h3>
                        <textarea
                            placeholder='Write stuffs'
                            type='text'
                            className='writeInput captionwriteinput'
                            onChange={e => setDesc(e.target.value)}></textarea>
                    </div>
                    <div className="writeFormGroup">
                        <h3>Video Link:</h3>
                        <input
                            type="text"
                            placeholder="VideoLink"
                            className='writeInput titlewriteinput'
                            autoFocus={true}
                            onChange={e => setVideoLink(e.target.value)} />
                    </div>
                    <div className="writeFormGroup">
                        <h3>Body:</h3>
                        <textarea
                            placeholder='Write stuffs'
                            type='text'
                            className='writeInput writeText'
                            onChange={e => setBody(e.target.value)}></textarea>
                    </div>
                    <div className="writeFormGroup">
                        <h3>Meta Description:</h3>
                        <textarea
                            placeholder='Write stuffs'
                            type='text'
                            className='writeInput captionwriteinput'
                            onChange={e => setMetaDesc(e.target.value)}></textarea>
                    </div>
                    <div className="writeFormGroup">
                        <h3>Category:</h3>
                        <DropDown selected={categories} setSelected={setCategories} />
                    </div>
                    <div className="writeFormGroup">
                        <h3>Featured:</h3>
                        <Toggle isToggled={frontpage} onToggle={() => setFrontPage(!frontpage)} />
                    </div>
                    <div className="writeFormGroup">
                        <h3>Coming Soon:</h3>
                        <Toggle isToggled={comingsoon} onToggle={() => setComingSoon(!comingsoon)} />
                    </div>
                    <button className="btn btn-big" type='submit'><h3>Publish</h3></button>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                </form>
            </div>
        </div>
    )
}
