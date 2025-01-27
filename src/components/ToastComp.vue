<template>
<div v-if="visible" class="toast" :class="position">
    {{ message }}
</div>
</template>

<script>
export default {
props: {
    message: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        default: 4000, 
    },
    position: {
        type: String,
        default: "top", // "top" 또는 "bottom"
    },
},
data() {
    return {
        visible: false, 
    };
},
methods: {
    showToast() {
        this.visible = true;
        setTimeout(() => {
            this.visible = false;
        }, this.duration);
    },
},
mounted() {
    this.showToast();
},
};
</script>

<style scoped>
.toast {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(160, 88, 199, 0.9);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 15px;
    z-index: 1000;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    animation: fadeInOut 2s ease;

    white-space: nowrap;
    width: auto;
}

.toast.top {
    top: 50px;
}

.toast.bottom {
    bottom: 20px;
}

@keyframes fadeInOut {
0% {
    opacity: 0;
}
20% {
    opacity: 1;
}
80% {
    opacity: 1;
}
100% {
    opacity: 0;
}
}
</style>
