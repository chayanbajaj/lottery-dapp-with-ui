import Head from 'next/head'
import { useState } from 'react'
import Web3 from 'web3'
import styles from '../styles/Home.module.css'
import 'bulma/css/bulma.css'

export default function Home() {
  const [web3, setWeb3] = useState()
  const [address, setAddress] = useState()
  const connectWalletHandler = async () => {
    // Check if we are in a browser environment && Check if MetaMask is installed
    if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        // Request Wallet Connection
        await window.ethereum.request({ method: "eth_requestAccounts"})
        // Create web3 instance
        const web3 = new Web3(window.ethereum)
        // Set web3 instance in React State
        setWeb3(web3)
        // Get list of  Accounts
        const accounts = await web3.eth.getAccounts()
        // Set account 1 to React State
        setAddress(accounts[0])
        console.log(address)
      } catch (err) {
        console.log(err.message);
      }

    } else {
      console.log("Please Install Metamask!")
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Ether Lottery</title>
        <meta name="description" content="An Ethereum Lottery dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav className='navbar mt-4 mb-4'>
          <div className='container'>
            <div className='navbar-brand'> 
              <h1> Ether Lottery </h1>
            </div>   
            <div className='navbar-end'>
              <button className='button is-link' onClick={connectWalletHandler}> Connect Wallet </button>
            </div>
          </div>  
        </nav> 
        <div className='container'>
          <section className='mt-5'>
            <div className='columns'>
            <div className='column is-two-third'> 
              <section className='mt-5'>
                <p> Enter the lottery by sending 0.01 Ether </p>  
                <button className='button is-link is-large is-light mt-3'> Play Now </button>
              </section> 
              <section className='mt-6'>
                <p> <b> Admin Only </b>: Pick Winner</p>  
                <button className='button is-primary is-large is-light mt-3'> Pick Winner </button>
              </section> 
            </div>
            <div className={`${styles.lotteryinfo}column is-one-third`}>
              <section className='mt-5'>
              <div className='card'>
                <div className='card-content'>
                  <div className='content'>
                    <h2> Lottery History </h2>
                    <div className='history-entry'>
                      <div> Lottery Winner #1: 
                        <div> 
                          <a href="https://etherscan.io" target="_blank"> Winner Address </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </section>
              <section className='mt-5'>
              <div className='card'>
                <div className='card-content'>
                  <div className='content'>
                    <h2> Player (1) </h2>
                    <div> 
                      <a href="https://etherscan.io" target="_blank"> Winner Address </a>
                    </div>
                  </div>
                </div>
              </div>
              </section>
              <section className='mt-5'>
              <div className='card'>
                <div className='card-content'>
                  <div className='content'>
                    <h2> Pot </h2>
                    <p> 10 Ether </p>
                  </div>
                </div>
              </div>
              </section>
            </div>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2022 Chayan Bajaj's Lottery Smart Contract</p> 
      </footer>
    </div>
  )
}
