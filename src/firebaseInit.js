/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 9/6/2021
 */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import FirebaseConfig from "./firebaseConfig"; // custom File | Use Your Own Firebase Configs

const FirebaseApp = firebase.initializeApp(FirebaseConfig);
export const FirebaseAuth = FirebaseApp.auth();
export const Firestore = firebase.firestore();
export default FirebaseApp;
