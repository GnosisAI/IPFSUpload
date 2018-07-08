var $ = require('jquery')
var IpfsApi =require('ipfs-api')
var buffer =require('buffer')
// contract imports 
var Web3 = require('web3');
var contract = require('truffle-contract');
var storageArtifact = require("../../build/contracts/Storage.json");
//-----------------------------------------
Storage = contract(storageArtifact);
var account;
var cnt;
App = {

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    Storage.setProvider(web3.currentProvider);  

    return App.initContract();
  },

  initContract: function() {

    
  },

  upload:function () {
    const reader = new FileReader();
    reader.onloadend = function() {
      const ipfs = IpfsApi('/ip4/127.0.0.1/tcp/5001') // Connect to IPFS
      const buf = buffer.Buffer(reader.result) // Convert data into buffer
      ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
        if(err) {
          console.error("file not uploaded to ipfs" + err)
          return
        }
        web3.eth.getAccounts().then(res => {
          account = res[0]

          Storage.deployed().then(ins => {
            ins.set("result", {from: account})
              .then(res => console.log(res.logs[0].args));
            
            return ins.get.call()
          }).then(res => console.log(res))
        })

        let url = `http://localhost:8080/ipfs/${result[0].hash}`
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
