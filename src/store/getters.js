const getters = {
  username: state => state.login.username,
  role: state => state.login.role,
  newrouter: state => state.login.newrouter,
  loginId:state => state.login.loginId,
};
export default getters
