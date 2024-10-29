import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";


// check docs
// getting image
const upload = async(file, onProgress) => { // assessing database on firebase
  const date = new Date();
  const storageRef = ref(storage, `images/${date + file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);


  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is " + progress + "% done");
      onProgress(progress)  // a call back function to that collects the progress data
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