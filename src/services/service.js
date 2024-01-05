import app from "../firebase-config";
import { getFirestore, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";


const db = getFirestore(app);
const hotelCollectionRef = collection(db, "hotels");
const userCollectionRef = collection(db, "users");
const composeCollectionRef = collection(db, "composters");

class HotelDataService {

  addHotels = (newHotel) => {
    return addDoc(hotelCollectionRef, newHotel);
  };

  updateHotel = (id, updatedHotel) => {
    const hotelDoc = doc(db, "hotels", id);
    return updateDoc(hotelDoc, updatedHotel);
  };
   
  deleteHotel = (id) => {
    const hotelDoc = doc(db, "hotels", id);
    return deleteDoc(hotelDoc);
  };

  getAllHotels = () => {
    return getDocs(hotelCollectionRef);
  };

  getHotel = (id) => {
    const hotelDoc = doc(db, "hotels", id);
    return getDoc(hotelDoc);
  };
}

class UserDataService {

  addUser = (newUser) => {
    return addDoc(userCollectionRef, newUser);
  };

  updateUser = (id, updatedUser) => {
    const userDoc = doc(db, "users", id);
    return updateDoc(userDoc, updatedUser);
  };

  deleteUser = (id) => {
    const userDoc = doc(db, "users", id);
    return deleteDoc(userDoc);
  };

  getAllUsers = () => {
    return getDocs(userCollectionRef);
  };

  getUser = (id) => {
    const userDoc = doc(db, "users", id);
    return getDoc(userDoc);
  };

  getUserByUID = (uid) => {
    const q = query(userCollectionRef, where('uid', '==', uid));
    return getDocs(q);
  };
}

class ComposterDataService {
   
  addComposter = (newComposter) => {
    return addDoc(composeCollectionRef, newComposter);
  }

  updateComposter = (id, updatedComposter) => {
    const composterDoc = doc(db, "composters", id);
    return updateDoc(composterDoc, updatedComposter);
  }

  deleteComposter = (id) => {
    const composterDoc = doc(db, "composters", id);
    return deleteDoc(composterDoc);
  }

  getAllComposters = () => {
    return getDocs(composeCollectionRef);
  }

  getComposter = (id) => {

    const composterDoc = doc(db, "composters", id);
    return getDoc(composterDoc);
  }

}

const hotelDataService = new HotelDataService();
const userDataService = new UserDataService();
const composterDataService = new ComposterDataService();

export { hotelDataService, userDataService, composterDataService };