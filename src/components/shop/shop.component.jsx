import { ProductsContext } from '../../contexts/products.context';
import SHOP_DATA from '../../shop-data.json';
import { useContext } from 'react';
import ProductCard from '../product-card/product-card.component';
import '../shop/shop.styles.scss'

const Shop = () => {
    const {products} = useContext(ProductsContext)
    return(
        <div className='products-container'>
            {
                products.map((product) => {
                   return(<ProductCard key={product.id} product={product} />) 
                })
            }
        </div>
    )
}

export default Shop;