<template>
  <div class="d-flex align-items-end justify-content-center">
    <div class="font-size-18">
      <i class="fa fa-star" v-for="i in 5" v-bind:class="[i <=quantity?'text-warning':'text-muted']"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stars",
  components: {},
  props: {
    quantity: { type: Number, required: true }
  },
  data() {
    return {
      visible: true,
      number:parseInt(this.quantity)
    };
  },
  methods: {}
};
</script>

</script>