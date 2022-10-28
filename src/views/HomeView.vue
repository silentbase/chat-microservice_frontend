<template>
  <div id="main_frame">
    <div id="contacts">
      <input type="text" id="searchbox" v-model="searchInput" ref="searchInput">

      <div id="contact-element" class="contactElement" v-bind:class="contact" ref="contact-element" v-for="(contact) in searchedContacts" :key="contact.id" @click="clickOnContact(contact)">
        
        <div class="contactName" >{{contact}}</div>
        <div class="messageCounter-element">
      </div> 
      </div>
    </div>
    <div id="chat_frame">
      <div id="header">{{selectedContact}}</div>
      <div id="history_frame" ref="history_frame">
        <div id="msg" v-for="(msg) in currentMsgHistory">
          <p v-bind:class=getMsgClass(msg.from)>{{msg.text}}</p>

        </div>
      </div>
      <div id="send_frame">
        <input id="text_input" type="text" placeholder="Type.." v-model="input" autocomplete="off"
          @keyup.enter="sendMsg" ref="msgInput">
        <input id="button_input" type="button" value="Send" @click="sendMsg">
      </div>
    </div>

  </div>
</template>

<script scoped>
import io from 'socket.io-client'
import { ref } from 'vue';


export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      selectedContact: '',
      input: '',
      msgs: [],
      selectedContactMsgs: [],
      contacts: [],
      socket: null,
      searchInput: ''
    }
  },
  methods: {
    sendMsg: function () {
      if (this.input.length == 0) {
        this.$refs.msgInput.focus();
        return;
      }

      if (this.selectedContact == '') {
        return
      }

      var today = new Date();


      var msgo = {
        from: localStorage.getItem('login'),
        to: this.selectedContact, //refs nutzen
        date: today,
        text: this.input,
      }

      this.socket.emit('createMessage', msgo, () => {
      });

      this.input = ''
      this.$refs.msgInput.focus();
      var container = this.$el.querySelector("#history_frame");
      container.scrollTop = container.scrollHeight;
    },
    clickOnContact: function (contact) {
      this.msgCounterShow = false;
      this.msgCounter = 0;
      this.selectedContact = contact;
    },

    getMsgClass: function (name) {
      if (localStorage.getItem('login') == name) {
        return 'msg';
      } else {
        return 'userMsg';
      }
    },

    msgCounterShow: function(){
      this.$refs.contact-element.$el
    }
  },

  computed: {
    currentMsgHistory() {
      this.selectedContactMsgs = []
      for (let i = 0; i < this.msgs.length; i++) {
        if ((this.msgs.at(i).from == this.selectedContact && this.msgs.at(i).to == localStorage.getItem('login'))
          || (this.msgs.at(i).from == localStorage.getItem('login') && this.msgs.at(i).to == this.selectedContact)) {
          this.selectedContactMsgs.push(this.msgs.at(i))
        }
      }
      return this.selectedContactMsgs;
    }, 
    searchedContacts(){
      if(this.searchInput.length != 0){
        return this.contacts.filter((element) => String(element).includes(this.searchInput))
      } else {
        return this.contacts;
      }
    }
  },

  created() {
    
    this.socket = io('http://localhost:4000', {
      extraHeaders: {
        "name": localStorage.getItem("login")
      }
    })

    this.socket.emit('findOnlineUsers', (response) => {

      this.contacts = response
      //this.contacts.at(this.contacts.findIndex((contact) => contact == response)) = null

    })
  },

  beforeMount() {

    this.socket.emit('findAllMessages', localStorage.getItem('login'), (response) => {
      this.msgs = response
    })
  },
  mounted() {
    this.socket.on('msg', (response) => {
      this.msgs.push(response);
      var container = this.$el.querySelector("#history_frame");
      container.scrollTop = container.scrollHeight;
      this.socket.emit('confirmMsg', response, (response2) => {
      })
    })

    this.socket.on('confirmMsg', (response) => {
      this.msgs.push(response);

    })

    this.socket.on('login', (response) => {

      if (this.contacts.find((contact) => contact == response) != undefined) {
        return;
      }
      if (localStorage.getItem('login') == response) {
        return;
      }
      this.contacts.push(response)
    })
    this.socket.on('logout', (response) => {
      let index = this.contacts.indexOf(response)
      this.contacts.splice(index, 1)
    })

  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

#user_msg {
  width: auto;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 20px;
  padding: 30px;
}

