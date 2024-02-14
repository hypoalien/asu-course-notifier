// Array containing information about students and the courses they wish to register for
const subjectToRegister = [
    {
      name: "Hrishikesh",
      subjectToRegister: [83368], // Course codes to register for
      seatLimit: [0], // Seat limits for each course (not currently used)
      email: "hanantul@gmail.com", // Email address of the student
    },
    {
      name: "Keshav",
      subjectToRegister: [97011],
      seatLimit: [0],
      email: "n.keshav99@gmail.com",
    },
    {
      name: "Teja",
      subjectToRegister: [95392, 88120],
      seatLimit: [0],
      email: "dapata@asu.edu",
    },
    {
      name: "Saketh",
      subjectToRegister: [86034, 91699],
      seatLimit: [0, 0],
      email: "svelidim@asu.edu",
    },
    {
      name: "siri",
      subjectToRegister: [92414, 92509, 91917],
      seatLimit: [0, 0, 0],
      email: "msirivaishnavi1999@gmail.com",
    },
  ];
  
  // Configuration object for email settings
  const emailConfig = {
    receivers: ["<foo@example.com>"], // Array of email addresses to receive notifications
  };
  
  // Exporting subjectToRegister array and emailConfig object for use in other modules
  module.exports = { subjectToRegister, emailConfig };
  