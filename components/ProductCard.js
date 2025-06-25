import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {product.brand}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            <p className="text-xs text-gray-500">Stock: {product.stock}</p>
          </div>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm text-gray-700 ml-1 font-medium">
              {product.rating}
            </span>
          </div>
        </div>
        
        <Link 
          href={`/products/${product.id}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;