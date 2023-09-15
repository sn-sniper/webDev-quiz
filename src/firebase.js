import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCNbsY3wz0J_DRFnEdpBFOgb_uXY7LcCqA",
    authDomain: "tfc-quiz.firebaseapp.com",
    projectId: "tfc-quiz",
    storageBucket: "tfc-quiz.appspot.com",
    messagingSenderId: "850699713740",
    appId: "1:850699713740:web:b65352b81658eef8869669",
    measurementId: "G-7QSHWVW170"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const saveScore = async (score, time, shortID) => {
    try {
        const scoresCollectionRef = collection(getFirestore(), "scores"); // Update this line
        await addDoc(scoresCollectionRef, { score, time, shortID });
        console.log("Score saved successfully.");
    } catch (error) {
        console.error("Error saving score: ", error);
    }
};


export { firestore, saveScore, collection, addDoc };    

