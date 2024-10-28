import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";
import { useState } from "react";

// check docs
// getting image
const upload = async(file) => { // assessing database on firebase
  const date = new Date();
  const storageRef = ref(storage, `images/${date + file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  const [uploadImage, setUploadImage] = useState(null)


  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      alert('Image is ' + progress + '% completed')
      setUploadImage(progress)
      console.log("upload is " + progress + "% done");
    },
    (error) => {
      reject("Something went wrong!" + error.code);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
        resolve(getDownloadURL);
      });
    }
  )})
}

export default upload;