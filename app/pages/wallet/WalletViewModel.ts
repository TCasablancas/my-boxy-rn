import { useState } from 'react';

export default function useWalletViewModel() {
  const [transactions, setTransactions] = useState<Array<{ id: string; name: string; amount: string }>>([
    { id: '1', name: 'Transaction 1', amount: '$10.00' },
    { id: '2', name: 'Transaction 2', amount: '$20.00' },
    { id: '3', name: 'Transaction 3', amount: '$30.00' },
  ]);

  return {
    transactions,
  };
}