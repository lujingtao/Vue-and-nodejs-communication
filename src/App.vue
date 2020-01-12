<template>
    <div>
        <form method="post">
            账号 :
            <input type="text" id="name" />
            <br /><br />
            密码 :
            <input type="text" id="pwd" />
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
                    //向服务器提交数据
                    axios.post('http://127.0.0.1:3000/login', {
                            name: name,
                            pwd: pwd
                        })
                        .then(function(response) {
                            //成功时服务器返回 response 数据
                            alert(response.data)
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            }
        },
    }
</script>