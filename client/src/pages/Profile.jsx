import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../lib/firebase";
import { store } from '../lib/store';
import Container from "../ui/Container";
import UserInfo from "../ui/UserInfo";
import Registration from "../ui/Registration";
import Loading from "../ui/Loading";

const Profile = () => {
  
  const { currentUser, getUserInfo, isLoading} = store()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      getUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [getUserInfo]);
  console.log(currentUser);
  

  return (
    <Container>
      {currentUser ? <UserInfo currentUser={currentUser} /> : <Registration />}

      {isLoading && <Loading />}
    </Container>  )
}

export default Profile