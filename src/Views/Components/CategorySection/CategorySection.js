import { Context } from '../../../Context'
import CardPlaceholder from '../CardPlaceholder/CardPlaceholder'
import { CategoryCard } from '../CategoryCard/CategoryCard'
import classes from './CategorySection.module.css'
import React from 'react'

const CategorySection = () => {
    const { categoryArray } = React.useContext(Context);


    return (
    <div className={classes.container}>
        {categoryArray && categoryArray.length !== 0 ? categoryArray.map((item, index) => (
            <CategoryCard image={`svgs/${item.category.replace(/\W+/g, '').toLowerCase()}.svg`} category={item.category} spend={item.spend} key={index} />
        )) : 
            <div style={{paddingTop: '40px', width: '100%', display: 'flex', justifyContent: 'center'}}>
              <CardPlaceholder content={'No spend in selected period'} />
            </div>
        }
    </div>
  )
}

export default CategorySection