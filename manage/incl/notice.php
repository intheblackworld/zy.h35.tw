<notice :class="{
        'is:on' : status.save,
        'is:success': (status.save === 'success'),
        'is:danger': (status.save === 'error')
    }">
    <template slot="strong">{{status.save === 'success' ? '恭喜！' : (status.save === 'error' ? '哎呀！' : '')}}</template>
    <template slot="msg">{{msg.save}}</template>
</notice>
