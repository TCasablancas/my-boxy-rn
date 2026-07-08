import { useCallback, useMemo, useState } from 'react';
import { homeProducts } from '../../common/UserHomeData';
import type { ProductCarouselItem, ProductDetailContent } from './ProductDetailModel';
import { Alert } from 'react-native';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

const PRODUCT_DETAIL_CONTENT: ProductDetailContent = {
	subtitle: 'Galeria com auto slide e zoom',
	title: 'Boneco Super Mario Odissey - 30cm',
	price: '537,00',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
		Alert.alert('Login', 'Função de login acionada!');
	}, []);

	return {
		quantity,
		carouselItems,
		productDetail: PRODUCT_DETAIL_CONTENT,
		decreaseQuantity,
		increaseQuantity,
		addToCart,
	};
};
