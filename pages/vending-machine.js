import Head from 'next/head'
import styles from '../styles/VendingMachine.module.css'
import 'bulma/css/bulma.css'
export default function VendingMachine() {
    return (
        <div>
            <Head>
            <title>Create Next App</title>
            <meta name="description" content="Blochain app" />
            </Head>
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <h1>Vending Machine</h1>
                    </div>
                    <div className="navbar-end">
                        <button className="button is-primary">Connect wallet</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}