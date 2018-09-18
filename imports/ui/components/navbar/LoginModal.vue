<template>
    <b-modal id="loginModal" ref="loginModalRef" title="Login" @ok="handleOk">
        <div class="d-block">
            <b-form @submit="handleSubmit">
                <b-form-group
                        label="Email"
                        label-for="email">
                    <b-form-input required id="email" v-model.trim="email"></b-form-input>
                </b-form-group>
                <b-form-group
                        label="Password"
                        label-for="password">
                    <b-form-input required type="password" id="password" v-model.trim="password"></b-form-input>
                </b-form-group>
            </b-form>
        </div>
    </b-modal>
</template>
<script>
    export default {
        name: 'LoginModal',
        data () {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            handleOk (event) {
                console.log('this is running');
                event.preventDefault();
                this.handleSubmit();
            },
            handleSubmit () {
                Meteor.loginWithPassword(this.email, this.password, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        this.$refs.loginModalRef.hide();
                    }
                });
            }
        }
    }
</script>