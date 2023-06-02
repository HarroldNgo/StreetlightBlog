import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import loadable from '@loadable/component'

//Components

//Pages
import Home from './pages/Home'
import About from './pages/About'
import Categories from './pages/Categories'
//import Missing from './pages/Missing'
import SinglePost from './pages/SinglePost'
import SingleCategory from './pages/SingleCategory'

//Admin
//import Admin from './pages/Admin'
//import Login from './pages/Login'
//import AddPost from './pages/AddPost'
//import EditPost from './pages/EditPost'

//Layouts
import RootLayout from './layouts/RootLayout'
//import AdminLayout from './layouts/AdminLayout'
import RequireAuth from './components/RequireAuth'

//
import { AuthProvider } from "./context/AuthProvider"

//lazyload
const Admin = loadable(()=> import('./pages/Admin'))
const Login = loadable(()=> import('./pages/Login'))
const AddPost = loadable(()=> import('./pages/AddPost'))
const EditPost = loadable(()=> import('./pages/EditPost'))
const AdminLayout = loadable(()=> import('./layouts/AdminLayout'))
const Missing = loadable(()=> import('./pages/Missing'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="loginadmin" element={<Login />} />
      <Route path='about' element={<About />} />
      <Route path='categories' element={<Categories />} />
      <Route path='categories/People' element={<SingleCategory />} />
      <Route path='categories/Stories' element={<SingleCategory />} />
      <Route path='categories/Movies' element={<SingleCategory />} />
      <Route path="post/:postId" element={<SinglePost />} />

      <Route path='admin' element={<AdminLayout />}>
        <Route index element={<Admin />} />
        <Route path="add" element={<AddPost />} />
        <Route path="edit/:postId" element={<EditPost />} />

      </Route>

      <Route path='*' element={<Missing />} />
    </Route>

  )
)

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  )
}

export default App
