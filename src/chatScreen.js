import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import firebase from 'react-native-firebase';
import {GiftedChat, Bubble, SystemMessage, Message} from 'react-native-gifted-chat';
import {Icon, Button} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';


export default class Example extends Component {
  static navigationOptions= ({ navigation }) => ({
        title: `${navigation.state.params.name}`,
      });
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      uploaded: '',
      showFab: false,
      tempMsgs: [],
      counter: 0,
      point: 0,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.imageMessageCreater = this.imageMessageCreater.bind(this);
    this.chatActions = this.chatActions.bind(this);
    this.uuidv4 = this.uuidv4.bind(this);
    this.imageUploadLink = this.imageUploadLink.bind(this);
    this.renderDoc = this.renderDoc.bind(this);
    this.openCamera = this.openCamera.bind(this);
    this.filePicker = this.filePicker.bind(this);
    this.createTempMsg = this.createTempMsg.bind(this);
    renderTempMsgs = this.renderTempMsgs.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {
    this._isMounted = true;
    
  }


  componentDidMount(){
    console.log("props: "+JSON.stringify(this.props.navigation.state.params));
    const db = firebase.firestore()
    db.collection('chats')
      .doc('e7ypHneThKVjoa5jcaYb')
        .onSnapshot((doc)=> {
          console.log(JSON.stringify(doc.data().messages))
          this.setState({messages: doc.data().messages.reverse()})     
        }),
        (error) => {
        console.error(error);
        };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

  setTimeout(() => {
    if (this._isMounted === true) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
          loadEarlier: false,
          isLoadingEarlier: false,
        };
      });
    }
  }, 1000); 
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }); }
  
  createTempMsg(link, name, type){
    if (type == 'image' ){
      let message={
        _id: this.uuidv4(),
        createdAt: Math.floor(Date.now()),
        uploaded: 0,
        user: {
          _id: 1,
          name: 'DJ'
        },
        image: link
      }
      this.setState(prevState => ({
        tempMsgs: [...prevState.tempMsgs, message]
      }))
    }

    else {
      let message={
        _id: this.uuidv4(),
        createdAt: Math.floor(Date.now()),
        uploaded: 0,
        user: {
          _id: 1,
          name: 'DJ'
        },
        doc: link,
        docName: name
      }
      this.setState(prevState => ({
        tempMsgs: [...prevState.tempMsgs, message]
      }))
      console.log("TempMsg:" +  JSON.stringify(this.state.tempMsgs));
    }
  }

  imageMessageCreater(link, type, name){
    if (type == 'image' ){
      let message={
        _id: this.uuidv4(),
        createdAt: Math.floor(Date.now()),
        user: {
          _id: 1,
          name: 'DJ'
        },
        image: link
      }
      const db = firebase.firestore().collection('chats').doc('e7ypHneThKVjoa5jcaYb');
      db.update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
      })
      console.log("TempMsg4:" +  JSON.stringify(this.state.tempMsgs));
      return message;
    }

    else {
      let message={
        _id: this.uuidv4(),
        createdAt: Math.floor(Date.now()),
        user: {
          _id: 1,
          name: 'DJ'
        },
        doc: link,
        docName: name
      }
      const db = firebase.firestore().collection('chats').doc('e7ypHneThKVjoa5jcaYb');
      db.update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
      })
      return message;
    }
  }

  onSend(messages) {
    console.log("Message :"+ JSON.stringify(messages[0]));
    messages[0].createdAt = Math.floor(Date.now());
    const db = firebase.firestore().collection('chats').doc('e7ypHneThKVjoa5jcaYb');
    db.update({
      messages: firebase.firestore.FieldValue.arrayUnion(messages[0])
    })
   
    console.log("Message123 :"+ JSON.stringify(messages));
  }

  imageUploadLink(type, name) {
    if (this.state.uploaded != ''){
      console.log(this.state.uploaded)
      firebase.storage().ref(this.state.uploaded).getDownloadURL()
      .then((url) =>
        { console.log("URL"+ url)
          this.imageMessageCreater(url,type, name)
          this.setState({ uploaded: ''}) }) }
  }

  uploadFile(uri, name, type, counter){
    let path= 'something/' + name;
    firebase.storage()
        .ref(path)
        .putFile(uri).on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
            let state = {};
            this.setState({
              progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
            });
            console.log("progress:" + this.state.progress);
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              this.imageUploadLink(type, name);
              state = {
                ...state,
                uploading: false,
                progress: 0,
                uploaded: path
              };
              let msgs = this.state.tempMsgs;
              msgs[counter].uploaded = 1;
              this.setState({tempMsgs: msgs});
              console.log("Whatup" + JSON.stringify(this.state.tempMsgs));
            }
            this.setState(state);
          },
            (error) => {
            console.error(error);
            },
      
    );

  }

  openCamera(){
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
      console.log("auaa");
      console.log(image);
      this.createTempMsg(image.path, image.modificationDate, "image")
      this.uploadFile(image.path, image.modificationDate, "image", this.state.counter) 
      this.setState({counter: this.state.counter +1}) 
    })
  }

  filePicker(){
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.pdf()],
    },(error,res) => {
      // Android
      console.log(
         res.uri,
         res.type, // mime type
         res.fileName,
         res.fileSize
      );
      this.createTempMsg(res.uri, res.fileName, "doc")
      this.uploadFile(res.uri, res.fileName, "doc", this.state.counter)
      this.setState({counter: this.state.counter +1}) 
    });
  }

  chatActions(){
    return(
      <Button rounded light>
          <Icon type="FontAwesome5" name="plus" onPress={()=>
                  {this.setState({showFab: !this.state.showFab}) }}/>
          { (this.state.showFab) &&
          <View style={{flexDirection:'row'}}>
          <Icon type="FontAwesome5" name="camera"  onPress={()=>{this.openCamera()}}/>
          <Icon type="FontAwesome5" name="images"  onPress={()=>{this.openCamera()}}/>
          <Icon type="FontAwesome5" name="file"  onPress={()=>{this.filePicker()}}/>
          </View>
          }
      </Button>
      
      
    );
      
}

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }

  setTimeout(() => {
    if (this._isMounted === true) {
      if (messages.length > 0) {
        if (messages[0].image) {
          this.onReceive('Nice picture!');
        } else if (messages[0].location) {
          this.onReceive('My favorite place');
        } else {
          if (!this._isAlright) {
            this._isAlright = true;
            this.onReceive('Alright');
          }
        }
      }
    }
    this.setState((previousState) => {
      return {
        typingText: null,
      };
    });
    }, 1000);
  }

  renderDoc(props){
    if (props.currentMessage.doc ) {
    return(
      <View style={{flexDirection: 'row', backgroundColor: '#f7891b', padding: 5, borderRadius:4}}>
        <Icon type="FontAwesome5" name="file" style={{color:'white', margin: 5}}/>
        <Text style={{color:'white', fontSize: 15, alignSelf:'center'}}>{props.currentMessage.docName}</Text>
      </View>
    )
    }
  }

  renderBubble(props) {
    return (
        <Bubble
          {...props}
          wrapperStyle={{
            elevation:5,
            left: {
              borderRadius: 4,
              backgroundColor: '#caf9f3',
            },
            right: {
              borderRadius: 4,
              backgroundColor: '#3592f4',
            }
          }}/>
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  renderCustomView(props) {
    console.log("Prop:" + JSON.stringify(props))
    return (
      <Icon type="FontAwesome5" name="paperclip"/>
    );
  }

  renderLoading(){
    return(
    <View>
      <ActivityIndicator size="large" color="red" />
    </View>
    )
  }

  renderTempMsgs(item, index){
    
    const point = item.index;
    console.log(item.index);
    console.log("HEtyaa" + this.state.tempMsgs[item.index].uploaded);
    if(!this.state.tempMsgs[point].uploaded) {
      return(
          <Message
          renderBubble = {this.renderBubble}
          renderAvatar = {this.renderLoading}
          showUserAvatar ={false} position={'right'} currentMessage= {item.item}/>      
      )
    }
    else{
      return(
        <View></View>
      )
    }

  }


  renderFooter() {
    console.log("HEtyaa1" + JSON.stringify(this.state.tempMsgs));
    if (this.state.tempMsgs) {
    return (
    <FlatList
        data={this.state.tempMsgs}
        renderItem={this.renderTempMsgs.bind(this)}
        keyExtractor = {(item, index) => index.toString()}
        extraData={this.state}
      />  
    );  
    }
    else return null;
  }


  render() {
    return (
      
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id: 1, 
        }}
        renderActions={this.chatActions.bind(this)}
        renderBubble={this.renderBubble}
        renderSystemMessage={this.renderSystemMessage}
        renderFooter = {this.renderFooter}
        extraData  = {this.state}
        renderCustomView ={this.renderDoc}
      />

      
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});