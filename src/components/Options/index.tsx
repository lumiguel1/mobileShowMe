import { Copyright } from '../Copyright';
import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import { Option } from '../Option';
import { FeedBackType } from '../Widget';

import { feedbackTypes } from '../../utils/feedbackTypes';

interface Props {
  onFeedbackTypeChanged: (feedbackType: FeedBackType) => void;
}

export function Options({onFeedbackTypeChanged} : Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deixe seu FeedBack
      </Text>

      <View style={styles.options}>
        {
          Object
            .entries(feedbackTypes)
            .map(([key, value]) => (
              <Option 
                key={key} 
                title={value.title} 
                image={value.image} 
                onPress={() => onFeedbackTypeChanged(key as FeedBackType)}/>
            ))
        }
      </View>
      <Copyright />
    </View>
  );
}