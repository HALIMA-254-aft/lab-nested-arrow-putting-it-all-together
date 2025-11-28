// createLoginTracker(userInfo)
//  
//  This function creates a secure login tracker using closures.
// It tracks login attempts and locks the account after too many failures.
// Create a valid userInfo object
const tracker= createLoginTracker( { 
  
 username: "Halima",
  password: "password123"
});

console.log(tracker("wrong"));        // Attempt 1: Login failed
console.log(tracker("nope"));         // Attempt 2: Login failed
console.log(tracker("bad"));          // Attempt 3: Login failed
console.log(tracker("password123"));  // Account locked
console.log(tracker("password123"));  // Still locked
console.log(tracker.attempCount);



// Error Handling for userInfo input
function createLoginTracker(userInfo){
  let attempCount = 0;
  let isLocked = false;

  // Inner Arrow Function
  // Handles each login attempt

  const loginAttempt = (passwordAttempt) => {

    // Debugging outputs

    console.log("DEBUG: received passwordAttempt:", passwordAttempt);
    console.log("DEBUG: current attempCount:", attempCount);
    console.log("DEBUG: isLocked:", isLocked);

    // If account is locked → block all attempts
    if (isLocked) {
      return "Account locked due to many attempts";
    }

    // Increase attempCount every time the function is called
    attempCount++;
    // expose the updated count on the returned function
    loginAttempt.attempCount = attempCount;
    console.log("DEBUG: Updated attempCount:", attempCount);

    // If attempCount is > 3 → lock the account
    if (attempCount > 3) {
      isLocked = true;
      console.log("DEBUG: Account is now isLocked.");
      return "Account locked due to too many failed login attempts";
    }

    // Check password match
    if (passwordAttempt === userInfo.password) {
      console.log("DEBUG: password matched - login successful.");
      return "Login successful";
    }

    // If incorrect password and still within 3 attempts
    console.log("DEBUG: Password Incorrect.");
    return `Attempt ${attempCount}: Login failed`;
  };

  // Return the nested function
  return loginAttempt;
}




module.exports = {
     ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};











