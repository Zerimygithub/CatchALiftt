/* ==========================================================
   CatchALiftt
   Session Manager
   Version : 1.0
   Purpose : Authentication & Navigation Controller
========================================================== */

const Session = {
  /* ==========================
   Create New Session
========================== */

  create(sessionData) {
    if (!sessionData) {
      console.error("Session data is missing.");

      return;
    }

    Storage.saveSession(sessionData);
  },

  /* ==========================
       Login Successful
    ========================== */

  login() {
    Storage.setLoginStatus(true);

    Storage.setLoginTime();
  },

  /* ==========================
       Logout
    ========================== */

  logout() {
    Storage.clearSession();

    window.location.href = "../index.html";
  },

  /* ==========================
       Current Session
    ========================== */

  current() {
    return Storage.getSession();
  },

  /* ==========================
       Is Logged In
    ========================== */

  isLoggedIn() {
    return Storage.isLoggedIn();
  },

  /* ==========================
       Is New User
    ========================== */

  isNewUser() {
    const session = Storage.getSession();

    if (!session) return true;

    return session.userType === "new";
  },

  /* ==========================
       Mark Existing User
    ========================== */

  makeExistingUser() {
    Storage.updateSession({
      userType: "existing",
    });
  },

  /* ==========================
       Complete Profile
    ========================== */

  completeProfile() {
    Storage.setProfileStatus(true);
  },

  /* ==========================
       Switch Role
    ========================== */

  switchRole(role) {
    Storage.updateSession({
      currentRole: role,

      lastUsedRole: role,
    });
  },

  /* ==========================
       Get Current Role
    ========================== */

  getRole() {
    return Storage.getRole();
  },

  /* ==========================
       Redirect User
    ========================== */

  redirectAfterLogin() {
    const session = Storage.getSession();

    if (!session) {
      window.location.href = "../index.html";

      return;
    }

    if (session.userType === "new") {
      window.location.href = "profile-setup.html";

      return;
    }

    if (session.lastUsedRole === "traveller") {
      window.location.href = "traveller-booking.html";

      return;
    }

    if (session.lastUsedRole === "host") {
      window.location.href = "host-booking.html";

      return;
    }

    window.location.href = "../index.html";
  },
};

/* ==========================================================
   End of File
========================================================== */
