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
        console.log()
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
        console.log("Deleted Issue");
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}



export const addNewRandomIssue = (projectID) => {
    let issueUUID = uuidv4();
    let newObject = {
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
    Firestore.collection('test_colloection').doc(projectID).set(newObject, {merge: true}).then(() => {
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}
