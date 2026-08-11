import { parsePriceToNumber, formatCurrencyBRL } from '../../common/constants/Currency';
import type { CartItemProps } from './CartModel';

export interface CartCharges {
	shipping: number;
	serviceFee: number;
	discount: number;
}

export interface CartTotals {
	subtotal: number;
	discount: number;
	fees: number;
	total: number;
	selectedItemsCount: number;
	selectedUnitsCount: number;
}

export interface CheckoutPayload {
	itemIds: string[];
	items: Array<{
		productId: string;
		quantity: number;
		unitPrice: number;
		lineTotal: number;
	}>;
	totals: CartTotals;
	charges: CartCharges;
}

export interface CheckoutResult {
	success: boolean;
	transactionId: string;
	processedAt: string;
	payload: CheckoutPayload;
}

const DEFAULT_CHARGES: CartCharges = {
	shipping: 0,
	serviceFee: 0,
	discount: 0,
};

export const resolveCartTotals = (
	selectedItems: CartItemProps[],
	charges?: Partial<CartCharges>,
): CartTotals => {
	const appliedCharges: CartCharges = {
		...DEFAULT_CHARGES,
		...charges,
	};

	const subtotal = selectedItems.reduce((acc, item) => {
		const unitPrice = parsePriceToNumber(item.price);
		return acc + unitPrice * item.quantity;
	}, 0);

	const fees = Math.max(0, appliedCharges.shipping) + Math.max(0, appliedCharges.serviceFee);
	const discount = Math.max(0, appliedCharges.discount);
	const total = Math.max(0, subtotal + fees - discount);
	const selectedUnitsCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

	return {
		subtotal,
		discount,
		fees,
		total,
		selectedItemsCount: selectedItems.length,
		selectedUnitsCount,
	};
};

export const buildCheckoutPayload = (
	selectedItems: CartItemProps[],
	charges?: Partial<CartCharges>,
): CheckoutPayload => {
	const appliedCharges: CartCharges = {
		...DEFAULT_CHARGES,
		...charges,
	};

	const items = selectedItems.map((item) => {
		const unitPrice = parsePriceToNumber(item.price);
		const lineTotal = unitPrice * item.quantity;

		return {
			productId: item.product_id,
			quantity: item.quantity,
			unitPrice,
			lineTotal,
		};
	});

	const totals = resolveCartTotals(selectedItems, appliedCharges);

	return {
		itemIds: selectedItems.map((item) => item.product_id),
		items,
		totals,
		charges: appliedCharges,
	};
};

export const submitCheckoutPayload = async (payload: CheckoutPayload): Promise<CheckoutResult> => {
	return {
		success: true,
		transactionId: `txn-${Date.now()}`,
		processedAt: new Date().toISOString(),
		payload,
	};
};

