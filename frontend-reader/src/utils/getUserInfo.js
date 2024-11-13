export const getUserInfo = (setState) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = JSON.parse(window.atob(token.split(".")[1]));
      setState(decoded);
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }
};
