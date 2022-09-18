import Head from 'next/head'
import { useState } from 'react'
import Web3 from 'web3'
import 'bulma/css/bulma.css'
import styles from '../styles/VendingMachine.module.css'

const VendingMachine = () => {
    const [error, setError] = useState('')
    let web3
    // window.ethereum => metamask
    const connectWalletHandler = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            try {
                await window.ethereum.request({method: "eth_requestAccounts"})
                web3 = new Web3(window.ethereum)
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
                    <p>placeholder text</p>
                </div>
            </section>
            <section>
                <div className='container has-text-danger'>
                    <p>{error}</p>
                </div>
            </section>
        </div>
    )
}
export default VendingMachine 