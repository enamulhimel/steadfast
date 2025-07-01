import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryListProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link 
          key={category.id}
          to={`/category/${category.slug}`}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="font-medium text-center">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;