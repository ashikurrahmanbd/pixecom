import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Productitem from '../components/Productitem';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const Collection = () => {

    const {products, search, showSearch} = useContext(ShopContext)

    const [showFilter, setShowFilter] = useState(false);

    //filtering all products
    const [filterProducts,  setFilterProducts] = useState([]);

    const [category, setCategory] = useState([]);

    const [subCategory, setSubCategory] = useState([]);

    const [sortType, setSortType] = useState('relevent');

    const toggleCategory = (e) => {

       if(category.includes(e.target.value)){

          //if category already selected remove teh category fromt the list and give the udpated array
        
          setCategory(prev => prev.filter(item => item !== e.target.value))

          
       }else{

          //completely set a new array with the previous array. 
          setCategory(prev => [...prev, e.target.value] )
          
       }

    }

    const toggleSubCategory = (e) => {

        if(subCategory.includes(e.target.value)){

          setSubCategory(prev => prev.filter(item => item !== e.target.value))

        }else{

            setSubCategory(prev => [...prev, e.target.value] )

        }
      
    }

    //apply filter
    const applyFilter = () => {

        //making replica of product. slice has two arugments both are optional. 
        // start, end is the argument
        let productsCopy = products.slice();

        if(showSearch && search){
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if(category.length > 0){

            productsCopy = productsCopy.filter(item => category.includes(item.category));

        }

        if(subCategory.length > 0){

            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));

        }

        setFilterProducts(productsCopy);

    }

    //sort Product
    const sortProduct = () => {

        //copy of current filter products
        let fpCopy = filterProducts.slice();

        switch(sortType){

            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
                break;

            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
                break;

            default:
                applyFilter();
                break;


        }


    }

    useEffect(() => {
        //showing all the rojects
        setFilterProducts(products);

    }, [])

    useEffect(() => {
      applyFilter();
    }, [category, subCategory, search, showSearch]);

    useEffect(() => {
        sortProduct();
    }, [sortType])


    return (

      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

        {/* filter Option */}
        <div className='min-w-60'>
            <p onClick={() =>  setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
              <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
            </p>

            {/* category filter */}
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-ssm font-medium'>CATEGORIES</p>
                <div className="flexflex-col gap-2 text-sm font-light text-gray-700">
                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/> Men
                    </p>

                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
                    </p>

                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
                    </p>
                </div>
            </div>

            {/* Subcategory filter */}
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-ssm font-medium'>TYPE</p>
                <div className="flexflex-col gap-2 text-sm font-light text-gray-700">
                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
                    </p>

                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
                    </p>

                    <p className='flex gap-2'>
                        <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
                    </p>
                </div>
            </div>

        </div>

        {/* Right side */}
        <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={'ALL'} text2={'COLLECTIONS'} />

                {/* product sort */}
                <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                    <option value="relevent">Sort by: relavent</option>
                    <option value="low-high">Sort by: Low to High</option>
                    <option value="high-low">Sort by: High to Low</option>
                </select>
            </div>

            {/* Map all products */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                
                {
                  filterProducts.map((item, index) => (
                    <Productitem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
                  ))
                }
              

            </div>

        </div>

      </div>
    )
}

export default Collection
