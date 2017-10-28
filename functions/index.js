/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/**
 * Triggers when a user gets a new follower and sends a notification.
 *
 * Followers add a flag to `/followers/{followedUid}/{followerUid}`.
 * Users save their device notification tokens to `/users/{followedUid}/notificationTokens/{notificationToken}`.
 */
exports.sendNotification = functions.database.ref('/messages/{roomName}/{message}/{uid}').onWrite(event => {
  const roomName = event.params.roomName;
  const message = event.params.message;
  const senderId = event.params.uid;
  // If un-follow we exit the function.
  if (!event.data.val()) {
    return console.log('event has not data.' + roomName + ' , ' + message);
  }
  console.log('new message roomName:', roomName, 'message:', message, 'senderId: ', senderId);


  var eventVal=event.data.val();
  var senderName = eventVal.name;
  var senderText = eventVal.text;
  var senderPhoto = eventVal.photourl;
  var splited = roomName.split('-!-');
  var targetId = '';
  if (splited[0] === senderId) {
    targetId = splited[1];
  } else {
    targetId = splited[0];
  }

  // Get the list of device notification tokens.
  const getDeviceTokensPromise = admin.database().ref(`/users/${targetId}/notifications`).once('value');
  // Get the follower profile.

  return Promise.all([getDeviceTokensPromise]).then(results => {
    const tokensSnapshot = results[0];
    // Check if there are any device tokens.
    if (!tokensSnapshot.hasChildren()) {
      return console.log('There are no notification tokens to send to.');
    }
    console.log('There are', tokensSnapshot.numChildren(), 'tokens to send notifications to.');
    // console.log('Fetched follower profile', follower);


    //이건 데이터니까
    // Notification details.
    const payload = {
      notification: {
        title: senderName,
        body: senderText,
        icon: senderPhoto,
        click_action:"https://youyou-2e8cf.firebaseapp.com/#/login"
      }
    };

    // Listing all tokens.
    // const tokens = Object.keys(tokensSnapshot.val());
    const tokens = Object.keys(tokensSnapshot.val());


    // Send notifications to all tokens.
    return admin.messaging().sendToDevice(tokens, payload).then(response => {
      // For each message check if there was an error.
      const tokensToRemove = [];
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Failure sending notification to', tokens[index], error);
          // Cleanup the tokens who are not registered anymore.
          if (error.code === 'messaging/invalid-registration-token' ||
            error.code === 'messaging/registration-token-not-registered') {
            tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
          }
        }
      });
      return Promise.all(tokensToRemove);
    });
  });
});