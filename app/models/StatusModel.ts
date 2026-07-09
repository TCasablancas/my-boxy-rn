
enum ProductStatus {
  AVAILABLE = 'Disponível',
  UNAVAILABLE = 'Indisponível',
  SHIPPING = 'Enviando',
  RECEIVED = 'Recebido',
  RETURNED = 'Devolvido',
  CANCELED = 'Cancelado',
  ON_WAY = 'A Caminho',
  WAITING_RETURN = 'Aguardando Devolução',
  WAITING_SHIPPING = 'Aguardando Envio',
  WAITING_RECEIVED = 'Aguardando Recebimento',
  WAITING_RATING = 'Aguardando Avaliação',
}

export interface ProductStatusProps {
  productId: string;
  status: ProductStatus;
}