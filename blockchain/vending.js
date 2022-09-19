// import Web3 from "web3";
// const provider = new Web3.providers.HttpProvider(
//     "https://rinkeby.infura.io/v3/7c3e77cdd7fc4ef08fa5677429bedc3d"
// )
// const web3 = new Web3(provider)

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donutBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVendingMachineBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"restock","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const vendingMachineContract = (web3) => {
    return new web3.eth.Contract(
        abi,
        "0x89f8D292A7f85386D87155228583c66B958BFFBF"
        )
}
export default vendingMachineContract

// const vmContract = new web3.eth.Contract(abi,"0xcC1a77bE1CE2CE04441Bef17316d511b92E43Ac0")

// export default vmContract