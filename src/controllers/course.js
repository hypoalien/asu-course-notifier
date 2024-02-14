// Import required modules
const axios = require("axios");
const sendmail = require("./email");
const { subjectToRegister } = require("../config/config");

// Function to check course availability
function checkCourse(data) {
  let url, courseCode;

  // Iterate over each data entry
  for (let x in data) {
    // Iterate over each subject to register for the current data entry
    for (let y in data[x].subjectToRegister) {
      // Get the course code to check availability
      courseCode = data[x].subjectToRegister[y];

      // Construct the URL to query the ASU course catalog API
      url = `https://eadvs-cscc-catalog-api.apps.asu.edu/catalog-microservices/api/v1/search/classes?&refine=Y&campusOrOnlineSelection=A&honors=F&keywords=${courseCode}&promod=F&searchType=all&term=2237`;

      // Send GET request to the ASU API to retrieve course information
      axios
        .get(url, {
          // Configure request headers
          headers: {
            accept: "*/*",
            "accept-language": "en-IN,en;q=0.9",
            authorization: "Bearer null",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
          },
          // Configure other request options
          referrer: "https://catalog.apps.asu.edu/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "include",
        })
        // Handle successful response
        .then((response) => {
          // Extract seat information from the response
          let seatInfo = response.data.classes[0].seatInfo;
          let subjectNumber = response.data.classes[0].SUBJECTNUMBER;
          let subjectTitle = response.data.classes[0].CLAS.TITLEFORSORTING;
          let reservedSeatInfoArray =
            response.data.classes[0].reservedSeatsInfo;
          let reservedSeatsInfo = 0;

          // Calculate total reserved seats for the course
          for (let i in reservedSeatInfoArray) {
            reservedSeatsInfo +=
              reservedSeatInfoArray[i].ENRL_CAP -
              reservedSeatInfoArray[i].ENRL_TOT;
          }

          // Calculate available seats for the course
          let seatsLeft =
            seatInfo.ENRL_CAP - seatInfo.ENRL_TOT - reservedSeatsInfo;

          // Log course availability information
          console.log(
            `[${new Date()}] : [name: ${
              data[x].name
            }] subject: [${subjectNumber}] seats available: ${seatsLeft} reserved seats: ${reservedSeatsInfo}`
          );

          // If seats are available, prepare email data and send notification
          if (seatsLeft > 0) {
            var emaildata = {
              seatInfo: seatInfo,
              subjectNumber: subjectNumber,
              subjectTitle: subjectTitle,
              seatsLeft: seatsLeft,
              name: data[x].name,
              email: data[x].email,
              url: `https://catalog.apps.asu.edu/catalog/classes/classlist?campusOrOnlineSelection=A&honors=F&keywords=${data[x].subjectToRegister[y]}&promod=F&searchType=all&term=2237`,
            };
            sendmail(emaildata);
          }
        })
        // Handle errors
        .catch((err) => console.log(err));
    }
  }
}

module.exports = checkCourse