'use client';
import {Web3, AbiItem} from 'web3';
import React, { useState } from 'react';
import SearchBox from './searchbox';
import TokenDisplay from './token_display';
import { Box } from '@mui/material';
  
const PoligonViewer = () => {

  const [contractData, setContractData] = useState<any>({token:''});

  const ERC20_ABI = [
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
  ];
  

  async function fetchContractData(tokenAddress:string) {
    try {

        const web3 = new Web3('https://polygon-rpc.com');

        const abi: AbiItem[] = ERC20_ABI;

        const contract = new web3.eth.Contract(abi, tokenAddress);

        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol().call();
        const totalSupply = await contract.methods.totalSupply().call();
        const decimals = await contract.methods.decimals().call();
        const maxSupply = Number(totalSupply) / 10 ** Number(decimals);
        
        return {
            name,
            symbol,
            maxSupply
        };

    } catch (error) {
      console.error('Error fetching contract data:', error);
      return null;
    }
  }

  const handleSearchChange = async (value:string) => {
    setContractData({token: value});
  }

  const handleReadContract = async () => {
    if(contractData.token == '')
        return;

    const data = await fetchContractData(contractData.token);
    setContractData(data);
  };
  
  return (
    <Box>
        <SearchBox 
            value={contractData.token}
            onChange={(value)=>handleSearchChange(value)}
            onSearchClick={() => handleReadContract()}
        />
        <TokenDisplay data={contractData}></TokenDisplay>
        
    </Box>
  );
};

export default PoligonViewer;