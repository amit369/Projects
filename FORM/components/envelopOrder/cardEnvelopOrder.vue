<template>
<div>
<lds-form id="accessibility-form" class="wrapperForm">
<h3 class="headerSize"> Slaes </h3>
</div>
<div class="row">
  <div class="col-12 col-md-4">
   <lds-text-filed : required="true" name="abc" type="text" > Type </lds-text-field>
</div>
</template>

<script>
export default {
    name : 'Envelop',
    props : {
        accessibilityData : {
           required : true,
           default : () => ({ })
        }
    },
    data() {
        return {
            handlers : ['input'],
            phone : '',
        }
    },
    mounted() {
        this.busOn('text-field-input:input, ({ id, event}) => {
            if(id === 'Phone') {

            }
        })
    },
    methods : {
        acceptNumber(phone) {

        }
    }

}

</script>

<style scoped>
.headerSize {
    font-Size : xx-large;
}

</style scoped>