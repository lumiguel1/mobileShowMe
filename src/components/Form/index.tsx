import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { captureScreen } from 'react-native-view-shot';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { FeedBackType } from '../../components/Widget';
import { SendButton } from '../../components/SendButton';
import { ScreenshotButton } from '../../components/ScreenshotButton';

interface Props {
    feedbackType: FeedBackType;
}

export function Form({ feedbackType }: Props) {
    const [screenshot, setScreenshot] = useState<string | null>(null)

    const feedbackInfo = feedbackTypes[feedbackType]

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        }).then(uri => setScreenshot(uri))
        .catch(error => console.log(error))
    }

    function handleScreenshotRemove() {
        setScreenshot(null)
    }

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
                    onTakeshot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />
                <SendButton isLoading={false}/>
            </View>
        </View>
    );
}