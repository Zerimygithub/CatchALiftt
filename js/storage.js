/* ==========================================================
   CatchALiftt
   Storage Manager
   Version : 1.0
   Purpose : Centralized Local Storage Management
========================================================== */

const STORAGE_KEY = "catchaliftt_session";

const Storage = {
  /* ==========================
       Save Complete Session
    ========================== */

  saveSession(sessionData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
  },

  /* ==========================
       Get Session
    ========================== */

  getSession() {
    const session = localStorage.getItem(STORAGE_KEY);

    return session ? JSON.parse(session) : null;
  },

  /* ==========================
       Update Session
    ========================== */

  updateSession(updatedData) {
    const currentSession = this.getSession() || {};

    const newSession = {
      ...currentSession,

      ...updatedData,
    };

    this.saveSession(newSession);
  },

  /* ==========================
       Clear Session
    ========================== */

  clearSession() {
    localStorage.removeItem(STORAGE_KEY);
  },

  /* ==========================
       Check Login Status
    ========================== */

  isLoggedIn() {
    const session = this.getSession();

    return session?.isLoggedIn === true;
  },

  /* ==========================
       Save Selected Role
    ========================== */

  saveRole(role) {
    this.updateSession({
      currentRole: role,
    });
  },

  /* ==========================
       Get Selected Role
    ========================== */

  getRole() {
    const session = this.getSession();

    return session?.currentRole || null;
  },

  /* ==========================
       Save Phone Number
    ========================== */

  savePhone(phoneNumber) {
    this.updateSession({
      phoneNumber: phoneNumber,
    });
  },

  /* ==========================
       Get Phone Number
    ========================== */

  getPhone() {
    const session = this.getSession();

    return session?.phoneNumber || "";
  },

  /* ==========================
       Save Login Status
    ========================== */

  setLoginStatus(status) {
    this.updateSession({
      isLoggedIn: status,
    });
  },

  /* ==========================
       Save Profile Status
    ========================== */

  setProfileStatus(status) {
    this.updateSession({
      profileCompleted: status,
    });
  },

  /* ==========================
       Save Last Used Role
    ========================== */

  setLastRole(role) {
    this.updateSession({
      lastUsedRole: role,
    });
  },

  /* ==========================
       Save Login Time
    ========================== */

  setLoginTime() {
    this.updateSession({
      loginTime: new Date().toISOString(),
    });
  },
};

/* ==========================================================
   End of File
========================================================== */
