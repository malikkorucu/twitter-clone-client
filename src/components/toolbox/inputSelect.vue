<template>
  <div>
    <div ref="inputContainer" class="input">
      <div class="label pl-2">{{title}}</div>
      <select
        v-model="currentData"
        @change="sendToParent()"
        ref="select"
        size="1"
        class="w-100 text-white select pl-2 pb-2 pr-2"
        id="select"
      >
        <option v-for="item in array" :key="item" :value="item">{{
          item
        }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    array: {
      required: true,
    },
    title:{
        required:true,
        type:String
    }
  },
  data(){
    return{
      currentData:this.array[0] || 31
    }
  },
  methods:{
    sendToParent(){
      this.$emit('data' , this.currentData)
    }
  },
  mounted(){
      this.$refs.select.addEventListener('focus' , ()=> {
          this.$refs.inputContainer.classList.add('active')
      })
      this.$refs.select.addEventListener('blur' , ()=> {
          this.$refs.inputContainer.classList.remove('active')
      })
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  border-bottom: 3px solid #8899a6;
    background: #192734;
}

.input input,
label {
  background: #192734;
  color: white;
  outline: none;
  width: 100%;
}

.label {
  color: #8899a6;
  background: #192734;
}

.input.active .label {
  color: #308fd8;
}
.select {
  background: #192734;
  overflow: scroll;
  outline:none;
  cursor:pointer;
}

.input.active {
  border-bottom: 3px solid #308fd8 !important;
}
</style>
