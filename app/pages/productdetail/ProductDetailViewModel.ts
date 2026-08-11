import { useCallback, useMemo, useState } from 'react';
import { homeProducts } from '../../common/UserHomeData';
import type { ProductCarouselItem, ProductDetailContent } from './ProductDetailModel';
import { Alert } from 'react-native';
import { Icons } from '../../common/icons/Icons';
import type { CartItemProps } from '../cart/CartModel';
import { addItemToCartAndSelect } from '../../common/store/cartStore';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

const PRODUCT_DETAIL_CONTENT: ProductDetailContent = {
  rating: 4.5,
  favorite: 231,
	subtitle: 'Galeria com auto slide e zoom',
	title: 'Boneco Super Mario Odissey - 30cm',
	price: '537,00',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
  comments: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
  tags: [
    { id: 'plants', label: 'Plantas', },
    { id: 'home', label: 'Para casa', },
    { id: 'new', label: 'Novidade',},
  ],
};

export const useProductDetailViewModel = () => {
	const [quantity, setQuantity] = useState(MIN_QUANTITY);

	const carouselItems = useMemo<ProductCarouselItem[]>(
		() => homeProducts.slice(0, 5).map((product) => ({
			id: product.id,
			imageUri: product.imageUri,
		})),
		[],
	);

	const decreaseQuantity = useCallback(() => {
		setQuantity((prev) => Math.max(MIN_QUANTITY, prev - 1));
	}, []);

	const increaseQuantity = useCallback(() => {
		setQuantity((prev) => Math.min(MAX_QUANTITY, prev + 1));
	}, []);

	const addToCart = useCallback(() => {
		const cartItem: CartItemProps = {
			product_id: `product-detail-${PRODUCT_DETAIL_CONTENT.title}`,
			name: PRODUCT_DETAIL_CONTENT.title,
			price: PRODUCT_DETAIL_CONTENT.price,
			quantity,
			imageUri: carouselItems[0]?.imageUri ?? '',
			shipping: 'Frete grátis',
		};

		addItemToCartAndSelect(cartItem);
		Alert.alert('Carrinho', 'Item adicionado e selecionado no carrinho.');
	}, [carouselItems, quantity]);

	return {
		quantity,
		carouselItems,
		productDetail: { ...PRODUCT_DETAIL_CONTENT, rating: 4.5 },
		decreaseQuantity,
		increaseQuantity,
		addToCart,
	};
};
