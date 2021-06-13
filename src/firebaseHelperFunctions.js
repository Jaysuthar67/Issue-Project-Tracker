/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 13/6/2021
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

export const createNewProject = (newProject_title, newProject_Desc, newProject_Users) => {
    let projectUUID = uuidv4();
    let users = newProject_Users;
    users.push(FirebaseAuth.currentUser.email);
    console.log(users)
    let newProject = {
        title: newProject_title,
        createdOn: firebase.firestore.FieldValue.serverTimestamp(),
        issues: {},
        users: users,
        owner: FirebaseAuth.currentUser.email,
        description: newProject_Desc,
    }
    console.log("Project UUID : ", projectUUID);
    console.log(newProject);
    // Firestore.collection('test_colloection').doc(projectUUID).set(newProject, {merge: true}).then(() => {
    //
    // }).catch((error) => {
    //     console.error("Error:", error);
    // });
}

export const deletePoject = (projectID) => {
    Firestore.collection('test_colloection').doc(projectID).delete().then(() => {

    }).catch((error) => {
        console.error("Error : ", error);
    });
}

export const addNewIssue = (projectId, issue_title, issue_desc, issue_priority) => {
    let issueUUID = uuidv4();
    let newIssue = {
        issues: {
            [issueUUID]: {
                issueCreatedOn: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: FirebaseAuth.currentUser.email,
                issue_lifecycle: "new",
                issue_description: issue_desc,
                issue_title: issue_title,
                issue_priority: issue_priority
            }
        }
    }
    Firestore.collection('test_colloection').doc(projectId).set(newIssue, {merge: true}).then(() => {
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}

export const updateIssue = (projectId, issueId, issue_title, issue_desc, issue_priority) => {
    let newIssue = {
        issues: {
            [issueId]: {
                issueCreatedOn: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: FirebaseAuth.currentUser.email,
                issue_lifecycle: "new",
                issue_description: issue_desc,
                issue_title: issue_title,
                issue_priority: issue_priority
            }
        }
    }
    Firestore.collection('test_colloection').doc(projectId).set(newIssue, {merge: true}).then(() => {
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}
