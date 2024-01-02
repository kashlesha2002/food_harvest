import React, { useState } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../../firebase-config';
import { userDataService } from '../../services/service';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'


  const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [role, setRole] = useState('');
    const [profileImage, setProfileImage] = useState(null); // New state for profile image
    const navigate = useNavigate();
    const storage = getStorage(firebase);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            if (userCredential && userCredential.user) {
                const user = userCredential.user;

                // Send verification email
                await user.sendEmailVerification();

                const { uid } = user;
                
                // Upload profile image if selected
                let profileImageUrl = ''; 
                if (profileImage) {
                    const storageRef = ref(storage, `profile_images/${uid}/${profileImage.name}`);
                    await uploadBytes(storageRef, profileImage);
                    const url = await getDownloadURL(storageRef);
                    profileImageUrl = url;
                }

                const datatofirestore = await userDataService.addUser({
                    uid,
                    name,
                    email,
                    role,
                    profileImageUrl // Save the profile image URL in the database
                });
                console.log(datatofirestore);
                alert("Account Created Successfully. Please check your email for verification.");
                navigate('/login');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <div className='main_container_signup'>
                <div className='header'>
                    <h2>Signup</h2>
                </div>

        <div className='box'>
            <input type='text' value={name} placeholder='Username' onChange={(e)=> setName(e.target.value)}></input>
        </div>
        <div className='box'>
            <input type='email' value={email} placeholder='E-mail' onChange={(e)=> setEmail(e.target.value)} ></input>
        </div>
        <div className='box'>
            <input type='password' value={password} placeholder='Password' onChange={(e)=> setPass(e.target.value)} ></input>
        </div>
        <div className='box'>
            <select required value={role} onChange={(e)=> setRole(e.target.value)}>
                <option value="select"  >---Select Role---</option>
                <option value="hotel">Hotel</option>
                <option value="farmer">Farmer</option>
                <option value="ngo">NGO</option>
                <option value="composter">Composter</option>
            </select>
        </div>
        <div className='box'>
                    <input type='file' accept='image/*' onChange={handleFileChange} />
                </div>
        <p>Already Have an account <Link to="/login"> Login Now</Link></p>
        <button onClick={submit}>Signup</button>
    </div>
    </>
  )
}

export default Signup