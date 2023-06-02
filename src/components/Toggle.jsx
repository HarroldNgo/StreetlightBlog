import '../css/toggle.css'

export default function Toggle({checked, onChange}) {
  return (
    <label className='toggle'>
        <input type="checkbox" checked={checked} onChange={onChange}/>
        <span className="slider"></span>
    </label>
  )
}
