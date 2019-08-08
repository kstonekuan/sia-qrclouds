import { errorDB } from '../../Constants';
import { Platform } from 'react-native';

class RecordError {

    static storeIntoData = (error) => {
        const info = {}
        info.error = error;
        info.TimeStamp = new Date();
        info.phoneType = Platform.OS == 'ios' ? 'IOS' : 'ANDROID';

        errorDB.add(info);

    }

}

export default RecordError;
