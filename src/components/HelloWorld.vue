<template>
    <div>
        <form method="post">
            账号 :
            <input type="text" id="name" value="1" />
            <br /><br />
            密码 :
            <input type="text" id="pwd" value="2" />
            <br /><br />
            <input type="button" value="提交" @click="submit">
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        methods: {
            submit() {
                var name = document.getElementById("name").value;
                var pwd = document.getElementById("pwd").value;
                if (name == "" || pwd == "") {
                    alert("帐号和密码不能为空")
                } else {

                    axios.post('http://127.0.0.1:3000/login', {
                            name: name,
                            pwd: pwd
                        })
                        .then(function(response) {
                            console.log(response);
                        })
                        .catch(function(error) {
                            console.log(error);
                        });

                }
            }
        },
    }
</script>
