import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/common/NavBar";
import Signup from './pages/Signup';
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from './components/core/Dashboard/MyProfile'
import Error from "./components/common/Error";  
import Settings from "./components/core/Dashboard/settings/Main";
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import AddCourse from './components/core/Dashboard/addCourse/index'
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/editCourse";
import Catalog from "./pages/Catalog";
import Course from "./pages/Course";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import Cart from "./components/core/Dashboard/cart/Index";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from './components/core/ViewCourse/VideoDetails'
import Instructor from "./components/core/Dashboard/Instructor";


function App() {

  const {user}= useSelector((state)=>state.profile);

  return (
    <div className="bg-richblack-900 w-screen flex flex-col items-center">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='about' element={<About/>}></Route>
        <Route path='contact' element={<Contact/>}></Route>
        <Route path='catalog/:catalogName' element={<Catalog/>}></Route>
        <Route path='courses/:courseId' element={<Course/>}></Route>

        <Route path='signup' element={
          <OpenRoute>
            <Signup/>
          </OpenRoute>
        }></Route>

        <Route path='verify-email' element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
        }></Route>

        <Route path='login' element={
          <OpenRoute>
              <Login/>
          </OpenRoute>
        }></Route>

        <Route path='forgot-password' element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        }></Route>

        <Route path='reset-password/:id' element={
          <OpenRoute>
            <ResetPassword/>
          </OpenRoute>
        }></Route>

        <Route  
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
            <Route path="dashboard/my-profile" element={<MyProfile/>} />
            <Route path="dashboard/settings" element={<Settings />} />
            {
              user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                <Route path='dashboard/add-course' element={<AddCourse/>}/>
                <Route path='dashboard/my-courses' element={<MyCourses/>}/>
                <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}/>
                <Route path='dashboard/instructor' element={<Instructor/>}/>
                </>
              )
            }
            {
              user?.accountType===ACCOUNT_TYPE.STUDENT && (
                <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="dashboard/cart" element={<Cart/>}/>
                </>
              )
            }
        </Route>

        <Route element={

          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>

          {
            user?.accountType===ACCOUNT_TYPE.STUDENT&&
            (
              <>
                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
              </>
            )
          }

        </Route>

        <Route path="*" element={<Error/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
