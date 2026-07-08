import { View, StyleSheet, Text, ScrollView, } from 'react-native';
import MBTitledViewHeader from '../../components/header/MBTitledViewHeader';
import MBRoundedIconBtn from '../../components/buttons/MBRoundedIconBtn';
import { Icons } from '../../common/constants/Icons';
import MBMenuNestedList from '../../components/navigation/MBMenuNestedList';

const nestedListItems = [
  {
    id: '1',
    label: 'Para mim',
    items: [
      { id: '1-1', icon: <Icons.user width={16} height={16} />, label: 'Meus Dados' },
      { id: '1-2', icon: <Icons.bag width={16} height={16} />, label: 'Endereços' },
      { id: '1-3', icon: <Icons.barcode width={16} height={16} />, label: 'Notificações' },
      { id: '1-4', icon: <Icons.barcode width={16} height={16} />, label: 'Seguindo' },
      { id: '1-5', icon: <Icons.barcode width={16} height={16} />, label: 'Seguidores' },
      { id: '1-6', icon: <Icons.barcode width={16} height={16} />, label: 'Histórico' },
      { id: '1-7', icon: <Icons.barcode width={16} height={16} />, label: 'Cupons' },
      { id: '1-8', icon: <Icons.barcode width={16} height={16} />, label: 'Minhas Compras' },
      { id: '1-9', icon: <Icons.barcode width={16} height={16} />, label: 'Minhas Insígnias' },
    ]
  },
  {
    id: '2',
    label: 'Para minha loja',
    items: [
      { id: '2-1', icon: <Icons.user width={16} height={16} />, label: 'Criar minha loja' },
      { id: '2-2', icon: <Icons.bag width={16} height={16} />, label: 'Parceiros' },
      { id: '2-3', icon: <Icons.barcode width={16} height={16} />, label: 'Faturamento' },
      { id: '2-4', icon: <Icons.barcode width={16} height={16} />, label: 'Selo oficial' },
    ]
  },
  {
    id: '3',
    label: 'Mais configurações',
    items: [
      { id: '3-1', icon: <Icons.user width={16} height={16} />, label: 'Buscas salvas' },
      { id: '3-2', icon: <Icons.bag width={16} height={16} />, label: 'Privacidade' },
      { id: '3-3', icon: <Icons.barcode width={16} height={16} />, label: 'Termos e Condições' },
      { id: '3-4', icon: <Icons.barcode width={16} height={16} />, label: 'Sobre a MyBoxy' },
    ]
  },
];

export default function MoreConfigsView() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentWrapper}>
        <MBTitledViewHeader 
          title="Configurações"
          btnsRight={<MBRoundedIconBtn 
            icon={<Icons.barcode width={16} height={16} />} 
            onPress={() => {}}
          />}
        />
        <View style={styles.listWrapper}>
          {nestedListItems.map((nestedList) => (
            <MBMenuNestedList 
              key={nestedList.id}
              title={nestedList.label}
              items={nestedList.items}
              onPress={(itemId) => {
                console.log('Pressed item:', itemId);
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0E5E4',
  },
  contentWrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
    gap: 8,
    padding: 16,
    marginBottom: 8,
  },
  listWrapper: {
    marginTop: 16,
    padding: 16,
    gap: 16,
    borderRadius: 12,
  },
});