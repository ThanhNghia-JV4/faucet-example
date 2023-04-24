import './App.css';
import web3 from 'web3';
import React, { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';


function App() {

  const [web3Api, setWeb3Api] = useState({
    provider: null,//khach hang di vao website
    web3: null,
  });

  const [account, setAccount] = useState(null);

  useEffect(() =>{
    const loadProvider = async () =>{
      const provider = await detectEthereumProvider();
      if(provider){
        // provider.request({method: 'eth_requestAccounts'}) // luon luon hien thi ko can yeu cau
        setWeb3Api({
          web3: new web3(provider),
          provider
        })
      } else{
        console.error('please ! INSTALL METAMASK');
      }
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }
    web3Api.web3 && getAccount()
  }, [web3Api.web3])

  return (
    <div className='twister-wrapper'>
      <div className='twister'>
        <div className='balance-view is-size-2'>
          Current balance: <strong> 10 ETH</strong>
        </div>
        <button className='button is-primary mr-5'>Donate</button>
        <button className='button is-danger mr-5'>Withdraw</button>
        <button className='button is-link' onClick={()=> web3Api.provider.request({method: 'eth_requestAccounts'})}>Connect Wallets</button>
        {/* hien thi khi co yeu cau */}
        <span>
          <p><strong>Accounts Address: </strong>
          {
            account ? account : 'Accounts Denined'
          }
          </p>
        </span>
      </div>
    </div>
  );
}

export default App;
