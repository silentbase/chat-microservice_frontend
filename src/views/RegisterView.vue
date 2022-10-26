<template>
<div id="register">
    <h1>Register</h1>
    <div id="container">
        
        <input type="text" class="text-input" id="username" name="username" autocomplete="off" placeholder="Username">
        <input type="text" class="text-input" id="email" name="email" autocomplete="off" placeholder="Email">
        <input type="text" class="text-input" id="password"  name="password" autocomplete="off" placeholder="Password">
        <input type="button" class="button-input" value="Register">
        <a id="register" href=""><router-link to="/login" id="registerText">Already have an Account ?</router-link></a>
    </div>
</div>
</template>
<script>
export default {

}
</script>
<style scoped>

#login{
    
}
h1{
    margin-top: 25vh;
}
#container{
    background-color: rgb(243, 121, 81);
    margin: 0 auto;
    margin-top: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 17vw;
    height: 25vh;
    border-radius: 7px;
}

.button-input{
    font-weight: bold;
    margin: 0 auto;
    width: 80px;
    margin-top: 40px;
    cursor: pointer;
    background-color: rgb(238, 238, 238);
}
.button-input:hover{
    background-color: white;
}
.button-input:active{
    background-color: rgb(238, 238, 238);
}
.button-input:focus::placeholder {
  opacity: 0;
  transition: opacity 0.2s;
}

input {
    height: 28px;
    border-width: 1px;
    outline: none;
    border-radius: 7px;
}

.text-input{
    padding-left: 5px;
}

.text-input:focus::placeholder {
  opacity: 0;
  transition: opacity 0.2s;
}

#register {
    text-decoration: none;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    margin-top: 25px;
}

#register {
    text-decoration: none;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    margin-top: 25px;
}

#registerText {
    text-decoration: none;
    color: rgb(41, 41, 41);
}


</style>