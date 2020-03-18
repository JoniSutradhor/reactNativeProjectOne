import ImagePicker from 'react-native-image-picker';
import React, {useState} from 'react';
import {
   StyleSheet, 
   Text, 
   View,
   Modal,
   TextInput,
   Button, 
   Image,
   Keyboard } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';


export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      avatarSource: null,
      SignUpModal : false,
      VerifyPage : false,
      nameEmail : 'admin',
      passOne : '123456',
      passTwo : '123456',
      usernameEmail : '',
      password : ''
    }
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
        this.setState({
          avatarSource: response.uri,
          timeStamp: response.timestamp
        });
      }
    });
  }

  setSignUpModal(visible) {
    this.setState({SignUpModal: visible});
  }
  setVerifyPage(visible) {
    this.setState({VerifyPage: visible});
  }

  signUpFun = () =>{
    const {nameEmail, passOne, passTwo} = this.state;
    if(nameEmail ==""){
      alert('Please fill the Name/Email field..!!');
    }else if(passOne ==""){
      alert('Please fill the Password field..!!');
    }else if(passTwo ==""){
      alert('Please fill the Confirm Password field..!!');
    }else if(passOne !== passTwo){
      alert('Confirm Password did not Match..!!');
    }else{
      alert('Successfully Signed Up .....!!! ' + ' Your Name/Email : '+ nameEmail + 'Your Password : ' + passOne)
    }
    Keyboard.dismiss();
  }

  signInFun= () =>{
    const {usernameEmail, password, nameEmail, passOne} = this.state;
    if(usernameEmail == nameEmail && password == passOne){
      this.setVerifyPage(true)
    }else if(usernameEmail != nameEmail  || password != passOne){
      alert('Invalid Credentials.....!!');
    }else{
      alert('Invalid Credentials.....!!');
    }
  }

  navigateToLoginPage = () =>{
    this.setSignUpModal(!this.state.SignUpModal)
  }

  navigateToSignUpPage = () =>{
    this.setSignUpModal(true)
  }

  sendVerifyRequest = () =>{
    alert('Successfully send Request ...!! ' + ' Status : ' + 'Failed');
  }

  render(){
    return (
      
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', padding:20}}>
        <Modal visible={this.state.SignUpModal} style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{ flex: 1, justifyContent: 'center',  padding: 20 }}>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <Text>Sign Up</Text>
            </View>
              
            <View>
              <TextInput
               minLength={5} 
               placeholder='Name/Email' 
               style={styles.inputField} 
               onChangeText={
                 nameEmail => this.setState({nameEmail})
               }
              />  
            </View>  
            
            <View>
              <TextInput 
              minLength={5} 
              secureTextEntry 
              placeholder='Password' 
              style={styles.inputField}
              onChangeText={
                passOne => this.setState({passOne})
              }
              />
            </View>

            <View>
              <TextInput 
              minLength={5} 
              secureTextEntry 
              placeholder='Confirm Password' 
              style={
                styles.inputField
              }
              onChangeText={
                passTwo => this.setState({passTwo})
              }
              />
            </View>
            
            <Button 
            onPress={
              this.signUpFun
            } 
            style={
              {
                marginBottom:10
              }
            } 
            title='Sing Up'
            />
            
            <View style={{marginTop:10}}>
              <Text 
              onPress={
                this.navigateToLoginPage
              } 
              style={
                { 
                  textAlign:"center"
                }
              }
              >
                Already have an Account? Login Now.
              </Text>
            </View>
          </View>
        </Modal>

        <Modal visible={this.state.VerifyPage}>
          <View style={{flex: 1, justifyContent: 'center',  padding: 20}}>
            {
            this.state.avatarSource && 
            <Image 
            source={
              {uri:this.state.avatarSource}
            } 
            style={
              {
                width: '95%', 
                height:200, 
                resizeMode: 'contain', 
                marginBottom: 30
              }
            }
            />
            }

            <Button 
            title="Select Image" 
            onPress={
              this.selectImage
            }
            />

            <RNPickerSelect 
              onValueChange={(value) => console.log(value)}
              items={[
                  { label: 'None', value: 'null' },
                  { label: 'Tomato', value: 'tomato' },
                  { label: 'Potato', value: 'potato' },
                  { label: 'Papaya', value: 'papaya' },
              ]}
            />
            <Button 
            title='Verify Image with AI' 
            onPress={this.sendVerifyRequest}
            />
            <Text 
            style={
              {
                textAlign: 'center', 
                marginTop:10
              }
            } 
            onPress={
              () => this.setVerifyPage(!this.state.VerifyPage)
            }
            >
            Back to Login Page
            </Text>
          </View>
        </Modal>

        <View style={{ width: '100%'}}>
          <View 
          style={
            {
              height:50, 
              alignItems:"center", 
              paddingTop:20
            }
          }
          >
            <Text>Login</Text>
          </View>
          
            <TextInput 
            placeholder='Name/Email' 
            style={
              styles.inputField
            }
            onChangeText={
              usernameEmail => this.setState({usernameEmail})
            }
            />
          
          <View>
            <TextInput 
            placeholder='Password'  
            secureTextEntry 
            style={
              styles.inputField
            }
            onChangeText={
              password => this.setState({password})
            }
            />
          </View>
          
            <Button 
            onPress={
              this.signInFun
            } 
            title='Sing In'
            />
          
          <View style={{marginTop:10, float:'right'}}>
            <Text 
            onPress={
              this.navigateToSignUpPage
            } 
            style={
              { 
                textAlign:"center"
              }
            }
            >
              No Account ? Sign Up Now.
            </Text>
          </View>
        </View>
      </View>
    );
  }
  
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  inputField: {
    marginBottom:10, 
    height:50, 
    borderColor: 'blue', 
    borderWidth: 1, 
    borderRadius:10, 
    padding:10
  }
});
