import firebase from 'react-native-firebase';
import { ShareDialog } from 'react-native-fbsdk';

class linkSharing {
    // Provide Task Type and TaskID
    static createSharingLink(type, taskID, taskTitle, taskDescription, taskLocation){

        const link =
              new firebase.links.DynamicLink(`https://outsideapp.co/${type}/${taskID}`, 'outside.page.link')
                .android.setPackageName('com.outsideapp')
                .android.setFallbackUrl('https://outsideapp.co')
                .ios.setBundleId('com.outsidetech.outsideapp')
                .ios.setAppStoreId('1444603208')
                .ios.setFallbackUrl('https://outsideapp.co')
                .social.setTitle(taskTitle)
                .social.setDescriptionText(taskDescription)
                .social.setImageUrl('http://outsideapp.co/wp-content/uploads/2018/10/MapBanner.png');

        return firebase.links()
        .createShortDynamicLink(link, 'UNGUESSABLE')
        .then((url) => {
          // ...
           console.log(url)
           return url;
        });

    }

    //Provide sharing Url (Type of String)
    static createFBPost(url){
         const shareLinkContent = {
           contentType: 'link',
           contentUrl: `${url}`,
           contentDescription: 'Wow, Check out this task!',
         };

         return ShareDialog.canShow(shareLinkContent).then(
           function(canShow) {
             if (canShow) {
               return ShareDialog.show(shareLinkContent);
             }
           }
         ).then(
           function(result) {
             if (result.isCancelled) {
               return console.log('Share cancelled');
             } else {
               console.log('Share success with postId: '
                 + result.postId);
             }

                 return console.log(result)
           },
           function(error) {
             console.log('Share fail with error: ' + error);
           }
         );

    }
}
export default linkSharing;
