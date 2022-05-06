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
import { ArrowLeft } from 'phosphor-react-native';
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { FeedBackType } from '../../components/Widget';
import { SendButton } from '../../components/SendButton';
import { ScreenshotButton } from '../../components/ScreenshotButton';
import { api } from '../../libs/api';
import * as FileSystem from 'expo-file-system';

interface Props {
    feedbackType: FeedBackType;
    onFeedbackCancelled: () => void;
    onFeedBackSend: () => void;
}

export function Form({ feedbackType, onFeedbackCancelled, onFeedBackSend }: Props) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [sendFeedback, setSendFeedback] = useState(false);
    const [comment, setComment] = useState(""); 

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

    async function handleSendFeedback(){
        if(sendFeedback){
            return;
        }

        setSendFeedback(true);
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

        try{
            await api.post('/feedbacks', {
                type: feedbackType,
                comment,
                screenshot: `data:image/png;base64, ${screenshotBase64}`, 
            })

            onFeedBackSend();

        }catch(error){
            console.log(error);
            setSendFeedback(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCancelled}>
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
                autoCorrect={false}
                multiline
                style={styles.input}
                placeholder="Conte-nos os detalhes"
                placeholderTextColor={theme.colors.text_secondary}
                onChangeText={setComment}
            />

            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeshot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />
                <SendButton onPress={handleSendFeedback} isLoading={sendFeedback}/>
            </View>
        </View>
    );
}