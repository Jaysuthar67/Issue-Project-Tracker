/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 12/6/2021
 */

import {Firestore} from "./firebaseInit";
import firebase from "firebase/app"

export const updateIssueLifecycle = (projectID, issueID, lifecycle) => {
    let newObject = {
        issues: {
            [issueID]: {
                issue_lifecycle: lifecycle
            }
        }
    }
    Firestore.collection('test_colloection').doc(projectID).set(newObject,{ merge: true }).then(() => {
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });

}

export const deleteIssueHandler = (projectID, issueID)=>{
    let newObject = {
        issues: {
            [issueID]:firebase.firestore.FieldValue.delete()
        }
    }
    Firestore.collection('test_colloection').doc(projectID).set(newObject,{ merge: true }).then(() => {
        console.log("Deleted Issue");
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
    console.log(newObject)
}
