import React, {ReactNode, useEffect} from 'react';
import {
  StyleSheet,
  StyleProp,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ScrollViewProps,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Back} from '../../assets/svgs';

type Props = {
  scrollable?: boolean;
  style?: StyleProp<unknown>;
  children?: React.ReactNode;
  headerShown?: boolean;
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  isLoading?: boolean;
  hasBack?: boolean;
  pageTitle?: string;
  LeftIcon?: ReactNode;
  leftIconAction?: () => void;
};

const Screen = ({
  scrollable = false,
  style,
  children,
  headerShown = false,
  renderHeader,
  renderFooter,
  isLoading = false,
  hasBack = true,
  pageTitle = '',
  LeftIcon,
  leftIconAction,
  ...props
}: Props & ScrollViewProps) => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();
  const defaultHeader = () => {
    return (
      <View style={styles.defaultHeader}>
        <View style={{flexDirection: 'row'}}>
          {hasBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Back width={24} height={24} color={'white'} />
            </TouchableOpacity>
          )}
          <Text>{pageTitle}</Text>
        </View>
        {LeftIcon && (
          <TouchableOpacity onPress={leftIconAction}>
            {LeftIcon}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (scrollable) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[
          styles.container,
          {
            paddingTop: insets.top,
          },
          style,
        ]}
        keyboardVerticalOffset={20}>
        <>
          {headerShown && (renderHeader ? renderHeader() : defaultHeader())}
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            {...props}>
            {children}
          </Animated.ScrollView>
          {renderFooter && renderFooter?.()}
        </>
      </KeyboardAvoidingView>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}>
      {headerShown && (renderHeader ? renderHeader() : defaultHeader())}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, style]}
        keyboardVerticalOffset={20}>
        {children}
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#2b313b',
  },
});

export default Screen;
