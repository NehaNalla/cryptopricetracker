import Image from "next/image";
import {useState} from 'react'
;import SearchBar1 from '../components/SearchBar1';
import CoinsList from '../components/CoinsList';
import Layout from '../components/Layout';
export default function Home({filteredCoins}) {
  const [search,setSearch] = useState('')

  const altCoins=filteredCoins.filter(coin =>
   coin.name.toLowerCase().includes(search.toLowerCase())
  )
  const handleChange = e =>{
    e.preventDefault()

    setSearch(e.target.value.toLowerCase())
  }
  return (
    <Layout>
    <div classname='coin_app'>
      <SearchBar1 type='text' placeholder='search'
      onchange={handleChange}
      />
        <CoinsList filteredCoins={allCoins}/>
    </div>
    </Layout>
  );
}

export const getServerSideProps = async()=>{
  const res=await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  const filteredCoins = await res.json()

  return {
    props: {
      filteredCoins
    }
  }


}