#user_msg p {
  border-radius: 7px;
  padding: 5px;
  font-size: 18px;
  background-color: whitesmoke;
}

body {}

#header {
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 50px;
  background-color: rgb(66, 66, 66);
  color: white;
  font-size: 20px;
}

#main_frame {
  display: flex;
  border-style: solid;
  border-width: 1px;
  height: 55vh;
  width: 50vw;
  margin: 0 auto;
  margin-top: 10%;
  animation: chat_intro 1s ease-out;

}

#contacts {
  background-color: #4f4f4f;
  flex: 2;
  overflow: auto;
}

#contact-element {
  height: 40px;
  background-color: rgb(0, 0, 0);
  cursor: pointer;
  margin: 5px;
  border-radius: 5px;
  opacity: 0.9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-element:hover {
  background-color: rgb(26, 26, 26);
}

.contact-element:active {
  background-color: rgb(5, 5, 5);

}
#msgCounter{
  position: relative;
  left: 40px;
  background-color: rgb(81, 185, 81);
  font-size: 12px;
  border-radius: 7px;
  padding: 3px;
 
}

#chat_frame {
  display: flex;
  flex-direction: column;
  flex: 7
}

#history_frame {
  background-color: #686868;
  flex: 20;
  overflow: hidden scroll;
}

#send_frame {
  background-color: #eaeaea;
  flex-grow: 1;
  display: flex;
}

input {
  margin: 7px;
}

#text_input {
  font-size: 17px;
  background-color: #f5f5f5;
  border-width: 1.2px;
  transition: background-color 0.5s;
  border-radius: 7px;
  padding-left: 3px;
  outline-style: none;
  width: 90%;
}

#text_input:focus {
  background-color: #ffffff;

}

#text_input:focus::placeholder {
  opacity: 0;
  transition: opacity 0.2s;
}

#button_input {
  background-color: #f5f5f5;
  border-width: 1.2px;
  border-radius: 7px;
  width: 70px;
}

#button_input:hover {
  cursor: pointer;
  background-color: #ffffff;
}

#button_input:active {
  cursor: pointer;
  background-color: #fafafa;
}

p {
  word-break: break-all;
  width: min-content;
  color: rgb(245, 245, 245);
  padding: 10px;
  margin: 25px;
  font-size: 20px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  border-radius: 13px;
  width: fit-content;
  border-width: 1px;
}

.msg {
  background-color: rgb(228, 178, 42);
  margin-left: auto;
}

.userMsg {
  background-color: #343434f6;
}

#searchbox {
  height: 30px;
  outline: none;
  width: 100%;
  margin: 0px;
  padding: 5px;
  border-style: none;
  background: rgb(214, 214, 214) url(../assets/lupe.png) no-repeat scroll 98% 1px;
  background-size: contain;

}

#searchbox:focus {
  background-color: rgb(254, 254, 254);
  background: rgb(254, 254, 254);
  transition: background-color 0.2s ease-out;
}

#search-label {
  position: absolute;
  left: 505px;
  top: 14.3%;
}

#searchbox:focus+#search-label {
  opacity: 0;

  transition: opacity 0.08s ease-out;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50e9;

}

@keyframes searchbar {
  0% {
    scale: 0.5;
    opacity: 0.5;
  }

  100% {
    scale: 1;
  }
}

@keyframes chat_intro {
  0% {
    scale: 0.5;
    opacity: 0.5;
  }

  100% {
    scale: 1;
  }
}
</style>
