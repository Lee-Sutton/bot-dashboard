<template>
    <div>
       <b-modal v-model="show" id="notificationModal" title="Notifications" ref="notificationModal">
           <div class="d-block">
               <b-form ref="form" @submit.prevent="createUser">
                   <b-form-checkbox id="email-notification"
                                    v-model="notification">
                       Email me on sunday when this bot finds new music
                   </b-form-checkbox>
               </b-form>
           </div>
           <div slot="modal-footer">
               <button class="btn btn-secondary" @click="show=false">Cancel</button>
               <button class="btn btn-primary" @click="saveNotification">Save</button>
           </div>
       </b-modal>
    </div>
</template>

<script>
    import {Bot, setNotification} from '/imports/api/bots/bots';

    export default {
        name: 'NotificationModal',
        data() {
            return {
                notification: false,
                show: false,
            }
        },
        methods: {
            saveNotification() {
                let botId = this.$route.params.id,
                    bot = Bot.findOne({_id: botId});

                setNotification.call({bot, notification: this.notification}, (err) => {
                    if (err) {
                        this.$notify({
                            group: 'sAlert',
                            type: 'Danger',
                            title: 'Error adding notification',
                            text: err.reason,
                        });
                    } else {
                        this.$notify({
                            group: 'sAlert',
                            type: 'success',
                            title: 'Notification added',
                        });
                    }
                    this.show = false;
                });
            }
        },
        meteor: {
            $subscribe: {
                'bots.all': []
            },
        }
    }
</script>

<style scoped>

</style>