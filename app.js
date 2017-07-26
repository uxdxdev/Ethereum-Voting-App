var Web3 = require('web3')
var fs = require('fs')

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var code = fs.readFileSync('Voting.sol').toString()
var solc = require('solc')
var compiledCode = solc.compile(code)

var abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
var VotingContract = web3.eth.contract(abiDefinition)
var byteCode = compiledCode.contracts[':Voting'].bytecode
var deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
