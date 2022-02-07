<template>
    <div> {{ seconds }} </div>
</template>

<script>
export default {
    props: {
        gameInProgress: Boolean
    },
    data: function() {
        return {
            seconds: 0,
            interval_id: undefined,
        };
    },
    watch: {
        gameInProgress(value){
            if (value) {
                this.seconds = 0;
                this.interval_id = setInterval( () => {
                    this.seconds++;
                }, 1000);
            }
            else{
                clearInterval(this.interval_id);
            }
        }
    }
}
</script>
