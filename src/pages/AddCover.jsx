import '../css/add.css'
import { useRef, useState } from 'react'
import axios from '../axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function AddPost() {
    const [title, setTitle] = useState("")
    const [file, setFile] = useState(null)
    const date = Date.now();
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();

    const queryClient = useQueryClient()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCover = {
            title,
        };
        if (file) {
            const data = new FormData();
            const filename = date + file.name;
            data.append("name", filename);
            data.append("file", file);
            data.append("cloud_name", "dmluqp41s");
            data.append("upload_preset","g7k415ao");
            data.append("public_id",filename);
            newCover.photo = filename;
            await axios.post("https://api.cloudinary.com/v1_1/dmluqp41s/image/upload", data).then((response)=>console.log(response));
        }
        try {
            const res = await axios.post("/api/covers", newCover);
            queryClient.clear()
            window.location.replace("/portfolio");

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
                    <button className="btn btn-big" type='submit'><h3>Publish</h3></button>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                </form>
            </div>
        </div>
    )
}
