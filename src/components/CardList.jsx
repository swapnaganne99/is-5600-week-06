import React, { useState } from "react"; 
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data);

  const filterTags = (searchTerm) => {
    const filteredProducts = data.filter((product) =>
      product.tags?.some((tag) =>
        tag.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setProducts(filteredProducts);
    setOffset(0);
  };

  const handlePrevious = () => setOffset(Math.max(offset - 10, 0));
  const handleNext = () => setOffset(offset + 10);

  const getPaginatedProducts = () => {
    return products.slice(offset, offset + 10);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {getPaginatedProducts().map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;
