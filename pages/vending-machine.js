import Head from 'next/head'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
// import vmContract from '../blockchain/vending'
import vendingMachineContract from '../blockchain/vending'
import 'bulma/css/bulma.css'
import styles from '../styles/VendingMachine.module.css'

const VendingMachine = () => {
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [inventory, setInventory] = useState('')
    const [myBalance, setMyBalance] = useState('')
    const [buyCount, setBuyCount] = useState('')
    const [nbPurchases, setNbPurchases] = useState(0)
    // let web3
    const [web3, setWeb3] = useState(null)
    const [account, setAccount] = useState(null)
    const [vmContract, setVmContract] = useState(null)

    useEffect(() => {
        if (vmContract)        
            getInventoryHandler()
        if (vmContract && account)
            getMyBalanceHandler()
    }, [vmContract,account,nbPurchases])

    const getInventoryHandler = async () => {
        const inv = await vmContract.methods.getVendingMachineBalance().call()
        setInventory(inv)
        console.log('setinvhdler!!!',inv)
    }
    
    const getMyBalanceHandler = async () => {
        const count = await vmContract.methods.donutBalances(account).call()
        // const mb = await vmContract.methods.getVendingMachineBalance().call()
        setMyBalance(count)
        console.log('setmybalance!!!',count)
    }
    
    const purchaseDonutHandler = async () => {
        setSuccessMsg('...')
        setError('')
        let val= await web3.utils.toWei('2','ether') / 1000
        console.log('try purchase donut!!',buyCount,val)
        try {
            await vmContract.methods.purchase(buyCount).send({
                from:account,
                value: val*buyCount
            })
            setNbPurchases(nbPurchases+1)
            setSuccessMsg(`${buyCount} Donut purchased @price : ${val}`)
            console.log('did purchase donut!!',buyCount,val)
        } catch (err) {
            setError(err.message)
        }
    }
    
    const updateDonutQty = event => {
        console.log(`do,nut qty : ${event.target.value}`)
        setBuyCount(event.target.value)
    }
    // window.ethereum => metamask
    const connectWalletHandler = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            try {
                setSuccessMsg('dAppli started')
                await window.ethereum.request({method: "eth_requestAccounts"})
                
                web3 = await new Web3(window.ethereum)
                console.log(web3)
                setWeb3(web3)

                const accounts = await web3.eth.getAccounts()
                console.log(accounts)
                setAccount(accounts[0])

                const vm = await vendingMachineContract(web3)
                setVmContract(vm)

            } catch (err){
                setError(err.message)
            }
        }
        else {
            // alert('metamask undefined')
            console.log('please install metamask')
        }
    }
    return (
        <div className={styles.main}>
            <Head>
            <title>Create Next App</title>
            <meta name='description' content='Blochain app' />
            </Head>
            <nav className='navbar mt-4 mb-4'>
                <div className='container'>
                    <div className='navbar-brand'>
                        <h1>Vending Machine</h1>
                    </div>
                    <div className='navbar-end'>
                        <button onClick={connectWalletHandler} className='button is-primary'>Connect wallet</button>
                    </div>
                </div>
            </nav>
            <section>
                <div className='container'>
                    <h2>Vending M inv:{inventory}</h2>
                </div>
            </section>
            <section>
                <div className='container'>
                    <h2>My donut in my wallet:{myBalance}</h2>
                </div>
            </section>
            <section className='mt-5'>
                <div className='container'>

                    <div className='field'>
                        <label className='label'>Buy donuts</label>
                        <div className='control'>
                            <input onChange={updateDonutQty} className='input' type='text' placeholder='enter amount...'></input>
                        </div>
                        <button onClick={purchaseDonutHandler} className='button is-primary mt-2'>Go</button>
                    </div>
                </div>
            </section>
            <section>
                <div className='container has-text-danger'>
                    <p>{error}</p>
                </div>
            </section>
            <section>
                <div className='container has-text-success'>
                    <p>{successMsg}</p>
                </div>
            </section>
        </div>
    )
}
export default VendingMachine 