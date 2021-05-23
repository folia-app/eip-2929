const { ethers } = require("ethers");
require('dotenv').config()
contracts = require('folia-contracts')

const network = "homestead";
const provider = ethers.getDefaultProvider(network, {
  infura: process.env.INFURA_API_KEY,
});


async function run() {
  work = 11000003
  wallet = new ethers.Wallet.fromMnemonic(process.env.MAINNET_MNEMONIC)
  wallet = wallet.connect(provider)
  auction = new ethers.Contract(contracts.ReserveAuction.networks['1'].address, contracts.ReserveAuction.abi, wallet)

  overrides = {
    nonce: 102,
    gasLimit: 500000,
    gasPrice: ethers.utils.parseUnits('150', 'gwei').toString(),
    type: 1,
    accessList: [
      {
        address: "0x397c2c9c2841bcc396ecaedbc00cd2cfd07de917", // admin
        storageKeys: [
            "0x0000000000000000000000000000000000000000000000000000000000000000"
        ]
      },
      {
        address: "0xaF5c3455A72ecdfc316Bf00e356182B58585B40E", // proceedsRecipient
        storageKeys: [
            "0x0000000000000000000000000000000000000000000000000000000000000000"
        ]
      },
      {
        address: '0x34cfac646f301356faa8b21e94227e3583fe3f5f',  // gnosis safe master
        storageKeys: []
      }
    ]
  }
  endAuctionTX = await auction.endAuction(work, overrides)
  console.log({endAuctionTX})
  resolved = await endAuctionTX.wait()
  console.log({resolved})
}

// run()
