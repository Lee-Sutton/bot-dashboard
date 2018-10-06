<template>
    <div>
       <b-modal v-model="show" id="notificationModal" title="Notifications" ref="notificationModal">
           <div class="d-block">
               <b-form ref="form" @submit.prevent="createUser">
                   <b-form-checkbox id="email-notification"
                                    v-model="notification"
                                    value="notification"
                                    unchecked-value="false">
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
    import {Meteor} from 'meteor/meteor';

    export default {
        name: 'NotificationModal',
        props: ['id'],
        data () {
            return {
                notification: false,
                show: false,
            }
        },
        methods: {
            saveNotification() {
                Meteor.call('addBotNotification', this.id, (err) => {
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
        }
    }
</script>

<style scoped>

</style>