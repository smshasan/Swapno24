import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DataFetch = () => {

    const [posts, setPosts] =useState([]);

    useEffect(() => {
        axios.get('http://localhost:4990/api/v1/admin/products')
        .then(res => {
            console.log('res', res.data.products)
            setPosts(res.data.products);
        })
        .catch(err => console.log(err))
    }, [])


  return (
    <div>
        <ul>
        {posts.map(post => (
            <li key={post._id}>{post.name}</li>
        ))}
        </ul>
    </div>
  )
}

export default DataFetch