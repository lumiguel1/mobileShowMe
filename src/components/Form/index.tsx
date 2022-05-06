import { ArrowLeft } from 'phosphor-react-native';
import React from 'react';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { FeedBackType } from '../../components/Widget';
import { SendButton } from '../../components/SendButton';
import { ScreenshotButton } from '../../components/ScreenshotButton';

interface Props {
    feedbackType: FeedBackType;
}

export function Form({ feedbackType }: Props) {
    const feedbackInfo = feedbackTypes[feedbackType]

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity>
                <ArrowLeft 
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}
                />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                    <Image 
                        source={feedbackInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackInfo.title}
                    </Text>
                </View>
        </View>

        <TextInput
            multiline
            style={styles.input}
            placeholder="Conte-nos os detalhes"
            placeholderTextColor={theme.colors.text_secondary}
        />

        <View style={styles.footer}>
            <ScreenshotButton
                onTakeshot={() => {}}
                onRemoveShot={() => {}}
                screenshot=""
            />
            <SendButton isLoading={false}/>
        </View>
    </View>
  );
}