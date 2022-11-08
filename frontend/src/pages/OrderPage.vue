<template>
  <div>
    <el-card v-if="order">
      <div>Order ID: {{ order.id }}</div>
      <div>Name: {{ order.name }}</div>
      <div>SKU: {{ order.sku }}</div>
      <div>Price: USD {{ order.price }}</div>
      <div>Transaction Status: {{ order.transaction_status }}</div>
      <div>Paid Date: {{ order.date_paid }}</div>
      <div>Profit: USD {{ order.profit }}</div>
      <div>Buyer Name: {{ order.buyer_name }}</div>
      <div>Buyer User Name: {{ order.buyer_username }}</div>
    </el-card>
  </div>
</template>
  
<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()

    onMounted(() => {
      store.dispatch('getOrder', route.params.id)
    })
  
    return {
      order: computed(() => store.state.order),
      loading: computed(() => store.state.loading)
    }
  }
}
</script>