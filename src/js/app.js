App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    const node = new IPFS()

    node.on('ready', () => {
      // Your node is now ready to use \o/

      console.log("node is ready")      
      node.stop(() => {
        // node is now 'offline'
      })
    })
    node.on('error', error => {
      console.error(error.message)
    })   
      
    return App.initWeb3();
  },

  initWeb3: function() {
    /*
     * Replace me...
     */

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */

  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
