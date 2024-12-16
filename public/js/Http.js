
window.balance = 100;
window.hasFreeSpins = false;

window.getWallet = async () =>{
  let token = getToken();
  let user_id = getUserId();
  // https://spintest.vercel.app?token=7649|oe2icJ99DPV1GUA2sQJ4uFFvEZ8jK90qGvcUTESG&uid=11927
  console.log(token,user_id)
  if(!(token === "null" || token === null || token === "") && !(user_id === "null" || user_id === null || user_id === "")){
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`https://onehubplay.com:8000/api/wallet/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      let gameWallet = response?.data?.data?.wallet
      window.balance = Number(gameWallet?.balance)
      console.log(window.balance)
      localStorage.setItem('gameWallet',JSON.stringify(gameWallet))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}


window.setBalance = async (balance) =>{
  let token = getToken();
  let user_id = getUserId();
  // https://spintest.vercel.app?token=7649|oe2icJ99DPV1GUA2sQJ4uFFvEZ8jK90qGvcUTESG&uid=11927
  console.log(token,user_id)
  if(!(token === "null" || token === null || token === "") && !(user_id === "null" || user_id === null || user_id === "")){
    try {
      axios.defaults.withCredentials = true;
        const response = await axios.post(`https://onehubplay.com:8000/api/wallet/setBalance`,{
          balance: balance
        }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      let gameWallet = response?.data?.data?.wallet
      window.balance = Number(gameWallet?.balance)
      console.log(window.balance)
      localStorage.setItem('gameWallet',JSON.stringify(gameWallet))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}


