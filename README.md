## Description

The user of this react application should be able to view the video response(s) of job candidates applying for a job at their company. The application should have the following workflow:

1. Choose candidate from a list.
2. Depending on the selection in the first step, if the selected candidate has an application, display the video response(s) of the candidate with the relevant question displayed in text. If the selected candidate does not have an application, display appropriate message.
3. For each video response of a candidate, provide an option to enter comments.
4. Provide a "Save" button that saves the comments to the api.json file.


## Scripts
    -npm install
    -npm start: start the react app
    -npm run start-server : start the json server server

## Are there any improvements you could make to your submission?
- the first I would do is to create a component "video" because in the component "ApplicationDetails" there is a lot of code, and it could be simplified, but I didn't think about it till now.
- change the inputText to a textArea. 

## What would you do differently if you were allocated more time?

- I would do every thing that I describe before but also...
- add an array of comments in every video response
- add an option to delet comments
- Make a responsive css


