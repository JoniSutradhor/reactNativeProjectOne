import ImagePicker from 'react-native-image-picker';
import React, {useState} from 'react';
import { StyleSheet, Text, View,Modal,TextInput,Button, Image } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';


class ImageSelectPage extends React.Component{
   
  state = {
    avatarSource: null
  }
  selectImage = () => {
    ImagePicker.showImagePicker({noData:true, mediaType: 'photo'}, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        
        
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: response.uri,
          timeStamp: response.timestamp
        });
      }
    });
  }

  render(){
    return (
      
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', padding:10}}>
       {
         this.state.avatarSource && <Image source={{uri:this.state.avatarSource}} style={{width: '95%', height:200, resizeMode: 'contain', marginBottom: 30}}/>
       }

       <Button title="Select Image" onPress={this.selectImage}/>

       <RNPickerSelect 
          onValueChange={(value) => console.log(value)}
          items={[
              { label: 'Tomato', value: 'tomato' },
              { label: 'Potato', value: 'potato' },
              { label: 'Papaya', value: 'papaya' },
          ]}
       />
       <Button title='Verify Image with AI' onPress={console.log("This feature is not yet Released....!!")}/>
      </View>
    
  
    );
  }
  
};

export default function App() {

  
  const userInfo = { userName: 'admin', password:'joni'};
  

  const [modalOpen, setModalOpen] = useState(false);  
  const [modalOpen2, setModalOpen2] = useState(false);  

  return (
    <View style={styles.container}>
      <Modal visible={modalOpen} style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={{ flex: 1, justifyContent: 'center',  padding: 10 }}>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Text>Sign Up</Text>
        </View>
          
        <View>
          <TextInput placeholder='Name/Email' style={{marginBottom:10, height:50, borderColor: 'blue', borderWidth: 1, borderRadius:10, padding:10}} ></TextInput>  
        </View>  
        
        <View>
          <TextInput placeholder='Password' style={{marginBottom:10, height:50, borderColor: 'blue', borderWidth: 1, borderRadius:10, padding:10}}></TextInput>
        </View>

        <View>
          <TextInput placeholder='Confirm Password' style={{marginBottom:10, height:50, borderColor: 'blue', borderWidth: 1, borderRadius:10, padding:10}}></TextInput>
        </View>
        
        <Button style={{marginBottom:10}} title='Sing Up'></Button>
        
        <View style={{marginTop:10}}>
          <Text onPress={() => setModalOpen(false)} style={{ textAlign:"center"}}>Already have an Account? Login Now.</Text>
        </View>
      </View>
      </Modal>

      <Modal visible={modalOpen2}>
        <View style={{flex: 1, justifyContent: 'center',  padding: 10}}>
          <ImageSelectPage />
          <Text style={{textAlign: 'center'}} onPress={() => setModalOpen2(false)}>Back to Login Page</Text>
        </View>
      </Modal>


      <View style={{padding: 10}}>
        <View style={{height:50, alignItems:"center", paddingTop:20}}>
            <Text>Login</Text>
        </View>
        
          
          <TextInput onChangeText={(userName)=>this.setState({userName})} placeholder='Name/Email' style={{marginBottom:10, height:50, borderColor: 'blue', borderWidth: 1, borderRadius:10, padding:10}} ></TextInput>
        
        <View>
          <TextInput placeholder='Password' style={{marginBottom:10, height:50, borderColor: 'blue', borderWidth: 1, borderRadius:10, padding:10}}></TextInput>
        </View>
        
          <Button onPress={() => setModalOpen2(true)} title='Sing In'></Button>
        
        <View style={{marginTop:10, float:'right'}}>
          <Text onPress={() => setModalOpen(true)} style={{ textAlign:"center"}}>No Account ? Sign Up Now.</Text>
        </View>
      </View>
    </View>
  );
}

class Auth extends React.Component{
  

  constructor (){
    super(props);
    this.state={
      userName: '',
      password: ''
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
