import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// Layout (Header/Footer)
import Main from "./layouts/Main";
import { Artists } from "./pages/Artists/Artists.jsx";
import Home from './pages/Home/Home'
import Concerts from "./pages/Concerts/Concerts";
import Cart from "./pages/Cart/Cart";
import ArtistDetail from "./pages/ArtistDetail/ArtistDetail";
import NewArtist from "./pages/NewArtist/NewArtist";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./components/SignIn/Form/FormSI";
import userActions from "./redux/actions/userActions";
import cartActions from "./redux/actions/cartActions";
import Concert from "./pages/Concert/Concert"
import AdminLayout from "./layouts/Admin/AdminLayout/AdminLayout";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminConcerts from "./pages/AdminConcerts/AdminConcerts";
import AdminArtists from "./pages/AdminArtists/AdminArtists";
import AdminVenues from "./pages/AdminVenues/AdminVenues";
import NewConcert from "./pages/NewConcert/NewConcert";
import { ProtectedRoute } from "./utils/ProtectedRoute/ProtectedRoute";
import EditConcert from "./pages/EditConcert/EditConcert";
import NewVenue from "./pages/NewVenue/NewVenue";
import EditVenue from "./pages/EditVenue/EditVenue";
import EditArtist from "./pages/EditArtist/EditArtist";
import ProcessPayment from "./pages/ProcessPayment/ProcessPayment";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/MyProfile/MyProfile";
import Chat from "./pages/Chat/Chat";
import WorkWithUs from "./pages/WorkWithUs/WorkWithUs";

export default function App() {
  const dispatch = useDispatch()
  const { reLogin } = userActions
  const { getCart } = cartActions
  const {online, role} = useSelector(state => state.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    isLoading()
      // eslint-disable-next-line
  }, [])  

let isLoading = async() => {
  const token = JSON.parse(localStorage.getItem("token"))
      if (token) {
          let res = await dispatch(reLogin(token.token.user)).unwrap()
          if(res.success) {
            let headers = { headers: { Authorization: `Bearer ${res.response.token}` } };
              await dispatch(getCart({ headers })).unwrap();
          }
      }
      setLoading(false)
}

  return (
      
    !loading && 
    <Routes>    
        <Route element={<ProtectedRoute isAllowed={!!online && role === 'admin'} reDirect={'/'}/> }>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<AdminHome />}/>
              <Route path="concerts" element={<AdminConcerts />}/>
              <Route path="concerts/new" element={<NewConcert />}/>
              <Route path="concerts/edit/:id" element={<EditConcert />}/>
              <Route path="artists" element={<AdminArtists />}/>
              <Route path="artists/new" element={<NewArtist/>}/>
              <Route path="artists/edit/:id" element={<EditArtist/>}/>
              <Route path="venues" element={<AdminVenues />}/>
              <Route path="venues/new" element={<NewVenue />}/>
              <Route path="venues/edit/:id" element={<EditVenue />}/>
            </Route>  
        </Route>
        <Route path="/" element={<Main />} >
        <Route path="*" element={<NotFound/>} />
          <Route index element={<Home/>}/>
          <Route path="concerts" element={<Concerts />} />
          <Route path="about-us" element={<WorkWithUs />} />
          <Route element={<ProtectedRoute isAllowed={!!online} reDirect={'/'}/> }>
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile/>} />
            <Route path="succes-payment" element={<ProcessPayment />}/>
          </Route>
          <Route path="artists" element={<Artists/>}/>
          <Route path="artists/:id" element={<ArtistDetail/>}/>
          <Route path="chat" element={<Chat />} />
          <Route element={<ProtectedRoute isAllowed={!online} reDirect={'/'}/> }>
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
          <Route path="concerts/:id" element={<Concert />} />
        </Route>
      </Routes>
  );
}