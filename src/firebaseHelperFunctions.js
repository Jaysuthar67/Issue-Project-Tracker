/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 12/6/2021
 */

import {FirebaseAuth, Firestore} from "./firebaseInit";
import firebase from "firebase/app";
import {v4 as uuidv4} from 'uuid';

export const updateIssueLifecycle = (projectID, issueID, lifecycle) => {
    let newObject = {
        issues: {
            [issueID]: {
                issue_lifecycle: lifecycle
            }
        }
    }
    Firestore.collection('test_colloection').doc(projectID).set(newObject, {merge: true}).then(() => {

    }).catch((error) => {
        console.error("Error writing document: ", error);
    });

}

export const deleteIssueHandler = (projectID, issueID) => {
    let newObject = {
        issues: {
            [issueID]: firebase.firestore.FieldValue.delete()
        }
    }
    Firestore.collection('test_colloection').doc(projectID).set(newObject, {merge: true}).then(() => {
    }).catch((error) => {
        console.error("Error:", error);
    });
}

export const createNewProject = () => {
    let projectUUID = uuidv4();
    let users = []
    users.push(FirebaseAuth.currentUser.email);
    let newProject = {
        title: `Project Title ${Math.floor(Math.random() * 100)}`,
        createdOn: firebase.firestore.FieldValue.serverTimestamp(),
        issues: {},
        users: users,
        owner: FirebaseAuth.currentUser.email,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
    Firestore.collection('test_colloection').doc(projectUUID).set(newProject, {merge: true}).then(() => {

    }).catch((error) => {
        console.error("Error:", error);
    });
}

export const deletePoject = (projectID) => {
    Firestore.collection('test_colloection').doc(projectID).delete().then(() => {

    }).catch((error) => {
        console.error("Error : ", error);
    });
}

export const addNewRandomIssue = (projectID) => {
    let issueUUID = uuidv4();
    let newIssue = {
        issues: {
            [issueUUID]: {
                issueCreatedOn: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: FirebaseAuth.currentUser.email,
                issue_lifecycle: "new",
                issue_description: "Some Description",
                issue_title: "Issue Title",
                issue_priority: "high"
            }

        }
    }
    Firestore.collection('test_colloection').doc(projectID).set(newIssue, {merge: true}).then(() => {
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}
