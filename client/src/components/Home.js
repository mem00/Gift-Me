import React from 'react'
import CreateWishlist from './CreateWishlist';
import Search from './Search';

function Home() {
    return(
        <div>
            <CreateWishlist />
            <br />
            <br/>
            <Search />
        </div>
    )

}

export default Home