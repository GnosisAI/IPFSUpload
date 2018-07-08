var $ = require('jquery')
var IpfsApi =require('ipfs-api')
var buffer =require('buffer')

App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    
    console.log("hello world")
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

  },

  upload:function () {
    const reader = new FileReader();
    reader.onloadend = function() {
      const ipfs = IpfsApi('/ip4/127.0.0.1/tcp/5001') // Connect to IPFS
      const buf = buffer.Buffer(reader.result) // Convert data into buffer
      ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
        if(err) {
          console.error(err)
          return
        }
        let url = `https://ipfs.io/ipfs/${result[0].hash}`
        console.log(`Url --> ${url}`)
        document.getElementById("url").innerHTML= url
        document.getElementById("url").href= url
        document.getElementById("output").src = url
      })
    }
    const photo = document.getElementById("photo");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
  }

};

$(function() {
  $(window).on('load',function() {
    App.init();
  });
});
