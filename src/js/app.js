var $ = require('jquery')
var IpfsApi =require('ipfs-api')
var buffer =require('buffer')
// contract imports 
var Web3 = require('web3');
var contract = require('truffle-contract');
var storageArtifact = require("../../build/contracts/Storage.json");
//-----------------------------------------

App = {
  account:null,
  StorageCnt:null,
  ready:false,
  init: function() {
    this.cacheDom()
    return App.initWeb3();
  },
  cacheDom:function(){
    this.$url = $("#url")
    this.$output = $("#output")
    this.$photo = $("#photo")


  },
  initWeb3: function() {

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    return App.initAccount();
  },
  

  initAccount:function(){
    web3.eth.getAccounts().then(accounts => {
      App.account = accounts[0];

      App.initContract();
    });
  },

  initContract: function() {
    App.Storage = contract(storageArtifact);
    App.Storage.setProvider(web3.currentProvider); 
    App.Storage.deployed().then(instance => {
      App.StorageCnt = instance;
      App.ready = true;
    })
  },

  upload:function () {
    if(App.ready == false){
      console.log("the app is not ready");
    }
    else{
      const reader = new FileReader();
      reader.onloadend = function() {
        const ipfs = IpfsApi('/ip4/127.0.0.1/tcp/5001') // Connect to IPFS
        const buf = buffer.Buffer(reader.result) // Convert data into buffer
        ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
          if(err) {
            console.error("file not uploaded to ipfs" + err)
            return
          }
          App.setValue("update").then(
            App.getValue().then(res => console.log(res))
          );

          let url = `http://localhost:8080/ipfs/${result[0].hash}`;
          console.log(`Url --> ${url} + ${this}`)
          App.$url.html(url)
          App.$url.attr("href", url)
          App.$output.attr("src", url)
        })
      
      }
      const photo = document.getElementById("photo");
      reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
    }
  },
  setValue: function(value){
    return App.StorageCnt.set(value, {from: App.account})
  },
  getValue: function(){
    return App.StorageCnt.get.call()
  }

};

$(function() {
  $(window).on('load',function() {
    App.init();
  });
});
