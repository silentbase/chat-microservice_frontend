<template>
    <div id="login">
        <h1>Wie möchtest du genannt werden ?</h1>
        <div id="container">

            <input type="text" class="text-input" id="username" v-model="username" name="username" autocomplete="off"
                placeholder="username">
            <button class="button-input" @click="submit"><i class="material-icons"
                    style="font-size:36px">arrow_forward</i></button>

        </div>
    </div>
</template>

<script>
export default {
    name: 'nameComponent',
    data() {
        return {
            username: ''
        }
    },
    methods: {
        submit: function () {
            console.log('this.$router.getRoutes()')
            localStorage.setItem('login', 'user')

            //this.$router.push({ name: 'home', params: { name: this.username } })
        }
    }
}
</script>

<style scoped>
h1 {
    color: rgb(71, 71, 71);
    margin-top: 25vh;
    padding-right: 40px;
    animation: h1Anime 1s ease-out;
}

#container {

    margin: 0 auto;
    margin-top: 4vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 30vw;
    height: 25vh;
    border-radius: 7px;
}

.button-input {
    font-weight: bold;
    width: 50px;
    margin-top: 7px;
    cursor: pointer;
    border-radius: 40%;
    border-style: none;

}

.button-input:hover {
    background-color: rgb(164, 240, 83);
}

.button-input:active {
    background-color: rgb(142, 235, 43);


}

.button-input:focus::placeholder {
    opacity: 0;
    transition: opacity 0.2s;
}

input textarea {
    font-size: large;
}

input {
    height: 38px;
    font-size: large;
    outline: none;
    border-radius: 7px;
}

button {
    background-color: rgb(142, 235, 43);
    height: 38px;
    width: 50px;

    outline: none;
    border-radius: 7px;
}

.text-input {
    width: 400px;
    padding-left: 5px;
    border-radius: 12px;
    border-width: 1px;
}

.text-input:focus::placeholder {
    opacity: 0;
    transition: opacity 0.2s;
}

.text-input:focus {

    border-width: 2px;
}

#login {
    text-decoration: none;
    color: black;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    margin-top: 25px;
}

#login {
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

@keyframes h1Anime {
    from {
        opacity: 0;
        padding-top: 30px;
    }

    to {
        opacity: 1;
        padding-top: 0px;
    }
}
</style>