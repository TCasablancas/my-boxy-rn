import { View, StyleSheet, Text, Pressable } from 'react-native';
import { NeutralColors } from '../../common/colors/Colors';

interface MBRoundedIconBtnProps {
  icon: React.ReactNode;
  qty?: number;
  backgroundColor?: string;
  onPress: () => void;
}

export default function MBRoundedIconBtn({ 
    icon, qty, backgroundColor, onPress
}: MBRoundedIconBtnProps) {
  return (
    <>
      {qty !== undefined && (
        <View style={styles.qtyBadgeWrapper}>
          <Text style={styles.qtyBadgeText}>{qty}</Text>
        </View>
      )}
      <Pressable onPress={onPress}>
        <View style={[
          styles.roundedIconBtnContainer, 
          { backgroundColor: backgroundColor ? backgroundColor : NeutralColors.border }
        ]}>
          <View style={styles.roundedIconBtnWrapper}>
            {icon}
          </View>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  roundedIconBtnContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: NeutralColors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedIconBtnWrapper: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBadgeWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 100,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  qtyBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});